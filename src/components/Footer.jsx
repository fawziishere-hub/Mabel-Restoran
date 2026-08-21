import {
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Clock
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-orange-50/50 dark:bg-slate-900 mt-20">
      {/* CTA / Info Section */}
      {pathname !== "/about" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-orange-500 mx-4 md:mx-8 lg:mx-16 rounded-3xl -mb-10 z-10 relative shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-[320px] flex items-center justify-center overflow-hidden">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                src="/images/20.jpg"
                alt="Mabel Kafe Bahçe"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-orange-900/20 mix-blend-multiply"></div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10 bg-orange-500">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-[2.5rem] font-black text-white leading-tight mb-4"
              >
                Doğanın İçinde Lezzet Şöleni
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-orange-50 mb-6 text-lg font-medium"
              >
                Üreğil Millet Bahçesi'nin muhteşem manzarası eşliğinde, aileniz ve sevdiklerinizle unutulmaz anlar yaşayın.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  to="/rezervasyon"
                  className="rounded-xl bg-white px-8 py-4 font-bold text-orange-600 shadow-lg transition-transform hover:scale-105 inline-block"
                >
                  Masada Yerini Ayırt
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Footer */}
      <div className="bg-slate-900 px-4 md:px-8 lg:px-16 pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => navigate("/")}>
                <img 
                  src="/images/450201304_1539576273654166_470384146796434157_n (1).jpg" 
                  alt="Mabel Logo" 
                  className="h-12 w-auto bg-white rounded-md p-1 object-contain"
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed my-3 max-w-xs font-medium">
                En taze ürünler, el yapımı lezzetler ve güler yüzlü hizmet ile Ankara'daki yeni lezzet durağınız.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold text-white mb-4 text-base">Hızlı Menü</h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/" className="text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium">Ana Sayfa</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/menu" className="text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium">Menümüz</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/rezervasyon" className="text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium">Rezervasyon</Link>
                </motion.li>
              </ul>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold text-white mb-4 text-base">Çalışma Saatleri</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-slate-400 text-sm font-medium">Hafta İçi: 08:30 - 21:00</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-slate-400 text-sm font-medium">Hafta Sonu: 08:00 - 22:00</span>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h3 className="font-bold text-white mb-4 text-base">Rezervasyon & İletişim</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm leading-relaxed font-medium">
                    Üreğil, Millet Bahçesi içi<br/>06270 Mamak/Ankara
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div className="flex flex-col space-y-1">
                    <a href="tel:05528610563" className="text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium">Üreğil: (0552) 861 05 63</a>
                    <a href="tel:05398439735" className="text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium">MKM Kültür: (0539) 843 97 35</a>
                    <a href="tel:05398439734" className="text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium">Anadolu Sofrası: (0539) 843 97 34</a>
                    <a href="tel:05398439687" className="text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium">Saimekadın: (0539) 843 96 87</a>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 px-4 md:px-8 lg:px-16 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Mabel A.Ş. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/mabelkaferestoran/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-500 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61562143385926&ref=PROFILE_EDIT_xav_ig_profile_page_web#" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-500 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
