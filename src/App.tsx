/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Search, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  CreditCard, 
  Calendar, 
  MapPin, 
  Camera, 
  Upload,
  Fingerprint,
  Database,
  Loader2
} from 'lucide-react';

const AZ_REGIONS = [
  'Bakı şəhəri', 'Gəncə şəhəri', 'Sumqayıt şəhəri', 'Lənkəran şəhəri', 'Şəki şəhəri', 
  'Quba rayonu', 'Qəbələ rayonu', 'Naxçıvan MR', 'Mingəçevir şəhəri', 'Şirvan şəhəri', 
  'Xaçmaz rayonu', 'İsmayıllı rayonu', 'Şamaxı rayonu', 'Zaqatala rayonu', 'Balakən rayonu', 
  'Masallı rayonu', 'Cəlilabad rayonu', 'Sabirabad rayonu', 'Kürdəmir rayonu', 'Göyçay rayonu', 
  'Ağdam rayonu', 'Füzuli rayonu', 'Şuşa şəhəri', 'Kəlbəcər rayonu', 'Laçın rayonu', 
  'Zəngilan rayonu', 'Qubadlı rayonu', 'Cəbrayıl rayonu', 'Xocalı rayonu', 'Xocavənd rayonu',
  'Goranboy rayonu', 'Tərtər rayonu', 'Bərdə rayonu', 'Ağcabədi rayonu', 'Beyləqan rayonu',
  'Saatlı rayonu', 'Hacıqabul rayonu', 'Salyan rayonu', 'Neftçala rayonu', 'Biləsuvar rayonu'
];

const OFFENSES = [
  { id: 'smoking', article: 'Maddə 212.1', description: 'Tütün məmulatlarının istehlakına məhdudiyyətlər qoyulmuş yerlərdə tütün çəkilməsi', fine: 30 },
  { id: 'vaping', article: 'Maddə 212.1-1', description: 'Qadağan edilmiş yerlərdə elektron siqaretdən istifadə edilməsi', fine: 30 },
  { id: 'littering', article: 'Maddə 266.3', description: 'Məişət tullantılarının (zibil) tutumlardan kənar yerlərə atılması', fine: 50 }
];

interface PersonResult {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  birthDate: string;
  region: string;
  fin: string;
}

