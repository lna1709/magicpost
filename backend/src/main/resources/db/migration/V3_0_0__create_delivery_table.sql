CREATE TYPE delivery_status_type AS ENUM (
    'RECEIVED_FROM_CUSTOMER',
    'SENT_TO_CUSTOMER_FAIL',
    'SENT_TO_CUSTOMER_SUCCESS',
    'SHIPPING_TO_CUSTOMER',

    'RECEIVED_FROM_SHOP',
    'COMING_TO_SHOP',
    'GONE_FROM_SHOP'
    );
CREATE TYPE product_type AS ENUM ('DOCUMENT', 'PRODUCT');

CREATE TABLE delivery (
    delivery_id UUID NOT NULL DEFAULT uuid_generate_v1(),

    from_commune_id INT NOT NULL,
    to_commune_id INT NOT NULL,
    from_address VARCHAR(255) NOT NULL,
    to_address VARCHAR(255) NOT NULL,
    from_phone VARCHAR(255) NOT NULL,
    to_phone VARCHAR(255) NOT NULL,
    from_name VARCHAR(255) NOT NULL,
    to_name VARCHAR(255) NOT NULL,
    from_shop_id INT NOT NULL,
    to_shop_id INT NOT NULL,

    product product_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    from_description VARCHAR(1000),
    to_description VARCHAR(1000),
    weight DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL,

    current_status delivery_status_type NOT NULL,
    current_shop_id INT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT delivery_pk PRIMARY KEY (delivery_id),
    CONSTRAINT delivery_from_commune_fk FOREIGN KEY (from_commune_id) REFERENCES commune (commune_id),
    CONSTRAINT delivery_to_commune_fk FOREIGN KEY (to_commune_id) REFERENCES commune (commune_id),
    CONSTRAINT delivery_from_shop_fk FOREIGN KEY (from_shop_id) REFERENCES shop (shop_id),
    CONSTRAINT delivery_to_shop_fk FOREIGN KEY (to_shop_id) REFERENCES shop (shop_id),
    CONSTRAINT delivery_current_shop_fk FOREIGN KEY (current_shop_id) REFERENCES shop (shop_id)
);

CREATE TABLE delivery_status (
    delivery_status_id SERIAL NOT NULL,
    delivery_id UUID NOT NULL,
    status delivery_status_type NOT NULL,
    current_shop_id INT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT delivery_statuses_pk PRIMARY KEY (delivery_status_id),
    CONSTRAINT delivery_statuses_delivery_fk FOREIGN KEY (delivery_id) REFERENCES delivery (delivery_id),
    CONSTRAINT delivery_statuses_shop_fk FOREIGN KEY (current_shop_id) REFERENCES shop (shop_id)
);