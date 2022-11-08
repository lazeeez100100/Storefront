CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE  orders(
    order_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid CONSTRAINT fk_user REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    status INTEGER NOT NULL
    );
