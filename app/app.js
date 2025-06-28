const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db");

const app = express();
app.use(bodyParser.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "CRUD API is running" });
});

// CREATE - Add new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const result = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({ error: "User with this email already exists" });
    } else {
      res.status(500).json({ error: "Database error", message: error.message });
    }
  }
});

// READ - Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// READ - Get user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// UPDATE - Update user by ID
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });
  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({ error: "Email already in use" });
    } else {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
});

// DELETE - Delete user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CRUD API running at http://0.0.0.0:${PORT}`);
});
