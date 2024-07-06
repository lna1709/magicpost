package web.uet.backend.event;

import org.springframework.context.ApplicationEvent;
import web.uet.backend.entity.business.Shop;

public class ShopUpdateEvent extends ApplicationEvent {
  public ShopUpdateEvent(Shop source) {
    super(source);
  }
}
