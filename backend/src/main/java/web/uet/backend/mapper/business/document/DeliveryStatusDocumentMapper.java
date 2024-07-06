package web.uet.backend.mapper.business.document;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.document.business.DeliveryStatusDocument;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeliveryStatusDocumentMapper extends GenericMapper<DeliveryStatusDocument, DeliveryStatus> {
}
