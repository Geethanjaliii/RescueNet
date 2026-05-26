import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, Navigation, X, Phone, CheckCircle, MessageSquareWarning, Ambulance, LocateFixed, Route } from 'lucide-react';
import { MOCK_SERVICES } from '../../utils/mockData';

const EMERGENCY_TOASTS = [
  {
    id: 'contact-alerted',
    title: 'Contact alerted',
    description: 'Emergency contacts have been notified with your live SOS signal.',
    icon: MessageSquareWarning
  },
  {
    id: 'ambulance-dispatched',
    title: 'Ambulance dispatched',
    description: 'A response unit has been assigned to the incident location.',
    icon: Ambulance
  },
  {
    id: 'gps-shared',
    title: 'GPS shared',
    description: 'Your location is now being shared with rescue responders.',
    icon: LocateFixed
  },
  {
    id: 'route-generated',
    title: 'Hospital route generated',
    description: 'Fastest route to the nearest hospital is ready for navigation.',
    icon: Route
  }
];

const SOSModal = ({ isOpen, onClose, autoTrigger = false }) => {
  const [countdown, setCountdown] = useState(10);
  const [status, setStatus] = useState(autoTrigger ? 'counting' : 'active');
  const [notifications, setNotifications] = useState([]);
  const nearestHospital = MOCK_SERVICES.find(s => s.type === 'hospital');

  useEffect(() => {
    let timer;
    if (isOpen && status === 'counting' && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (isOpen && status === 'counting' && countdown === 0) {
      timer = setTimeout(() => setStatus('active'), 0);
    }
    return () => clearTimeout(timer);
  }, [isOpen, status, countdown]);

  useEffect(() => {
    if (!isOpen || status !== 'active') {
      return undefined;
    }

    const timers = EMERGENCY_TOASTS.map((toast, index) => (
      setTimeout(() => {
        setNotifications(current => (
          current.some(item => item.id === toast.id)
            ? current
            : [...current, toast]
        ));
      }, index * 900)
    ));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen, status]);

  const handleCancel = () => {
    setStatus('cancelled');
    setNotifications([]);
    setTimeout(() => {
      onClose();
      setStatus(autoTrigger ? 'counting' : 'active');
      setCountdown(10);
    }, 1500);
  };

  const handleManualTrigger = () => {
    setNotifications([]);
    setStatus('active');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-darker border-2 border-primary/50 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,51,51,0.3)] relative"
        >
          {status === 'counting' && (
            <div className="p-8 text-center flex flex-col items-center">
              <AlertTriangle size={64} className="text-primary mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-white mb-2">Accident Detected</h2>
              <p className="text-gray-400 mb-8">SOS will be sent automatically in</p>
              
              <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center text-5xl font-bold text-white mb-8 relative">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                {countdown}
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={handleCancel}
                  className="flex-1 py-4 bg-card rounded-xl text-white font-semibold hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleManualTrigger}
                  className="flex-1 py-4 bg-primary rounded-xl text-white font-bold hover:bg-primary-hover shadow-[0_0_20px_rgba(255,51,51,0.5)] transition"
                >
                  Send Now
                </button>
              </div>
            </div>
          )}

          {status === 'active' && (
            <div className="p-6">
              <div className="absolute right-4 top-4 z-10 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6 sm:w-80">
                <AnimatePresence>
                  {notifications.map((notification) => {
                    const Icon = notification.icon;

                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 24, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 24, scale: 0.96 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#0e1b15]/95 shadow-[0_0_35px_rgba(16,185,129,0.16)] backdrop-blur-xl"
                      >
                        <div className="flex items-start gap-3 px-4 py-3">
                          <div className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_18px_rgba(74,222,128,0.18)]">
                            <span className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-md animate-pulse" />
                            <Icon size={18} className="relative" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold text-white">{notification.title}</h3>
                              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200">
                                Live
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-300">{notification.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <span className="animate-pulse w-3 h-3 rounded-full bg-primary" />
                    SOS ACTIVE
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">RescueNet emergency services notified</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-4 rounded-2xl border border-primary/20">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-white">Nearest RescueNet Hospital</h3>
                      <p className="text-sm text-gray-300">{nearestHospital.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{nearestHospital.distance} • {nearestHospital.time} away</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-primary/20 text-primary py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/30 transition">
                      <Phone size={16} />
                      Call
                    </button>
                    <button className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-500/30 transition">
                      <Navigation size={16} />
                      Navigate
                    </button>
                  </div>
                </div>

                <div className="glass p-4 rounded-2xl">
                  <h3 className="font-semibold text-sm text-gray-300 mb-3">RescueNet Alert Status</h3>
                  <ul className="space-y-3">
                    {['Local Authorities', 'Emergency Contacts', 'Nearby Hospitals'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                        <CheckCircle size={16} className="text-green-500" />
                        Notified {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={handleCancel}
                className="w-full mt-6 py-3 border border-gray-600 rounded-xl text-gray-400 text-sm font-semibold hover:bg-gray-800 transition"
              >
                End Emergency Mode
              </button>
            </div>
          )}

          {status === 'cancelled' && (
            <div className="p-8 text-center">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">SOS Cancelled</h2>
              <p className="text-gray-400">Emergency services stand down.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SOSModal;
