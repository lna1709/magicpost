package web.uet.backend.dto.enums;

public enum DeliverySort {
    CREATED_AT("createdAt"),
    UPDATED_AT("updatedAt"),
    FROM_ADDRESS("fromAddress"),
    TO_ADDRESS("toAddress"),
    FROM_PHONE("fromPhone"),
    TO_PHONE("toPhone"),
    FROM_NAME("fromName"),
    TO_NAME("toName"),
    NAME("name"),
    WEIGHT("weight"),
    PRICE("price");

    private final String value;

    DeliverySort(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
