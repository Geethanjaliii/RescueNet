import { HeartPulse, Users, ShieldAlert, Code } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pb-24 pt-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <HeartPulse size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">About RescueNet</h1>
          <p className="text-primary font-medium tracking-widest text-sm uppercase">AI-Powered Emergency Response Platform</p>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldAlert className="text-primary" size={24} />
              The Mission
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The "Golden Hour" refers to the critical 60 minutes after a traumatic injury when prompt medical treatment has the highest likelihood of preventing death. RescueNet is designed to minimize response times by instantly connecting victims with nearby hospitals, trauma centers, police support, and emergency contacts.
            </p>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users className="text-primary" size={20} />
              Key Features
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">• One-tap RescueNet SOS Trigger</li>
              <li className="flex items-center gap-2">• Automated crash detection simulation</li>
              <li className="flex items-center gap-2">• Live geolocation tracking</li>
              <li className="flex items-center gap-2">• Offline emergency contacts</li>
              <li className="flex items-center gap-2">• First aid assistant</li>
            </ul>
          </div>

          <a 
            href="#" 
            className="block w-full glass py-4 rounded-xl text-center text-white font-semibold hover:bg-white/5 transition flex items-center justify-center gap-2"
          >
            <Code size={20} />
            View Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
