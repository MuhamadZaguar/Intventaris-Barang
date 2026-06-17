const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getBarang,
  getBarangById,
  createBarang,
  updateBarang,
  deleteBarang,
} = require("../controllers/barangController");

router.get("/", protect, getBarang);

router.get("/:id", protect, getBarangById);

router.post("/", protect, createBarang);

router.put("/:id", protect, updateBarang);

router.delete("/:id", protect, deleteBarang);

module.exports = router;