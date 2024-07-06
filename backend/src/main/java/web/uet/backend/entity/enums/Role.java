package web.uet.backend.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Role {
    EMPLOYEE("EMPLOYEE"),
    POST_HEAD("POST_HEAD"),
    WAREHOUSE_HEAD("WAREHOUSE_HEAD"),
    CEO("CEO");

    public final String value;
}
