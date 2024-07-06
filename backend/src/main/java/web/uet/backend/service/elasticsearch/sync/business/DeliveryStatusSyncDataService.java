package web.uet.backend.service.elasticsearch.sync.business;

import jakarta.transaction.Transactional;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import web.uet.backend.document.business.DeliveryStatusDocument;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.event.DeliveryStatusCreateEvent;
import web.uet.backend.mapper.business.document.DeliveryStatusDocumentMapper;
import web.uet.backend.repository.business.elasticsearch.DeliveryStatusDocumentRepository;
import web.uet.backend.repository.business.jpa.DeliveryStatusRepository;
import web.uet.backend.service.elasticsearch.sync.GenericSyncDataService;

@Service
public class DeliveryStatusSyncDataService extends GenericSyncDataService<
    DeliveryStatusDocument, DeliveryStatus, Integer,
    DeliveryStatusDocumentRepository, DeliveryStatusRepository, DeliveryStatusDocumentMapper> {
  public DeliveryStatusSyncDataService(DeliveryStatusDocumentRepository deliveryStatusDocumentRepository,
                                       DeliveryStatusRepository deliveryStatusRepository,
                                       DeliveryStatusDocumentMapper deliveryStatusDocumentMapper) {
    super(deliveryStatusDocumentRepository, deliveryStatusRepository, deliveryStatusDocumentMapper);
  }

  @EventListener
  @Transactional
  public void handleDeliveryStatusCreateEvent(DeliveryStatusCreateEvent event) {
    DeliveryStatus deliveryStatus = (DeliveryStatus) event.getSource();
    DeliveryStatusDocument deliveryStatusDocument = m.toDto(deliveryStatus);
    dr.save(deliveryStatusDocument);
  }
}
