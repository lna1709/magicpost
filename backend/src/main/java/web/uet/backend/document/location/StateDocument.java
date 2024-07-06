package web.uet.backend.document.location;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "state")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StateDocument {

  @Id
  private Integer stateId;

  @Field(type = FieldType.Text, fielddata = true)
  private String name;
}
