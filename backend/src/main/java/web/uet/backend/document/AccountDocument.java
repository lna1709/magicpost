package web.uet.backend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.document.business.ShopDocument;

import java.util.Date;
import java.util.UUID;

@Document(indexName = "account")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDocument {

  @Id
  private UUID accountId;

  @Field(type = FieldType.Text, fielddata = true)
  private String username;

  @Field(type = FieldType.Text, fielddata = true)
  private String name;

  @Field(type = FieldType.Text, fielddata = true)
  private String phone;

  @Field(type = FieldType.Text, fielddata = true)
  private String email;

  @Field(type = FieldType.Text, fielddata = true)
  private String address;

  @Field(type = FieldType.Keyword)
  private Role role;

  @Field(type = FieldType.Text, fielddata = true)
  private String cccd;

//  @Field(fielddata = true)
  private Date createdAt;

//  @Field(fielddata = true)
  private Date updatedAt;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument workAt;
}
