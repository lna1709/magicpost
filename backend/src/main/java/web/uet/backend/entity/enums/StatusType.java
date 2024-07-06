package web.uet.backend.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum StatusType {
    RECEIVED_FROM_CUSTOMER,
    SENT_TO_CUSTOMER_FAIL,
    SENT_TO_CUSTOMER_SUCCESS,
    SHIPPING_TO_CUSTOMER,

    RECEIVED_FROM_SHOP,
    COMING_TO_SHOP,
    GONE_FROM_SHOP
}
