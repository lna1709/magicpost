package web.uet.backend.controller.location;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.uet.backend.dto.location.response.ProvinceGeneralResponseList;
import web.uet.backend.service.location.ProvinceService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/states", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class StateController {

  private final ProvinceService provinceService;

  @GetMapping("/{stateId}/provinces")
  public ResponseEntity<ProvinceGeneralResponseList> getProvincesByStateId(@PathVariable Integer stateId) {
    return ResponseEntity.ok(provinceService.getByStateId(stateId));
  }

}
