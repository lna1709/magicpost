CREATE TYPE shop_type AS ENUM ('WAREHOUSE', 'POST');

CREATE TABLE state (
    state_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,

    CONSTRAINT state_pk PRIMARY KEY (state_id)
);

CREATE TABLE province (
    province_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    state_id INT NOT NULL,

    CONSTRAINT province_pk PRIMARY KEY (province_id),
    CONSTRAINT province_state_fk FOREIGN KEY (state_id) REFERENCES state (state_id)
);

CREATE TABLE district (
    district_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    province_id INT NOT NULL,

    CONSTRAINT district_pk PRIMARY KEY (district_id),
    CONSTRAINT district_province_fk FOREIGN KEY (province_id) REFERENCES province (province_id)
);

CREATE TABLE commune (
    commune_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    district_id INT NOT NULL,

    CONSTRAINT commune_pk PRIMARY KEY (commune_id),
    CONSTRAINT commune_district_fk FOREIGN KEY (district_id) REFERENCES district (district_id)
);

CREATE TABLE shop (
    shop_id SERIAL NOT NULL,
    type shop_type NOT NULL,
    commune_id INT NOT NULL,
    employee_number INT NOT NULL DEFAULT 0,
    coming_delivery_number INT NOT NULL DEFAULT 0,
    current_delivery_number INT NOT NULL DEFAULT 0,
    gone_delivery_number INT NOT NULL DEFAULT 0,

    CONSTRAINT shop_pk PRIMARY KEY (shop_id),
    CONSTRAINT shop_commune_fk FOREIGN KEY (commune_id) REFERENCES commune (commune_id)
);