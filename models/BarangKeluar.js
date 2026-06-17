const mongoose = require("mongoose");

const barangKeluarSchema =
new mongoose.Schema(
{
    barang_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Barang",
        required:true
    },

    jumlah:{
        type:Number,
        required:true
    },

    tanggal:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
"BarangKeluar",
barangKeluarSchema
);