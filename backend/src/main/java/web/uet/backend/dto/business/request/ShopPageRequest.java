package web.uet.backend.dto.business.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.dto.enums.DirectionSort;
import web.uet.backend.dto.enums.ShopSort;
import web.uet.backend.entity.enums.ShopType;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShopPageRequest {

  @NotNull
  @Min(0)
  @Max(100)
  private Integer page = 0;

  @NotNull
  @Min(1)
  @Max(50)
  private Integer size = 10;

  private ShopSort sort;

  private DirectionSort direction = DirectionSort.ASC;

  private ShopType type;

  @Min(1)
  private Integer communeId;

  @Min(1)
  private Integer districtId;

  @Min(1)
  private Integer provinceId;
}
