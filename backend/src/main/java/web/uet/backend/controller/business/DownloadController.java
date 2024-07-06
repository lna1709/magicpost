package web.uet.backend.controller.business;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.uet.backend.common.annotation.ValidateDeliveryPdfName;
import web.uet.backend.service.PdfService;

import java.io.IOException;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/download", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class DownloadController {

  private final PdfService pdfService;

  @GetMapping("/deliveries/{deliveryFileName}")
  public ResponseEntity<?> downloadDeliveryFile(
      @PathVariable @ValidateDeliveryPdfName String deliveryFileName
  ) throws IOException {
    byte[] pdfContent = pdfService.getDeliveryPdfByteBy(deliveryFileName);

    // Tạo một đối tượng ByteArrayResource từ nội dung của file
    ByteArrayResource resource = new ByteArrayResource(pdfContent);

    // Xác định loại nội dung của file
    MediaType mediaType = MediaType.APPLICATION_PDF;

    // Tạo HttpHeaders để cấu hình các thông số phản hồi
    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=file.pdf");
    headers.add(HttpHeaders.CONTENT_TYPE, mediaType.toString());

    // Trả về ResponseEntity với nội dung của file và các thông số phản hồi
    return ResponseEntity.ok()
        .headers(headers)
        .contentLength(pdfContent.length)
        .contentType(mediaType)
        .body(resource);
  }

}
