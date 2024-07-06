package web.uet.backend.event;

import org.springframework.context.ApplicationEvent;
import web.uet.backend.entity.business.Delivery;

public class DeliveryCreateEvent extends ApplicationEvent {
   public DeliveryCreateEvent(Delivery source) {
    super(source);
  }
}
