const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

// Koneksi DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "beta_shop"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

// Endpoint API
app.get("/produk", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
