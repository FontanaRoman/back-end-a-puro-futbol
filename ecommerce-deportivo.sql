-- Tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(30),
    rol VARCHAR(15),
    image VARCHAR(255),
    registerDate DATE,
    password VARCHAR(255),
    phone VARCHAR(30)
);

-- Tabla de productos
CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    waist INT,
    colors INT,
    state INT,
    brand_id INT,
    category_id INT
);

-- Tabla de favoritos
CREATE TABLE favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT
);

-- Tabla de marcas
CREATE TABLE brand (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55)
);

-- Tabla de categorías
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

-- Definición de relaciones
ALTER TABLE product
    ADD CONSTRAINT fk_product_brand
    FOREIGN KEY (brand_id) REFERENCES brand(id);

ALTER TABLE product
    ADD CONSTRAINT fk_product_category
    FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE favorites
    ADD CONSTRAINT fk_favorites_users
    FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE favorites
    ADD CONSTRAINT fk_favorites_product
    FOREIGN KEY (product_id) REFERENCES product(id);

ALTER TABLE orders
    ADD CONSTRAINT fk_orders_users
    FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE orders
    ADD CONSTRAINT fk_orders_product
    FOREIGN KEY (product_id) REFERENCES product(id);