interface PersonCardProps {
  person: PersonResult;
  idx: number;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, idx }) => {
  const [selectedOffense, setSelectedOffense] = useState<string>('');
  const [fined, setFined] = useState(false);

  const handleFine = () => {
    if (!selectedOffense) return;
    setFined(true);
    // Real tətbiqdə burada serverə sorğu gedərdi
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group relative overflow-hidden flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-all" />
      
      <div className="flex items-start gap-6 relative z-10 mb-6">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-200 transition-all">
          <User className="text-slate-400 group-hover:text-white w-8 h-8 transition-all" />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h5 className="text-xl font-black text-[#003366] mb-1">{person.lastName} {person.firstName}</h5>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{person.fatherName} oğlu/qızı</p>
            </div>
            <span className="text-xs bg-slate-900 text-white px-3 py-1 rounded-lg font-mono font-bold">{person.fin}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:bg-white transition-all">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Calendar className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Doğum Tarixi</span>
              </div>
              <p className="text-sm font-bold text-slate-700">{person.birthDate}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:bg-white transition-all">
              <div className="flex items-center gap-2 text-[#0052CC] mb-1">
                <MapPin className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Qeydiyyat</span>
              </div>
              <p className="text-sm font-bold text-slate-700">{person.region}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
        {fined ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="text-green-600 w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-black text-green-900 uppercase tracking-wider">Cərimə Tətbiq Edildi</p>
              <p className="text-[10px] text-green-700 font-bold">
                {OFFENSES.find(o => o.id === selectedOffense)?.article} üzrə {OFFENSES.find(o => o.id === selectedOffense)?.fine} AZN cərimə yazıldı.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İnzibati Xəta Seçin</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#0052CC] outline-none transition-all text-sm font-bold text-slate-700"
                value={selectedOffense}
                onChange={(e) => setSelectedOffense(e.target.value)}
              >
                <option value="">Xəta növünü seçin...</option>
                {OFFENSES.map(offense => (
                  <option key={offense.id} value={offense.id}>
                    {offense.article} - {offense.description} ({offense.fine} AZN)
                  </option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleFine}
              disabled={!selectedOffense}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                selectedOffense 
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-100' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <AlertCircle className="w-4 h-4" /> CƏRİMƏ ET
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(16);
  const [results, setResults] = useState<PersonResult[]>([]);
  const [view, setView] = useState<'form' | 'results'>('form');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    birthDate: '',
    fin: '',
    serial: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: any;
    if (loading && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && loading) {
      generateResults();
    }
    return () => clearInterval(timer);
  }, [loading, countdown]);

  const generateResults = () => {
    const count = Math.floor(Math.random() * 11) + 10; // 10-20 arası təsadüfi say
    const newResults: PersonResult[] = [];
    
    // Regionları qarışdırırıq ki, hər kəs fərqli yerdə olsun
    const shuffledRegions = [...AZ_REGIONS].sort(() => 0.5 - Math.random());

    // Doğum tarixini DD.MM.YYYY formatına salırıq (əgər YYYY-MM-DD-dirsə)
    let displayDate = formData.birthDate;
    if (displayDate.includes('-')) {
      const [y, m, d] = displayDate.split('-');
      displayDate = `${d}.${m}.${y}`;
    }

    for (let i = 0; i < count; i++) {
      // Realistik və unikal FİN yaradırıq (7 simvol)
      const chars = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
      let randomFin = '';
      for (let j = 0; j < 7; j++) {
        randomFin += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      newResults.push({
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        firstName: formData.firstName.toUpperCase(),
        lastName: formData.lastName.toUpperCase(),
        fatherName: formData.fatherName.toUpperCase(),
        birthDate: displayDate,
        region: shuffledRegions[i % shuffledRegions.length],
        fin: randomFin
      });
    }
    
    setResults(newResults);
    setLoading(false);
    setView('results');
  };

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    setResults([]);
    setCountdown(16);
    setLoading(true);
    setView('form');
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const resetSearch = () => {
    setView('form');
    setFormData({
      firstName: '',
      lastName: '',
      fatherName: '',
      birthDate: '',
      fin: '',
      serial: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={resetSearch}>
            <div className="w-12 h-12 bg-[#0052CC] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Shield className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#003366] tracking-tight">
                DİN <span className="text-[#0052CC]">E-PORTAL</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                Şəxsiyyət Vəsiqəsi Yoxlama Sistemi
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#" className="text-[#0052CC] border-b-2 border-[#0052CC] pb-1">Xidmətlər</a>
            <a href="#" className="hover:text-[#0052CC] transition-colors">Məlumat</a>
            <a href="#" className="hover:text-[#0052CC] transition-colors">Yardım</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10">
              <div className="relative w-32 h-32 mx-auto mb-12">
                {/* Outer rotating ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-blue-200 rounded-full"
                />
                
                {/* Inner glowing circle */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 15px rgba(0, 82, 204, 0.1)",
                      "0 0 30px rgba(0, 82, 204, 0.3)",
                      "0 0 15px rgba(0, 82, 204, 0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-3 bg-white rounded-full flex items-center justify-center border border-blue-50 shadow-lg"
                >
                  <Loader2 className="w-10 h-10 text-[#0052CC] animate-spin" />
                </motion.div>

                {/* Scanning line effect */}
                <motion.div 
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0052CC] to-transparent z-20 opacity-50"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-black text-[#003366] mb-4 tracking-tight">Axtarışa uyğun nəticələr bazadan toplanır</h2>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                    <Database className="w-3.5 h-3.5 text-[#0052CC] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-wider">Mərkəzi Reyestr</span>
                  </div>
                </div>

                <div className="max-w-xs mx-auto">
                  <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={countdown}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        className="text-[#0052CC]"
                      >
                        {countdown > 12 ? "Sistemə giriş..." : 
                         countdown > 9 ? "Reyestr yoxlanışı..." : 
                         countdown > 6 ? "Biometrik analiz..." : 
                         countdown > 3 ? "Arxiv axtarışı..." : 
                         "Nəticələr hazırlanır..."}
                      </motion.span>
                    </AnimatePresence>
                    <span>{Math.round(((16 - countdown) / 16) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 16, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-[#0052CC] to-blue-400 rounded-full relative"
                    >
                      <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 bg-white/30 skew-x-12"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : view === 'form' ? (
          <div className="space-y-12">
            {/* Section 1: Personal Details */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <User className="text-[#0052CC] w-5 h-5" />
                </div>
                <h3 className="text-2xl font-black text-[#003366]">Məlumatlarla Axtarış</h3>
              </div>
              
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                <form onSubmit={handleCheck} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ad</label>
                    <input 
                      type="text" 
                      placeholder="Ad daxil edin"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#0052CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Soyad</label>
                    <input 
                      type="text" 
                      placeholder="Soyad daxil edin"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#0052CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ata Adı</label>
                    <input 
                      type="text" 
                      placeholder="Ata adı daxil edin"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#0052CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      value={formData.fatherName}
                      onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doğum Tarixi</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#0052CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 pt-6">
                    <button 
                      type="submit"
                      className="w-full bg-[#0052CC] hover:bg-[#0041a3] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                    >
                      <Search className="w-5 h-5" /> MƏLUMATLARI YOXLA
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* Section 2: FIN & Photo Search */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Fingerprint className="text-[#0052CC] w-5 h-5" />
                </div>
                <h3 className="text-2xl font-black text-[#003366]">FİN və ya Şəkil ilə Axtarış</h3>
              </div>

              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">FİN Kod və ya Seriya</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="FİN və ya AZE nömrəsi"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-[#0052CC] focus:ring-4 focus:ring-blue-100 outline-none transition-all uppercase font-bold"
                          value={formData.fin}
                          onChange={(e) => setFormData({...formData, fin: e.target.value})}
                        />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      </div>
                    </div>
                    <button 
                      onClick={handleCheck}
                      className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all"
                    >
                      <Search className="w-5 h-5" /> SÜRƏTLİ AXTARIŞ
                    </button>
                  </div>

                  <div className="relative group">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                    <div 
                      onClick={handleFileUpload}
                      className="h-full min-h-[180px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 hover:border-[#0052CC] hover:bg-blue-50/30 transition-all cursor-pointer group"
                    >
                      <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-all">
                        <Upload className="text-slate-400 group-hover:text-[#0052CC] w-6 h-6" />
                      </div>
                      <p className="font-bold text-slate-700">Vəsiqənin şəklini yükləyin</p>
                      <p className="text-xs text-slate-400 mt-1 text-center">Sistem şəkildəki FİN kodu avtomatik tanıyacaq</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Results Section */}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <button 
                  onClick={() => setView('form')}
                  className="text-[#0052CC] font-bold text-sm flex items-center gap-2 mb-2 hover:underline"
                >
                  ← Geri qayıt
                </button>
                <h4 className="text-3xl font-black text-[#003366]">Axtarış Nəticələri</h4>
              </div>
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-xs font-bold border border-green-100">
                <Database className="w-4 h-4" />
                {results.length} şəxs tapıldı
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((person, idx) => (
                <PersonCard key={person.id} person={person} idx={idx} />
              ))}
            </div>

            {results.length === 0 && (
              <div className="bg-red-50 border border-red-100 p-16 rounded-[40px] text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h5 className="text-2xl font-black text-red-900 mb-2">Məlumat Tapılmadı</h5>
                <p className="text-red-700 max-w-sm mx-auto">Daxil etdiyiniz kriteriyalara uyğun heç bir vətəndaş qeydiyyatı mövcud deyil.</p>
                <button 
                  onClick={() => setView('form')}
                  className="mt-8 bg-red-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all"
                >
                  Yenidən axtar
                </button>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                <Shield className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900">DİN PORTAL</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">© {new Date().getFullYear()} Daxili İşlər Nazirliyi. Bütün hüquqlar qorunur.</p>
            <div className="flex gap-8 text-xs text-slate-400 font-bold">
              <a href="#" className="hover:text-slate-900">MƏXFİLİK</a>
              <a href="#" className="hover:text-slate-900">ŞƏRTLƏR</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
