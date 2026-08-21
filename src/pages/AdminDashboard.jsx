import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  Search, 
  Bell, 
  Coffee, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; 
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [totalCustomerCount, setTotalCustomerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
    fetchReservations();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      if (data) setCustomers(data);
      if (typeof count === 'number') setTotalCustomerCount(count);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch real reservations from the 'reservations' table (renamed from 'quotes')
  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Rezervasyonlar yüklenirken bir hata oluştu.");
    } finally {
      setReservationsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
    toast.success("Başarıyla çıkış yapıldı.");
    navigate("/auth");
    window.location.reload();
  };

  // Approve now actually writes to Supabase, not just local state
  const handleApprove = async (id) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: "Onaylandı" } : res
    ));

    const { error } = await supabase
      .from('reservations')
      .update({ status: "Onaylandı" })
      .eq('id', id);

    if (error) {
      toast.error("Onaylanamadı: " + error.message);
      fetchReservations(); // roll back the optimistic update
      return;
    }

    toast.success("Rezervasyon onaylandı!");
  };

  const pendingCount = reservations.filter((r) => r.status !== "Onaylandı").length;
  const approvedCount = reservations.filter((r) => r.status === "Onaylandı").length;

  return (
    <div className="min-h-screen bg-slate-50 flex dark:bg-slate-950">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 text-orange-500 border-b border-slate-800">
          <Coffee size={28} />
          <span className="text-2xl font-black tracking-tight text-white">Mabel <span className="text-orange-500">Admin</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-orange-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20">
            <Calendar size={20} /> Rezervasyonlar
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-all">
            <Users size={20} /> Müşteriler
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-white hover:bg-red-500 rounded-xl font-medium transition-all">
            <LogOut size={20} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 lg:p-10">
        
        {/* Topbar */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Yönetim Paneli</h1>
            <p className="text-slate-500 font-medium mt-1">Bugün bekleyen işlemlere bir göz atın.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Ara..." className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:border-orange-500 shadow-sm" />
            </div>
            <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-600 hover:text-orange-500 shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid - now computed from real data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center"><Clock size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Bekleyen İstekler</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{reservationsLoading ? "…" : pendingCount}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Onaylanan</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{reservationsLoading ? "…" : approvedCount}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><Users size={28} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold">Toplam Müşteri</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{isLoading ? "…" : totalCustomerCount}</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservations Table - now real */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Son Rezervasyonlar</h2>
            </div>
            <div className="overflow-x-auto">
              {reservationsLoading ? (
                <p className="p-6 text-slate-500 text-sm">Yükleniyor...</p>
              ) : reservations.length === 0 ? (
                <p className="p-6 text-slate-500 text-sm">Henüz rezervasyon yok.</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-bold">Müşteri</th>
                      <th className="px-6 py-4 font-bold">Tarih / Saat</th>
                      <th className="px-6 py-4 font-bold">Detay</th>
                      <th className="px-6 py-4 font-bold">Durum</th>
                      <th className="px-6 py-4 font-bold">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 dark:text-white">{res.full_name}</p>
                          <p className="text-xs text-slate-400">{res.phone}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {res.reservation_date} <br/> <span className="text-slate-400">{res.reservation_time}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {res.guest_count} <br/> <span className="text-slate-400">{res.area_preference}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            res.status === "Onaylandı" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {res.status || "Bekliyor"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {res.status !== "Onaylandı" && (
                            <button onClick={() => handleApprove(res.id)} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors">
                              Onayla
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Real Customer List from Supabase */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Yeni Kayıtlar</h2>
            {isLoading ? (
              <p className="text-slate-500 text-sm">Yükleniyor...</p>
            ) : customers.length > 0 ? (
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold uppercase">
                      {(customer.full_name || "U")[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{customer.full_name || "İsimsiz Kullanıcı"}</p>
                      <p className="text-slate-500 text-xs">{customer.phone || "Telefon belirtilmemiş"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Henüz kayıtlı müşteri yok.</p>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
