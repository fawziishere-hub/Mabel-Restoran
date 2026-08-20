import { useEffect } from "react";
import { Phone, Mail, MapPin, Globe, Clock } from "lucide-react";
import { useSendContact } from "../hooks/contactHooks/useSendContact";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ContactForm = ({ showHeader = true }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { mutate, isLoading: isSubmitting, isSuccess } = useSendContact();

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const onSubmit = (data) => mutate(data);

  return (
    <section className="min-h-screen bg-orange-50/30 pt-20 dark:bg-slate-950">
      {showHeader && (
        <div className="bg-slate-900 py-20 dark:bg-slate-950 border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="mb-6 text-5xl font-extrabold text-white">İletişim</h1>
              <p className="mx-auto max-w-3xl text-xl text-slate-300">
                Özel organizasyon talepleriniz, grup yemekleri veya sorularınız için bize ulaşın.
              </p>
            </motion.div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          
          {/* Info Card */}
          <motion.div
            className="relative bg-orange-500 text-white p-10 lg:w-[450px] flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-6">İletişim Bilgileri</h2>
              <p className="text-orange-50 text-base leading-relaxed mb-10">
                Mabel Kafe Restoran ile ilgili tüm soru, görüş ve önerileriniz için bize ulaşabilirsiniz.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 text-orange-200" />
                  <div>
                    <h3 className="text-sm font-bold text-orange-200 uppercase tracking-wider mb-1">Adres</h3>
                    <p className="text-base font-medium">Üreğil, Millet Bahçesi içi<br/>06270 Mamak/Ankara</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 text-orange-200" />
                  <div>
                    <h3 className="text-sm font-bold text-orange-200 uppercase tracking-wider mb-1">Telefon</h3>
                    <p className="text-base font-medium">0552 861 05 63</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 mt-1 text-orange-200" />
                  <div>
                    <h3 className="text-sm font-bold text-orange-200 uppercase tracking-wider mb-1">Çalışma Saatleri</h3>
                    <p className="text-base font-medium">Hafta İçi: 08:30 - 21:00<br/>Hafta Sonu: 08:00 - 22:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 mt-1 text-orange-200" />
                  <div>
                    <h3 className="text-sm font-bold text-orange-200 uppercase tracking-wider mb-1">E-Posta</h3>
                    <p className="text-base font-medium">info@mabelmamak.com.tr</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-orange-600/50 mix-blend-multiply" />
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="flex-1 p-10 lg:p-14"
            initial="hidden" whileInView="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } } }}
          >
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Bize Mesaj Gönderin</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={formItemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Ad Soyad</label>
                  <input type="text" {...register("name", { required: "Ad Soyad gereklidir" })} className="w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500 p-4 border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none transition-all" placeholder="Adınız Soyadınız" />
                  {errors.name && <span className="text-red-500 text-xs font-medium">{errors.name.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">E-posta</label>
                  <input type="email" {...register("email", { required: "E-posta gereklidir" })} className="w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500 p-4 border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none transition-all" placeholder="ornek@email.com" />
                  {errors.email && <span className="text-red-500 text-xs font-medium">{errors.email.message}</span>}
                </div>
              </motion.div>

              <motion.div variants={formItemVariants} className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Telefon</label>
                <input type="text" {...register("phone", { required: "Telefon numarası gereklidir" })} className="w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500 p-4 border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none transition-all" placeholder="05XX XXX XX XX" />
                {errors.phone && <span className="text-red-500 text-xs font-medium">{errors.phone.message}</span>}
              </motion.div>

              <motion.div variants={formItemVariants} className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Mesajınız</label>
                <textarea {...register("message", { required: "Mesaj alanı boş bırakılamaz" })} rows={5} className="w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500 p-4 border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none transition-all resize-none" placeholder="Organizasyon detayları, soru veya önerilerinizi buraya yazın..." />
                {errors.message && <span className="text-red-500 text-xs font-medium">{errors.message.message}</span>}
              </motion.div>

              <motion.button variants={formItemVariants} type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-orange-500 text-white font-bold py-4 px-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg disabled:opacity-70 mt-4">
                {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;