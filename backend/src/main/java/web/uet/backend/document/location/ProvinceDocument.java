package web.uet.backend.document.location;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "province")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProvinceDocument {

  @Id
  private Integer provinceId;

  @Field(type = FieldType.Text)
  private String name;

  @Field(type = FieldType.Nested)
  private StateDocument state;
}
