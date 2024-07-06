package web.uet.backend.mapper.location.response;

import org.mapstruct.Mapper;
import web.uet.backend.document.location.DistrictDocument;
import web.uet.backend.dto.location.response.DistrictGeneralResponse;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface DistrictGeneralFromDocumentMapper extends GenericMapper<DistrictGeneralResponse, DistrictDocument> {
}
