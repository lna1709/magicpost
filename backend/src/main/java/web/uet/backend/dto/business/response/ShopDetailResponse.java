package web.uet.backend.dto.business.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.entity.enums.ShopType;
import web.uet.backend.dto.location.response.CommuneGeneralResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShopDetailResponse {
  private Integer shopId;

  private CommuneGeneralResponse commune;

  private ShopType type;

  private Integer employeeNumber;

  private Integer comingDeliveryNumber;

  private Integer currentDeliveryNumber;

  private Integer goneDeliveryNumber;
}
