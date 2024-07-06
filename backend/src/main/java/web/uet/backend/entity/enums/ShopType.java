package web.uet.backend.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ShopType {
    POST("POST"),
    WAREHOUSE("WAREHOUSE");

    private final String value;
}
