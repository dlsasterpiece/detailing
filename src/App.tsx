import { useState, useEffect, useRef, ReactNode, ChangeEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Instagram, 
  Send as Telegram, 
  Phone, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Star,
  Droplets,
  Zap
} from 'lucide-react';
import { NAV_LINKS, SERVICES, REVIEWS, FAQS, PROCESS_STEPS } from './constants';
import { GlassCard } from './components/GlassCard';
import { SectionTitle } from './components/SectionTitle';
import { CountUp } from './components/CountUp';


// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: any, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden pt-0 selection:bg-accent/30 selection:text-white">
      
      {/* --- Navbar --- */}
      <nav 
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-[92%] max-w-screen-xl transition-all duration-500 py-3 px-6 md:px-8 rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
          scrolled 
            ? 'bg-black/40 backdrop-blur-2xl border-white/10' 
            : 'bg-white/[0.05] backdrop-blur-xl border-white/20'
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2 md:gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-center flex-shrink-0">
              <img 
                src="/images/logo-v3.png" 
                alt="Logo" 
                className="h-9 md:h-14 w-auto block logo-isolated"
                loading="eager"
                decoding="async"
                style={{ fetchPriority: 'high' } as any}
              />
            </div>
            <div>
              <p className="text-[7px] md:text-[9px] tracking-[0.3em] font-medium opacity-80 uppercase leading-none mb-0.5 md:mb-1 text-white">Detailing Studio</p>
              <p className="text-xs md:text-sm font-black tracking-tight leading-none text-accent italic">UZHGOROD</p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={(e: any) => scrollToSection(e, '#pricing')}
              className="px-6 py-3 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Консультація
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden p-8"
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center gap-8 w-full">
              {NAV_LINKS.map((link, idx) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-3xl font-black italic uppercase tracking-widest text-white/80 hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-12 w-full flex flex-col gap-4">
               <button className="btn-primary w-full">
                 <span>Записатись</span>
                 <ChevronRight size={18} />
               </button>
               
               <div className="flex justify-center gap-8 mt-4 text-white/60">
                  <a href="https://www.instagram.com/detailing_uzhgorod?igshid=b8w96zoit37w" target="_blank" rel="noreferrer">
                    <Instagram size={24} className="hover:text-white cursor-pointer" />
                  </a>
                  <a href="https://t.me/+380977390639" target="_blank" rel="noreferrer">
                    <Telegram size={24} className="hover:text-white cursor-pointer" />
                  </a>
                  <a href="tel:+380977390639">
                    <Phone size={24} className="hover:text-white cursor-pointer" />
                  </a>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-32">
        {/* BG Image with Parallax & Dark Overlay */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/images/hero-car.png" 
            alt="Hero Car" 
            className="w-full h-full object-cover object-[65%_center] md:object-center"
            loading="eager"
            decoding="sync"
            style={{ fetchPriority: 'high' } as any}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>

        <div className="container relative z-10 px-6 text-center pt-28 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            
            <motion.h1 
              initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-9xl text-display mb-6"
            >
              Мистецтво <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-600">Догляду</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="text-white/50 max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed tracking-wide"
            >
              Ексклюзивний детейлінг в Ужгороді. Відновлюємо глибину кольору та захищаємо кожну деталь вашого автомобіля.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-16 md:mt-0"
            >
              <button 
                onClick={() => window.location.href = 'tel:+380977390639'}
                className="btn-primary w-full"
              >
                <span>Записатись зараз</span>
                <ChevronRight size={18} />
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <a href="https://www.instagram.com/detailing_uzhgorod?igshid=b8w96zoit37w" target="_blank" rel="noreferrer" className="btn-secondary py-4 px-4 sm:px-8 text-[10px]">
                  <Instagram size={16} className="text-white" />
                  <span>Instagram</span>
                </a>
                <a href="https://t.me/+380977390639" target="_blank" rel="noreferrer" className="btn-secondary py-4 px-4 sm:px-8 text-[10px]">
                  <Telegram size={16} className="text-white" />
                  <span>Telegram</span>
                </a>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 md:mt-16 max-w-4xl mx-auto border-t border-white/5 pt-10 md:pt-12">
               {[
                 { label: 'Гарантія', value: <CountUp to={3} duration={1} suffix=" Роки" /> },
                 { label: 'Досвід', value: <CountUp to={8} duration={1.2} suffix="+ років" /> },
                 { label: 'Авто', value: <CountUp to={5000} duration={2} suffix="+" /> },
                 { label: 'Матеріали', value: 'Premium' },
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col gap-1 items-start md:items-center">
                   <p className="text-[10px] uppercase opacity-40 font-bold mb-1 tracking-widest">{item.label}</p>
                   <p className="text-xl md:text-2xl font-black italic tracking-tighter">{item.value}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 text-white"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- BEFORE / AFTER SECTION --- */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Мистецтво відновлення" 
            subtitle="Магія деталей — відчуйте різницю" 
          />
          
          <div className="max-w-5xl mx-auto relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Slider Container */}
            <div className="relative aspect-[4/5] sm:aspect-video w-full select-none cursor-ew-resize">
              {/* Labels (Always visible) */}
              <div className="pill absolute top-6 left-6 md:top-8 md:left-8 z-20 pointer-events-none drop-shadow-xl !bg-black/40 !backdrop-blur-md border-white/20">
                До
              </div>
              <div className="pill absolute top-6 right-6 md:top-8 md:right-8 z-20 pointer-events-none drop-shadow-xl !bg-black/40 !backdrop-blur-md border-white/20">
                Після
              </div>

              {/* After Image (Top Overlay) */}
              <div 
                className="absolute inset-0 w-full h-full z-10"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <img 
                  src="/images/mercedes-after.jpg" 
                  alt="After" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Before Image (Background Layer) */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/images/mercedes-before.png" 
                  alt="Before" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white bg-black flex items-center justify-center shadow-xl">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-white/40 rounded-full" />
                    <div className="w-1 h-4 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Input Range for Desktop/Mobile dragging */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPosition} 
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer"
              />
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6 text-white">
              <div>
                <h3 className="text-2xl font-serif italic mb-2">Відновлення дзеркального блиску</h3>
                <p className="text-white/60 text-sm italic">Видалення 95% подряпин та повернення глибини кольору.</p>
              </div>
              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-xs uppercase tracking-[0.2em] text-white hover:text-black">
                Дізнатись більше
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Наші послуги" 
            subtitle="Професійний догляд для виняткових авто" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group relative glass-card p-0 overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-6 flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-sm font-bold uppercase tracking-wider">{service.title}</h3>
                       <span className="text-[10px] opacity-40 font-bold uppercase">Detailing</span>
                    </div>
                    <p className="text-white/40 text-[11px] leading-relaxed font-light italic">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <p className="text-sm font-black italic tracking-tight">{service.price}</p>
                    <button className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                      Записатись
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us" className="py-24 bg-black relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10 text-white">
          <SectionTitle 
            title="Чому обирають нас" 
            subtitle="Перфекціонізм у кожній деталі" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck className="w-10 h-10 text-accent" />, title: 'Гарантія якості', desc: 'Ми впевнені у своїх матеріалах та майстерності, тому надаємо гарантію на всі види робіт.' },
              { icon: <Sparkles className="w-10 h-10 text-accent" />, title: 'Преміум матеріали', desc: 'Використовуємо лише кращі світові бренди автохімії: Koch Chemie, Gyeon, CarPro.' },
              { icon: <Clock className="w-10 h-10 text-accent" />, title: 'Пунктуальність', desc: 'Цінуємо ваш час. Передаємо автомобіль точно в обіцяний термін.' },
              { icon: <Zap className="w-10 h-10 text-accent" />, title: 'Сучасне обладнання', desc: 'Наші бокси оснащені професійним освітленням та інструментом для ідеального результату.' },
              { icon: <Droplets className="w-10 h-10 text-accent" />, title: 'Безпечна мийка', desc: 'Жодної шкоди для ЛФП. Використовуємо безпечні лужні склади та чисті рушники.' },
              { icon: <Star className="w-10 h-10 text-accent" />, title: 'Досвід', desc: 'Понад 5000 задоволених клієнтів та тисячі відполірованих деталей.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-serif italic mb-3">{feature.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed italic">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 bg-[#080808]">
        <div className="container mx-auto px-6 text-white">
          <SectionTitle 
            title="Етапи роботи" 
            subtitle="Як ми робимо ваш автомобіль ідеальним" 
          />
          
          <div className="relative max-w-4xl mx-auto py-12 px-4 md:px-0">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
            
            <div className="space-y-16 md:space-y-24">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center justify-start md:justify-between w-full ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Circle Marker */}
                  <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-[10px] font-bold z-10 ${idx === PROCESS_STEPS.length - 1 ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {idx === PROCESS_STEPS.length - 1 ? '✓' : `0${idx + 1}`}
                  </div>
                  
                  <div className="w-full md:w-[42%] text-left pl-16 md:pl-0">
                    <p className="text-accent text-[8px] uppercase tracking-widest font-bold mb-1">Step 0{idx + 1}</p>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wider mb-1">{step.title}</p>
                    <p className="text-[10px] md:text-xs opacity-50 italic leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="hidden md:block w-[42%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 bg-black">
        <div className="container mx-auto px-6 text-white">
          <SectionTitle 
            title="Прайс-лист" 
            subtitle="Інвестиція у вигляд та збереження вартості авто" 
          />
          
          <div className="max-w-3xl mx-auto glass-card overflow-hidden">
            <div className="divide-y divide-white/5">
              {[
                { name: 'Комплексна хімчистка', price: 'від 3500 грн' },
                { name: 'Полірування кузова (легке)', price: 'від 5000 грн' },
                { name: 'Полірування (відновлювальне)', price: 'від 8000 грн' },
                { name: 'Керамічне покриття Nano', price: 'від 8000 грн' },
                { name: 'Детейлінг мийка преміум', price: 'від 600 грн' },
                { name: 'Бронювання фар плівкою', price: 'від 2500 грн' },
                { name: 'Комплексний детейлінг-пакет', price: 'від 15000 грн' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-6 hover:bg-white/5 transition-colors">
                  <span className="text-white/80 font-medium">{item.name}</span>
                  <span className="font-mono text-accent">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-white/40 text-[10px] uppercase tracking-widest mt-8 italic">
            * Остаточна вартість визначається після огляду автомобіля майстром
          </p>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section id="reviews" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6 text-white">
          <SectionTitle 
            title="Відгуки клієнтів" 
            subtitle="Довіра, підкріплена результатом" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <GlassCard key={idx} className="flex flex-col">
                <div className="flex gap-1 mb-4 text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white/60 italic mb-8 flex-grow">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-serif italic text-xl text-white">
                    {review.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">{review.name}</h5>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{review.car}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 bg-black">
        <div className="container mx-auto px-6 text-white">
          <SectionTitle 
            title="Поширені питання" 
            subtitle="Все, що ви хотіли знати" 
          />
          
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass-card p-0 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors text-white"
                >
                  <span className="font-serif italic text-lg">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                  >
                    <ChevronDown size={20} className="text-white/40" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-6 text-white/50 text-sm leading-relaxed italic">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA & CONTACTS --- */}
      <section className="py-24 bg-gradient-to-b from-black to-[#111] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl sm:text-6xl md:text-8xl text-display mb-8">
                Ваш автомобіль <br /> <span className="text-accent">заслуговує</span> <br /> виглядати ідеально
              </h2>
              <p className="text-white/60 text-lg mb-12 max-w-lg mx-auto lg:ml-0 italic">
                Оберіть професійний догляд та преміальні матеріали. Ми повернемо вашому авто вигляд нового за лічені дні.
              </p>
              
              <div className="space-y-6 max-w-md mx-auto lg:ml-0">
                <div className="flex flex-col sm:flex-row items-center gap-4 group cursor-pointer" onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Vulytsya+Khiry+16+Uzhhorod+Zakarpattia+Oblast+88000')}>
                  <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-accent group-hover:text-black transition-all">
                    <MapPin />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Адреса</h4>
                    <p className="text-lg font-bold">Vulytsya Khiry, 16, Ужгород</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 group cursor-pointer" onClick={() => window.location.href = 'tel:+380977390639'}>
                  <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-accent/20 group-hover:text-accent transition-all">
                    <Phone />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Телефон</h4>
                    <p className="text-lg font-bold transition-colors group-hover:text-accent">+38 (097) 739 06 39</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-4 rounded-full bg-white/5 border border-white/10">
                    <Clock />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Графік</h4>
                    <p className="text-lg font-bold">Пн-Сб: 09:00 - 19:00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 relative text-white bg-white/5"
            >
              <div className="absolute top-0 right-12 w-24 h-24 bg-white blur-[120px] opacity-10" />
              <h3 className="text-3xl text-display mb-8 text-center lg:text-left">Маєте питання?</h3>
              <div className="space-y-4">
                <button className="btn-primary w-full">
                   <span>Записатись на консультацію</span>
                   <ChevronRight size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <a href="https://www.instagram.com/detailing_uzhgorod?igshid=b8w96zoit37w" target="_blank" rel="noreferrer" className="btn-secondary w-full text-[10px] gap-2">
                    <Instagram size={16} className="text-white" />
                    <span>Instagram</span>
                  </a>
                  <a href="https://t.me/+380977390639" target="_blank" rel="noreferrer" className="btn-secondary w-full text-[10px] gap-2">
                    <Telegram size={16} className="text-white" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
              <p className="mt-8 text-center text-white/30 text-[10px] uppercase tracking-widest font-bold">
                Отримайте розрахунок вартості за 15 хвилин
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="py-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="w-full h-96 rounded-3xl overflow-hidden border border-white/10 grayscale invert brightness-90 contrast-125 opacity-80">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.1632733900223!2d22.262118876884637!3d48.61565597130006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473919ded97274b3%3A0x6c130fb37390527c!2z0JTQtdGC0LXQudC70LjQvdCzINCj0LbQs9C-0YDQvtC0IOKAnCBkZXRhaWxpbmdfdXpoZ29yb2TigJ0!5e0!3m2!1suk!2sua!4v1715896800000!5m2!1suk!2sua" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Maps Location"
             ></iframe>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-black border-t border-white/5 text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-3">
            <div className="flex items-center justify-center flex-shrink-0">
              <img 
                src="/images/logo-v3.png" 
                alt="Logo" 
                className="h-12 md:h-16 w-auto block logo-isolated"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-[8px] md:text-[9px] tracking-[0.3em] font-light opacity-50 uppercase leading-none mb-1 text-white/60">Detailing Studio</p>
              <p className="text-xs md:text-sm font-bold tracking-tight leading-none text-accent">UZHGOROD</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-[9px] md:text-[10px] text-white/20 uppercase tracking-widest max-w-[200px] md:max-w-none">
            © 2026 DETAILING UZHGOROD. <br className="md:hidden" /> ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* --- SERVICE MODAL --- */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0c0c0c] border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] bg-black overflow-hidden select-none">
                   <img 
                      src={selectedService.image} 
                      alt={selectedService.title} 
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                </div>

                {/* Right side: Details */}
                <div className="p-8 md:p-12 text-white bg-gradient-to-br from-transparent to-white/[0.02]">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-2">Detailing Service</p>
                  <h3 className="text-4xl md:text-5xl text-display mb-6">{selectedService.title}</h3>
                  
                  <div className="space-y-6 mb-10">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-2">Про послугу</h4>
                      <p className="text-white/70 italic leading-relaxed">
                        {selectedService.details}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-1">Ціна</h4>
                        <p className="text-xl font-black italic">{selectedService.price}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-1">Термін</h4>
                        <p className="text-xl font-black italic">від 2 год</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button className="btn-primary w-full py-5 rounded-2xl flex items-center justify-center gap-3">
                      <span>Записатись на {selectedService.title.toLowerCase()}</span>
                      <ChevronRight size={18} />
                    </button>
                    <button className="btn-secondary w-full py-5 rounded-2xl">
                      Консультація
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Sticky CTA Mobile --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: scrolled ? 0 : 100 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden w-full px-6"
      >
        <button 
          onClick={() => window.location.href = 'tel:+380977390639'}
          className="btn-primary w-full !bg-white/90 !text-black !backdrop-blur-md shadow-2xl"
        >
          <span>Записатись</span>
          <ChevronRight size={18} />
        </button>
      </motion.div>

    </div>
  );
}
