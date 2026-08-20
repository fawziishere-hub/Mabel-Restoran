import { motion } from "framer-motion";
import { Coffee, Users, Star, Sun, Utensils, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const stats = [
    { id: 1, label: "Mutlu Müşteri", value: "1,000+", icon: <Users className="w-6 h-6" /> },
    { id: 2, label: "Değerlendirme", value: "3.9/5", icon: <Star className="w-6 h-6" /> },
    { id: 3, label: "Açık Hava", value: "Bahçe", icon: <Sun className="w-6 h-6" /> },
    { id: 4, label: "Öğün", value: "Kahvaltı", icon: <Coffee className="w-6 h-6" /> },
  ];

  const features = [
    {
      id: 1,
      title: "Zengin Serpme Kahvaltı",
      description: "Taze ürünlerle hazırlanan, ailenizle keyifle paylaşabileceğiniz, bölgenin en sevilen kahvaltısı.",
      icon: <Coffee className="w-8 h-8" />,
    },
    {
      id: 2,
      title: "Geniş Bahçe Alanı",
      description: "Üreğil Millet Bahçesi'nin doğasıyla iç içe, şehrin gürültüsünden uzak, ferah ve huzurlu bir ortam.",
      icon: <Sun className="w-8 h-8" />,
    },
    {
      id: 3,
      title: "Geleneksel Lezzetler",
      description: "El açması gözlemeler, sahanda yumurta çeşitleri ve enfes menemen ile güne harika bir başlangıç yapın.",
      icon: <Utensils className="w-8 h-8" />,
    },
  ];

  return (
    <div className="max-w-[100vw] overflow-x-hidden bg-orange-50/30 dark:bg-slate-950">
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image (Using your garden photo) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/unnamed (3).jpg" 
            alt="Mabel Kafe Bahçe" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 px-4 py-2 text-sm font-bold text-orange-50 shadow-sm">
              <MapPin size={16} /> Üreğil, Millet Bahçesi İçi
            </span>
            <h1 className="mb-6 text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Mabel Kafe <br className="hidden md:block" />
              <span className="text-orange-400">Restoran</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-200 mb-10 leading-relaxed font-medium drop-shadow-md">
              Doğanın kalbinde, ailenizle ve sevdiklerinizle unutulmaz lezzetleri deneyimleyin.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate("/menu")}
                className="rounded-lg bg-orange-500 text-white px-8 py-4 font-bold transition-all hover:bg-orange-600 shadow-lg shadow-orange-500/25"
              >
                Menüyü İncele
              </button>
              <button 
                onClick={() => navigate("/rezervasyon")}
                className="rounded-lg bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 font-bold transition-all hover:bg-white/20"
              >
                Rezervasyon Yap
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="text-orange-500 dark:text-orange-400 mb-3 bg-orange-50 dark:bg-orange-500/10 p-3 rounded-full">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Neden Biz?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Sıcak bir aile ortamında, özenle seçilmiş malzemelerle hazırlanan eşsiz menümüzü keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow"
              >
                <div className="text-orange-500 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;