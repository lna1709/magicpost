package web.uet.backend.repository.business.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import web.uet.backend.document.business.DeliveryDocument;

import java.util.UUID;

public interface DeliveryDocumentRepository extends ElasticsearchRepository<DeliveryDocument, UUID> {
}
