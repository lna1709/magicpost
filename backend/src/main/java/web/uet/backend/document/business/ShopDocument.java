package web.uet.backend.document.business;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import web.uet.backend.entity.enums.ShopType;
import web.uet.backend.document.location.CommuneDocument;

@Document(indexName = "shop")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShopDocument {

  @Id
  private Integer shopId;

  @Field(type = FieldType.Keyword)
  private ShopType type;

  @Field(type = FieldType.Nested, includeInParent = true)
  private CommuneDocument commune;

  private Integer employeeNumber;

  private Integer comingDeliveryNumber;

  private Integer currentDeliveryNumber;

  private Integer goneDeliveryNumber;
}
