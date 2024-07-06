package web.uet.backend.mapper.auth;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.dto.auth.request.AccountCreateRequest;
import web.uet.backend.entity.auth.Account;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AccountCommandMapper {

  @Mapping(target = "password", ignore = true)
  @Mapping(target = "workAt", ignore = true)
  Account toEntity(AccountCreateRequest dto);

}
