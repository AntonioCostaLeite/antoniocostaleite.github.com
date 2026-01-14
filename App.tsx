import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, ArrowRight, Instagram, MessageCircle, BarChart3, Layout, Smartphone, Target, PenTool, Globe, ChevronRight, Moon, Sun, ShieldCheck, Zap, FileText, MousePointer2, Sparkles, Plus, Minus } from 'lucide-react';
import { Button } from './components/Button';
import { PricingPlan, ProcessStep, PortfolioItem } from './types';

// --- DATA CONSTANTS ---

const CONTACT_WA = "https://wa.me/5577981349192";
const CONTACT_EMAIL = "mailto:antonio_cleite@hotmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/antonio.costaleite/";

const HELP_OPTIONS = [
  {
    title: 'Estrutura para Instagram',
    description: 'Transforme seu perfil em uma vitrine que vende sozinha. Organização visual, bio estratégica e destaques que guiam o cliente até a compra.',
    bullets: ['Bio Estratégica & Link', 'Destaques de Conversão', 'Identidade Visual Coesa'],
    icon: Instagram
  },
  {
    title: 'Criativos e Conteúdo',
    description: 'Pare de postar por postar. Tenha em mãos posts, carrosséis e peças visuais focadas em atrair o público certo e comunicar autoridade.',
    bullets: ['Design de Alta Conversão', 'Legendas Persuasivas', 'Roteiros de Stories'],
    icon: PenTool
  },
  {
    title: 'Estrutura Digital / Site',
    description: 'Seu terreno próprio na internet. Páginas simples, rápidas e pensadas exclusivamente para captar contatos e gerar conversas no WhatsApp.',
    bullets: ['Landing Pages Rápidas', 'Botões de WhatsApp', 'Design Responsivo'],
    icon: Globe
  }
];

const PLANS: PricingPlan[] = [
  {
    id: 'start',
    title: 'Pacote Start',
    price: 'R$ 500',
    type: 'unique',
    features: [
      'Bio estratégica',
      'Landing page com link de WhatsApp',
      '4 posts para feed',
      '4 stories',
      'Estrutura pensada para gerar contatos'
    ]
  },
  {
    id: 'monthly',
    title: 'Manutenção Mensal',
    price: 'R$ 800',
    type: 'monthly',
    highlight: true,
    features: [
      'Bio estratégica (Atualizações)',
      'Manutenção da Landing Page',
      '2 posts por semana no feed',
      '3 stories por semana',
      'Customização de perfil contínua'
    ]
  },
  {
    id: 'traffic',
    title: 'Gestão de Tráfego',
    subtitle: 'Acelerador de Resultados',
    price: 'R$ 1.500',
    type: 'monthly',
    features: [
      'Anúncios Facebook & Instagram',
      'Diagnóstico de perfil e público',
      'Configuração de campanhas',
      'Otimização contínua',
      'Monitoramento diário'
    ]
  },
  {
    id: 'web',
    title: 'Site & Landing Pages',
    subtitle: 'Alta Conversão',
    price: 'R$ 2.000',
    type: 'unique',
    features: [
      'Site institucional ou Landing Page',
      'Design limpo e responsivo',
      'Integração com WhatsApp',
      'Otimizado para vendas',
      'Manutenção opcional (+R$ 300/mês)'
    ]
  }
];

const STEPS: ProcessStep[] = [
  { number: '01', title: 'Diagnóstico', description: 'Conversamos para entender seu objetivo real e gargalos atuais.' },
  { number: '02', title: 'Briefing', description: 'Você envia sua logo, fotos básicas e identidade (se houver).' },
  { number: '03', title: 'Produção', description: 'Eu crio a estratégia, textos e o visual alinhado à venda.' },
  { number: '04', title: 'Aprovação', description: 'Você revisa cada detalhe antes de colocarmos no ar.' },
  { number: '05', title: 'Publicação', description: 'Iniciamos as postagens ou ativamos o site para o mundo.' },
];

