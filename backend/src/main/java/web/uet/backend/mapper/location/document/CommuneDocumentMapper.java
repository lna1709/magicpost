package web.uet.backend.mapper.location.document;

import org.mapstruct.Mapper;
import web.uet.backend.document.location.CommuneDocument;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface CommuneDocumentMapper extends GenericMapper<CommuneDocument, Commune> {
}
