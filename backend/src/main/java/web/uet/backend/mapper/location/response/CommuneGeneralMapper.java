package web.uet.backend.mapper.location.response;

import org.mapstruct.Mapper;
import web.uet.backend.dto.location.response.CommuneGeneralResponse;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface CommuneGeneralMapper extends GenericMapper<CommuneGeneralResponse, Commune> {
}
