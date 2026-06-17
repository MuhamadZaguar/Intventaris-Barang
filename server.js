require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const barangRoutes = require("./routes/barangRoutes");
const barangMasukRoutes = require("./routes/barangMasukRoutes");
const barangKeluarRoutes = require("./routes/barangKeluarRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/barang", barangRoutes);
app.use("/api/barang-masuk",barangMasukRoutes);
app.use("/api/barang-keluar", barangKeluarRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API Inventaris Berjalan");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});