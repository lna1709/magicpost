package web.uet.backend.controller.location;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.location.response.CommuneGeneralResponseList;
import web.uet.backend.service.location.CommuneService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/districts", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class DistrictController {

  private final CommuneService communeService;

  @GetMapping("{districtId}/communes")
  public ResponseEntity<CommuneGeneralResponseList> getCommunesByDistrictId(
      @PathVariable Integer districtId
  ) {
    return ResponseEntity.ok(communeService.getByDistrictId(districtId));
  }

  @GetMapping("{districtId}/communes/auto-search")
  public ResponseEntity<CommuneGeneralResponseList> getCommunesByAutoSearch(
      @PathVariable Integer districtId,
      @RequestParam(required = true) String keyword
  ) {
    return ResponseEntity.ok(communeService.getByKeyword(keyword, districtId));
  }
}
