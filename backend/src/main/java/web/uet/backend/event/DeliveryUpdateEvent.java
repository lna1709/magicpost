package web.uet.backend.event;

import org.springframework.context.ApplicationEvent;
import web.uet.backend.entity.business.Delivery;

public class DeliveryUpdateEvent extends ApplicationEvent {
  public DeliveryUpdateEvent(Delivery source) {
    super(source);
  }
}
