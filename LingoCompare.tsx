import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Zap, 
  Palette, 
  Globe2, 
  ArrowRightLeft,
  CheckCircle2,
  Info,
  ChevronRight,
  Book,
  Scale,
  Volume2
} from 'lucide-react';

// --- Types ---
interface ColorMatch {
  id: string;
  en: string;
  es: string;
  de: string;
  hex: string;
  hy: string;
}

const COLORS: ColorMatch[] = [
  { id: '1', en: 'Red', es: 'Rojo', de: 'Rot', hex: '#ef4444', hy: 'Կարմիր' },
  { id: '2', en: 'Yellow', es: 'Amarillo', de: 'Gelb', hex: '#eab308', hy: 'Դեղին' },
  { id: '3', en: 'Orange', es: 'Naranja', de: 'Orange', hex: '#f97316', hy: 'Նարնջագույն' },
  { id: '4', en: 'Pink', es: 'Rosa', de: 'Rosa', hex: '#ec4899', hy: 'Վարդագույն' },
  { id: '5', en: 'White', es: 'Blanco', de: 'Weiß', hex: '#ffffff', hy: 'Սպիտակ' },
];

const COGNATES = [
  { es: "Hotel", de: "Hotel", hy: "Հյուրանոց" },
  { es: "Gitarre", de: "Guitarra", hy: "Կիթառ" }, // Fixed: Gitarre is DE, Guitarra is ES
  { es: "Música", de: "Musik", hy: "Երաժշտություն" },
  { es: "Tomate", de: "Tomate", hy: "Լոլիկ" },
  { es: "Chocolate", de: "Schokolade", hy: "Շոկոլադ" },
  { es: "Problema", de: "Problem", hy: "Խնդիր" },
  { es: "Teléfono", de: "Telefon", hy: "Հեռախոս" },
  { es: "Gas", de: "Gas", hy: "Գազ" },
  { es: "Bus", de: "Bus", hy: "Ավտոբուս" },
];

const COMPARISON_DATA = [
  {
    title: "Լեզվական ընտանիք",
    es: "Ռոմանական (Latium-ից ծագած)",
    de: "Գերմանական (Indo-European)",
    detail: "Իսպաներենը սերում է լատիներենից, մինչդեռ գերմաներենը պահպանել է հին գերմանական արմատները:",
    icon: <Globe2 className="text-blue-400" />
  },
  {
    title: "Քերականական սեռեր",
    es: "2 (Արական և Իգական)",
    de: "3 (Արական, Իգական, Չեզոք)",
    detail: "Գերմաներենն ունի 'Das' (չեզոք), որն իսպաներենում բացակայում է:",
    icon: <Layers className="text-emerald-400" />
  },
  {
    title: "Հոլովներ (Cases)",
    es: "Գրեթե չկան",
    de: "4 (Nominativ, Akkusativ, Dativ, Genitiv)",
    detail: "Գերմաներենում նախադասության իմաստը կախված է հոլովներից, իսկ իսպաներենում՝ բառերի հերթականությունից և նախդիրներից:",
    icon: <ArrowRightLeft className="text-amber-400" />
  }
];

