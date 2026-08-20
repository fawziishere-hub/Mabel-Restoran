import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const user = token?.user;

  useEffect(() => {
    let lastYPos = window.scrollY;
    const handleScroll = () => {
      const currentYPos = window.scrollY;
      const isScrollingUp = currentYPos < lastYPos;

      setHidden(!isScrollingUp && currentYPos > 300);
      setScrolled(currentYPos > 50);
      lastYPos = currentYPos;
    };

    window.addEventListener("scroll", handleScroll, false);
    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
    window.location.reload();
  };

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Menü", path: "/menu" },
    { name: "Rezervasyon", path: "/rezervasyon" },
    { name: "İletişim", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed left-0 right-0 z-50 transition-all lg:px-10 px-2 ${
          scrolled
            ? `bg-white/90 backdrop-blur-md shadow-sm py-3 w-full md:w-[97vw] mx-auto px-4 ${
                hidden ? "-top-2" : "top-3"
              } md:rounded-full border border-slate-200`
            : "top-0 py-5 bg-white border-b border-slate-100"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Real Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img 
                src="/images/450201304_1539576273654166_470384146796434157_n (1).jpg" 
                alt="Mabel Logo" 
                className="h-10 md:h-14 w-auto object-contain rounded-md"
              />
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`transition-colors font-bold tracking-wide text-sm ${
                      isActivePath(link.path)
                        ? "text-orange-500"
                        : "text-slate-600 hover:text-orange-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 transition-colors text-slate-700 hover:text-orange-500"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold uppercase border-2 border-orange-200">
                      {user?.name?.[0] || user?.full_name?.[0] || "U"}
                    </div>
                    <span className="font-semibold text-sm capitalize">{user?.name || user?.full_name}</span>
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLogout}
                    className="transition-colors p-2 text-slate-400 hover:text-red-500"
                    title="Çıkış Yap"
                  >
                    <FiLogOut size={20} />
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pl-4 border-l border-slate-200"
                >
                  <Link
                    to="/auth"
                    className="px-6 py-2.5 bg-orange-500 text-white text-sm rounded-full font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 block"
                  >
                    Giriş Yap
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-colors text-slate-600 hover:bg-orange-50"
              >
                {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden mt-3 rounded-2xl shadow-xl absolute left-4 right-4"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 font-bold text-lg ${
                        isActivePath(link.path)
                          ? "text-orange-500"
                          : "text-slate-700 hover:text-orange-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {user ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 mt-2 border-t border-slate-100 space-y-3"
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer p-2 hover:bg-orange-50 rounded-xl"
                      onClick={() => {
                        navigate("/dashboard");
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-lg font-bold uppercase border-2 border-orange-200">
                        {user?.name?.[0] || user?.full_name?.[0] || "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">
                          {user?.name || user?.full_name}
                        </span>
                        <span className="text-sm text-slate-500 font-medium">
                          Hesabım
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 text-red-500 font-bold hover:bg-red-50 p-3 rounded-xl transition-colors"
                    >
                      <FiLogOut size={20} />
                      Çıkış Yap
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 mt-2 border-t border-slate-100"
                  >
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center px-6 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
                    >
                      Giriş Yap
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;