package web.uet.backend.controller.business;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.business.request.ShopPageRequest;
import web.uet.backend.dto.business.response.ShopDetailResponse;
import web.uet.backend.dto.business.response.ShopPageResponse;
import web.uet.backend.service.business.ShopService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/shops", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class ShopController {

  private final ShopService shopService;

  @GetMapping("/{shopId}")
  public ResponseEntity<ShopDetailResponse> getShopGeneralResponseBy(@PathVariable Integer shopId) {
    return ResponseEntity.ok(shopService.getShopGeneralResponseBy(shopId));
  }

  @GetMapping("")
  public ResponseEntity<ShopPageResponse> getShopGeneralResponseBy(
      @Valid @ModelAttribute ShopPageRequest request
      ) {
    return ResponseEntity.ok(shopService.getShopPageResponseBy(request));
  }
}
