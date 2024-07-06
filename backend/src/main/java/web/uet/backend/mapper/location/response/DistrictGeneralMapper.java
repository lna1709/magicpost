package web.uet.backend.mapper.location.response;

import org.mapstruct.Mapper;
import web.uet.backend.dto.location.response.DistrictGeneralResponse;
import web.uet.backend.entity.location.District;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface DistrictGeneralMapper extends GenericMapper<DistrictGeneralResponse, District> {
}
