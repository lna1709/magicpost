package web.uet.backend.mapper.location.document;

import org.mapstruct.Mapper;
import web.uet.backend.document.location.ProvinceDocument;
import web.uet.backend.entity.location.Province;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface ProvinceDocumentMapper extends GenericMapper<ProvinceDocument, Province> {
}
