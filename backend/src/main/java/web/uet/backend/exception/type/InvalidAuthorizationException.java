package web.uet.backend.exception.type;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InvalidAuthorizationException extends RuntimeException{
  public InvalidAuthorizationException(String message) {
    super(message);
  }
}