const PORTFOLIO: PortfolioItem[] = [
  { 
    id: '1', 
    title: 'Bio Estratégica de Conversão', 
    category: 'Instagram', 
    imageUrl: 'https://i.imgur.com/VSXVAXA.png',
    description: 'Perfil estruturado para transformar visitas em cliques e mensagens.'
  }, 
  { 
    id: '2', 
    title: 'Posts que Constroem Autoridade', 
    category: 'Instagram', 
    imageUrl: 'https://i.imgur.com/5EZRXTk.jpeg',
    description: 'Conteúdo visual e textual denso focado em posicionar sua marca como a solução número 1 do mercado.'
  }, 
  { 
    id: '3', 
    title: 'Estrutura de Perfil Otimizada', 
    category: 'Instagram', 
    imageUrl: 'https://i.imgur.com/mD888Qs.png',
    description: 'Organização visual completa para transformar seu perfil em uma máquina de vendas automática e profissional.'
  }, 
  { 
    id: '4', 
    title: 'Stories com Intenção de Venda', 
    category: 'Instagram', 
    imageUrl: 'https://i.imgur.com/zX4Uirn.jpeg',
    description: 'Roteiros persuasivos e artes para stories que engajam a audiência e criam urgência imediata de compra.'
  }, 
  { 
    id: '5', 
    title: 'Criativos Validados para Anúncios', 
    category: 'Estratégia', 
    imageUrl: 'https://i.imgur.com/6CzuV8O.png',
    description: 'Artes de alta performance desenhadas para captar atenção no feed e reduzir o seu custo por lead.'
  }, 
  { 
    id: '6', 
    title: 'Scripts de Conversão no WhatsApp', 
    category: 'Estratégia', 
    imageUrl: 'https://i.imgur.com/I954DNd.png',
    description: 'Roteiros de abordagem e fechamento validados para converter o lead interessado em cliente pagante no WhatsApp.'
  }, 
];

const FAQS = [
  {
    question: "Em quanto tempo começo a ver resultados?",
    answer: "Não trabalhamos com promessas irreais. Os primeiros sinais de melhoria (mais cliques, mais mensagens e melhor retenção) costumam aparecer nas primeiras semanas, mas resultados consistentes vêm com estrutura, testes e otimizações contínuas."
  },
  {
    question: "Isso funciona para qualquer tipo de negócio?",
    answer: "Funciona para negócios que já vendem ou querem vender de forma previsível. Antes de qualquer implementação, analisamos se o seu modelo faz sentido para esse tipo de estratégia. Se não fizer, não avançamos."
  },
  {
    question: "Preciso investir em anúncios?",
    answer: "Não obrigatoriamente. A estrutura inicial já melhora a conversão do tráfego orgânico. O tráfego pago entra como acelerador, não como dependência."
  },
  {
    question: "Vou ficar preso a vocês?",
    answer: "Não. Todo o processo é estruturado para que você entenda o que está sendo feito. Se um dia decidir seguir sozinho, a estrutura continua sendo sua."
  },
  {
    question: "Vocês garantem resultados?",
    answer: "Garantimos processo, método e execução profissional. Resultados dependem de fatores como mercado, oferta e consistência — e isso é tratado com transparência desde o início."
  },
  {
    question: "Como é o início do projeto?",
    answer: "Começamos com um diagnóstico rápido, alinhamento de objetivos e só então partimos para a implementação. Nada é feito no escuro."
  }
];

