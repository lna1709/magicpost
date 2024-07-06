package web.uet.backend.service.business;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchPage;
import org.springframework.stereotype.Service;
import web.uet.backend.document.business.DeliveryDocument;
import web.uet.backend.dto.business.request.DeliveryPageRequest;
import web.uet.backend.dto.business.response.delivery.DeliveryPageResponse;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.entity.enums.ShopType;
import web.uet.backend.entity.enums.StatusType;
import web.uet.backend.dto.business.request.DeliveryCreateRequest;
import web.uet.backend.dto.business.response.delivery.DeliveryGeneralResponse;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.exception.type.InvalidAuthorizationException;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.business.document.DeliveryGeneralMapperFromDocument;
import web.uet.backend.mapper.business.response.DeliveryGeneralMapper;
import web.uet.backend.repository.business.jpa.DeliveryRepository;
import web.uet.backend.repository.business.jpa.DeliveryStatusRepository;
import web.uet.backend.repository.business.jpa.ShopRepository;
import web.uet.backend.repository.location.jpa.CommuneRepository;
import web.uet.backend.service.auth.AccountService;
import web.uet.backend.service.auth.AuthenticationService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static web.uet.backend.service.elasticsearch.search.ElasticsearchQueryUtils.*;

@Service
@RequiredArgsConstructor
public class DeliveryService {

  private final CommuneRepository communeRepository;
  private final ShopRepository shopRepository;
  private final DeliveryRepository deliveryRepository;
  private final DeliveryStatusRepository deliveryStatusRepository;

  private final DeliveryGeneralMapper deliveryGeneralMapper;
  private final DeliveryGeneralMapperFromDocument deliveryGeneralMapperFromDocument;

  private final ElasticsearchOperations elasticsearchOperations;

  @Transactional
  public DeliveryGeneralResponse createDeliveryByCreateRequest(DeliveryCreateRequest deliveryCreateRequest) {
    if (AuthenticationService.getCurrentAccount().getRole() != Role.EMPLOYEE
        || AuthenticationService.getCurrentAccount().getWorkAt().getType() != ShopType.POST
    ) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    Commune fromCommune = communeRepository.findById(deliveryCreateRequest.getFromCommuneId())
        .orElseThrow(() -> new NotFoundException("From commune not found"));

    Commune toCommune = communeRepository.findById(deliveryCreateRequest.getToCommuneId())
        .orElseThrow(() -> new NotFoundException("To commune not found"));

    Shop fromShop = shopRepository.findById(deliveryCreateRequest.getFromShop())
        .orElseThrow(() -> new NotFoundException("From shop not found"));

    Shop toShop = shopRepository.findById(deliveryCreateRequest.getToShop())
        .orElseThrow(() -> new NotFoundException("To shop not found"));

    if (!Objects.equals(AuthenticationService.getCurrentAccount().getWorkAt().getShopId(), fromShop.getShopId())) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    Delivery delivery = Delivery.builder()
        .fromCommune(fromCommune)
        .toCommune(toCommune)
        .fromAddress(deliveryCreateRequest.getFromAddress())
        .toAddress(deliveryCreateRequest.getToAddress())
        .fromPhone(deliveryCreateRequest.getFromPhone())
        .toPhone(deliveryCreateRequest.getToPhone())
        .fromName(deliveryCreateRequest.getFromName())
        .toName(deliveryCreateRequest.getToName())
        .fromShop(fromShop)
        .toShop(toShop)
        .productType(deliveryCreateRequest.getProductType())
        .name(deliveryCreateRequest.getName())
        .fromDescription(deliveryCreateRequest.getFromDescription())
        .toDescription(deliveryCreateRequest.getToDescription())
        .shippingFee(deliveryCreateRequest.getShippingFee())
        .weight(deliveryCreateRequest.getWeight())
        .currentStatus(StatusType.RECEIVED_FROM_CUSTOMER)
        .currentShop(fromShop)
        .createdAt(LocalDateTime.now())
        .updatedAt(LocalDateTime.now())
        .build();

    delivery = deliveryRepository.save(delivery);

    DeliveryStatus deliveryStatus = DeliveryStatus.builder()
        .delivery(delivery)
        .currentShop(fromShop)
        .statusType(StatusType.RECEIVED_FROM_CUSTOMER)
        .build();

    deliveryStatusRepository.save(deliveryStatus);

    return deliveryGeneralMapper.toDto(delivery);
  }

