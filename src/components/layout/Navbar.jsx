import { NavLink } from 'react-router-dom';
import { Home, Map, Phone, HeartPulse, Info } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { id: 'home', path: '/', icon: Home, label: 'Home' },
    { id: 'services', path: '/services', icon: Map, label: 'Services' },
    { id: 'contacts', path: '/contacts', icon: Phone, label: 'Contacts' },
    { id: 'firstaid', path: '/firstaid', icon: HeartPulse, label: 'First Aid' },
    { id: 'about', path: '/about', icon: Info, label: 'About' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 w-full glass z-50 px-6 py-4 justify-between items-center">
        <div className="flex items-center gap-3 text-primary font-bold text-2xl">
          <div className="relative flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
            <HeartPulse size={32} className="relative animate-pulse" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)] animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span>RescueNet</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-red-300/80">Intelligent emergency response</span>
          </div>
        </div>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <div className="ml-2 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            </span>
            LIVE
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full glass z-50 px-2 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <item.icon size={24} />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
