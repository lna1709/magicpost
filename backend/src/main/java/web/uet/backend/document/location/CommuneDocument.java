package web.uet.backend.document.location;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "commune")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommuneDocument {

  @Id
  private Integer communeId;

  @Field(type = FieldType.Text)
  private String name;

  @Field(type = FieldType.Nested)
  private DistrictDocument district;
}
