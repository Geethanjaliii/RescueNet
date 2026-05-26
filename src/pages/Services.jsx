import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Hospital, Shield, LocateFixed, Waves } from 'lucide-react';
import { MOCK_SERVICES } from '../utils/mockData';
import { getCurrentLocation } from '../utils/geolocation';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CustomIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const markerColorByType = {
  hospital: 'red',
  trauma: 'violet',
  police: 'blue',
  towing: 'orange'
};

const categoryMeta = {
  hospital: {
    label: 'Hospitals',
    icon: Hospital,
    accent: 'text-red-300 border-red-400/20 bg-red-400/10'
  },
  police: {
    label: 'Police Stations',
    icon: Shield,
    accent: 'text-blue-200 border-blue-400/20 bg-blue-400/10'
  }
};

const MapFocus = ({ location }) => {
  return location ? (
    <CircleMarker center={[location.lat, location.lng]} radius={18} pathOptions={{ color: '#4ade80', fillColor: '#4ade80', fillOpacity: 0.15, weight: 2 }} />
  ) : null;
};

const Services = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const filteredServices = useMemo(
    () => MOCK_SERVICES.filter(s => filter === 'all' || s.type === filter),
    [filter]
  );

  const hospitals = useMemo(
    () => MOCK_SERVICES.filter(service => service.type === 'hospital' || service.type === 'trauma'),
    []
  );

  const policeStations = useMemo(
    () => MOCK_SERVICES.filter(service => service.type === 'police'),
    []
  );

  useEffect(() => {
    getCurrentLocation()
      .then((loc) => {
        setLocation(loc);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Fallback location (Chennai for demo)
        setLocation({ lat: 13.0827, lng: 80.2707 });
        setLoading(false);
      });
  }, []);

  const mapCenter = location ? [location.lat, location.lng] : [13.0827, 80.2707];

  return (
    <div className="min-h-screen pb-24 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-3xl border border-white/10 bg-card/75 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-red-300/80">OpenStreetMap</p>
                <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">Nearby emergency services</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Lightweight map support powered by React Leaflet with live user location, emergency markers, and fast access to nearby help.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                </span>
                GPS active
              </div>
            </div>
        
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <LocateFixed size={16} className="text-emerald-300" />
                  Current location
                </div>
                <p className="mt-2 text-sm font-semibold text-white">
                  {loading ? 'Detecting user location...' : `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <Hospital size={16} className="text-red-300" />
                  Hospitals
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{hospitals.length} nearby options</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield size={16} className="text-blue-300" />
                  Police stations
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{policeStations.length} nearby options</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {['all', 'hospital', 'trauma', 'police', 'towing'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                    filter === f ? 'bg-primary text-white shadow-[0_0_20px_rgba(255,51,51,0.35)]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="glass-card relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 z-0 sm:min-h-[400px] lg:min-h-[460px]">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-darker">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                ) : (
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <MapFocus location={location} />
                    {location && (
                      <Marker position={[location.lat, location.lng]} icon={CustomIcon('green')}>
                        <Popup>
                          <div className="font-sans text-darker">
                            <strong className="block text-sm">You are here</strong>
                            <span className="text-xs text-gray-600">Live GPS location shared</span>
                          </div>
                        </Popup>
                      </Marker>
                    )}
                    {filteredServices.map(service => (
                      <Marker
                        key={service.id}
                        position={[service.lat, service.lng]}
                        icon={CustomIcon(markerColorByType[service.type] || 'gray')}
                      >
                        <Popup>
                          <div className="font-sans text-darker">
                            <strong className="block text-sm">{service.name}</strong>
                            <span className="text-xs text-gray-600">{service.distance} away • {service.time}</span>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Legend</h2>
                    <Waves size={18} className="text-red-300" />
                  </div>
                  <div className="space-y-3">
                    {Object.entries(categoryMeta).map(([type, meta]) => {
                      const Icon = meta.icon;

                      return (
                        <div key={type} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${meta.accent}`}>
                          <Icon size={18} />
                          <div>
                            <p className="text-sm font-semibold text-white">{meta.label}</p>
                            <p className="text-xs text-slate-400">Emergency markers on the map</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <h2 className="text-lg font-bold text-white">Map notes</h2>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>• Dark CARTO tiles keep the interface readable at night.</li>
                    <li>• Green marker highlights the current user location.</li>
                    <li>• Hospitals and police stations are grouped from mock data for demo use.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* List */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredServices.map(service => (
            <div key={service.id} className="glass rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${service.type === 'hospital' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{service.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{service.distance} • {service.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${service.phone}`} className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-500/30 transition">
                  <Phone size={18} />
                </a>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lng}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/30 transition">
                  <Navigation size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
