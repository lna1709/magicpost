package web.uet.backend.repository.location.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.location.CommuneDocument;
import web.uet.backend.document.location.DistrictDocument;
import web.uet.backend.entity.location.District;

import java.util.List;

@Repository
public interface CommuneDocumentRepository extends ElasticsearchRepository<CommuneDocument, Integer> {


}
