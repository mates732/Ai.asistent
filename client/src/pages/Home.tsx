import { useState } from 'react';
import { Mic, Calendar, Volume2, Zap } from 'lucide-react';
import { DotGrid } from '@/components/DotGrid';
import { VariableFont } from '@/components/VariableFont';
import { useVapiCall } from '@/hooks/useVapiCall';

export default function Home() {
  const [shockStrength, setShockStrength] = useState(5);
  
  const vapiApiKey = import.meta.env.VITE_VAPI_API_KEY || 'da9dac82-63b3-431b-997e-57475c818ad6';
  const vapiAssistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'e7a23310-d13b-463e-ad41-68620a609b34';

  const { isCallActive, isSpeaking, isLoading, startCall, stopCall } = useVapiCall({
    apiKey: vapiApiKey,
    assistantId: vapiAssistantId,
    onCallStart: () => setShockStrength(10),
    onCallEnd: () => setShockStrength(5),
    onSpeechStart: () => setShockStrength(15),
    onSpeechEnd: () => setShockStrength(10),
  });

  const handleVoiceButtonClick = async () => {
    if (isCallActive) {
      await stopCall();
    } else {
      await startCall();
    }
  };

  return (
    <div className="min-h-screen bg-[#232B2B] text-[#FAF9F6] overflow-x-hidden font-sans">
      <DotGrid
        dotSize={0.5}
        gap={40}
        baseColor="#353839"
        activeColor="#FAF9F6"
        shockRadius={200}
        shockStrength={shockStrength}
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#85AD6A]/30 bg-[#353839]/50 backdrop-blur-md">
            <div 
              className="w-2 h-2 rounded-full animate-pulse" 
              style={{ backgroundColor: '#85AD6A', boxShadow: '0 0 10px rgba(133, 173, 106, 0.8)' }} 
            />
            <span className="text-sm font-medium tracking-wide uppercase" style={{ color: '#85AD6A' }}>
              {isCallActive ? 'Hovor probíhá' : 'System Online'}
            </span>
          </div>

          <VariableFont
            minWeight={300}
            maxWeight={900}
            minDistance={0}
            maxDistance={500}
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-[#FAF9F6]"
          >
            Recepce.tech
          </VariableFont>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#FAF9F6]">
            Seznamte se se svou AI asistentkou.
            <br />
            <span className="opacity-80">Uvolní vám ruce.</span>
          </h2>

          <p className="text-lg md:text-xl text-[#FAF9F6]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Inteligentní hlasová AI, která zvedá telefony a objednává pacienty do vašeho kalendáře. 24/7.
          </p>

          <div className="relative w-full flex items-center justify-center mb-12 md:mb-16">
            <button
              onClick={handleVoiceButtonClick}
              disabled={isLoading}
              className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full transition-all duration-300 flex items-center justify-center group shadow-2xl active:scale-95 disabled:opacity-50 ${
                isCallActive ? 'bg-[#353839]' : 'bg-[#FAF9F6]'
              }`}
            >
              <Mic className={`w-8 h-8 md:w-12 md:h-12 ${isCallActive ? 'text-[#FAF9F6]' : 'text-[#232B2B]'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#232B2B] to-[#353839]/30 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl border border-[#FAF9F6]/10 bg-[#353839]/40 backdrop-blur-md">
            <Zap className="w-12 h-12 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-3">Okamžitá odezva</h3>
            <p className="text-[#FAF9F6]/60 text-sm">Vaši pacienti se dočkají odpovědi vteřinu po zavolání.</p>
          </div>
          <div className="p-8 rounded-xl border border-[#FAF9F6]/10 bg-[#353839]/40 backdrop-blur-md">
            <Calendar className="w-12 h-12 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-3">Integrace kalendáře</h3>
            <p className="text-[#FAF9F6]/60 text-sm">Automatické objednávání pacientů přímo do systému.</p>
          </div>
          <div className="p-8 rounded-xl border border-[#FAF9F6]/10 bg-[#353839]/40 backdrop-blur-md">
            <Volume2 className="w-12 h-12 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-3">Lidský hlas</h3>
            <p className="text-[#FAF9F6]/60 text-sm">Příjemný a přirozený hlas, který buduje důvěru.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
