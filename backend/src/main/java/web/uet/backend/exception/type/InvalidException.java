package web.uet.backend.exception.type;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InvalidException extends RuntimeException{
  public InvalidException(String message) {
    super(message);
  }
}
