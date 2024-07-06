package web.uet.backend.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.annotations.Setting;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

@Configuration
@RequiredArgsConstructor
@Setting(settingPath = "esconfig/elastic-analyzer.json")
public class ElasticsearchConfig extends ElasticsearchConfiguration {
  @Override
  public ClientConfiguration clientConfiguration() {
    return ClientConfiguration.builder()
                .connectedTo("localhost:9200")
                .build();
  }
}
