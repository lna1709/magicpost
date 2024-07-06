package web.uet.backend.mapper.auth;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.document.AccountDocument;
import web.uet.backend.dto.auth.response.AccountGeneralResponse;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AccountGeneralFromDocumentMapper extends GenericMapper<AccountGeneralResponse, AccountDocument> {
}
