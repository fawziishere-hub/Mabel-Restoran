import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Calendar, Clock, MapPin, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient"; // <-- Import Supabase!
import { toast } from "react-toastify";

export default function ReservationPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to hold our form inputs
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    date: "", 
    time: "", 
    guests: "", 
    area: "", 
    notes: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the data directly to your Supabase 'quotes' table
      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            ad_soyad: formData.name,
            telefon: formData.phone,
            tarih: formData.date,
            saat: formData.time,
            kisi_sayisi: formData.guests,
            tercih_yeri: formData.area,
            mesaj: formData.notes
          }
        ]);

      if (error) throw error;

      toast.success("Rezervasyon talebiniz başarıyla alındı!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast.error("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 dark:bg-slate-950 pt-20">
      <div className="relative h-[300px] bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/images/unnamed (3).jpg" className="w-full h-full object-cover opacity-40" alt="Arka Plan" />
        </div>

        <button
          onClick={() => navigate("/menu")}
          className="absolute left-4 top-8 md:left-8 flex items-center gap-2 rounded-xl bg-slate-900/80 px-4 py-3 text-white backdrop-blur-sm hover:bg-slate-800 z-20 font-bold"
        >
          <ArrowLeft size={20} /> <span className="hidden md:inline">Menüye Dön</span>
        </button>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Rezervasyon Yap</h1>
          <p className="text-lg text-slate-200">Mabel Kafe Restoran'da masanız sizi bekliyor.</p>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-16 max-w-3xl px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:border-orange-500 focus:outline-none dark:text-white" placeholder="Adınız Soyadınız" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:border-orange-500 focus:outline-none dark:text-white" placeholder="05XX XXX XX XX" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tarih</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:border-orange-500 focus:outline-none dark:text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Saat</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input required name="time" value={formData.time} onChange={handleChange} type="time" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:border-orange-500 focus:outline-none dark:text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Kişi Sayısı</label>
                <div className="relative">
                  <User className="absolute left-4 top-3 text-slate-400" size={18} />
                  <select required name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:border-orange-500 focus:outline-none dark:text-white appearance-none">
                    <option value="">Seçiniz...</option>
                    <option>2 Kişi</option><option>3-4 Kişi</option><option>5-8 Kişi</option><option>8+ Kişi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tercih Edilen Alan</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3 text-slate-400" size={18} />
                  <select required name="area" value={formData.area} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:border-orange-500 focus:outline-none dark:text-white appearance-none">
                    <option value="">Seçiniz...</option>
                    <option>Açık Hava (Bahçe)</option>
                    <option>İç Mekan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Özel İstekler</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:border-orange-500 focus:outline-none dark:text-white resize-none" placeholder="Bize iletmek istediklerinizi yazın..."></textarea>
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-bold text-white hover:bg-orange-600 transition-all shadow-lg mt-4 disabled:opacity-70">
              <Send size={20} /> {isSubmitting ? "Gönderiliyor..." : "Rezervasyon Talebini Gönder"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
