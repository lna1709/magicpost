package web.uet.backend.dto.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ShopSort {
  EMPLOYEE_NUMBER("employeeNumber"),
  COMING_DELIVERY_NUMBER("comingDeliveryNumber"),
  CURRENT_DELIVERY_NUMBER("currentDeliveryNumber"),
  GONE_DELIVERY_NUMBER("goneDeliveryNumber");

  private final String field;
}
