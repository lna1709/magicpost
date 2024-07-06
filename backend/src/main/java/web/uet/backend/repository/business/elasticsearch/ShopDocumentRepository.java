package web.uet.backend.repository.business.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.business.ShopDocument;

@Repository
public interface ShopDocumentRepository extends ElasticsearchRepository<ShopDocument, Integer> {
}
