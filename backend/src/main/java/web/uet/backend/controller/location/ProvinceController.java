package web.uet.backend.controller.location;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.location.response.DistrictGeneralResponseList;
import web.uet.backend.dto.location.response.ProvinceGeneralResponseList;
import web.uet.backend.service.location.DistrictService;
import web.uet.backend.service.location.ProvinceService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/provinces", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class ProvinceController {

  private final ProvinceService provinceService;
  private final DistrictService districtService;

  @GetMapping("")
  public ResponseEntity<ProvinceGeneralResponseList> getAllProvinces() {
    return ResponseEntity.ok(provinceService.getAll());
  }

  @GetMapping("/auto-search")
  public ResponseEntity<ProvinceGeneralResponseList> getProvincesByAutoSearch(
      @RequestParam(required = true) String keyword
  ) {
    return ResponseEntity.ok(provinceService.getAutoByKeyword(keyword));
  }

  @GetMapping("/{provinceId}/districts")
  public ResponseEntity<DistrictGeneralResponseList> getByProvinceId(
      @PathVariable Integer provinceId
  ) {
    return ResponseEntity.ok(districtService.getByProvinceId(provinceId));
  }

  @GetMapping("/{provinceId}/districts/auto-search")
  public ResponseEntity<DistrictGeneralResponseList> getByKeywordAndProvinceId(
      @RequestParam String keyword,
      @PathVariable Integer provinceId
  ) {
    return ResponseEntity.ok(districtService.getByKeyword(keyword, provinceId));
  }
}
