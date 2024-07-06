package web.uet.backend.repository.location.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.location.StateDocument;

@Repository
public interface StateDocumentRepository extends ElasticsearchRepository<StateDocument, Integer> {
}
