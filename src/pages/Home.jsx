import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertOctagon,
  Ambulance,
  CarFront,
  Clock3,
  HeartPulse,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck
} from 'lucide-react';
import SOSModal from '../components/emergency/SOSModal';
import { MOCK_SERVICES } from '../utils/mockData';

const SERVICE_STATUS = {
  hospital: {
    label: '24/7 Emergency',
    tone: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
    icon: ShieldCheck
  },
  trauma: {
    label: 'Trauma Ready',
    tone: 'border-red-400/20 bg-red-400/10 text-red-200',
    icon: Ambulance
  },
  police: {
    label: 'Dispatch Online',
    tone: 'border-blue-400/20 bg-blue-400/10 text-blue-200',
    icon: AlertOctagon
  },
  towing: {
    label: 'Vehicle Support',
    tone: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
    icon: CarFront
  }
};

const buildMapsUrl = (service) => {
  const destination = `${service.lat},${service.lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
};

const Home = () => {
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isAutoTrigger, setIsAutoTrigger] = useState(false);

  const handleManualSOS = () => {
    setIsAutoTrigger(false);
    setIsSOSOpen(true);
  };

  const handleSimulateAccident = () => {
    setIsAutoTrigger(true);
    setIsSOSOpen(true);
  };

  return (
    <div className="min-h-screen pb-24 pt-20 px-4 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-200">
          RescueNet
        </div>
        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Intelligent Emergency Response During the <span className="text-primary">Golden Hour</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg leading-7">
          Rapid SOS activation, live location sharing, nearby emergency services, and first-aid guidance designed to help save minutes when every second matters.
        </p>
      </motion.div>

      {/* Main SOS Button */}
      <div className="flex-1 flex items-center justify-center w-full my-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-emergency-pulse pointer-events-none" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleManualSOS}
            className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#ff4d4d] to-[#cc0000] rounded-full shadow-[0_0_60px_rgba(255,51,51,0.6)] flex flex-col items-center justify-center gap-4 border-8 border-darker relative z-10 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <AlertOctagon size={80} className="text-white drop-shadow-lg" />
            <span className="text-5xl font-black text-white tracking-widest drop-shadow-lg">SOS</span>
            <span className="text-sm text-white/80 font-medium">PRESS FOR EMERGENCY</span>
          </motion.button>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="w-full max-w-6xl mb-10"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-red-300/80">Nearby help</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Emergency services near you</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            </span>
            Live demo data
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {MOCK_SERVICES.map((service, index) => {
            const status = SERVICE_STATUS[service.type] || SERVICE_STATUS.hospital;
            const StatusIcon = status.icon;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-card/75 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-red-500/25"
              >
                <div className="border-b border-white/5 bg-gradient-to-br from-white/5 via-transparent to-red-500/10 p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-200 shadow-[0_0_18px_rgba(255,51,51,0.12)]">
                      <MapPin size={22} />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ${status.tone}`}>
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{service.type === 'hospital' ? 'Nearest hospital' : service.type === 'trauma' ? 'Specialized trauma center' : 'Nearby emergency support'}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={14} />
                        Distance
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">{service.distance}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock3 size={14} />
                        ETA
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">{service.time}</div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-4 py-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/80">Emergency availability</p>
                      <p className="mt-1 text-sm font-semibold text-emerald-100">Open for urgent response</p>
                    </div>
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.95)]" />
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`tel:${service.phone}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/15"
                    >
                      <Phone size={16} className="text-red-300" />
                      Call
                    </a>
                    <a
                      href={buildMapsUrl(service)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/15"
                    >
                      <Navigation size={16} className="text-emerald-300" />
                      Navigate
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* Accident Simulator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md mt-auto"
      >
        <div className="glass-card p-6 rounded-3xl text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CarFront className="text-primary" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">RescueNet Demo Mode</h3>
          <p className="text-gray-400 text-sm mb-6">
            Simulate a crash detection event to see the automated response workflow.
          </p>
          <button 
            onClick={handleSimulateAccident}
            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition"
          >
            <HeartPulse size={20} className="text-primary" />
            Simulate Accident
          </button>
        </div>
      </motion.div>

      <SOSModal 
        isOpen={isSOSOpen} 
        onClose={() => setIsSOSOpen(false)} 
        autoTrigger={isAutoTrigger} 
      />
    </div>
  );
};

export default Home;
