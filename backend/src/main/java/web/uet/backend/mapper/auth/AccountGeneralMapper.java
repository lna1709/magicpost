package web.uet.backend.mapper.auth;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.dto.auth.response.AccountGeneralResponse;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AccountGeneralMapper extends GenericMapper<AccountGeneralResponse, Account> {
}
