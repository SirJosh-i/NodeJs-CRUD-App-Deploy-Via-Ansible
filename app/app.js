const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db");

const app = express();
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  res.json(result.rows);
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  const result = await db.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
  res.json(result.rows[0]);
});

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
});
