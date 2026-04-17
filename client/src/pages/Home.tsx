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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <DotGrid
        dotSize={0.5}
        gap={40}
        baseColor="#333333"
        activeColor="#ffffff"
        shockRadius={200}
        shockStrength={shockStrength}
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-white/20 to-white/5 blur-3xl opacity-30 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Status Badge - Zelená záře pro ONLINE */}
          <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-card/50 backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse`} />
            <span className="text-sm font-medium text-green-500 tracking-wide uppercase">
              System Online
            </span>
          </div>

          <VariableFont
            minWeight={300}
            maxWeight={900}
            minDistance={0}
            maxDistance={500}
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Recepce.tech
          </VariableFont>

          {/* NOVÝ NADPIS (Direct Hit) */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Seznamte se se svou AI asistentkou.
            <br />
            <span className="text-foreground">Uvolní vám ruce.</span>
          </h2>

          {/* NOVÝ PODTITUL */}
          <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Inteligentní hlasová AI, která nonprofitně zvedá telefony a objednává pacienty do vašeho kalendáře. 24/7.
          </p>

          <div className="relative w-full flex items-center justify-center mb-12 md:mb-16">
            <button
              onClick={handleVoiceButtonClick}
              disabled={isLoading}
              className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full transition-all duration-300 flex items-center justify-center group shadow-2xl active:scale-95 disabled:opacity-50 ${
                isCallActive
                  ? 'bg-gradient-to-br from-gray-600 to-gray-500 hover:from-gray-600 hover:to-gray-500 animate-call-pulse'
                  : 'bg-gradient-to-br from-white to-gray-200 hover:from-white hover:to-gray-200'
              }`}
              style={{
                boxShadow: isCallActive
                  ? '0 0 60px rgba(100, 100, 100, 0.6), 0 0 100px rgba(100, 100, 100, 0.3)'
                  : isListening
                    ? '0 0 60px rgba(255, 255, 255, 0.6), 0 0 100px rgba(255, 255, 255, 0.3)'
                    : '0 0 40px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)',
              }}
            >
              <Mic className="w-8 h-8 md:w-12 md:h-12 text-black" />
              {isSpeaking && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-white/60 animate-speech-wave" />
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-speech-wave" style={{ animationDelay: '0.2s' }} />
                </>
              )}
            </button>
          </div>

          {isCallActive && (
            <div className="text-gray-400 text-xs md:text-sm font-medium animate-pulse">
              {isSpeaking ? 'Mluvím...' : 'Naslouchám...'}
            </div>
          )}
        </div>
      </section>

      {/* Product Pillars Section */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-background via-background to-card/20 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 tracking-tight">
            Proč zvolit <span className="text-foreground">recepce.tech</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group relative p-6 md:p-8 rounded-xl border border-foreground/20 bg-card/40 backdrop-blur-md hover:bg-card/60 hover:border-foreground/40 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-foreground/20 flex items-center justify-center mb-4 group-hover:bg-foreground/30 transition-colors">
                  <Zap className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">Okamžitá odezva</h3>
                <p className="text-foreground/70">Vaši pacienti se dočkají odpovědi vteřinu po zavolání. Bez čekání.</p>
              </div>
            </div>

            <div className="group relative p-6 md:p-8 rounded-xl border border-foreground/20 bg-card/40 backdrop-blur-md hover:bg-card/60 hover:border-foreground/40 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-foreground/20 flex items-center justify-center mb-4 group-hover:bg-foreground/30 transition-colors">
                  <Calendar className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integrace kalendáře</h3>
                <p className="text-foreground/70">Automatické objednávání pacientů přímo do vašeho systému, bez ručního zásahu.</p>
              </div>
            </div>

            <div className="group relative p-6 md:p-8 rounded-xl border border-foreground/20 bg-card/40 backdrop-blur-md hover:bg-card/60 hover:border-foreground/40 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-foreground/20 flex items-center justify-center mb-4 group-hover:bg-foreground/30 transition-colors">
                  <Volume2 className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lidský hlas</h3>
                <p className="text-foreground/70">Příjemný a přirozený hlas, který vaši pacienti milují. Bez robotických zvuků.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
