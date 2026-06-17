const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {
getBarangKeluar,
createBarangKeluar
}
=
require(
"../controllers/barangKeluarController"
);

router.get(
"/",
protect,
getBarangKeluar
);

router.post(
"/",
protect,
createBarangKeluar
);

module.exports = router;