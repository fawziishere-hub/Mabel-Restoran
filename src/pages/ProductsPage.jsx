import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// Real data pulled perfectly from your menu pictures with gorgeous imagery!
const mockProducts = [
  { id: 1, name: "Serpme Kahvaltı (2 Kişilik)", category: "Kahvaltı", price: "775 ₺", desc: "Bol çeşitli, doyurucu ve yöresel lezzetlerle dolu iki kişilik serpme kahvaltı.", image: "https://images.unsplash.com/photo-1634818456699-2a945d81b835?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Kahvaltı Tabağı", category: "Kahvaltı", price: "330 ₺", desc: "Güne hızlı ve lezzetli bir başlangıç yapmak isteyenler için ideal.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Menemen", category: "Yumurtalar", price: "120 ₺", desc: "Taze domates ve biberle hazırlanan, sıcak servis edilen klasik lezzet.", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Sucuklu Yumurta", category: "Yumurtalar", price: "165 ₺", desc: "Özel kasap sucuk ile hazırlanan sahanda yumurta.", image: "https://images.unsplash.com/photo-1525916053330-80d5dcecdbf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Kavurmalı Yumurta", category: "Yumurtalar", price: "285 ₺", desc: "Özel kavurma etiyle hazırlanan doyurucu bir lezzet.", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Kıymalı Gözleme", category: "Gözlemeler", price: "170 ₺", desc: "El açması incecik yufka ve özel baharatlı kıyma harcı.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Kaşarlı Gözleme", category: "Gözlemeler", price: "150 ₺", desc: "El açması incecik yufka ve bol eriyen kaşar peyniri.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "Karışık Tost", category: "Tostlar & Aperatifler", price: "150 ₺", desc: "Sucuk ve kaşarın muhteşem uyumuyla hazırlanan sıcak tost.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 9, name: "Patates Tava", category: "Tostlar & Aperatifler", price: "120 ₺", desc: "Çıtır çıtır, altın sarısı kızarmış patates dilimleri.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 10, name: "Izgara Köfte", category: "Ana Yemekler", price: "320 ₺", desc: "Özel baharatlarla yoğrulmuş, ızgarada tam kıvamında pişmiş köfte tabağı.", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 11, name: "Tavuk Şiş", category: "Ana Yemekler", price: "280 ₺", desc: "Marine edilmiş yumuşacık tavuk parçaları.", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 12, name: "Türk Kahvesi", category: "İçecekler", price: "75 ₺", desc: "Geleneksel yöntemle hazırlanan köpüklü Türk kahvesi.", image: "https://images.unsplash.com/photo-1578314675249-a6910e80a867?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

const categories = ["Tüm Lezzetler", "Kahvaltı", "Yumurtalar", "Gözlemeler", "Tostlar & Aperatifler", "Ana Yemekler", "İçecekler"];

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
    <div className="min-h-screen bg-orange-50/30 dark:bg-slate-950 pt-20 relative">
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/905300000000" // <-- CHANGE THIS TO YOUR REAL PHONE NUMBER!
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-110 hover:bg-[#20b858]"
        aria-label="WhatsApp İletişim"
      >
        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Hero Header with your real Tent Image */}
      <div className="relative py-24 border-b border-slate-800 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/20.jpg" alt="Mabel Arka Plan" className="w-full h-full object-cover opacity-30 brightness-50" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">Lezzetlerimiz</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-200 drop-shadow-md font-medium">Özenle hazırladığımız Mabel menüsünü keşfedin.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 relative z-10">
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
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-orange-500/30 shadow-lg scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              variants={itemVariants}
              initial="hidden" animate="visible"
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* High Quality Food Image */}
              <div className="h-56 w-full relative overflow-hidden bg-slate-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-orange-600 shadow-sm uppercase tracking-wider">
                  {product.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{product.name}</h3>
                  <span className="text-xl font-black text-orange-500 whitespace-nowrap">
                    {product.price}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-6 flex-grow font-medium">{product.desc}</p>
                <button 
                  onClick={() => navigate("/rezervasyon")}
                  className="w-full py-3.5 rounded-xl border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-orange-500/20"
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
