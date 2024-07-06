package web.uet.backend.mapper.business.document;

import jakarta.validation.constraints.Max;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.document.business.DeliveryDocument;
import web.uet.backend.dto.business.response.delivery.DeliveryGeneralResponse;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeliveryGeneralMapperFromDocument extends GenericMapper<DeliveryGeneralResponse, DeliveryDocument> {
}
