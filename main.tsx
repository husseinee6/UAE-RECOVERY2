import { useState, useEffect, createContext, useContext } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Globe,
  Truck,
  Package,
  Clock,
  Shield,
  Headphones,
  MapPin,
  Mail,
  ChevronDown,
  Star,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Building2,
  Settings,
  RefreshCcw,
  UsersRound,
} from 'lucide-react';

// Language Context
interface LanguageContextType {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    brand: 'Rikfiri',
    tagline: 'Premium Transportation & Logistics Solutions',
    heroTitle: 'Your Trusted Partner in Transportation',
    heroSubtitle: 'Delivering excellence in logistics and transportation services across the UAE. Fast, reliable, and professional.',
    callNow: 'Call Now',
    whatsappUs: 'WhatsApp Us',
    aboutTitle: 'About Rikfiri',
    aboutText: 'Rikfiri is a leading transportation and logistics company based in the UAE, dedicated to providing exceptional service to businesses and individuals alike. With years of experience and a commitment to excellence, we have built a reputation for reliability, efficiency, and customer satisfaction. Our team of professionals ensures that every delivery is handled with the utmost care and precision.',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive transportation and logistics solutions tailored to your needs',
    whyChooseTitle: 'Why Choose Rikfiri',
    whyChooseSubtitle: 'What sets us apart from the rest',
    galleryTitle: 'Our Work',
    gallerySubtitle: 'See how we deliver excellence',
    contactTitle: 'Get In Touch',
    contactSubtitle: "Ready to move? Let's discuss your needs",
    name: 'Full Name',
    phone: 'Phone Number',
    service: 'Service Required',
    message: 'Your Message',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    successMessage: 'Thank you! We will contact you shortly.',
    address: 'Dubai, United Arab Emirates',
    email: 'info@rikfiri.com',
    hours: 'Sun - Thu: 8:00 AM - 6:00 PM',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    gallery: 'Gallery',
    contact: 'Contact Us',
    rights: 'All rights reserved.',
    freight: 'Freight Services',
    freightDesc: 'Comprehensive freight solutions for international and domestic cargo transport.',
    warehousing: 'Warehousing',
    warehousingDesc: 'Secure storage solutions with inventory management and distribution.',
    delivery: 'Express Delivery',
    deliveryDesc: 'Fast, reliable delivery services for time-sensitive shipments.',
    logistics: 'Supply Chain',
    logisticsDesc: 'End-to-end supply chain management and optimization services.',
    corporate: 'Corporate Transport',
    corporateDesc: 'Premium transportation solutions for businesses and events.',
    consultation: 'Consultation',
    consultationDesc: 'Expert logistics consultation to streamline your operations.',
    reliable: 'Reliable Service',
    reliableDesc: 'Consistent, dependable delivery you can count on.',
    fast: 'Fast Response',
    fastDesc: 'Quick turnaround times and efficient operations.',
    quality: 'Quality Assurance',
    qualityDesc: 'Rigorous standards ensuring top-notch service quality.',
    support: '24/7 Support',
    supportDesc: 'Round-the-clock customer support whenever you need us.',
    clients: 'Happy Clients',
    projects: 'Projects Completed',
    experience: 'Years Experience',
    rating: 'Customer Rating',
    selectService: 'Select a service',
    required: 'This field is required',
    invalidPhone: 'Please enter a valid phone number',
    namePlaceholder: 'Enter your full name',
    phonePlaceholder: '+971 50 000 0000',
    messagePlaceholder: 'Tell us about your transportation needs...',
  },
  ar: {
    brand: 'ركفيري',
    tagline: 'حلول النقل واللوجستيات الفاخرة',
    heroTitle: 'شريكك الموثوق في النقل',
    heroSubtitle: 'نقدم خدمات نقل ولوجستيات متميزة في جميع أنحاء الإمارات العربية المتحدة. سريع وموثوق ومهني.',
    callNow: 'اتصل الآن',
    whatsappUs: 'واتساب',
    aboutTitle: 'عن ركفيري',
    aboutText: 'ركفيري هي شركة رائدة في مجال النقل واللوجستيات مقرها في الإمارات العربية المتحدة، ملتزمة بتقديم خدمات استثنائية للشركات والأفراد على حد سواء. مع سنوات من الخبرة والالتزام بالتميز، بنينا سمعة طيبة في الموثوقية والكفاءة ورضا العملاء. يضمن فريقنا من المحترفين أن كل عملية تسليم تتم بعناية ودقة قصوى.',
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'حلول نقل ولوجستيات شاملة مصممة لتلبية احتياجاتك',
    whyChooseTitle: 'لماذا تختار ركفيري',
    whyChooseSubtitle: 'ما يميزنا عن الآخرين',
    galleryTitle: 'أعمالنا',
    gallerySubtitle: 'شاهد كيف نقدم التميز',
    contactTitle: 'تواصل معنا',
    contactSubtitle: 'هل أنت مستعد للنقل؟ دعنا نناقش احتياجاتك',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    service: 'الخدمة المطلوبة',
    message: 'رسالتك',
    sendMessage: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    successMessage: 'شكراً لك! سنتواصل معك قريباً.',
    address: 'دبي، الإمارات العربية المتحدة',
    email: 'info@rikfiri.com',
    hours: 'الأحد - الخميس: 8:00 صباحاً - 6:00 مساءً',
    quickLinks: 'روابط سريعة',
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    gallery: 'معرض الأعمال',
    contact: 'اتصل بنا',
    rights: 'جميع الحقوق محفوظة.',
    freight: 'خدمات الشحن',
    freightDesc: 'حلول شحن شاملة لنقل البضائع الدولية والمحلية.',
    warehousing: 'التخزين',
    warehousingDesc: 'حلول تخزين آمنة مع إدارة المخزون والتوزيع.',
    delivery: 'التوصيل السريع',
    deliveryDesc: 'خدمات توصيل سريعة وموثوقة للشحنات الحساسة للوقت.',
    logistics: 'سلسلة التوريد',
    logisticsDesc: 'خدمات إدارة وتحسين سلسلة التوريد من البداية للنهاية.',
    corporate: 'النقل الشركاتي',
    corporateDesc: 'حلول نقل فاخرة للشركات والمناسبات.',
    consultation: 'الاستشارات',
    consultationDesc: 'استشارات لوجستية متخصصة لتبسيط عملياتك.',
    reliable: 'خدمة موثوقة',
    reliableDesc: 'توصيل متسق وموثوق يمكنك الاعتماد عليه.',
    fast: 'استجابة سريعة',
    fastDesc: 'أوقات تحول سريعة وعمليات فعالة.',
    quality: 'ضمان الجودة',
    qualityDesc: 'معايير صارمة تضمن جودة خدمة من الدرجة الأولى.',
    support: 'دعم على مدار الساعة',
    supportDesc: 'دعم العملاء على مدار الساعة كلما احتجت إلينا.',
    clients: 'عملاء سعداء',
    projects: 'مشروع مكتمل',
    experience: 'سنوات خبرة',
    rating: 'تقييم العملاء',
    selectService: 'اختر خدمة',
    required: 'هذا الحقل مطلوب',
    invalidPhone: 'يرجى إدخال رقم هاتف صحيح',
    namePlaceholder: 'أدخل اسمك الكامل',
    phonePlaceholder: '+971 50 000 0000',
    messagePlaceholder: 'أخبرنا عن احتياجاتك في النقل...',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

// Navbar Component
const Navbar = () => {
  const { lang, setLang, t, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('home') },
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#gallery', label: t('gallery') },
    { href: '#contact', label: t('contact') },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-2xl font-bold text-white">{t('brand')}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-white/80 hover:text-amber-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-slate-900/95 backdrop-blur-md px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block py-3 px-4 text-white/80 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { t } = useLanguage();
  const phoneNumber = '971507245242';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80"
          alt="Logistics and transportation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in">
          <p className="text-amber-400 font-semibold text-lg mb-4 tracking-wider uppercase">
            {t('tagline')}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:+${phoneNumber}`}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full hover:from-amber-500 hover:to-amber-600 transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-400/25"
            >
              <Phone className="w-5 h-5" />
              <span>{t('callNow')}</span>
            </a>
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-emerald-500/25"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('whatsappUs')}</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
              alt="Professional team"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl -z-10" />
          </div>
          <div>
            <p className="text-amber-600 font-semibold mb-2">{t('aboutTitle')}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              {t('aboutTitle')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {t('aboutText')}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <span className="font-semibold text-slate-800">Premium Service</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-semibold text-slate-800">Expert Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const { t, dir } = useLanguage();

  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: t('freight'),
      desc: t('freightDesc'),
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: t('warehousing'),
      desc: t('warehousingDesc'),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('delivery'),
      desc: t('deliveryDesc'),
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: t('logistics'),
      desc: t('logisticsDesc'),
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: t('corporate'),
      desc: t('corporateDesc'),
    },
    {
      icon: <RefreshCcw className="w-8 h-8" />,
      title: t('consultation'),
      desc: t('consultationDesc'),
    },
  ];

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 font-semibold mb-2">{t('servicesTitle')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={scrollToContact}
              className="group p-8 bg-slate-50 rounded-2xl hover:bg-gradient-to-br hover:from-blue-900 hover:to-slate-900 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-amber-400 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 group-hover:text-white/80 transition-colors">
                {service.desc}
              </p>
              <div className="mt-4 flex items-center gap-2 text-amber-600 group-hover:text-amber-400 transition-colors">
                <span className="font-medium">Learn more</span>
                <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <UsersRound className="w-7 h-7" />, value: '500+', label: t('clients') },
    { icon: <Package className="w-7 h-7" />, value: '1,200+', label: t('projects') },
    { icon: <Clock className="w-7 h-7" />, value: '8+', label: t('experience') },
    { icon: <Star className="w-7 h-7" />, value: '4.9', label: t('rating') },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
                {stat.icon}
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseSection = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: t('reliable'),
      desc: t('reliableDesc'),
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: t('fast'),
      desc: t('fastDesc'),
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: t('quality'),
      desc: t('qualityDesc'),
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: t('support'),
      desc: t('supportDesc'),
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 font-semibold mb-2">{t('whyChooseTitle')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t('whyChooseTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('whyChooseSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-lg">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-slate-600">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const { t } = useLanguage();

  const images = [
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 font-semibold mb-2">{t('galleryTitle')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t('galleryTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('gallerySubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const { t, dir } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const phoneNumber = '971507245242';

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('required');
    if (!formData.phone.trim()) {
      newErrors.phone = t('required');
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = t('invalidPhone');
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', phone: '', service: '', message: '' });

    setTimeout(() => setIsSuccess(false), 5000);
  };

  const services = [
    t('freight'),
    t('warehousing'),
    t('delivery'),
    t('logistics'),
    t('corporate'),
    t('consultation'),
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 font-semibold mb-2">{t('contactTitle')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t('contactTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('successMessage')}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: '' });
                    }}
                    placeholder={t('namePlaceholder')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                      errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-amber-400'
                    } focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      setErrors({ ...errors, phone: '' });
                    }}
                    placeholder={t('phonePlaceholder')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                      errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-amber-400'
                    } focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    {t('service')}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  >
                    <option value="">{t('selectService')}</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('messagePlaceholder')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-400/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t('sending')}
                    </span>
                  ) : (
                    t('sendMessage')
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">{t('contactTitle')}</h3>

              <div className="space-y-6">
                <a
                  href={`tel:+${phoneNumber}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-amber-50 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">{t('phone')}</p>
                    <p className="text-xl font-bold text-slate-900">+971 50 724 5242</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">WhatsApp</p>
                    <p className="text-xl font-bold text-slate-900">{t('whatsappUs')}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center text-amber-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">{t('address')}</p>
                    <p className="text-lg font-bold text-slate-900">{t('address').split(',')[0]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center text-amber-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="text-lg font-bold text-slate-900">{t('email')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-8 text-white">
              <h4 className="text-lg font-bold mb-4">Working Hours</h4>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <p>{t('hours')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { t, dir } = useLanguage();
  const phoneNumber = '971507245242';

  const quickLinks = [
    { href: '#home', label: t('home') },
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#gallery', label: t('gallery') },
    { href: '#contact', label: t('contact') },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold">{t('brand')}</span>
            </div>
            <p className="text-white/70 mb-6">
              Your trusted partner in transportation and logistics solutions across the UAE.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-white/70 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('services')}</h4>
            <ul className="space-y-3 text-white/70">
              <li>{t('freight')}</li>
              <li>{t('warehousing')}</li>
              <li>{t('delivery')}</li>
              <li>{t('logistics')}</li>
              <li>{t('corporate')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <a href={`tel:+${phoneNumber}`} className="text-white/70 hover:text-amber-400 transition-colors">
                  +971 50 724 5242
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-emerald-400 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-white/70">{t('address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} {t('brand')}. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingButtons = () => {
  const phoneNumber = '971507245242';

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <a
        href={`tel:+${phoneNumber}`}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-900 shadow-lg shadow-amber-400/30 hover:scale-110 transition-transform"
        title="Call Now"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 hover:scale-110 transition-transform animate-pulse"
        title="WhatsApp Us"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

// Main App
function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const t = (key: string) => translations[lang][key as keyof typeof translations.en] || key;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} className={lang === 'ar' ? 'font-arabic' : ''}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <StatsSection />
          <WhyChooseSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
