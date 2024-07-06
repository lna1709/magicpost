package web.uet.backend.dto.business.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.entity.enums.ProductType;

import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryCreateRequest {

  @Min(1)
  @NotNull
  private Integer fromCommuneId;

  @Min(1)
  @NotNull
  private Integer toCommuneId;

  @NotBlank
  private String fromAddress;

  @NotBlank
  private String toAddress;

  @NotBlank
  private String fromPhone;

  @NotBlank
  private String toPhone;

  @NotBlank
  private String fromName;

  @NotBlank
  private String toName;

  @Min(1)
  @NotNull
  private Integer fromShop;

  @Min(1)
  @NotNull
  private Integer toShop;

  @NotNull
  private ProductType productType;

  @NotBlank
  private String name;

  private String fromDescription;

  private String toDescription;

  @NotNull
  private BigDecimal shippingFee;

  @NotNull
  private BigDecimal weight;
}
