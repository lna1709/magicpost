package web.uet.backend.dto.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum DeliveryStatusSort {
    CREATED_AT("createdAt"),
    FROM_ADDRESS("delivery.fromAddress"),
    TO_ADDRESS("delivery.toAddress"),
    FROM_PHONE("delivery.fromPhone"),
    TO_PHONE("delivery.toPhone"),
    FROM_NAME("delivery.fromName"),
    TO_NAME("delivery.toName"),
    NAME("delivery.name"),
    WEIGHT("delivery.weight"),
    PRICE("delivery.price");

    private final String value;
}
