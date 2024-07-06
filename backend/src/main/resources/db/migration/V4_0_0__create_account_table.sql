CREATE TYPE user_role AS ENUM ('EMPLOYEE', 'POST_HEAD', 'WAREHOUSE_HEAD', 'CEO');

CREATE TABLE account (
    account_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    cccd VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    work_at INT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT account_pk PRIMARY KEY (account_id),
    CONSTRAINT account_shop_fk FOREIGN KEY (work_at) REFERENCES shop (shop_id)
);