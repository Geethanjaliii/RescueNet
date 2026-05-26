import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Contacts from './pages/Contacts'
import FirstAid from './pages/FirstAid'
import About from './pages/About'
import { Satellite, ShieldCheck, Radar, Wifi, Sparkles } from 'lucide-react'

const LIVE_STATUS_ITEMS = [
  {
    label: 'GPS Connected',
    icon: Satellite,
    detail: 'Location feed active',
  },
  {
    label: 'Emergency Services Online',
    icon: ShieldCheck,
    detail: 'Dispatch network ready',
  },
  {
    label: 'Crash Detection Active',
    icon: Radar,
    detail: 'Impact monitoring enabled',
  },
  {
    label: 'Network Stable',
    icon: Wifi,
    detail: 'Signal quality strong',
  },
]

function App() {
  return (
    <Router>
      <div className="bg-darker text-white min-h-screen">
        <Navbar />
        <div className="mt-4 md:mt-20 px-4 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-emerald-400/20 bg-[#0f1714]/90 shadow-[0_0_50px_rgba(16,185,129,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b border-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2 text-emerald-300/90">
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-[0.28em]">Live Emergency Status</span>
                </div>
                <p className="mt-1 text-sm text-slate-300">Real-time readiness signals for RescueNet response workflows.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                </span>
                Monitoring active
              </div>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
              {LIVE_STATUS_ITEMS.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="group flex items-start gap-3 rounded-2xl border border-emerald-400/15 bg-black/20 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/35 hover:bg-emerald-400/10"
                  >
                    <div className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_18px_rgba(34,197,94,0.18)]">
                      <span className="absolute inset-0 rounded-2xl bg-emerald-400/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-emerald-200 bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.95)] animate-pulse" />
                      <Icon size={20} className="relative" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold text-white">{item.label}</h2>
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                          Online
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{item.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/firstaid" element={<FirstAid />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
