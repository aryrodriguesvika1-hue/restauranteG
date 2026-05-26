import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, ShoppingBag, Clock, MapPin, Instagram, Facebook, UserCircle, MessageCircle } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';

export function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-display font-bold text-2xl text-secondary">
                G
              </div>
              <div>
                <h1 className="text-xl font-bold leading-none">O Glutão</h1>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Take-Away & Grelhados</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'hover:text-primary'}`}>Início</Link>
              <Link to="/cardapio" className={`text-sm font-medium transition-colors ${location.pathname === '/cardapio' ? 'text-primary' : 'hover:text-primary'}`}>Cardápio</Link>
              {user ? (
                 <div className="flex items-center gap-4">
                   <span className="text-sm text-neutral-500 font-medium">Olá, {user.email?.split('@')[0]}</span>
                   <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Sair</button>
                 </div>
              ) : (
                <Link to="/login" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <UserCircle size={18} />
                  <span>Entrar</span>
                </Link>
              )}
              <Link to="/encomendar" className="btn-primary py-2 px-6 flex items-center gap-2">
                <ShoppingBag size={18} />
                <span>Encomendar</span>
              </Link>
            </nav>

            <div className="md:hidden">
              <Link to="/encomendar" className="bg-primary p-3 rounded-full text-secondary">
                <ShoppingBag size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-display font-bold text-3xl text-secondary">
                  G
                </div>
                <div>
                  <h2 className="text-2xl font-bold leading-none">O Glutão</h2>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest">Take-Away & Grelhados</p>
                </div>
              </Link>
              <p className="text-neutral-400 max-w-sm mb-6">
                "O Sabor que mata a fome e conquista o coração." Os melhores grelhados e acompanhamentos prontos para levar em Luanda.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/restaurante_glutao" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center hover:bg-neutral-800 hover:text-primary hover:border-primary transition-colors hover:scale-110 active:scale-95 duration-150">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center hover:bg-neutral-800 hover:text-primary hover:border-primary transition-colors hover:scale-110 active:scale-95 duration-150">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Contactos</h3>
              <ul className="space-y-6 text-neutral-400 mb-8">
                <li className="flex items-start gap-2.5">
                  <Clock size={20} className="text-primary mt-1 shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Horário</span>
                    <span>Seg - Dom: 08:00 - 21:00</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="text-primary mt-1 shrink-0" size={20} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <div>
                    <span className="font-semibold text-white block">Telefones</span>
                    <span>923 767 150 <br /> 913 747 252</span>
                  </div>
                </li>
                <li className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-1 shrink-0" />
                    <div>
                      <span className="font-semibold text-white block">Localização</span>
                      <span className="text-sm">Rua Conego Manuel Das Neves - Kinaxixi, Luanda</span>
                    </div>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Rua+Conego+Manuel+Das+Neves+Kinaxixi+Luanda+Angola" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative block overflow-hidden rounded-xl border border-neutral-800 mt-2 hover:border-primary/50 transition-all aspect-video w-full"
                  >
                    <img 
                      src="/src/assets/images/kinaxixi_map_location_1779715799047.png" 
                      alt="Mapa Kinaxixi - O Glutão" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 flex items-center justify-center transition-colors">
                      <span className="bg-primary/95 text-secondary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                        <MapPin size={12} className="fill-secondary text-secondary" />
                        Ver Mapa
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Links Úteis</h3>
              <ul className="space-y-3 text-neutral-400">
                <li><Link to="/cardapio" className="hover:text-primary transition-colors">Cardápio</Link></li>
                <li><Link to="/encomendar" className="hover:text-primary transition-colors">Fazer Encomenda</Link></li>
                <li><Link to="/admin" className="hover:text-primary transition-colors text-xs opacity-50">Painel Admin</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-16 pt-8 text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} O Glutão Take-Away. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Botão de WhatsApp Flutuante */}
      <a
        href="https://wa.me/244923767150?text=Ol%C3%A1%20O%20Glut%C3%A3o%20Take-Away%20e%20Grelhados,%20gostaria%20de%20fazer%20uma%20encomenda"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-neutral-950/25 font-bold transition-all hover:scale-105 active:scale-95 duration-200"
      >
        <MessageCircle size={20} className="fill-white text-[#25D366]" />
        <span>WhatsApp – Fazer Pedido</span>
      </a>
    </div>
  );
}
