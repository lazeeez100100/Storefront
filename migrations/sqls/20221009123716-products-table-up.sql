CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE  products(
    product_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    price numeric(15,6) 
);