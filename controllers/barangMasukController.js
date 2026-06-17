const BarangMasuk = require("../models/BarangMasuk");
const Barang = require("../models/Barang");

exports.getBarangMasuk = async (req, res) => {
  try {
    const data = await BarangMasuk.find()
      .populate("barang_id");

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createBarangMasuk = async (req, res) => {
  try {
    const { barang_id, jumlah } = req.body;

    const barang = await Barang.findById(barang_id);

    if (!barang) {
      return res.status(404).json({
        message: "Barang tidak ditemukan",
      });
    }

    barang.stok += Number(jumlah);

    await barang.save();

    const transaksi =
      await BarangMasuk.create({
        barang_id,
        jumlah,
      });

    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};