// --- COMPONENTS ---

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string; light?: boolean }> = ({ children, subtitle, light = false }) => (
  <div className="mb-12 md:mb-16 reveal relative">
    <h2 className={`font-display text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-brand-dark-text dark:text-white drop-shadow-sm`}>
      {children}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl max-w-2xl font-light text-brand-gray-text dark:text-gray-400 leading-relaxed`}>
        {subtitle}
      </p>
    )}
    <div className={`h-1 w-24 mt-6 bg-brand-blue-deep dark:bg-brand-blue shadow-[0_0_20px_rgba(59,130,246,0.6)]`}></div>
  </div>
);

const PricingCard: React.FC<{ plan: PricingPlan; delay?: string }> = ({ plan, delay = "" }) => (
  <div className={`reveal ${delay} relative flex flex-col p-8 border rounded-2xl transition-all duration-300 hover:-translate-y-2 
    bg-white dark:bg-brand-dark-card/60 backdrop-blur-md z-10
    shadow-glow-light dark:shadow-glow-dark
    hover:shadow-glow-hover-light dark:hover:shadow-glow-hover-dark
    ${plan.highlight ? 'border-brand-blue-deep dark:border-brand-blue ring-1 ring-brand-blue-deep/20 dark:ring-brand-blue/20' : 'border-gray-200 dark:border-gray-800'}`}>
    
    {plan.highlight && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue-deep dark:bg-brand-blue text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-[0_0_20px_rgba(37, 99, 235, 0.6)]">
        Mais Popular
      </span>
    )}
    <div className="mb-6">
      <h3 className="font-display text-xl font-bold uppercase text-brand-dark-text dark:text-white">{plan.title}</h3>
      {plan.subtitle && <p className="text-brand-gray-text dark:text-gray-400 text-sm font-medium mt-1">{plan.subtitle}</p>}
    </div>
    <div className="mb-8">
      <span className="text-4xl font-black text-brand-dark-text dark:text-white drop-shadow-sm">{plan.price}</span>
      <span className="text-brand-gray-text dark:text-gray-500 font-medium">{plan.type === 'monthly' ? '/mês' : ' único'}</span>
    </div>
    <ul className="flex-1 space-y-4 mb-8">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div className="mt-0.5 bg-gray-100 dark:bg-white/10 p-1 rounded-full text-brand-blue-deep dark:text-brand-blue shrink-0 shadow-sm flex items-center justify-center">
            <Check size={12} strokeWidth={4} />
          </div>
          <span className="text-brand-gray-text dark:text-gray-300 text-sm font-medium leading-tight">{feature}</span>
        </li>
      ))}
    </ul>
    <a href={CONTACT_WA} target="_blank" rel="noreferrer" className="mt-auto">
      <Button variant={plan.highlight ? 'primary' : 'outline'} fullWidth>
        Contratar Agora
      </Button>
    </a>
  </div>
);

const FAQItem: React.FC<{ faq: typeof FAQS[0], isOpen: boolean, onToggle: () => void }> = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-100 dark:border-gray-800 last:border-none">
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors px-4 rounded-xl"
    >
      <span className="text-lg font-bold text-brand-dark-text dark:text-white leading-tight">
        {faq.question}
      </span>
      <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-brand-blue-deep dark:text-brand-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
      <p className="px-4 text-brand-gray-text dark:text-gray-400 leading-relaxed font-light">
        {faq.answer}
      </p>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHelpIndex, setActiveHelpIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeHelpIndex]);

  const scrollToSection = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    if (e) e.preventDefault();
    const cleanId = id.startsWith('#') ? id.substring(1) : id;
    const section = document.getElementById(cleanId);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Problema', href: '#problem' },
    { label: 'Serviços', href: '#services' },
    { label: 'Solução', href: '#portfolio' },
    { label: 'Processo', href: '#process' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-blue-deep dark:selection:bg-brand-blue selection:text-white bg-transparent text-brand-dark-text dark:text-gray-200 transition-colors duration-300 overflow-x-hidden relative">
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-brand-light-bg/80 dark:bg-brand-dark-bg/60 backdrop-blur-xl border-gray-200 dark:border-white/5 py-3 shadow-lg' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#" onClick={(e) => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col z-50">
            <span className={`font-display font-black text-xl tracking-tighter uppercase leading-none text-brand-dark-text dark:text-white drop-shadow-md`}>
              Antônio
            </span>
            <span className={`font-display font-bold text-sm tracking-widest uppercase leading-none ${scrolled ? 'text-brand-blue-deep dark:text-brand-blue' : 'text-brand-gray-text dark:text-gray-400'}`}>
              Costa Leite
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-blue-deep dark:hover:text-brand-blue transition-colors text-brand-gray-text dark:text-gray-400`}
              >
                {link.label}
              </a>
            ))}
            
            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-gray-100 dark:hover:bg-white/5 text-brand-dark-text dark:text-white' : 'text-brand-dark-text dark:text-white hover:bg-white/10'}`}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a href={CONTACT_WA} target="_blank" rel="noreferrer">
              <Button variant="primary" className="scale-90 px-8">Contrate</Button>
            </a>
          </nav>

          <div className="flex items-center gap-4 md:hidden z-50">
             <button onClick={() => setIsDark(!isDark)} className="text-brand-dark-text dark:text-white"><Sun size={24} /></button>
            <button className="text-brand-dark-text dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>

        <div className={`fixed inset-0 bg-brand-light-bg/95 dark:bg-brand-dark-bg/95 backdrop-blur-xl z-40 flex items-center justify-center transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center gap-8 p-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-2xl font-display font-bold text-brand-dark-text dark:text-white uppercase tracking-wider hover:text-brand-blue-deep dark:hover:text-brand-blue">{link.label}</a>
            ))}
            <a href={CONTACT_WA} target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)}><Button variant="whatsapp">Falar Comigo</Button></a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Subtle Section Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-blue-deep/20 dark:bg-brand-blue/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-10 animate-fade-slide-up">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/40 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-glow-dark">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[9px] font-black text-brand-gray-text dark:text-blue-300 uppercase tracking-[0.3em]">Disponível para novos projetos</span>
            </div>
            
            <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-brand-dark-text dark:text-white uppercase leading-[0.95] tracking-normal drop-shadow-2xl overflow-visible pb-4">
              Sistema de <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-deep to-brand-blue dark:from-blue-400 dark:to-blue-200 filter drop-shadow-lg pr-8">
                Captação de Clientes
              </span> 
              <br /> para Negócios.
            </h1>
            
            <p className="text-brand-gray-text dark:text-gray-400 text-lg md:text-2xl max-w-xl leading-relaxed border-l-2 border-brand-blue-deep/20 dark:border-brand-blue/30 pl-8 font-light italic">
              Sou Antônio Costa Leite. Especialista em estruturar negócios digitais que geram <strong className="text-brand-dark-text dark:text-white font-bold">contatos reais</strong>, não apenas curtidas.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-12">
              <a href={CONTACT_WA} target="_blank" rel="noreferrer">
                <Button variant="primary" className="h-16 px-10 text-lg w-full sm:w-auto shadow-2xl">
                  <MessageCircle className="mr-3" size={22} />
                  Começar Agora
                </Button>
              </a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>
                <Button variant="secondary" className="h-16 px-10 text-lg w-full sm:w-auto">Ver Planos</Button>
              </a>
            </div>
          </div>

          <div className="relative hidden md:flex justify-center items-center animate-fade-scale delay-200">
             <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl dark:shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-brand-dark-card/40 backdrop-blur-md group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-deep/5 to-transparent dark:from-brand-blue/10 z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1726066012685-f5ccd26b6f55?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Estratégia Digital" 
                  className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 dark:mix-blend-luminosity"
                />
                <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20">
                  <div className="flex items-center gap-6 text-white">
                     <div className="bg-brand-blue-deep/20 dark:bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-glow-dark">
                        <BarChart3 size={32} className="text-brand-blue dark:text-blue-300" />
                     </div>
                     <div>
                        <p className="font-display font-black text-2xl uppercase tracking-tight">Performance</p>
                        <p className="text-sm text-gray-300 font-medium">Estratégia baseada em dados</p>
                     </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* HELP SECTION */}
      <section className="py-24 transition-colors duration-300 relative z-10">
        {/* Glow behind cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-blue/5 blur-[150px] pointer-events-none -z-10"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-brand-dark-text dark:text-white mb-6 tracking-tight">Como posso te ajudar hoje?</h2>
            <div className="h-1 w-20 bg-brand-blue-deep dark:bg-brand-blue mx-auto mb-6"></div>
            <p className="text-xl text-brand-gray-text dark:text-gray-400 font-light">Escolha a estrutura que mais faz sentido para o seu momento.</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {HELP_OPTIONS.map((option, idx) => {
                 const isActive = activeHelpIndex === idx;
                 return (
                  <button key={idx} onClick={() => setActiveHelpIndex(idx)} className={`reveal delay-${idx * 100} flex items-center gap-5 p-6 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden group 
                      ${isActive ? 'border-brand-blue-deep bg-brand-blue-deep text-white dark:bg-brand-blue dark:border-brand-blue shadow-2xl scale-105 z-10' : 'border-transparent bg-white/60 dark:bg-white/5 text-brand-gray-text dark:text-gray-400 hover:border-gray-200 dark:hover:border-white/10 hover:shadow-xl backdrop-blur-md'}`}>
                    <div className={`p-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/20 text-white rotate-6' : 'bg-white dark:bg-white/5 text-brand-gray-text dark:text-gray-500 group-hover:text-brand-blue-deep dark:group-hover:text-brand-blue shadow-sm'}`}><option.icon size={28} /></div>
                    <span className={`font-display font-black text-sm uppercase tracking-widest ${isActive ? 'text-white' : 'text-brand-dark-text dark:text-white'}`}>{option.title}</span>
                  </button>
                 );
              })}
            </div>

            <div className="reveal relative bg-white/80 dark:bg-brand-dark-card/60 rounded-[2.5rem] p-10 md:p-16 border border-gray-100 dark:border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[450px]">
                <div key={`icon-${activeHelpIndex}`} className="absolute -top-12 -right-12 text-gray-100 dark:text-white/[0.03] pointer-events-none animate-fade-scale">
                   {React.createElement(HELP_OPTIONS[activeHelpIndex].icon, { size: 400 })}
                </div>
                <div key={activeHelpIndex} className="relative z-10 flex flex-col md:flex-row gap-16 items-start animate-fade-slide-up">
                   <div className="flex-1">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-brand-blue-deep dark:text-brand-blue rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm"><Target size={16} />Opção Selecionada</div>
                      <h3 className="font-display font-black text-4xl md:text-6xl text-brand-dark-text dark:text-white mb-8 leading-none tracking-tight">{HELP_OPTIONS[activeHelpIndex].title}</h3>
                      <p className="text-xl text-brand-gray-text dark:text-gray-300 leading-relaxed mb-10 max-w-3xl font-light">{HELP_OPTIONS[activeHelpIndex].description}</p>
                      <Button variant="primary" onClick={(e) => scrollToSection(e, 'services')} className="px-10 h-14">Ver o que está incluso <ArrowRight className="ml-3" size={20}/></Button>
                   </div>
                   <div className="w-full md:w-80 bg-gray-50/50 dark:bg-black/20 p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-inner backdrop-blur-sm">
                      <p className="font-black text-brand-blue-deep dark:text-brand-blue uppercase text-[10px] mb-6 tracking-[0.3em]">Deliverables:</p>
                      <ul className="space-y-5">
                        {HELP_OPTIONS[activeHelpIndex].bullets.map((item, i) => (
                          <li key={i} className="flex items-center text-brand-gray-text dark:text-gray-200 font-bold text-sm">
                            <div className="w-8 h-8 rounded-xl bg-white dark:bg-white/10 text-brand-blue-deep dark:text-brand-blue flex items-center justify-center mr-4 shrink-0 shadow-sm border dark:border-white/10"><Check size={16} strokeWidth={4} /></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-32 bg-transparent relative z-10">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full -z-10"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="reveal">
               <SectionTitle subtitle="O erro comum da maioria dos negócios no Instagram.">Por que seu perfil é <br /><span className="text-brand-blue-deep dark:text-brand-blue">bonito</span>, mas não vende?</SectionTitle>
               <div className="space-y-6">
                 {["Não tem estratégia clara de conversão.", "Não gera mensagens no WhatsApp (leads).", "Não sabe o que postar para atrair compradores.", "Acumula seguidores fantasmas que não compram."].map((item, idx) => (
                   <div key={idx} className={`flex items-start gap-5 p-6 rounded-3xl bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm transition-all duration-500 border border-gray-100 dark:border-white/5 hover:border-brand-blue-deep/30 dark:hover:border-brand-blue/30 shadow-sm hover:-translate-y-1`}>
                     <div className="bg-white dark:bg-white/10 p-3 rounded-2xl text-brand-blue-deep dark:text-brand-blue mt-1 shadow-sm border dark:border-white/10"><ShieldCheck size={24} /></div>
                     <p className="text-xl text-brand-gray-text dark:text-gray-200 font-light leading-snug">{item}</p>
                   </div>
                 ))}
               </div>
               <div className="mt-10 p-8 bg-white/50 dark:bg-brand-dark-card/50 backdrop-blur-md border-l-4 border-brand-blue-deep dark:border-brand-blue rounded-r-3xl shadow-glow-dark">
                 <p className="font-display font-black text-brand-dark-text dark:text-white text-xl uppercase tracking-tight">A Solução</p>
                 <p className="text-brand-gray-text dark:text-gray-400 mt-3 text-lg leading-relaxed">Meu trabalho é criar um <strong className="text-brand-blue-deep dark:text-brand-blue font-bold">sistema simples</strong> e validado para resolver esses gargalos e colocar dinheiro no seu bolso.</p>
               </div>
            </div>
            <div className="relative reveal delay-200">
              <div className="absolute inset-0 bg-brand-blue-deep/10 dark:bg-brand-blue/10 rounded-[3rem] transform rotate-3 blur-3xl"></div>
              <img src="https://images.unsplash.com/photo-1547032175-7fc8c7bd15b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Foco no problema" className="relative rounded-[3rem] shadow-2xl w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 border border-gray-200 dark:border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 bg-transparent z-10 relative">
        {/* Glow behind cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-blue/5 blur-[150px] pointer-events-none -z-10"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase text-brand-dark-text dark:text-white mb-8 tracking-tight">Como podemos estruturar sua <span className="text-brand-blue-deep/80 dark:text-brand-blue/50">captação de clientes</span></h2>
            <p className="text-xl text-brand-gray-text dark:text-gray-400 font-light">Escolha o pacote ideal para o estágio atual do seu negócio.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PLANS.map((plan, index) => <PricingCard key={plan.id} plan={plan} delay={`delay-${index * 100}`} />)}
          </div>
          <div className="mt-16 text-center reveal delay-300">
            <p className="text-brand-gray-text dark:text-gray-500 text-sm mb-6">Tem dúvidas sobre qual escolher?</p>
            <a href={CONTACT_WA} target="_blank" rel="noreferrer"><Button variant="outline" className="px-10">Falar Comigo</Button></a>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION (SOLUÇÃO) */}
      <section id="portfolio" className="py-32 bg-transparent z-10 relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle subtitle="Materiais desenvolvidos com foco em performance e estética premium.">Tudo o que sua presença digital <span className="text-brand-blue-deep dark:text-brand-blue">precisa para vender</span></SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PORTFOLIO.map((item, idx) => (
              <div key={item.id} className={`reveal delay-${(idx % 3) * 100} group relative overflow-hidden rounded-[2.5rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm border border-gray-100 dark:border-white/5 shadow-xl flex flex-col`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 left-6 z-20"><span className="px-4 py-1.5 bg-brand-blue-deep dark:bg-brand-blue text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-md shadow-2xl">{item.category}</span></div>
                  <div className="absolute inset-0 bg-brand-blue-deep/90 dark:bg-brand-dark-bg/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-10 z-10">
                    <div className="mb-6 text-white dark:text-brand-blue"><FileText size={48} strokeWidth={1} /></div>
                    <p className="text-white dark:text-gray-200 text-lg leading-relaxed font-light">{item.description}</p>
                    <div className="mt-10 flex items-center text-white/60 text-[10px] font-black uppercase tracking-[0.4em]"><MousePointer2 size={16} className="mr-3" />Premium Case</div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black uppercase text-brand-dark-text dark:text-white mb-4 tracking-tight group-hover:text-brand-blue-deep dark:group-hover:text-brand-blue transition-colors">{item.title}</h3>
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100 dark:border-white/5"><span className="text-[9px] font-black text-brand-gray-text dark:text-gray-500 uppercase tracking-[0.3em]">Solução Integrada</span><div className="text-brand-blue-deep dark:text-brand-blue opacity-50"><Zap size={20} /></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-32 relative z-10 overflow-hidden">
        {/* Glow behind process content - Using a radial blend to avoid harsh lines at section edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle subtitle="Passo a passo transparente da contratação até a entrega.">Como <span className="text-brand-blue-deep dark:text-brand-blue">Funciona?</span></SectionTitle>
          <div className="grid md:grid-cols-5 gap-10">
            {STEPS.map((step, idx) => (
              <div key={idx} className={`reveal delay-${idx * 100} relative flex flex-col group`}>
                {idx !== STEPS.length - 1 && <div className="hidden md:block absolute top-10 left-1/2 w-full h-[1px] bg-gray-200 dark:bg-white/10 -z-10 group-hover:bg-brand-blue-deep/30 transition-colors"></div>}
                <div className="w-20 h-20 rounded-3xl bg-brand-blue-deep dark:bg-brand-blue text-white flex items-center justify-center font-display font-black text-3xl mb-8 shadow-xl shadow-brand-blue-deep/20 dark:shadow-brand-blue/30 group-hover:scale-110 transition-all duration-500 mx-auto md:mx-0">{step.number}</div>
                <h3 className="text-xl font-black uppercase text-brand-dark-text dark:text-white mb-4 text-center md:text-left tracking-tight">{step.title}</h3>
                <p className="text-brand-gray-text dark:text-gray-400 text-sm leading-relaxed text-center md:text-left font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 bg-transparent relative z-10 overflow-hidden">
        {/* Glow behind faq content - Also using radial blend for total visual consistency */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none -z-10"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3 reveal">
               <h2 className="font-display text-5xl font-black uppercase text-brand-dark-text dark:text-white mb-8 tracking-tighter leading-none">Perguntas <br /><span className="text-brand-blue-deep dark:text-brand-blue">frequentes</span></h2>
               <p className="text-xl text-brand-gray-text dark:text-gray-400 font-light leading-relaxed">Tudo o que você precisa saber antes de iniciarmos nossa parceria estratégica.</p>
            </div>
            <div className="md:w-2/3 reveal delay-200">
               <div className="bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl overflow-hidden">
                  {FAQS.map((faq, index) => <FAQItem key={index} faq={faq} isOpen={openFaqIndex === index} onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} />)}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 bg-black relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center reveal">
          <h2 className="font-display text-5xl md:text-8xl font-black uppercase text-white mb-10 tracking-tighter drop-shadow-xl leading-[0.9]">Pronto para escalar seu <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">negócio?</span></h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-16 font-light leading-relaxed">Não deixe para o mês que vem. Vamos organizar sua casa digital hoje e começar a captar clientes de verdade com uma estrutura premium.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a href={CONTACT_WA} target="_blank" rel="noreferrer" className="w-full md:w-auto"><Button variant="whatsapp" className="w-full md:w-auto h-20 px-12 text-xl shadow-2xl"><MessageCircle className="mr-4" size={28} />Falar Comigo</Button></a>
            <a href={CONTACT_EMAIL} className="w-full md:w-auto"><Button variant="outline" className="w-full md:w-auto h-20 px-12 text-xl border-white/20 text-white hover:bg-white/10">Enviar E-mail</Button></a>
          </div>
          <div className="mt-32 pt-10 border-t border-white/5 text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] flex flex-col md:flex-row justify-between items-center gap-6">
            <p>© {new Date().getFullYear()} ANTÔNIO COSTA LEITE.</p>
            <div className="flex gap-8"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;