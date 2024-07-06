package web.uet.backend.controller.auth;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.auth.request.AccountCreateRequest;
import web.uet.backend.dto.auth.request.AccountPatchRequest;
import web.uet.backend.dto.auth.request.TokenCreateRequest;
import web.uet.backend.dto.auth.response.AccountGeneralResponse;
import web.uet.backend.dto.auth.request.AccountPageRequest;
import web.uet.backend.dto.auth.response.AccountPageResponse;
import web.uet.backend.dto.auth.response.JwtAuthenticationResponse;
import web.uet.backend.service.auth.AccountService;
import web.uet.backend.service.auth.AuthenticationService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/accounts", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class AccountController {

  private final AuthenticationService authenticationService;
  private final AccountService accountService;

  @PostMapping("/token")
  public ResponseEntity<JwtAuthenticationResponse> getByTokenCreateRequest(@RequestBody TokenCreateRequest request) {
    return ResponseEntity.ok(authenticationService.getByTokenCreateRequest(request));
  }

  @PostMapping("")
  public ResponseEntity<AccountGeneralResponse> createAccount(
      @RequestBody AccountCreateRequest request
  ) {
    AccountGeneralResponse response = authenticationService.createAccount(request);
    return ResponseEntity.created(null).body(response);
  }

  @GetMapping("/profile")
  public ResponseEntity<AccountGeneralResponse> getByCurrentAccount() {
    return ResponseEntity.ok(accountService.getCurrentAccountResponse());
  }

  @GetMapping("")
  public ResponseEntity<AccountPageResponse> getByAccountPageRequest(
      @Valid @ModelAttribute AccountPageRequest request
  ) {
    AccountPageResponse response = accountService.getAll(request);
    return ResponseEntity.ok(response);
  }

  @PatchMapping("/profile")
  public ResponseEntity<AccountGeneralResponse> patchAccountBy(
      @RequestBody AccountPatchRequest request
  ) {
    AccountGeneralResponse response = accountService.patchAccountBy(request);
    return ResponseEntity.ok(response);
  }

}
