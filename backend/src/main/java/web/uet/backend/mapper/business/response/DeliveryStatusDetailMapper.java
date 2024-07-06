package web.uet.backend.mapper.business.response;


import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusDetailResponse;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeliveryStatusDetailMapper extends GenericMapper<DeliveryStatusDetailResponse, DeliveryStatus> {
}
