CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE  orderProduct(
    order_product_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id uuid CONSTRAINT fk_order REFERENCES orders(order_id) ON DELETE CASCADE ,
    product_id uuid CONSTRAINT fk_product REFERENCES products(product_id) ON DELETE CASCADE ,
    quantity INTEGER NOT NULL
    );
