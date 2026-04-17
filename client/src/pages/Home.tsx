import { useState } from 'react';
import { Mic, Calendar, Volume2, Zap } from 'lucide-react';
import { DotGrid } from '@/components/DotGrid';
import { VariableFont } from '@/components/VariableFont';
import { useVapiCall } from '@/hooks/useVapiCall';

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [shockStrength, setShockStrength] = useState(5);
  const vapiApiKey = import.meta.env.VITE_VAPI_API_KEY || 'da9dac82-63b3-431b-997e-57475c818ad6';
  const vapiAssistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'e7a23310-d13b-463e-ad41-68620a609b34';

  const { isCallActive, isSpeaking, isLoading, startCall, stopCall } = useVapiCall({
    apiKey: vapiApiKey,
    assistantId: vapiAssistantId,
    onCallStart: () => {
      setIsListening(true);
      setShockStrength(10);
    },
    onCallEnd: () => {
      setIsListening(false);
      setShockStrength(5);
    },
    onSpeechStart: () => {
      setShockStrength(15);
    },
    onSpeechEnd: () => {
      setShockStrength(10);
    },
  });

  const handleVoiceButtonClick = async () => {
    if (isCallActive) {
      await stopCall();
    } else {
      await startCall();
    }
  };

  return (
    /* HLAVNÍ POZADÍ: Charleston Green (#232B2B) a TEXT: Off White (#FAF9F6) */
    <div className="min-h-screen bg-[#232B2B] text-[#FAF9F6] overflow-x-hidden">
      <DotGrid
        dotSize={0.5}
        gap={40}
        baseColor="#353839" /* Onyx pro tečky v pozadí */
        activeColor="#FAF9F6" /* Off White pro aktivní tečky */
        shockRadius={200}
        shockStrength={shockStrength}
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10">
        <div className="absolute inset-0 pointer-events-none">
          {/* Záře v barvě Off White s nízkou opacitou */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#FAF9F6]/10 to-transparent blur-3xl opacity-20 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Status Badge - Zelená záře na Onyx podkladu */}
          <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-[#353839]/50 backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-400' : 'bg-green-500'} shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse`} />
            <span className="text-sm font-medium text-green-500/90 tracking-wide uppercase">
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

          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#FAF9F6]/90">
            Recepce, která
            <br />
            <span className="text-[#FAF9F6]">nikdy nespí.</span>
          </h2>

          <p className="text-lg md:text-xl text-[#FAF9F6]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Inteligentní hlasová AI, která odbaví vaše hovory a objedná pacienty do kalendáře. 24 hodin denně, 7 dní v týdnu.
          </p>

          <div className="relative w-full flex items-center justify-center mb-12 md:mb-16">
            <button
              onClick={handleVoiceButtonClick}
              disabled={isLoading}
              className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full transition-all duration-300 flex items-center justify-center group shadow-2xl active:scale-95 disabled:opacity-50 ${
                isCallActive
                  ? 'bg-[#353839] border border-[#FAF9F6]/20' /* Onyx během hovoru */
                  : 'bg-[#FAF9F6] hover:scale-105' /* Off White v klidu */
              }`}
              style={{
                boxShadow: isCallActive
                  ? '0 0 60px rgba(250, 249, 246, 0.1)'
                  : '0 0 40px rgba(250, 249, 246, 0.3)',
              }}
            >
              <Mic className={`w-8 h-8 md:w-12 md:h-12 ${isCallActive ? 'text-[#FAF9F6]' : 'text-[#232B2B]'}`} />
              {isSpeaking && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-[#FAF9F6]/60 animate-speech-wave" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#FAF9F6]/30 animate-speech-wave" style={{ animationDelay: '0.2s' }} />
                </>
              )}
            </button>
          </div>

          {isCallActive && (
            <div className="text-[#FAF9F6]/50 text-xs md:text-sm font-medium animate-pulse uppercase tracking-widest">
              {isSpeaking ? 'Asistentka mluví' : 'Naslouchám...'}
            </div>
          )}
        </div>
      </section>

      {/* Product Pillars - Pozadí Onyx (#353839) */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-[#232B2B] to-[#353839]/30 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 tracking-tight text-[#FAF9F6]">
            Proč zvolit <span className="opacity-70 italic">recepce.tech</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Pillar Cards s Onyx pozadím */}
            {[
              { icon: Zap, title: "Okamžitá odezva", desc: "Vaši pacienti se dočkají odpovědi ihned, bez čekání." },
              { icon: Calendar, title: "Integrace kalendáře", desc: "Automatické objednávání přímo do vašeho systému." },
              { icon: Volume2, title: "Lidský hlas", desc: "Příjemný a přirozený projev, který buduje důvěru." }
            ].map((pillar, i) => (
              <div key={i} className="group relative p-6 md:p-8 rounded-xl border border-[#FAF9F6]/10 bg-[#353839]/40 backdrop-blur-md hover:border-[#FAF9F6]/30 transition-all duration-500">
                <pillar.icon className="w-12 h-12 mb-4 text-[#FAF9F6]/80 group-hover:text-[#FAF9F6] transition-colors" />
                <h3 className="text-xl font-bold mb-3 text-[#FAF9F6]">{pillar.title}</h3>
                <p className="text-[#FAF9F6]/60 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Bottom Space */}
      <footer className="py-12 text-center text-[#FAF9F6]/20 text-xs uppercase tracking-widest">
        &copy; 2026 recepce.tech | Všechna práva vyhrazena
      </footer>
    </div>
  );
}
