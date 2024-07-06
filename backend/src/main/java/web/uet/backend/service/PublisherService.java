package web.uet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class PublisherService {

  public static ApplicationEventPublisher INSTANCE;

  @Autowired
  public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
    PublisherService.INSTANCE = applicationEventPublisher;
  }

}