export default function LingoBridge() {
  const [activeTab, setActiveTab] = useState<'theory' | 'game' | 'cognates'>('theory');
  const [selectedColor, setSelectedColor] = useState<ColorMatch | null>(null);
  const [score, setScore] = useState(0);

  const speak = (text: string, lang: 'es-ES' | 'de-DE') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-yellow-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 border-b border-white/5 bg-black/50 backdrop-blur-xl px-4 py-3 sticky top-0">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg shrink-0">
              <Scale size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">Lingo<span className="text-blue-500">Bridge</span></h1>
          </div>
          
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
            <div className="flex bg-stone-900 rounded-full p-1 gap-1 min-w-max">
              <button 
                onClick={() => setActiveTab('theory')}
                className={`px-4 sm:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'theory' ? 'bg-white text-black' : 'text-stone-500 hover:text-white'}`}
              >
                Theory
              </button>
              <button 
                onClick={() => setActiveTab('cognates')}
                className={`px-4 sm:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'cognates' ? 'bg-white text-black' : 'text-stone-500 hover:text-white'}`}
              >
                Cognates
              </button>
              <button 
                onClick={() => setActiveTab('game')}
                className={`px-4 sm:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'game' ? 'bg-white text-black' : 'text-stone-500 hover:text-white'}`}
              >
                Colors
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto p-6 md:p-12">
        
        <AnimatePresence mode="wait">
          {activeTab === 'theory' ? (
            <motion.div 
              key="theory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                  Իսպաներեն vs <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">Գերմաներեն</span>
                </h2>
                <p className="text-stone-500 font-bold italic uppercase tracking-widest text-sm">Համեմատական լեզվաբանություն և փաստեր</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {COMPARISON_DATA.map((item, idx) => (
                   <div key={idx} className="bg-stone-900/50 border border-white/5 p-8 rounded-[40px] space-y-6 hover:border-white/20 transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-[10px] font-black uppercase text-stone-500 tracking-[0.3em] mb-2">{item.title}</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                              <p className="text-[8px] font-black uppercase text-blue-500">Español</p>
                              <p className="font-bold italic text-sm">{item.es}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[8px] font-black uppercase text-red-500">Deutsch</p>
                              <p className="font-bold italic text-sm">{item.de}</p>
                           </div>
                        </div>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed italic border-t border-white/5 pt-4">
                        {item.detail}
                      </p>
                   </div>
                 ))}
              </div>

              <div className="bg-gradient-to-br from-blue-900/20 to-red-900/20 border border-white/10 rounded-[50px] p-10 flex flex-col md:flex-row gap-8 items-center">
                 <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-amber-500">
                      <Zap size={12} /> Did you know?
                    </div>
                    <h3 className="text-3xl font-black italic uppercase leading-tight">Լեզուների «Բնավորությունը»</h3>
                    <p className="text-stone-400 leading-relaxed italic">
                      Գերմաներենը համարվում է «կառուցվածքային» և «ճշգրիտ» լեզու, որտեղ ամեն բառ ունի իր տեղը: <br /> 
                      Իսպաներենը «երաժշտական» և «արտահայտիչ» է, որտեղ շատ հաճախ բայերը կրում են ամբողջ տեղեկատվությունը, և կարելի է բաց թողնել ենթական (Yo, Él):
                    </p>
                 </div>
                 <div className="w-full md:w-64 h-64 bg-stone-900 overflow-hidden rounded-[40px] relative border border-white/5 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1543783230-227448839075?q=80&w=2940&auto=format&fit=crop" 
                      alt="Linguistics" 
                      className="w-full h-full object-cover grayscale opacity-50 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <Book className="absolute bottom-6 left-6 text-white" size={32} />
                 </div>
              </div>
            </motion.div>
          ) : activeTab === 'cognates' ? (
            <motion.div 
              key="cognates"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-500">
                  <ArrowRightLeft size={12} /> Cognates Discovery
                </div>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none">Նմանատիպ <br /> <span className="text-blue-500">Բառեր</span></h2>
                <p className="text-stone-500 font-bold italic uppercase tracking-widest text-sm max-w-lg mx-auto leading-relaxed">
                  Այս բառերը համարյա նույնն են երկու լեզուներում: Սեղմիր ձայնը լսելու համար:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {COGNATES.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="bg-stone-900/40 border border-white/5 rounded-[40px] p-8 space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 text-[10px] font-black uppercase text-stone-700">{item.hy}</div>
                    
                    <div className="space-y-4">
                       <button 
                        onClick={() => speak(item.es, 'es-ES')}
                        className="w-full p-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-2xl flex items-center justify-between transition-colors group"
                       >
                         <div className="text-left">
                           <p className="text-[8px] font-black uppercase text-blue-500 mb-1">Español</p>
                           <p className="text-xl font-bold italic">{item.es}</p>
                         </div>
                         <Volume2 size={16} className="text-blue-500 group-hover:scale-125 transition-transform" />
                       </button>

                       <button 
                        onClick={() => speak(item.de, 'de-DE')}
                        className="w-full p-4 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 rounded-2xl flex items-center justify-between transition-colors group"
                       >
                         <div className="text-left">
                           <p className="text-[8px] font-black uppercase text-red-500 mb-1">Deutsch</p>
                           <p className="text-xl font-bold italic">{item.de}</p>
                         </div>
                         <Volume2 size={16} className="text-red-500 group-hover:scale-125 transition-transform" />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  <Palette size={12} /> Color Discovery
                </div>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter">Colores ✨ <span className="text-stone-600">Farben</span></h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {COLORS.map((c) => (
                  <motion.button
                    key={c.id}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(c)}
                    className="aspect-square bg-stone-900 border border-white/5 rounded-[30px] sm:rounded-[40px] p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-4 transition-all hover:bg-stone-800 hover:border-white/20 shadow-xl"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white/10" style={{ backgroundColor: c.hex }} />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">{c.hy}</p>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {selectedColor && (
                  <motion.div
                    key={selectedColor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white text-black p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                  >
                    <div className="space-y-6 md:space-y-8">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Selected Tone</p>
                          <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">{selectedColor.hy}</h3>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                          <button 
                            onClick={() => speak(selectedColor.es, 'es-ES')}
                            className="bg-blue-600 text-white p-6 md:p-8 rounded-[25px] md:rounded-[40px] flex flex-col items-start gap-3 md:gap-4 hover:bg-blue-500 transition-colors group"
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Español</span>
                            <span className="text-2xl md:text-3xl font-black italic">{selectedColor.es}</span>
                            <Palette size={20} className="self-end opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                          <button 
                            onClick={() => speak(selectedColor.de, 'de-DE')}
                            className="bg-red-600 text-white p-6 md:p-8 rounded-[25px] md:rounded-[40px] flex flex-col items-start gap-3 md:gap-4 hover:bg-red-500 transition-colors group"
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Deutsch</span>
                            <span className="text-2xl md:text-3xl font-black italic">{selectedColor.de}</span>
                            <Zap size={20} className="self-end opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                       </div>
                    </div>
                    <div className="aspect-square rounded-[30px] md:rounded-[50px] shadow-2xl relative overflow-hidden" style={{ backgroundColor: selectedColor.hex }}>
                       <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                       <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-white/40 font-black text-6xl md:text-8xl italic uppercase leading-none opacity-50">
                         {selectedColor.hy}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <footer className="fixed bottom-8 right-8 opacity-20 hover:opacity-100 transition-opacity flex items-center gap-4">
         <div className="h-px w-12 bg-white" />
         <p className="text-[10px] font-black uppercase tracking-[1em]">Research Lab v1.0</p>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
