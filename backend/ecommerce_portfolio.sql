CREATE TABLE "user" (
  "userId" UUID PRIMARY KEY,
  "userName" varchar(60) UNIQUE NOT NULL,
  "firstName" varchar(60),
  "lastName" varchar(60),
  "email" varchar(60) UNIQUE,
  "password" char(60),
  "google" JSON,
  "facebook" JSON,
  "role" varchar(20),
  "created" timestamp NOT NULL DEFAULT NOW(),
  "modified" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "productCategory" (
  "productCategoryId" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" varchar(60) NOT NULL,
  "title" varchar(60) NOT NULL,
  "description" text NOT NULL,
  "images" JSON,
  "created" timestamp NOT NULL DEFAULT NOW(),
  "modified" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "product" (
  "productId" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" varchar(60) NOT NULL,
  "description" text NOT NULL,
  "images" JSON,
  "productCategoryId" int NOT NULL,
  "unitPrice" BIGINT NOT NULL,
  "inStock" boolean NOT NULL,
  "created" timestamp NOT NULL DEFAULT NOW(),
  "modified" timestamp NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_category"
    FOREIGN KEY("productCategoryId") 
	  REFERENCES "productCategory"("productCategoryId")
	  ON DELETE CASCADE
);

CREATE TABLE "order" (
  "orderId" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "userId" UUID NOT NULL,
  "total" BIGINT NOT NULL,
  "status" varchar(60) NOT NULL,
  "created" timestamp NOT NULL DEFAULT NOW(),
  "modified" timestamp NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_user"
    FOREIGN KEY("userId") 
	  REFERENCES "user"("userId")
	  ON DELETE CASCADE
);

CREATE TABLE "cart" (
  "cartId" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "userId" UUID NOT NULL,
  "created" timestamp NOT NULL DEFAULT NOW(),
  "modified" timestamp NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY("userId") 
	  REFERENCES "user"("userId")
	  ON DELETE CASCADE
);

CREATE TABLE "orderProduct" (
  "orderProductId" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "orderId" int NOT NULL,
  "productId" int NOT NULL,
  "quantity" int NOT NULL,
  "created" timestamp NOT NULL DEFAULT NOW(),
  "modified" timestamp NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_order
    FOREIGN KEY("orderId") 
	  REFERENCES "order"("orderId")
	  ON DELETE CASCADE,
  CONSTRAINT fk_product
    FOREIGN KEY("productId") 
	  REFERENCES "product"("productId")
	  ON DELETE CASCADE,
    UNIQUE("orderId", "productId"),
  UNIQUE("orderId", "productId")
);

CREATE TABLE "cartProduct" (
  "cartProductId" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "cartId" int NOT NULL,
  "productId" int NOT NULL,
  "quantity" int NOT NULL,
  "created" timestamp NOT NULL DEFAULT NOW(),
  "modified" timestamp NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_cart
    FOREIGN KEY("cartId") 
	  REFERENCES "cart"("cartId")
	  ON DELETE CASCADE,
  CONSTRAINT fk_product
    FOREIGN KEY("productId") 
	  REFERENCES "product"("productId")
	  ON DELETE CASCADE,
  UNIQUE("cartId", "productId")
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.modified = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_user
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_product_category
BEFORE UPDATE ON "productCategory"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_product
BEFORE UPDATE ON "product"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_order
BEFORE UPDATE ON "order"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_cart
BEFORE UPDATE ON "cart"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_orders_product
BEFORE UPDATE ON "orderProduct"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_carts_product
BEFORE UPDATE ON "cartProduct"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();