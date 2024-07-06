package web.uet.backend.mapper.business.document;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.document.business.DeliveryDocument;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeliveryDocumentMapper extends GenericMapper<DeliveryDocument, Delivery> {
}
