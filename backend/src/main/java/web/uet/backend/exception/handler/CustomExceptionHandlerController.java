package web.uet.backend.exception.handler;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import web.uet.backend.exception.response.ErrorResponse;
import web.uet.backend.exception.type.InvalidAuthorizationException;
import web.uet.backend.exception.type.InvalidException;
import web.uet.backend.exception.type.NotFoundException;

@RestControllerAdvice
@Slf4j
public class CustomExceptionHandlerController {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvalidException.class)
  public ResponseEntity<ErrorResponse> handleInvalidException(InvalidException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ExpiredJwtException.class)
  public ResponseEntity<ErrorResponse> handleExpiredJwtException(ExpiredJwtException ex) {
    log.error("Expired JWT Exception: {}", ex.getMessage());
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(InvalidAuthorizationException.class)
  public ResponseEntity<ErrorResponse> handleInvalidAuthorizationException(InvalidAuthorizationException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler({AccessDeniedException.class})
  public ResponseEntity<ErrorResponse> handleAccessDeniedException(Exception ex, WebRequest request) {
    log.error("Access Denied Exception: {}", ex.getMessage());
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.BAD_REQUEST);
  }

//  @ExceptionHandler(Exception.class)
//  public ResponseEntity<ErrorResponse> handleException(Exception ex) {
//    return new ResponseEntity<>(ErrorResponse.builder()
//        .error("An unexpected error occurred: " + ex.getMessage())
//        .build(),
//        HttpStatus.INTERNAL_SERVER_ERROR);
//  }
}
