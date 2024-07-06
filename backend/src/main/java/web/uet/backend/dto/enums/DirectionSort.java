package web.uet.backend.dto.enums;

import org.springframework.data.domain.Sort;

public enum DirectionSort {
  ASC("asc"),
  DESC("desc");

  private final String value;

  DirectionSort(String value) {
    this.value = value;
  }

  public Sort.Direction getValue() {
    return Sort.Direction.fromString(this.value);
  }
}
