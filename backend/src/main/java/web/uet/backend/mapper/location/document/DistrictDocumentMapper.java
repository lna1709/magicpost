package web.uet.backend.mapper.location.document;

import org.mapstruct.Mapper;
import web.uet.backend.document.location.DistrictDocument;
import web.uet.backend.entity.location.District;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface DistrictDocumentMapper extends GenericMapper<DistrictDocument, District> {
}
