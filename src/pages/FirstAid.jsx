import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Ambulance,
  ArrowRight,
  Bandage,
  Bone,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Droplets,
  Flame,
  HeartPulse,
  PhoneCall,
  ShieldAlert,
  Siren,
  Stethoscope
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const EMERGENCY_GUIDES = [
  {
    id: 'cpr',
    title: 'CPR',
    severity: 'Critical',
    icon: HeartPulse,
    description: 'For a person who is unresponsive and not breathing normally. Start chest compressions immediately while help is on the way.',
    warnings: ['No normal breathing', 'Blue lips or skin', 'No response to voice or touch'],
    steps: [
      'Call emergency services and put the phone on speaker.',
      'Place the heel of one hand in the center of the chest and push hard and fast at 100 to 120 compressions per minute.',
      'Allow full chest recoil between compressions.',
      'Use an AED as soon as it is available and follow the voice prompts.',
      'If you are trained, give rescue breaths after every 30 compressions.'
    ],
    donts: [
      'Do not delay compressions while checking for a pulse for too long.',
      'Do not stop unless the person starts breathing normally or professionals take over.',
      'Do not compress on the ribs or upper abdomen.'
    ],
    illustration: 'cpr'
  },
  {
    id: 'bleeding',
    title: 'Severe Bleeding',
    severity: 'Critical',
    icon: Droplets,
    description: 'Heavy bleeding can become life-threatening within minutes. Pressure and fast escalation matter more than cleaning the wound first.',
    warnings: ['Blood soaks through cloth quickly', 'Spurting or pooling blood', 'Pale, cold, or sweaty skin'],
    steps: [
      'Apply firm direct pressure with clean cloth, gauze, or a gloved hand.',
      'Pack the wound if it is deep and keep pressure constant.',
      'Add more layers without removing the soaked cloth underneath.',
      'Raise the injured area if it is safe to do so.',
      'If bleeding is still uncontrollable, use a tourniquet only if you are trained and emergency help is not yet there.'
    ],
    donts: [
      'Do not remove embedded objects.',
      'Do not keep lifting the dressing to inspect the wound.',
      'Do not use powders or home remedies.'
    ],
    illustration: 'bleeding'
  },
  {
    id: 'fractures',
    title: 'Fractures',
    severity: 'Moderate',
    icon: Bone,
    description: 'Suspect a fracture when there is deformity, severe pain, swelling, or the person cannot safely move the limb.',
    warnings: ['Visible deformity', 'Bone protruding', 'Loss of function or severe pain'],
    steps: [
      'Keep the injured area still and support it in the position found.',
      'Immobilize with a splint above and below the suspected fracture.',
      'Apply a cold pack wrapped in cloth to reduce swelling.',
      'Check circulation, sensation, and movement beyond the injury.',
      'Get medical evaluation promptly, especially for the head, spine, pelvis, or an open fracture.'
    ],
    donts: [
      'Do not try to realign the bone.',
      'Do not let the person walk on a suspected leg fracture.',
      'Do not wrap tightly enough to cut off circulation.'
    ],
    illustration: 'fracture'
  },
  {
    id: 'burns',
    title: 'Burns',
    severity: 'Moderate',
    icon: Flame,
    description: 'Cooling the injury quickly reduces damage. Severe burns, chemical burns, and electrical burns need urgent medical attention.',
    warnings: ['Blistering or charred skin', 'Burn on face, hands, feet, or genitals', 'Chemical or electrical exposure'],
    steps: [
      'Cool the burn under cool running water for 20 minutes.',
      'Remove rings, watches, or tight clothing if they are not stuck.',
      'Cover the area with a sterile non-stick dressing or clean cloth.',
      'Seek emergency care for large, deep, chemical, or electrical burns.',
      'Monitor for shock and keep the person warm.'
    ],
    donts: [
      'Do not apply ice, butter, toothpaste, or oils.',
      'Do not pop blisters.',
      'Do not peel off clothing stuck to the wound.'
    ],
    illustration: 'burns'
  },
  {
    id: 'unconscious',
    title: 'Unconscious Person',
    severity: 'Critical',
    icon: Activity,
    description: 'An unconscious person may be in immediate danger. Focus on breathing, airway, and preventing further harm.',
    warnings: ['No response to voice or touch', 'Slow or absent breathing', 'Possible seizure or collapse'],
    steps: [
      'Check responsiveness by speaking loudly and gently tapping the shoulder.',
      'Call emergency services immediately.',
      'Open the airway and check breathing for no more than 10 seconds.',
      'If breathing, place the person in the recovery position.',
      'If not breathing normally, begin CPR right away.'
    ],
    donts: [
      'Do not give food, drink, or medication.',
      'Do not leave the person alone.',
      'Do not shake the person or assume they will wake up on their own.'
    ],
    illustration: 'unconscious'
  },
  {
    id: 'road-accident',
    title: 'Road Accident Response',
    severity: 'Critical',
    icon: Car,
    description: 'First secure the scene, then check the victim. Road accidents can hide spinal injury, internal bleeding, and fuel hazards.',
    warnings: ['Vehicle smoke or fuel leak', 'Multiple injuries or trapped victim', 'Helmet or spine concerns'],
    steps: [
      'Make the scene safe by parking away from traffic and using hazard lights if possible.',
      'Call emergency services and report the exact location and number of victims.',
      'Check breathing and control major bleeding while waiting for responders.',
      'Keep the person still and calm if spinal injury is possible.',
      'Stay visible to incoming rescue teams and guide them if needed.'
    ],
    donts: [
      'Do not move the victim unless there is immediate danger like fire.',
      'Do not remove a helmet unless the airway is compromised and you are trained to do so.',
      'Do not crowd the scene or block rescuers.'
    ],
    illustration: 'road-accident'
  }
];

