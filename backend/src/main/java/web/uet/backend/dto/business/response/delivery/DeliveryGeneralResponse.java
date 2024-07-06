package web.uet.backend.dto.business.response.delivery;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.entity.enums.ProductType;
import web.uet.backend.entity.enums.StatusType;
import web.uet.backend.dto.business.response.ShopDetailResponse;
import web.uet.backend.dto.location.response.CommuneGeneralResponse;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryGeneralResponse {

  private UUID deliveryId;

  private CommuneGeneralResponse fromCommune;

  private CommuneGeneralResponse toCommune;

  private String fromAddress;

  private String toAddress;

  private String fromPhone;

  private String toPhone;

  private String fromName;

  private String toName;

  private ShopDetailResponse fromShop;

  private ShopDetailResponse toShop;

  private ProductType productType;

  private String name;

  private String description;

  private BigDecimal shippingFee;

  private BigDecimal weight;

  private StatusType currentStatus;

  private ShopDetailResponse currentShop;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date createdAt;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date updatedAt;
}
