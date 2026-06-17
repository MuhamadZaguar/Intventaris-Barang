const BarangKeluar =
require("../models/BarangKeluar");

const Barang =
require("../models/Barang");

exports.getBarangKeluar =
async(req,res)=>{
try{

const data =
await BarangKeluar.find()
.populate("barang_id");

res.json(data);

}catch(error){
res.status(500).json({
message:error.message
});
}
};

exports.createBarangKeluar =
async(req,res)=>{
try{

const {barang_id,jumlah} =
req.body;

const barang =
await Barang.findById(barang_id);

if(!barang){
return res.status(404).json({
message:"Barang tidak ditemukan"
});
}

if(barang.stok < jumlah){
return res.status(400).json({
message:"Stok tidak mencukupi"
});
}

barang.stok -= Number(jumlah);

await barang.save();

const transaksi =
await BarangKeluar.create({
barang_id,
jumlah
});

res.status(201).json(transaksi);

}catch(error){
res.status(500).json({
message:error.message
});
}
};