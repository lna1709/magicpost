package web.uet.backend.service.elasticsearch.sync.business;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import web.uet.backend.document.business.DeliveryDocument;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.event.DeliveryCreateEvent;
import web.uet.backend.event.DeliveryUpdateEvent;
import web.uet.backend.mapper.business.document.DeliveryDocumentMapper;
import web.uet.backend.repository.business.elasticsearch.DeliveryDocumentRepository;
import web.uet.backend.repository.business.jpa.DeliveryRepository;
import web.uet.backend.service.elasticsearch.sync.GenericSyncDataService;

import java.util.UUID;

@Service
public class DeliverySyncDataService extends GenericSyncDataService<DeliveryDocument, Delivery, UUID,
    DeliveryDocumentRepository, DeliveryRepository, DeliveryDocumentMapper> {
  public DeliverySyncDataService(DeliveryDocumentRepository deliveryDocumentRepository,
                                 DeliveryRepository deliveryRepository, DeliveryDocumentMapper deliveryDocumentMapper) {
    super(deliveryDocumentRepository, deliveryRepository, deliveryDocumentMapper);
  }

  @EventListener
  public void handleDeliveryCreateEvent(DeliveryCreateEvent event) {
    Delivery delivery = (Delivery) event.getSource();
    DeliveryDocument deliveryDocument = m.toDto(delivery);
    dr.save(deliveryDocument);
  }

  @EventListener
  public void handleDeliveryUpdateEvent(DeliveryUpdateEvent event) {
    Delivery delivery = (Delivery) event.getSource();
    DeliveryDocument deliveryDocument = m.toDto(delivery);
    dr.save(deliveryDocument);
  }
}
