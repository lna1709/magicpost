package web.uet.backend.dto.business.response.delivery;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.entity.enums.StatusType;
import web.uet.backend.dto.business.response.ShopDetailResponse;

import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryStatusDetailResponse {

  private Integer deliveryStatusId;

  private DeliveryGeneralResponse delivery;

  private StatusType statusType;

  @JsonProperty("shop")
  private ShopDetailResponse currentShop;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date createdAt;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date updatedAt;
}
