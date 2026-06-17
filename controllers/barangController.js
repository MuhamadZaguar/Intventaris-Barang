const Barang = require("../models/Barang");

exports.getBarang = async (req, res) => {
  try {
    const search = req.query.search || "";

    const barang = await Barang.find({
      nama_barang: {
        $regex: search,
        $options: "i",
      },
    });

    res.json(barang);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);

    if (!barang) {
      return res.status(404).json({
        message: "Barang tidak ditemukan",
      });
    }

    res.json(barang);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createBarang = async (req, res) => {
  try {
    const barang = await Barang.create(req.body);

    res.status(201).json(barang);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateBarang = async (req, res) => {
  try {
    const barang = await Barang.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(barang);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    await Barang.findByIdAndDelete(req.params.id);

    res.json({
      message: "Barang berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};