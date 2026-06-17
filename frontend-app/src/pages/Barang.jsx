// src/pages/Barang.jsx
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { barangService } from '../services/api';

const Barang = () => {
  const [barangList, setBarangList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await barangService.getAll();
        setBarangList(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBarang();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Data Barang</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm">
          <Plus className="h-4 w-4 mr-2" /> Tambah Barang
        </button>
      </div>
      
      {/* Tampilkan tabel data di sini (sama seperti kode sebelumnya) */}
      <div className="bg-white shadow-sm rounded-xl border p-4">
         {loading ? <p>Memuat...</p> : (
             <ul className="space-y-2">
                 {barangList.map(b => (
                     <li key={b._id} className="border-b pb-2">{b.kode} - {b.nama} (Stok: {b.stok})</li>
                 ))}
             </ul>
         )}
      </div>
    </div>
  );
};

export default Barang;
