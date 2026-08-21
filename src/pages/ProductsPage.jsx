import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// ENTIRE MENU FROM WHITEBOARD WITH PERMANENT UNSPLASH IMAGES
const mockProducts = [
  // KAHVALTI
  { id: 1, name: "Serpme Kahvaltı (2 Kişilik)", category: "Kahvaltı", price: "775 ₺", desc: "Bol çeşitli, doyurucu ve yöresel lezzetlerle dolu iki kişilik serpme kahvaltı.", image: "/images/images (11).jpeg" },
  { id: 2, name: "Kahvaltı Tabağı", category: "Kahvaltı", price: "330 ₺", desc: "Güne hızlı ve lezzetli bir başlangıç yapmak isteyenler için ideal.", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80" },
  
  // YUMURTALAR
  { id: 3, name: "Menemen", category: "Yumurtalar", price: "120 ₺", desc: "Taze domates ve biberle hazırlanan, sıcak servis edilen klasik lezzet.", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80" },
  { id: 4, name: "Peynirli Yumurta", category: "Yumurtalar", price: "120 ₺", desc: "Taze peynir ile hazırlanan sıcacık sahanda yumurta.", image: "/images/images (12).jpeg" },
  { id: 5, name: "Sahanda Yumurta", category: "Yumurtalar", price: "125 ₺", desc: "Tereyağında tam kıvamında pişirilmiş sahanda yumurta.", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80" },
  { id: 6, name: "Sahanda Kaşarlı Yumurta", category: "Yumurtalar", price: "125 ₺", desc: "Eriyen bol kaşar peynirli nefis sahanda yumurta.", image: "/images/images (13).jpeg" },
  { id: 7, name: "Sahanda Sucuklu Yumurta", category: "Yumurtalar", price: "165 ₺", desc: "Özel kasap sucuk ile hazırlanan enfes lezzet.", image: "/images/images (14).jpeg" },
  { id: 8, name: "Sahanda Kavurmalı Yumurta", category: "Yumurtalar", price: "285 ₺", desc: "Özel kavurma etiyle hazırlanan doyurucu bir lezzet.", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80" },

  // GÖZLEMELER
  { id: 9, name: "Sade Gözleme", category: "Gözlemeler", price: "120 ₺", desc: "El açması incecik yufka, sade ve çıtır lezzet.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80" },
  { id: 10, name: "Peynirli Gözleme", category: "Gözlemeler", price: "140 ₺", desc: "Taze beyaz peynir ve maydanozlu iç harç.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80" },
  { id: 11, name: "Kaşarlı Gözleme", category: "Gözlemeler", price: "150 ₺", desc: "İçinde bolca eriyen sıcak kaşar peyniri.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80" },
  { id: 12, name: "Patatesli Kaşarlı Gözleme", category: "Gözlemeler", price: "160 ₺", desc: "Haşlanmış patates ve kaşar peyniri harmanıyla.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80" },
  { id: 13, name: "Patlıcanlı Kaşarlı Gözleme", category: "Gözlemeler", price: "160 ₺", desc: "Közlenmiş patlıcan ve kaşarın muhteşem uyumu.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80" },
  { id: 14, name: "Sucuklu Gözleme", category: "Gözlemeler", price: "170 ₺", desc: "Kasap sucuk dilimleriyle hazırlanan nefis gözleme.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80" },
  { id: 15, name: "Kıymalı Gözleme", category: "Gözlemeler", price: "170 ₺", desc: "Özel baharatlı kıyma harcı ile doldurulmuş.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80" },
  { id: 16, name: "Kıymalı Kaşarlı Gözleme", category: "Gözlemeler", price: "180 ₺", desc: "Baharatlı kıyma ve eriyen kaşarın enfes birleşimi.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80" },
  { id: 17, name: "Karışık Gözleme", category: "Gözlemeler", price: "180 ₺", desc: "Bol malzemeli, doyurucu karışık el açması gözleme.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80" },

  // TOSTLAR VE APERATİFLER
  { id: 18, name: "Sade Tost (Ekmek)", category: "Tostlar & Aperatifler", price: "50 ₺", desc: "Geleneksel, çıtır sade ekmek tostu.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80" },
  { id: 19, name: "Kaşarlı Tost", category: "Tostlar & Aperatifler", price: "125 ₺", desc: "Bol eriyen kaşarlı klasik sıcak tost.", image: "/images/images (15).jpeg" },
  { id: 20, name: "Sucuklu Tost", category: "Tostlar & Aperatifler", price: "145 ₺", desc: "Gerçek kasap sucuk ile hazırlanan doyurucu tost.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80" },
  { id: 21, name: "Karışık Tost", category: "Tostlar & Aperatifler", price: "150 ₺", desc: "Sucuk ve kaşarın muhteşem uyumu.", image: "/images/images (16).jpeg" },
  { id: 22, name: "Patates Tava", category: "Tostlar & Aperatifler", price: "120 ₺", desc: "Çıtır çıtır, altın sarısı kızarmış patates dilimleri.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=80" },
  { id: 23, name: "Soğan Halkası", category: "Tostlar & Aperatifler", price: "120 ₺", desc: "Altın sarısı çıtır soğan halkaları.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=80" },

  // İÇECEKLER
  { id: 24, name: "Çay", category: "İçecekler", price: "25 ₺", desc: "Taze demlenmiş, ince belli bardakta Türk çayı.", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80" },
  { id: 25, name: "Türk Kahvesi", category: "İçecekler", price: "75 ₺", desc: "Geleneksel yöntemle hazırlanan köpüklü Türk kahvesi.", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80" }
];

const categories = ["Tüm Lezzetler", "Kahvaltı", "Yumurtalar", "Gözlemeler", "Tostlar & Aperatifler", "İçecekler"];

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
      
      {/* Hero Header */}
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
              className="w-full rounded-xl py-4 pe-4 ps-12 border-2 border-slate-200 bg-white shadow-sm focus:border-orange-500 focus:outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all"
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
