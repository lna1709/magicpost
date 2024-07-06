package web.uet.backend.event;

import org.springframework.context.ApplicationEvent;
import web.uet.backend.entity.business.DeliveryStatus;

public class DeliveryStatusCreateEvent extends ApplicationEvent {
  public DeliveryStatusCreateEvent(DeliveryStatus source) {
    super(source);
  }
}
