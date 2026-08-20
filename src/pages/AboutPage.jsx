import { 
  Coffee, 
  Users, 
  Heart, 
  Sun, 
  Utensils, 
  MapPin 
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-orange-50/30 pt-20 dark:bg-slate-950">
      <div className="bg-slate-900 py-20 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-extrabold text-white tracking-tight">Hakkımızda</h1>
            <p className="mx-auto max-w-3xl text-xl text-slate-300">
              Üreğil Millet Bahçesi'nin eşsiz doğasında, sevdiklerinizle unutulmaz anılar biriktireceğiniz sıcak bir aile ortamı sunuyoruz.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
                Doğanın Kalbinde <br/><span className="text-orange-500">Bir Lezzet Durağı</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
                Şehrin gürültüsünden uzaklaşmak ve derin bir nefes almak isteyen misafirlerimiz için Mabel Kafe Restoran, Mamak Üreğil Millet Bahçesi'nde kapılarını açıyor.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
                Amacımız sadece yemek sunmak değil; sabahın ilk ışıklarında kuş cıvıltıları eşliğinde yapacağınız zengin bir serpme kahvaltıyla veya akşam serinliğinde içeceğiniz yorgunluk kahvesiyle gününüzü güzelleştirmektir.
              </p>
            </div>

            {/* Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-orange-500" />
                  <img
                    src="/images/unnamed (3).jpg"
                    alt="Bahçe Manzarası"
                    className="w-full h-52 object-cover rounded-3xl shadow-sm"
                  />
                </div>
                <div className="mt-10">
                  <img
                    src="/images/unnamed.jpg"
                    alt="Menü Sunumu"
                    className="w-full h-44 object-cover rounded-3xl shadow-sm"
                  />
                </div>
                <div className="col-span-2 relative">
                  <img
                    src="/images/unnamed (1).jpg"
                    alt="Taze Ürünler"
                    className="w-full h-36 object-cover rounded-3xl shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 lg:py-24 bg-orange-50/50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-slate-900 dark:text-white mb-5">
                  Değerlerimiz
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Heart className="text-orange-500 w-5 h-5"/> Misafirperverlik
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Güler yüzlü ekibimizle sizi evinizde hissettiriyoruz.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Utensils className="text-orange-500 w-5 h-5"/> Taze Malzemeler
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Ürünlerimizi günlük ve en taze malzemelerden seçiyoruz.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Sun className="text-orange-500 w-5 h-5"/> Doğayla İç İçe
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Açık hava bahçemizde ferah bir yemek deneyimi sunuyoruz.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Users className="text-orange-500 w-5 h-5"/> Aile Ortamı
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Çocuklarınızla rahatça vakit geçirebileceğiniz güvenli bir alan.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-900 rounded-3xl p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
              <h3 className="text-3xl font-bold mb-8">Sayılarla Mabel</h3>
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="text-4xl font-black text-orange-500">7+</div>
                  <div className="text-lg font-medium text-slate-300">Tesis ve Kafe Şubesi</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-4xl font-black text-orange-500">70+</div>
                  <div className="text-lg font-medium text-slate-300">Güler Yüzlü Çalışan</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-4xl font-black text-orange-500">1000+</div>
                  <div className="text-lg font-medium text-slate-300">Aylık Mutlu Misafir</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-slate-900 py-20 px-6 dark:bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Masada Yeriniz Hazır
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Ailenizle keyifli bir kahvaltı veya akşam yemeği için hemen yerinizi ayırtın.
            </p>
            <Link
              to="/rezervasyon"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
            >
              Rezervasyon Yap
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;