  public DeliveryGeneralResponse getDeliveryByDeliveryId(UUID deliveryId) {
    Delivery delivery = deliveryRepository.findById(deliveryId)
        .orElseThrow(() -> new NotFoundException("Delivery not found"));

    return deliveryGeneralMapper.toDto(delivery);
  }

  public Query getQueryBy(DeliveryPageRequest request) {
    BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();

    if (request.getFromCommuneId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "fromCommune.communeId", request.getFromCommuneId());
    } else if (request.getFromDistrictId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "fromCommune.district.districtId", request.getFromProvinceId());
    } else if (request.getFromProvinceId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder,
          "fromCommune.district.province.provinceId",
          request.getFromProvinceId()
      );
    }

    if (request.getToCommuneId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "toCommune.communeId", request.getToCommuneId());
    } else if (request.getToDistrictId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "toCommune.district.districtId", request.getToDistrictId());
    } else if (request.getToProvinceId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder,
          "toCommune.district.province.provinceId",
          request.getToProvinceId()
      );
    }

    if (request.getFromAddressContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "fromAddress", request.getFromAddressContains());
    }
    if (request.getToAddressContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "toAddress", request.getToAddressContains());
    }

    if (request.getFromPhoneContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "fromPhone", request.getFromPhoneContains());
    }
    if (request.getToPhoneContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "toPhone", request.getToPhoneContains());
    }

    if (request.getFromNameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "fromName", request.getFromNameContains());
    }
    if (request.getToNameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "toName", request.getToNameContains());
    }

    if (request.getFromShopId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "fromShop.shopId", request.getFromShopId());
    }
    if (request.getToShopId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "toShop.shopId", request.getToShopId());
    }

    if (request.getProductType() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "productType", request.getProductType().getValue());
    }

    if (request.getStatuses() != null) {
      boolQueryBuilder = inQuery(boolQueryBuilder, "currentStatus", request.getStatuses().stream()
          .map(Enum::name)
          .collect(Collectors.toList())
      );
    }

    if (request.getCurrentShopId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "currentShop.shopId", request.getCurrentShopId());
    }

    return new Query(boolQueryBuilder.build());
  }

  public DeliveryPageResponse getDeliveriesPageBy(DeliveryPageRequest request) {
    Account currentAccount = AuthenticationService.getCurrentAccount();
    AccountService.validateAccessShopPermission(currentAccount, request.getCurrentShopId());

    Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

    NativeQueryBuilder nativeQueryBuilder = NativeQuery.builder()
        .withQuery(getQueryBy(request))
        .withPageable(pageable);

    if (request.getSort() != null) {
      Sort sort = Sort.by(request.getDirection().getValue(), request.getSort().getValue());
      nativeQueryBuilder = nativeQueryBuilder.withSort(sort);
    }

    SearchHits<DeliveryDocument> searchHits = elasticsearchOperations.search(
        nativeQueryBuilder.build(),
        DeliveryDocument.class
    );
    SearchPage<DeliveryDocument> searchPage = SearchHitSupport.searchPageFor(searchHits, nativeQueryBuilder.getPageable());

    List<DeliveryGeneralResponse> deliveryGeneralResponses = searchHits.stream()
        .map(searchHit -> deliveryGeneralMapperFromDocument.toDto(searchHit.getContent()))
        .toList();

    return DeliveryPageResponse.builder()
        .deliveries(deliveryGeneralResponses)
        .totalElements(searchPage.getTotalElements())
        .totalPages(searchPage.getTotalPages())
        .page(request.getPage())
        .size(request.getSize())
        .build();

  }
}
