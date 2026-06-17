const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

router.get("/", protect, (req, res) => {
  res.json({
    message: "Route berhasil diakses",
    user: req.user,
  });
});

module.exports = router;