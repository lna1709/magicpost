package web.uet.backend.exception.type;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotFoundException extends RuntimeException {
  public NotFoundException(String message) {
    super(message);
  }
}
