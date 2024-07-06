package web.uet.backend.controller.business;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.business.request.DeliveryPageRequest;
import web.uet.backend.dto.business.response.delivery.DeliveryPageResponse;
import web.uet.backend.dto.enums.DirectionSort;
import web.uet.backend.dto.business.request.DeliveryCreateRequest;
import web.uet.backend.dto.business.request.DeliveryStatusCreateRequest;
import web.uet.backend.dto.business.response.delivery.DeliveryGeneralResponse;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusDetailListResponse;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusGeneralResponse;
import web.uet.backend.service.business.DeliveryService;
import web.uet.backend.service.business.DeliveryStatusService;

import java.util.UUID;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/deliveries", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class DeliveryController {

  private final DeliveryService deliveryService;
  private final DeliveryStatusService deliveryStatusService;

  @PostMapping("")
  public ResponseEntity<DeliveryGeneralResponse> createDelivery(
      @RequestBody DeliveryCreateRequest request
  ) {
    return ResponseEntity.created(null).body(deliveryService.createDeliveryByCreateRequest(request));
  }

  @PostMapping("/{deliveryId}/deliveryStatuses")
  public ResponseEntity<DeliveryStatusGeneralResponse> createDeliveryStatus(
      @RequestBody DeliveryStatusCreateRequest request,
      @RequestParam UUID deliveryId
  ) {
    return ResponseEntity.created(null).body(deliveryStatusService.createDeliveryStatusByDeliveryId(deliveryId, request));
  }

  @GetMapping("/{deliveryId}/deliveryStatuses")
  public ResponseEntity<DeliveryStatusDetailListResponse> getByDelivery(
      @PathVariable UUID deliveryId,
      @RequestParam DirectionSort directionSort
      ) {
    return ResponseEntity.ok(deliveryStatusService.getDeliveryStatusesByDeliveryId(deliveryId, directionSort));
  }

  @GetMapping("/{deliveryId}")
  public ResponseEntity<DeliveryGeneralResponse> getByDeliveryId(
      @PathVariable UUID deliveryId
  ) {
    return ResponseEntity.ok(deliveryService.getDeliveryByDeliveryId(deliveryId));
  }

  @GetMapping("")
  public ResponseEntity<DeliveryPageResponse> getByDeliveryPageBy(
      @Valid @ModelAttribute DeliveryPageRequest request
  ) {
    return ResponseEntity.ok(deliveryService.getDeliveriesPageBy(request));
  }

}
