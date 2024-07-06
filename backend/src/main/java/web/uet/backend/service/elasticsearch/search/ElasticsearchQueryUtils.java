package web.uet.backend.service.elasticsearch.search;

import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ElasticsearchQueryUtils {

  static public BoolQuery.Builder containsQuery(BoolQuery.Builder query, String field, String value) {
    String[] words = value.split("\\s+");
    for (String word : words) {
      query = query.must(
          new Query(
              new WildcardQuery.Builder()
                  .field(field)
                  .value("*" + word + "*")
                  .build()
          )
      );
    }
    return query;
  }

  static public BoolQuery.Builder matchQuery(BoolQuery.Builder query, String field, String value) {
    return query.must(
        new Query(
            new MatchQuery.Builder()
                .field(field)
                .query(value)
                .build()
        )
    );
  }

  static public BoolQuery.Builder matchQuery(BoolQuery.Builder query, String field, Integer value) {
    return query.must(
        new Query(
            new MatchQuery.Builder()
                .field(field)
                .query(value)
                .build()
        )
    );
  }

  static public BoolQuery.Builder inQuery(BoolQuery.Builder query, String field, List<String> values) {
    TermsQueryField termsQueryField = new TermsQueryField.Builder()
        .value(values.stream().map(FieldValue::of).collect(Collectors.toList()))
        .build();

    return query.must(
        new Query(
            new TermsQuery.Builder()
                .field(field)
                .terms(termsQueryField)
                .build()
        )
    );
  }
}
