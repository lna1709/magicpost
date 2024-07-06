package web.uet.backend.mapper.business.response;

import org.mapstruct.Mapper;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusGeneralResponse;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface DeliveryStatusGeneralMapper extends GenericMapper<DeliveryStatusGeneralResponse, DeliveryStatus> {
}
