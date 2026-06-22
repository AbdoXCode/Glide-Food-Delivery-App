import express, { json } from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:8081" }));
const PORT = process.env.PORT || 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Glide",
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});
db.connect();

// Middleware
app.use(json());
app.use(express.urlencoded({ extended: true }));

// Base Server Health Check Route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "online", message: "Glide Node.js API Gateway is active" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // no user found
    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "No user found with the provided email",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "wrong password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        username: user.username,
        address: user.address,
        password: user.password,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, name, phone_number, address } = req.body;

  if (!email || !password || !name || !phone_number || !address) {
    return res.status(400).json({
      message: "Missing fields",
    });
  }

  try {
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users(email,password,name,phone_number,address) VALUES($1,$2,$3,$4,$5) RETURNING id,email,name,phone_number,address,password",
      [email, hashedPassword, name, phone_number, address],
    );

    const user = result.rows[0];

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        username: user.username,
        address: user.address,
        password: user.password,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error",
    });
  }
});

app.get("/restaurants", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/popular-restaurants", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM restaurants ORDER BY rating DESC LIMIT 5",
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/recommended-restaurants/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`Fetching recommendations for user ID: ${userId}`);

    const response = await fetch(`http://localhost:8000/recommend/${userId}`);

    const recommendedRestaurants = await response.json();

    const mealIds = recommendedRestaurants.data.map((item) => item.id);

    const result = await db.query(
      `
        SELECT
          m.id AS meal_id,
          m.name AS meal_name,
          m.cuisine_tag AS cuisine_type,
          r.id AS id,
          r.name AS name,
          r.rating AS rating,
          r.image_url AS image_url
        FROM menu_items m
        JOIN restaurants r
          ON r.id = m.restaurant_id
        WHERE m.id = ANY($1)
        `,
      [mealIds],
    );

    if (recommendedRestaurants.status === 422) {
      res.status(422).json({
        message: "No recommendations found for the user",
      });
    } else if (recommendedRestaurants.status === 200) {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/restaurant/:id", async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const response = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      restaurantId,
    ]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error or database error",
    });
  }
});

app.get("/restaurant/:id/menu", async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const response = await db.query(
      "SELECT * FROM menu_items WHERE restaurant_id = $1",
      [restaurantId],
    );

    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "This Restaurant has no menu items check later" });
    }
    res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error or database error",
    });
  }
});

app.get("/orders/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const response = await db.query(
      `SELECT orders.*, restaurants.name AS restaurant_name,restaurants.delivery_fee
      FROM orders
      JOIN restaurants ON orders.restaurant_id = restaurants.id
      WHERE orders.user_id = $1
      ORDER BY orders.created_at DESC;`,
      [userId],
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error or database error",
    });
  }
});

app.get("/order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const response = await db.query(
      `SELECT 
      orders.id AS order_id,
      menu_items.name,
      menu_items.image_url,
      order_items.quantity,
      menu_items.price
      FROM orders
      JOIN order_items 
      ON orders.id = order_items.order_id
      JOIN menu_items
      ON order_items.menu_item_id = menu_items.id
      WHERE orders.id = $1
      ORDER BY orders.created_at DESC;`,
      [orderId],
    );
    res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error or database error",
    });
  }
});

app.post("/order", async (req, res) => {
  const { userId, restaurantId, status, totalPrice } = req.body;
  try {
    const orderResult = await db.query(
      "INSERT INTO orders(user_id, restaurant_id, status, total_price) VALUES($1, $2, $3, $4) RETURNING id",
      [userId, restaurantId, status, totalPrice],
    );
    res.status(201).json({
      id: orderResult.rows[0].id,
      ok: true,
      message: "Order created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error or database error",
    });
  }
});

app.post("/order-items", async (req, res) => {
  const { orderId, menuItemId, quantity, priceAtPurchase } = req.body;
  try {
    await db.query(
      "INSERT INTO order_items(order_id, menu_item_id, quantity, price_at_purchase) VALUES($1, $2, $3, $4)",
      [orderId, menuItemId, quantity, priceAtPurchase],
    );
    res
      .status(201)
      .json({ message: "Order item added successfully", ok: true });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error or database error",
    });
  }
});

app.put("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone_number, address } = req.body;
  try {
    const userResult = await db.query(
      "UPDATE users SET name=$1, email=$2, phone_number=$3, address=$4 WHERE id=$5 RETURNING id, email, name, phone_number, address",
      [name, email, phone_number, address, userId],
    );
    res.status(200).json({
      user: {
        id: userResult.rows[0].id,
        email: userResult.rows[0].email,
        name: userResult.rows[0].name,
        phone_number: userResult.rows[0].phone_number,
        address: userResult.rows[0].address,
      },
      ok: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error or database error",
    });
  }
});
// Start listening for client requests
app.listen(PORT, () => {
  console.log(`🚀 Node.js App Gateway running on http://192.168.1.201:${PORT}`);
});
