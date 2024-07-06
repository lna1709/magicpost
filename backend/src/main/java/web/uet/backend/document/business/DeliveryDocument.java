package web.uet.backend.document.business;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import web.uet.backend.entity.enums.ProductType;
import web.uet.backend.entity.enums.StatusType;
import web.uet.backend.document.location.CommuneDocument;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Document(indexName = "delivery")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDocument {

  @Id
  private UUID deliveryId;

  @Field(type = FieldType.Nested, includeInParent = true)
  private CommuneDocument fromCommune;

  @Field(type = FieldType.Nested, includeInParent = true)
  private CommuneDocument toCommune;

  @Field(type = FieldType.Text, fielddata = true)
  private String fromAddress;

  @Field(type = FieldType.Text, fielddata = true)
  private String toAddress;

  @Field(type = FieldType.Text, fielddata = true)
  private String fromPhone;

  @Field(type = FieldType.Text, fielddata = true)
  private String toPhone;

  @Field(type = FieldType.Text, fielddata = true)
  private String fromName;

  @Field(type = FieldType.Text, fielddata = true)
  private String toName;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument fromShop;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument toShop;

  @Field(type = FieldType.Text, fielddata = true)
  private ProductType productType;

  @Field(type = FieldType.Text, fielddata = true)
  private String name;

  private String fromDescription;

  private String toDescription;

  private BigDecimal shippingFee;

  private BigDecimal weight;

  @Field(type = FieldType.Keyword)
  private StatusType currentStatus;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument currentShop;

  private Date createdAt;

  private Date updatedAt;
}
