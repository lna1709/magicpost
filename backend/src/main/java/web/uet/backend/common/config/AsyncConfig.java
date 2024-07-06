package web.uet.backend.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig {
  @Bean(name = "asyncExecutor")
  public Executor asyncExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(10); // Số lượng core threads
    executor.setMaxPoolSize(10); // Số lượng tối đa threads
    executor.setQueueCapacity(1000); // Độ dài hàng đợi
    executor.setThreadNamePrefix("Async-Thread-");
    executor.initialize();
    return executor;
  }
}
