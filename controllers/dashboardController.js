const Barang =
require("../models/Barang");

const BarangMasuk =
require("../models/BarangMasuk");

const BarangKeluar =
require("../models/BarangKeluar");

const User =
require("../models/User");

exports.getDashboard =
async(req,res)=>{
try{

const totalBarang =
await Barang.countDocuments();

const totalUser =
await User.countDocuments();

const totalMasuk =
await BarangMasuk.countDocuments();

const totalKeluar =
await BarangKeluar.countDocuments();

res.json({
totalBarang,
totalUser,
totalMasuk,
totalKeluar
});

}catch(error){
res.status(500).json({
message:error.message
});
}
};