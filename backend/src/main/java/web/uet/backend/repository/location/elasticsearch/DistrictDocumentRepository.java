package web.uet.backend.repository.location.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.location.DistrictDocument;
import web.uet.backend.document.location.ProvinceDocument;

import java.util.List;

@Repository
public interface DistrictDocumentRepository  extends ElasticsearchRepository<DistrictDocument, Integer> {

}
