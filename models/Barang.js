const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema(
  {
    kode_barang: {
      type: String,
      required: true,
      unique: true,
    },

    nama_barang: {
      type: String,
      required: true,
    },

    kategori: {
      type: String,
      required: true,
    },

    stok: {
      type: Number,
      default: 0,
    },

    harga: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Barang", barangSchema);