package web.uet.backend.service.elasticsearch.sync.business;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import web.uet.backend.document.business.ShopDocument;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.event.ShopUpdateEvent;
import web.uet.backend.mapper.business.document.ShopDocumentMapper;
import web.uet.backend.repository.business.elasticsearch.ShopDocumentRepository;
import web.uet.backend.repository.business.jpa.ShopRepository;
import web.uet.backend.service.elasticsearch.sync.GenericSyncDataService;

@Service
public class ShopSyncDataService extends GenericSyncDataService<ShopDocument, Shop, Integer, ShopDocumentRepository, ShopRepository, ShopDocumentMapper> {
  public ShopSyncDataService(ShopDocumentRepository shopDocumentRepository, ShopRepository shopRepository, ShopDocumentMapper shopDocumentMapper) {
    super(shopDocumentRepository, shopRepository, shopDocumentMapper);
  }

  @EventListener
  @Async
  public void handleShopUpdateEvent(ShopUpdateEvent event) {
    Shop shop = (Shop) event.getSource();
    ShopDocument shopDocument = m.toDto(shop);
    dr.save(shopDocument);
  }
}
