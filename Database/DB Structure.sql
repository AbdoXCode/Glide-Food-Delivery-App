CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone_number VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  address VARCHAR(200) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email),
  UNIQUE (phone_number)
);

CREATE TABLE restaurants
(
  id SERIAL,
  name VARCHAR(200) NOT NULL,
  cuisine_type VARCHAR(100) NOT NULL,
  address VARCHAR(300) NOT NULL,
  image_url VARCHAR(300) NOT NULL,
  is_busy BOOLEAN NOT NULL,
  rating NUMERIC(2, 1) NOT NULL,
  delivery_time VARCHAR(100) NOT NULL,
  delivery_fee INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE orders
(
  id SERIAL,
  total_price FLOAT NOT NULL,
  status VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE RESTRICT
);

CREATE TABLE menu_items
(
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  price FLOAT NOT NULL,
  cuisine_tag VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  restaurant_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE order_items
(
  id SERIAL,
  quantity INT NOT NULL,
  price_at_purchase FLOAT NOT NULL,
  menu_item_id INT NOT NULL,
  order_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE user_interactions
(
  id SERIAL,
  interaction_type VARCHAR(100) NOT NULL,
  weight INT NOT NULL,
  interaction_time TIMESTAMP NOT NULL,
  user_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);