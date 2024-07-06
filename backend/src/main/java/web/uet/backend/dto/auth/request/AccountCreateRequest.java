package web.uet.backend.dto.auth.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import web.uet.backend.entity.enums.Role;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountCreateRequest {

  @NotBlank
  @Size(min = 6, max = 255)
  private String username;

  @NotBlank
  @Size(min = 6, max = 255)
  private String password;

  @NotBlank
  @Size(min = 6, max = 255)
  private String name;

  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String phone;

  @NotBlank
  private String address;

  @NotNull
  private Role role;

  @NotBlank
  private String cccd;

  @NotNull
  @Min(1)
  private Integer workAt;
}
