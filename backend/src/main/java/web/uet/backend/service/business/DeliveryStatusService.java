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
import web.uet.backend.dto.enums.DirectionSort;
import web.uet.backend.document.business.DeliveryStatusDocument;
import web.uet.backend.dto.business.request.DeliveryStatusCreateRequest;
import web.uet.backend.dto.business.request.DeliveryStatusPageRequest;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusDetailListResponse;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusDetailResponse;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusGeneralResponse;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusPageResponse;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.business.document.DeliveryStatusDetailMapperFromDocument;
import web.uet.backend.mapper.business.response.DeliveryStatusDetailMapper;
import web.uet.backend.mapper.business.response.DeliveryStatusGeneralMapper;
import web.uet.backend.repository.business.jpa.DeliveryRepository;
import web.uet.backend.repository.business.jpa.DeliveryStatusRepository;
import web.uet.backend.repository.business.jpa.ShopRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static web.uet.backend.service.elasticsearch.search.ElasticsearchQueryUtils.*;

@Service
@RequiredArgsConstructor
public class DeliveryStatusService {

  private final DeliveryStatusRepository deliveryStatusRepository;
  private final DeliveryRepository deliveryRepository;
  private final ShopRepository shopRepository;

  private final DeliveryStatusGeneralMapper deliveryStatusGeneralMapper;
  private final DeliveryStatusDetailMapper deliveryStatusDetailMapper;
  private final DeliveryStatusDetailMapperFromDocument deliveryStatusDetailMapperFromDocument;

  private final ElasticsearchOperations elasticsearchOperations;

  @Transactional
  public DeliveryStatusGeneralResponse createDeliveryStatusByDeliveryId(UUID deliveryId, DeliveryStatusCreateRequest request) {
    Delivery delivery = deliveryRepository.findById(deliveryId)
        .orElseThrow(() -> new NotFoundException("Delivery not found"));

    Shop currentShop = shopRepository.findById(request.getShopId())
        .orElseThrow(() -> new NotFoundException("Shop not found"));

    DeliveryStatus deliveryStatus = DeliveryStatus.builder()
        .delivery(delivery)
        .currentShop(currentShop)
        .statusType(request.getStatus())
        .build();
    deliveryStatus = deliveryStatusRepository.save(deliveryStatus);

    delivery.setCurrentStatus(request.getStatus());
    delivery.setCurrentShop(currentShop);
    deliveryRepository.save(delivery);

    return deliveryStatusGeneralMapper.toDto(deliveryStatus);
  }

  public DeliveryStatusDetailListResponse getDeliveryStatusesByDeliveryId(UUID deliveryId, DirectionSort directionSort) {
    Delivery delivery = deliveryRepository.findById(deliveryId)
        .orElseThrow(() -> new NotFoundException("Delivery not found"));

    Sort sort = Sort.by(directionSort == DirectionSort.ASC ? Sort.Direction.ASC : Sort.Direction.DESC,
        "deliveryStatusId");
    List<DeliveryStatus> deliveryStatuses = deliveryStatusRepository.findByDelivery(delivery, sort);

    return DeliveryStatusDetailListResponse.builder()
        .deliveryStatusDetailHistory(deliveryStatusDetailMapper.toDto(deliveryStatuses))
        .build();
  }

  private Query getQueryBy(DeliveryStatusPageRequest request) {
    BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();

    if (request.getFromCommuneId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "delivery.fromCommune.communeId", request.getFromCommuneId());
    } else if (request.getFromDistrictId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder,
          "delivery.fromCommune.district.districtId",
          request.getFromProvinceId());
    } else if (request.getFromProvinceId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder,
          "delivery.fromCommune.district.province.provinceId",
          request.getFromProvinceId()
      );
    }

    if (request.getToCommuneId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "delivery.toCommune.communeId", request.getToCommuneId());
    } else if (request.getToDistrictId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder,
          "delivery.toCommune.district.districtId",
          request.getToDistrictId());
    } else if (request.getToProvinceId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder,
          "delivery.toCommune.district.province.provinceId",
          request.getToProvinceId()
      );
    }

    if (request.getFromAddressContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "delivery.fromAddress", request.getFromAddressContains());
    }
    if (request.getToAddressContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "delivery.toAddress", request.getToAddressContains());
    }

    if (request.getFromPhoneContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "delivery.fromPhone", request.getFromPhoneContains());
    }
    if (request.getToPhoneContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "delivery.toPhone", request.getToPhoneContains());
    }

    if (request.getFromNameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "delivery.fromName", request.getFromNameContains());
    }
    if (request.getToNameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "delivery.toName", request.getToNameContains());
    }

    if (request.getFromShopId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "delivery.fromShop.shopId", request.getFromShopId());
    }
    if (request.getToShopId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "delivery.toShop.shopId", request.getToShopId());
    }

    if (request.getProductType() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "delivery.productType", request.getProductType().getValue());
    }

    if (request.getStatuses() != null) {
      boolQueryBuilder = inQuery(boolQueryBuilder, "statusType", request.getStatuses().stream()
          .map(Enum::name)
          .collect(Collectors.toList())
      );
    }

    if (request.getCurrentShopId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "currentShop.shopId", request.getCurrentShopId());
    }

    return new Query(boolQueryBuilder.build());
  }

  public DeliveryStatusPageResponse getDeliveryStatusPageResponseBy(DeliveryStatusPageRequest request) {
    Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

    NativeQueryBuilder nativeQueryBuilder = NativeQuery.builder()
        .withQuery(getQueryBy(request))
        .withPageable(pageable);
    
    if (request.getSort() != null) {
      Sort sort = Sort.by(request.getDirection().getValue(), request.getSort().getValue());
      nativeQueryBuilder.withSort(sort);
    }

    SearchHits<DeliveryStatusDocument> searchHits = elasticsearchOperations.search(
        nativeQueryBuilder.build(),
        DeliveryStatusDocument.class
    );
    SearchPage<DeliveryStatusDocument> searchPage = SearchHitSupport.searchPageFor(searchHits, nativeQueryBuilder.getPageable());

    List<DeliveryStatusDetailResponse> deliveryStatuses =
        searchHits.stream().map(s -> deliveryStatusDetailMapperFromDocument.toDto(s.getContent())).toList();

    return DeliveryStatusPageResponse.builder()
        .totalElements(searchPage.getTotalElements())
        .totalPages(searchPage.getTotalPages())
        .page(request.getPage())
        .size(request.getSize())
        .deliveryStatuses(deliveryStatuses)
        .build();
  }
}
