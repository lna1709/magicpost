package web.uet.backend.mapper.location.response;

import org.mapstruct.Mapper;
import web.uet.backend.document.location.ProvinceDocument;
import web.uet.backend.dto.location.response.ProvinceGeneralResponse;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface ProvinceGeneralFromDocumentMapper extends GenericMapper<ProvinceGeneralResponse, ProvinceDocument> {
}
