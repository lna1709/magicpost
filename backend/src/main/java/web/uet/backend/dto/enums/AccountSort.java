package web.uet.backend.dto.enums;

import lombok.Getter;

@Getter
public enum AccountSort {
  USERNAME("username"),
  NAME("name"),
  EMAIL("email"),
  PHONE("phone"),
  ADDRESS("address"),
  CREATED_AT("createdAt");

  private final String value;

  AccountSort(String value) {
    this.value = value;
  }

}
