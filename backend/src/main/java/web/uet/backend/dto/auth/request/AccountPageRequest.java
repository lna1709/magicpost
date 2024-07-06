package web.uet.backend.dto.auth.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.domain.Sort;
import web.uet.backend.dto.enums.DirectionSort;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.dto.enums.AccountSort;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountPageRequest {
  @NotNull
  @Min(0)
  @Max(100)
  private Integer page = 0;

  @NotNull
  @Min(1)
  @Max(50)
  private Integer size = 10;

  private AccountSort sortBy;
  private DirectionSort direction = DirectionSort.ASC;
  private String nameContains;
  private String usernameContains;
  private String emailContains;
  private String phoneContains;
  private String addressContains;

  @Positive
  private Integer workAtId;

  @NotNull
  private List<Role> roles;
}