const QUICK_STEPS = [
  {
    title: 'Call emergency services',
    description: 'Use speakerphone and keep the line open for instructions.',
    icon: PhoneCall
  },
  {
    title: 'Check breathing',
    description: 'Look for chest rise and listen for normal breaths for up to 10 seconds.',
    icon: Stethoscope
  },
  {
    title: 'Stop bleeding',
    description: 'Direct pressure, packing, and escalation can save minutes when every second counts.',
    icon: Bandage
  },
  {
    title: 'Keep victim conscious',
    description: 'Talk calmly, keep them warm, and monitor for changes until help arrives.',
    icon: ShieldAlert
  }
];

const SEVERITY_STYLES = {
  Critical: 'border-red-500/30 bg-red-500/15 text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.15)]',
  Moderate: 'border-amber-500/30 bg-amber-500/15 text-amber-100 shadow-[0_0_30px_rgba(245,158,11,0.12)]',
  Minor: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.12)]'
};

const Illustration = ({ variant }) => {
  const common = {
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none'
  };

  switch (variant) {
    case 'cpr':
      return (
        <svg viewBox="0 0 240 160" className="h-full w-full text-red-200">
          <defs>
            <linearGradient id="cprGlow" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,51,51,0.25)" />
            </linearGradient>
          </defs>
          <rect x="24" y="24" width="192" height="112" rx="24" fill="url(#cprGlow)" opacity="0.8" />
          <path d="M44 108h24l10-18 14 38 12-58 10 24h92" {...common} className="opacity-90" />
          <circle cx="82" cy="62" r="18" {...common} />
          <path d="M82 82v14m0 0h20m-20 0h-18" {...common} />
        </svg>
      );
    case 'bleeding':
      return (
        <svg viewBox="0 0 240 160" className="h-full w-full text-red-200">
          <rect x="28" y="28" width="184" height="104" rx="24" fill="rgba(255,51,51,0.08)" />
          <path d="M108 40c18 26 34 41 34 60a22 22 0 1 1-44 0c0-19 16-34 10-60Z" {...common} />
          <path d="M70 106h100" {...common} />
          <path d="M76 96h22m-10-14v28" {...common} />
          <path d="M150 56l10-10m-10 0l10 10" {...common} />
        </svg>
      );
    case 'fracture':
      return (
        <svg viewBox="0 0 240 160" className="h-full w-full text-red-200">
          <rect x="28" y="28" width="184" height="104" rx="24" fill="rgba(255,255,255,0.04)" />
          <path d="M70 112c18-8 28-20 36-32 11-16 27-20 41-10 14 10 27 16 42 10" {...common} />
          <path d="M92 74l18 18-8 16 22 12" {...common} />
          <path d="M168 72l-18 16 10 18-16 12" {...common} />
        </svg>
      );
    case 'burns':
      return (
        <svg viewBox="0 0 240 160" className="h-full w-full text-red-200">
          <rect x="28" y="28" width="184" height="104" rx="24" fill="rgba(255,51,51,0.07)" />
          <path d="M118 40c8 20-12 28-4 42 8 14 28 18 28 38 0 18-14 30-30 30s-30-12-30-30c0-14 8-22 18-32 10-10 6-24 18-48Z" {...common} />
          <path d="M74 104h92" {...common} />
          <path d="M156 54l10 10m-10 0l10-10" {...common} />
        </svg>
      );
    case 'unconscious':
      return (
        <svg viewBox="0 0 240 160" className="h-full w-full text-red-200">
          <rect x="28" y="28" width="184" height="104" rx="24" fill="rgba(255,255,255,0.04)" />
          <circle cx="92" cy="66" r="18" {...common} />
          <path d="M64 112c8-18 24-28 42-28s34 10 42 28" {...common} />
          <path d="M150 52l12 12m0-12l-12 12" {...common} />
          <path d="M162 88h18" {...common} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 240 160" className="h-full w-full text-red-200">
          <rect x="28" y="28" width="184" height="104" rx="24" fill="rgba(255,255,255,0.04)" />
          <path d="M64 102h112" {...common} />
          <path d="M78 86l22 14 18-24 28 32" {...common} />
          <circle cx="168" cy="56" r="18" {...common} />
        </svg>
      );
  }
};

