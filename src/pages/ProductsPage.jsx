import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Utensils, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// Real data pulled from your menu images!
const mockProducts = [
  { id: 1, name: "Serpme Kahvaltı (2 Kişilik)", category: "Kahvaltı", price: "775 ₺", desc: "Bol çeşitli, doyurucu ve yöresel lezzetlerle dolu iki kişilik serpme kahvaltı.", icon: <Utensils size={40} /> },
  { id: 2, name: "Kahvaltı Tabağı", category: "Kahvaltı", price: "330 ₺", desc: "Güne hızlı ve lezzetli bir başlangıç yapmak isteyenler için ideal kahvaltı tabağı.", icon: <Utensils size={40} /> },
  { id: 3, name: "Menemen", category: "Yumurtalar", price: "120 ₺", desc: "Taze domates ve biberle hazırlanan, sıcak servis edilen klasik lezzet.", icon: <Utensils size={40} /> },
  { id: 4, name: "Sucuklu Yumurta", category: "Yumurtalar", price: "165 ₺", desc: "Özel kasap sucuk ile hazırlanan sahanda yumurta.", icon: <Utensils size={40} /> },
  { id: 5, name: "Sahanda Yumurta", category: "Yumurtalar", price: "125 ₺", desc: "Tereyağında tam kıvamında pişirilmiş sahanda yumurta.", icon: <Utensils size={40} /> },
  { id: 6, name: "Kavurmalı Yumurta", category: "Yumurtalar", price: "285 ₺", desc: "Özel kavurma etiyle hazırlanan doyurucu bir lezzet.", icon: <Utensils size={40} /> },
  { id: 7, name: "Kaşarlı Gözleme", category: "Gözlemeler", price: "150 ₺", desc: "El açması incecik yufka ve bol kaşar peyniri.", icon: <Utensils size={40} /> },
  { id: 8, name: "Çay / Ayran", category: "İçecekler", price: "Sorunuz", desc: "Yemeklerinizin yanına serinletici ve sıcak içecek alternatifleri.", icon: <Coffee size={40} /> },
];

const categories = ["Tüm Lezzetler", "Kahvaltı", "Yumurtalar", "Gözlemeler", "İçecekler"];

export default function MenuPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tüm Lezzetler");

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "Tüm Lezzetler") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    return filtered;
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-orange-50/30 dark:bg-slate-950 pt-20">
      <div className="bg-slate-900 py-20 border-b border-slate-800 text-center">
        <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white tracking-tight">Lezzetlerimiz</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">Özenle hazırladığımız menümüzü keşfedin.</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Menüde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl py-4 pe-4 ps-12 border-2 border-slate-200 bg-white shadow-sm focus:border-orange-500 focus:outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              variants={itemVariants}
              initial="hidden" animate="visible"
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="h-40 bg-orange-50 flex items-center justify-center text-orange-300 border-b border-slate-100">
                {product.icon}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {product.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-6 flex-grow">{product.desc}</p>
                <button 
                  onClick={() => navigate("/rezervasyon")}
                  className="w-full py-3 rounded-lg border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Masada Yerini Ayırt
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}