const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  getBarangMasuk,
  createBarangMasuk,
} = require(
  "../controllers/barangMasukController"
);

router.get("/", protect, getBarangMasuk);

router.post("/", protect, createBarangMasuk);

module.exports = router;