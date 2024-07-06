package web.uet.backend.repository.business.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.business.DeliveryStatusDocument;

@Repository
public interface DeliveryStatusDocumentRepository extends ElasticsearchRepository<DeliveryStatusDocument, Integer> {
}
