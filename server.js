const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const multer = require('multer');

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
  const query = `
    SELECT 
      p.id,
      p.name,
      p.description,
      p.old_price,
      p.new_price,
      p.discount,
      p.img1,
      p.img2,
      COALESCE(AVG(u.rating_ulasan), 0) AS average_rating,
      COUNT(u.id) AS total_reviews
    FROM product p
    LEFT JOIN ulasan u ON p.id = u.id_product
    GROUP BY 
      p.id, p.name, p.description, p.old_price, 
      p.new_price, p.discount, p.img1, p.img2
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error saat query ke database:", err);
      return res.status(500).send(err);
    }
    res.json(result);
  });
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  }
});

const upload = multer({ storage: storage });

app.post("/produk", upload.fields([{ name: 'img1' }, { name: 'img2' }]), (req, res) => {
  try {
    const { name, old_price, new_price, description, discount } = req.body;
    const img1 = req.files['img1']?.[0]?.filename;
    const img2 = req.files['img2']?.[0]?.filename;

    console.log("Received data:", { name, old_price, new_price, description, discount, img1, img2 });

    const query = `INSERT INTO product (name, old_price, new_price, description, discount, img1, img2) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, old_price, new_price, description, discount, img1, img2], (err, result) => {
      if (err) {
        console.error("DB Error:", err); // ← tambahkan ini
        return res.status(500).send("Database error");
      }
      res.json({ message: "Produk berhasil ditambahkan", id: result.insertId });
    });
  } catch (error) {
    console.error("Server Error:", error); // ← tambahkan ini juga
    res.status(500).send("Server internal error");
  }
});

app.get("/produk/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM product WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: "Produk tidak ditemukan" });
    res.json(result[0]);
  });
});

app.put("/produk/:id", upload.fields([{ name: 'img1' }, { name: 'img2' }]), (req, res) => {
  const id = req.params.id;
  const { name, old_price, new_price, description, discount } = req.body;
  const img1 = req.files.img1?.[0]?.filename;
  const img2 = req.files.img2?.[0]?.filename;

  // Ambil data lama terlebih dahulu
  db.query("SELECT img1, img2 FROM product WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    const oldData = results[0];
    const finalImg1 = img1 || oldData.img1;
    const finalImg2 = img2 || oldData.img2;

    const query = `
      UPDATE product 
      SET name = ?, old_price = ?, new_price = ?, description = ?, discount = ?, img1 = ?, img2 = ?
      WHERE id = ?
    `;
    const params = [name, old_price, new_price, description, discount, finalImg1, finalImg2, id];

    db.query(query, params, (err, result) => {
      if (err) return res.status(500).json({ error: "Gagal update produk" });
      res.json({ success: true });
    });
  });
});

app.delete("/produk/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM product WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal menghapus produk" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });

    }

    res.json({ success: true, message: "Produk berhasil dihapus" });
  });
});

app.use(express.json()); // penting

app.post("/ulasan", (req, res) => {
  const { id_product, rating_ulasan, ulasan } = req.body;

  const query = `
    INSERT INTO ulasan (id_product, rating_ulasan, ulasan)
    VALUES (?, ?, ?)
  `;

  db.query(query, [id_product, rating_ulasan, ulasan], (err, result) => {
    if (err) {
      console.error("Gagal simpan ulasan:", err); // 🔴 Lihat console log ini
      return res.status(500).json({ error: "Gagal menyimpan ulasan" });
    }

    res.json({ success: true, message: "Ulasan berhasil disimpan" });
  });
});


// Jalankan server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
