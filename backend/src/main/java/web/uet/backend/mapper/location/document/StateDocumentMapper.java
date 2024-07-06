package web.uet.backend.mapper.location.document;

import org.mapstruct.Mapper;
import web.uet.backend.document.location.StateDocument;
import web.uet.backend.entity.location.State;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface StateDocumentMapper extends GenericMapper<StateDocument, State> {
}