const FirstAid = () => {
  const [openId, setOpenId] = useState('cpr');

  const toggleOpen = (id) => {
    setOpenId(currentId => (currentId === id ? null : id));
  };

  return (
    <div className="min-h-screen overflow-hidden pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,51,51,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[linear-gradient(to_bottom,rgba(255,51,51,0.16),transparent)] blur-3xl" />

      <div className="mx-auto max-w-7xl space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_30%,rgba(255,51,51,0.08))]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                <Siren size={16} />
                Emergency guidance center
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  First Aid Assistant for rapid, confident emergency decisions.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  RescueNet keeps critical advice in one place with illustrated response cards, severity badges, warning cues, and practical steps that can be scanned in seconds.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Priority</div>
                  <div className="mt-1 font-semibold text-white">Preserve life first</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Layout</div>
                  <div className="mt-1 font-semibold text-white">Responsive emergency grid</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Design</div>
                  <div className="mt-1 font-semibold text-white">Dark theme with red accents</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-8 rounded-full bg-red-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-darker/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Live response board</span>
                  <span className="rounded-full border border-red-500/30 bg-red-500/15 px-3 py-1 text-xs text-red-200">Hackathon ready</span>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4">
                  <Illustration variant="cpr" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-slate-500">Emergency focus</div>
                    <div className="mt-1 font-semibold text-white">Call, assess, act</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-slate-500">Tone</div>
                    <div className="mt-1 font-semibold text-white">Calm and direct</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-3xl border border-white/10 bg-card/70 p-5 shadow-lg shadow-black/20 backdrop-blur-xl transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-200">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300/90">Quick step {index + 1}</div>
                    <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{step.description}</p>
              </motion.div>
            );
          })}
        </section>

        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-300/80">Emergency playbook</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Illustrated first aid cards</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-300" />
              Color-coded by severity
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {EMERGENCY_GUIDES.map((guide, index) => {
              const Icon = guide.icon;
              const isOpen = openId === guide.id;

              return (
                <motion.article
                  key={guide.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className={`group overflow-hidden rounded-3xl border bg-card/75 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 ${isOpen ? 'border-red-500/35' : 'border-white/10'}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleOpen(guide.id)}
                    className="w-full text-left"
                  >
                    <div className="relative h-48 overflow-hidden border-b border-white/5 bg-gradient-to-br from-white/5 via-black/0 to-red-500/10 p-4">
                      <div className="absolute inset-0 opacity-60">
                        <Illustration variant={guide.illustration} />
                      </div>
                      <div className="relative flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-red-200 shadow-lg shadow-black/20">
                            <Icon size={22} />
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${SEVERITY_STYLES[guide.severity]}`}>
                            {guide.severity}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-white">{guide.title}</h3>
                          <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">{guide.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4">
                      <div className="text-sm text-slate-400">Tap to expand detailed response steps</div>
                      <div className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition-transform duration-300 group-hover:translate-y-0.5">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-5 border-t border-white/10 px-5 py-5 text-sm text-slate-200">
                          <div>
                            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-300/80">
                              <AlertTriangle size={14} />
                              Warning indicators
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {guide.warnings.map((warning) => (
                                <span key={warning} className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-200">
                                  {warning}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                              Detailed steps
                            </div>
                            <ol className="space-y-3">
                              {guide.steps.map((step, stepIndex) => (
                                <li key={step} className="flex gap-3 rounded-2xl border border-white/8 bg-black/20 p-3 leading-6 text-slate-300">
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-200">
                                    {stepIndex + 1}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div>
                            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                              Do NOT do this
                            </div>
                            <ul className="space-y-2">
                              {guide.donts.map((tip) => (
                                <li key={tip} className="flex gap-3 rounded-2xl border border-white/8 bg-white/5 p-3 leading-6 text-slate-300">
                                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-red-300" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="grid gap-4 rounded-3xl border border-red-500/20 bg-red-500/10 p-5 shadow-2xl shadow-red-950/10 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div>
            <div className="flex items-center gap-2 text-red-200">
              <ShieldAlert size={18} />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Important disclaimer</span>
            </div>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-red-100/85">
              This guide is for fast reference only and does not replace professional care. When in doubt, call emergency services, follow dispatcher instructions, and avoid any procedure you have not been trained to perform.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
            <Ambulance size={18} className="text-red-300" />
            Professional help first, always
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FirstAid;
