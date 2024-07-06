package web.uet.backend.service.auth;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchPage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import web.uet.backend.common.config.auth.SecurityConfig;
import web.uet.backend.document.AccountDocument;
import web.uet.backend.dto.auth.request.AccountPageRequest;
import web.uet.backend.dto.auth.request.AccountPatchRequest;
import web.uet.backend.dto.auth.response.AccountGeneralResponse;
import web.uet.backend.dto.auth.response.AccountPageResponse;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.auth.UserAuthentication;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.exception.type.InvalidAuthorizationException;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.auth.AccountGeneralFromDocumentMapper;
import web.uet.backend.mapper.auth.AccountGeneralMapper;
import web.uet.backend.repository.auth.elasticsearch.AccountDocumentRepository;
import web.uet.backend.repository.auth.entity.AccountRepository;

import java.util.List;
import java.util.UUID;

import static web.uet.backend.service.auth.AuthenticationService.validateRole;
import static web.uet.backend.service.elasticsearch.search.ElasticsearchQueryUtils.*;

@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService {

  private final AccountRepository accountRepository;
  private final AccountGeneralMapper accountGeneralMapper;
  private final AccountGeneralFromDocumentMapper accountGeneralFromDocumentMapper;

  private final ElasticsearchOperations elasticsearchOperations;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Account account = accountRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(username));
    return new UserAuthentication(account);
  }

  public UserDetails loadUserByAccountId(UUID accountId) {
    Account account = accountRepository.findById(accountId)
        .orElseThrow(() -> new RuntimeException("Account not found"));
    return new UserAuthentication(account);
  }

  public AccountGeneralResponse getCurrentAccountResponse() {
    Account currentAccount = AuthenticationService.getCurrentAccount();
    return accountGeneralMapper.toDto(currentAccount);
  }

  public AccountPageResponse getAll(AccountPageRequest request) {
    validateAccountPageRequest(request);
    Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

    NativeQueryBuilder nativeQueryBuilder = NativeQuery.builder()
        .withQuery(getBy(request))
        .withPageable(pageable);

    if (request.getSortBy() != null) {
      Sort sort = Sort.by(request.getDirection().getValue(), request.getSortBy().getValue());
      nativeQueryBuilder.withSort(sort);
    }

    SearchHits<AccountDocument> searchHits = elasticsearchOperations.search(nativeQueryBuilder.build(),
        AccountDocument.class);
    SearchPage<AccountDocument> searchPage = SearchHitSupport.searchPageFor(searchHits,
        nativeQueryBuilder.getPageable());

    List<AccountGeneralResponse> accounts =
        searchHits.stream().map(s -> accountGeneralFromDocumentMapper.toDto(s.getContent())).toList();

    return AccountPageResponse.builder()
        .totalElements(searchPage.getTotalElements())
        .totalPages(searchPage.getTotalPages())
        .page(request.getPage())
        .size(request.getSize())
        .accounts(accounts)
        .build();
  }

  @Transactional
  public AccountGeneralResponse patchAccountBy(AccountPatchRequest request) {
    Account currentAccount = AuthenticationService.getCurrentAccount();
    Account account = accountRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new NotFoundException("Account not found"));

    if (!validateRole(account.getRole(), currentAccount.getRole())) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    if (request.getPassword() != null) {
      account.setPassword(SecurityConfig.passwordEncoder().encode(request.getPassword()));
    }
    if (request.getName() != null) {
      account.setName(request.getName());
    }
    if (request.getEmail() != null) {
      account.setEmail(request.getEmail());
    }
    if (request.getPhone() != null) {
      account.setPhone(request.getPhone());
    }
    if (request.getAddress() != null) {
      account.setAddress(request.getAddress());
    }
    if (request.getCccd() != null) {
      account.setCccd(request.getCccd());
    }
    account = accountRepository.save(account);
    return accountGeneralMapper.toDto(account);
  }


  private Query getBy(AccountPageRequest request) {
    BoolQuery.Builder boolQueryBuilder = QueryBuilders.bool();

    if (request.getUsernameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "username", request.getUsernameContains());
    }

    if (request.getNameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "name", request.getNameContains());
    }

    if (request.getPhoneContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "phone", request.getPhoneContains());
    }

    if (request.getEmailContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "email", request.getEmailContains());
    }

    if (request.getAddressContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "address", request.getAddressContains());
    }

    if (request.getRoles() != null) {
      List<String> roles = request.getRoles().stream().map(Enum::name).toList();
      boolQueryBuilder = inQuery(boolQueryBuilder, "role", roles);
    }

    if (request.getWorkAtId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "workAt.shopId", request.getWorkAtId());
    }

    return new Query(boolQueryBuilder.build());
  }

  private void validateAccountPageRequest(AccountPageRequest request) {
    Account currentAccount = AuthenticationService.getCurrentAccount();
    if (currentAccount.getRole() == Role.EMPLOYEE) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    validateAccessShopPermission(currentAccount, request.getWorkAtId());

    request.getRoles().stream()
        .filter(role -> !validateRole(role, currentAccount.getRole()))
        .findAny()
        .ifPresent(role -> {
          throw new InvalidAuthorizationException("Permission denied");
        });
  }

  public static void validateAccessShopPermission(Account currentAccount, Integer shopId) {
    if (currentAccount.getRole() == Role.CEO) {
      return;
    }

    if (shopId == null) {
      throw new InvalidAuthorizationException("You must specify workAtId");
    }

    if (!currentAccount.getWorkAt().getShopId().equals(shopId)) {
      throw new InvalidAuthorizationException("You can only get accounts in your shop");
    }
  }
}
