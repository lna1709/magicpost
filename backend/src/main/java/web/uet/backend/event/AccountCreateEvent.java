package web.uet.backend.event;

import org.springframework.context.ApplicationEvent;
import web.uet.backend.entity.auth.Account;

public class AccountCreateEvent extends ApplicationEvent {
  public AccountCreateEvent(Account source) {
    super(source);
  }
}
