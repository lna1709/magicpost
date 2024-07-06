package web.uet.backend.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ProductType {
    DOCUMENT("DOCUMENT"),
    PRODUCT("PRODUCT");

    private final String value;
}
