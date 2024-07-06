package web.uet.backend.repository.auth.elasticsearch;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.AccountDocument;

import java.util.UUID;

@Repository
public interface AccountDocumentRepository extends ElasticsearchRepository<AccountDocument, UUID> {


}
