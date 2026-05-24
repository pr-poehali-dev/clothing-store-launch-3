import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/df3a095f-e780-4d67-9a06-9a6b22d4e005/files/5d4a3e61-aa27-43a6-b478-945f272591d7.jpg";
const COLLECTION_IMAGE = "https://cdn.poehali.dev/projects/df3a095f-e780-4d67-9a06-9a6b22d4e005/files/6c3b82ad-2850-4911-be96-b137d25442ac.jpg";
const ABOUT_IMAGE = "https://cdn.poehali.dev/projects/df3a095f-e780-4d67-9a06-9a6b22d4e005/files/0982c876-6364-40ae-adac-3e436493de3e.jpg";

const NAV_LINKS = [
  { label: "Коллекции", href: "#collections" },
  { label: "Каталог", href: "#catalog" },
  { label: "О бренде", href: "#about" },
  { label: "Блог", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const CATALOG_ITEMS = [
  { id: 1, name: "Кашемировое пальто", price: "89 000 ₽", category: "Верхняя одежда", tag: "Новинка" },
  { id: 2, name: "Шёлковое платье", price: "45 000 ₽", category: "Платья", tag: "" },
  { id: 3, name: "Льняной костюм", price: "67 000 ₽", category: "Костюмы", tag: "Хит" },
  { id: 4, name: "Кожаный тренч", price: "124 000 ₽", category: "Верхняя одежда", tag: "" },
  { id: 5, name: "Шерстяной джемпер", price: "28 000 ₽", category: "Трикотаж", tag: "" },
  { id: 6, name: "Брючный костюм", price: "58 000 ₽", category: "Костюмы", tag: "Новинка" },
];

const COLLECTIONS = [
  { id: 1, name: "Осень / Зима 2025", subtitle: "Тёплые оттенки и богатые фактуры", items: 24 },
  { id: 2, name: "Resort 2025", subtitle: "Лёгкость и воздушность южного лета", items: 18 },
  { id: 3, name: "Архивная коллекция", subtitle: "Культовые вещи прошлых сезонов", items: 12 },
];

const BLOG_POSTS = [
  {
    id: 1,
    date: "15 мая 2026",
    category: "Стиль",
    title: "Как составить капсульный гардероб на весну",
    excerpt: "Несколько ключевых вещей, которые создадут бесконечное количество образов.",
  },
  {
    id: 2,
    date: "2 мая 2026",
    category: "Материалы",
    title: "Кашемир: всё, что нужно знать о королевской ткани",
    excerpt: "История, производство и уход за самым ценным трикотажем в мире.",
  },
  {
    id: 3,
    date: "20 апреля 2026",
    category: "Тренды",
    title: "Минимализм как философия жизни",
    excerpt: "Меньше вещей, больше смысла — современный подход к стилю.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Как выбрать правильный размер?",
    a: "На каждой странице товара есть подробная таблица размеров с мерками. Также вы можете написать нам, и стилист поможет подобрать идеальный размер.",
  },
  {
    q: "Какие условия доставки?",
    a: "Бесплатная доставка по России при заказе от 10 000 ₽. Курьером по Москве — 1-2 дня, по России — 3-7 дней. Также доступна экспресс-доставка.",
  },
  {
    q: "Как вернуть или обменять товар?",
    a: "Возврат и обмен возможны в течение 30 дней с момента получения при наличии бирок и в оригинальной упаковке.",
  },
  {
    q: "Как ухаживать за изделиями из натуральных материалов?",
    a: "К каждому изделию прилагается руководство по уходу. Кашемир и шёлк рекомендуется сдавать в химчистку или стирать вручную в холодной воде.",
  },
  {
    q: "Доступна ли примерка перед покупкой?",
    a: "Да, в нашем шоуруме в Москве вы можете записаться на персональную примерку с личным стилистом.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="bg-ivory min-h-screen font-body overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-ivory/95 backdrop-blur-sm border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          <button onClick={() => scrollTo("#hero")} className="font-display text-2xl lg:text-3xl tracking-[0.15em] font-light text-charcoal hover:text-gold transition-colors duration-300">
            MAISON
          </button>
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link text-charcoal hover:text-gold">
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden lg:flex items-center gap-2 nav-link text-charcoal hover:text-gold">
              <Icon name="ShoppingBag" size={18} />
              <span className="text-xs">0</span>
            </button>
            <button className="lg:hidden text-charcoal" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              className="font-display text-3xl text-ivory font-light tracking-[0.1em] hover:text-gold transition-colors">
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="MAISON" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-32 w-full">
          <div className="max-w-2xl">
            <p className="section-label text-gold mb-6 animate-fade-up animate-delay-100">Новая коллекция · Осень 2025</p>
            <h1 className="font-display text-5xl lg:text-7xl xl:text-8xl text-ivory font-light leading-none mb-6 animate-fade-up animate-delay-200">
              Одежда как<br /><em>произведение</em><br />искусства
            </h1>
            <p className="text-ivory/70 text-sm tracking-wider leading-relaxed mb-10 animate-fade-up animate-delay-300 max-w-md">
              Люксовые материалы. Безупречный крой. Вечный стиль — коллекция для тех, кто знает цену качеству.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-400">
              <button onClick={() => scrollTo("#catalog")} className="btn-primary bg-gold text-charcoal hover:bg-ivory">
                Смотреть каталог
              </button>
              <button onClick={() => scrollTo("#collections")} className="btn-outline text-ivory border-ivory hover:bg-ivory hover:text-charcoal">
                Все коллекции
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 lg:right-12 z-10 hidden lg:flex flex-col items-center gap-2 text-ivory/50">
          <span className="text-xs tracking-[0.2em] rotate-90 mb-6 font-body">SCROLL</span>
          <div className="w-px h-12 bg-ivory/30" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-charcoal py-4 overflow-hidden">
        <div style={{ animation: "marquee 22s linear infinite", display: "flex", whiteSpace: "nowrap" }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8 text-xs tracking-[0.3em] text-ivory/50 font-body uppercase flex-shrink-0">
              <span>Кашемир</span>
              <span className="text-gold">✦</span>
              <span>Шёлк</span>
              <span className="text-gold">✦</span>
              <span>Итальянская шерсть</span>
              <span className="text-gold">✦</span>
              <span>Натуральная кожа</span>
              <span className="text-gold">✦</span>
              <span>Льняные ткани</span>
              <span className="text-gold">✦</span>
              <span>Ручная работа</span>
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTIONS */}
      <section id="collections" className="py-24 lg:py-36 max-w-7xl mx-auto px-6 lg:px-12">
        <FadeSection>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="section-label mb-4">Коллекции</p>
              <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal">Наши<br /><em>сезонные линии</em></h2>
            </div>
            <button onClick={() => scrollTo("#catalog")} className="hidden lg:flex items-center gap-3 text-charcoal hover:text-gold transition-colors group">
              <span className="nav-link">Все товары</span>
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </FadeSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {COLLECTIONS.map((col, i) => (
            <FadeSection key={col.id}>
              <div
                className="bg-ivory p-10 lg:p-12 hover:bg-charcoal group transition-all duration-500 cursor-pointer h-full"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs tracking-[0.3em] text-gold font-body">0{col.id}</span>
                  <Icon name="ArrowUpRight" size={18} className="text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-light text-charcoal group-hover:text-ivory mb-3 transition-colors duration-500">
                  {col.name}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-ivory/60 transition-colors duration-500 leading-relaxed mb-8">
                  {col.subtitle}
                </p>
                <div className="border-t border-border group-hover:border-ivory/20 pt-6 transition-colors duration-500">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground group-hover:text-ivory/50 font-body transition-colors duration-500">
                    {col.items} ИЗДЕЛИЙ
                  </span>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 lg:py-36 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeSection>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="section-label mb-4" style={{ color: "hsl(43, 60%, 52%)" }}>Каталог</p>
                <h2 className="font-display text-4xl lg:text-6xl font-light text-ivory">Избранные<br /><em>новинки</em></h2>
              </div>
              <div className="hidden lg:flex gap-2">
                {["Всё", "Верхняя одежда", "Платья", "Костюмы"].map((cat) => (
                  <button key={cat} className="text-xs tracking-[0.15em] uppercase px-4 py-2 border border-ivory/20 text-ivory/50 hover:border-gold hover:text-gold transition-all font-body">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10">
            {CATALOG_ITEMS.map((item, i) => (
              <FadeSection key={item.id}>
                <div
                  className="bg-charcoal p-8 hover:bg-charcoal/80 group cursor-pointer transition-all duration-300 border border-ivory/5 hover:border-yellow-600/30"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="aspect-[3/4] mb-6 overflow-hidden relative bg-foreground/5">
                    <img src={COLLECTION_IMAGE} alt={item.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                    {item.tag && (
                      <span className="absolute top-4 left-4 text-xs tracking-[0.2em] uppercase bg-gold text-charcoal px-3 py-1 font-body">
                        {item.tag}
                      </span>
                    )}
                    <button className="absolute bottom-4 left-4 right-4 btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center bg-gold text-charcoal hover:bg-ivory">
                      В корзину
                    </button>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs tracking-[0.2em] text-ivory/40 font-body uppercase mb-1">{item.category}</p>
                      <h3 className="font-display text-xl text-ivory font-light">{item.name}</h3>
                    </div>
                    <span className="font-display text-lg text-gold">{item.price}</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
          <FadeSection>
            <div className="text-center mt-16">
              <button className="btn-outline text-ivory border-ivory/30 hover:border-gold hover:text-gold hover:bg-transparent">
                Загрузить ещё
              </button>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-36 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeSection>
            <div className="relative">
              <img src={ABOUT_IMAGE} alt="О бренде" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-gold p-6 hidden lg:block">
                <p className="font-display text-4xl font-light text-charcoal">12</p>
                <p className="text-xs tracking-[0.2em] text-charcoal font-body uppercase">лет<br />безупречного<br />стиля</p>
              </div>
            </div>
          </FadeSection>
          <FadeSection>
            <div>
              <p className="section-label mb-6">О бренде</p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-charcoal leading-tight mb-8">
                Мы создаём<br /><em>одежду для</em><br />людей с вкусом
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                MAISON — это не просто одежда. Это философия осознанного потребления, где каждая вещь создана с уважением к материалу, мастеру и человеку, который её носит.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10 text-sm">
                Мы работаем с лучшими итальянскими и шотландскими ателье, отбираем только натуральные материалы и гарантируем, что каждое изделие прослужит вам долгие годы.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-10 border-t border-border pt-10">
                {[
                  { num: "100%", label: "Натуральные материалы" },
                  { num: "47", label: "Стран доставки" },
                  { num: "12K+", label: "Постоянных клиентов" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl text-gold font-light">{stat.num}</p>
                    <p className="text-xs text-muted-foreground tracking-wide mt-1 font-body">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("#contacts")} className="btn-primary">
                Связаться с нами
              </button>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="bg-charcoal py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <span className="font-display text-[20vw] text-ivory font-light whitespace-nowrap">MAISON</span>
        </div>
        <FadeSection className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="section-label mb-6" style={{ color: "hsl(43, 60%, 52%)" }}>Подписка</p>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-ivory mb-6">
            Первыми узнавайте<br />о новых коллекциях
          </h2>
          <p className="text-ivory/50 text-sm tracking-wide leading-relaxed mb-12 font-body">
            Эксклюзивный ранний доступ к новинкам, специальные предложения<br />и приглашения на закрытые показы
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-gold" />
              <span className="font-display text-xl text-ivory">Вы подписаны. Добро пожаловать в мир MAISON.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                required
                className="flex-1 bg-transparent border border-ivory/20 px-6 py-4 text-ivory text-sm placeholder-ivory/30 focus:outline-none focus:border-gold transition-colors font-body tracking-wider"
              />
              <button type="submit" className="bg-gold text-charcoal px-8 py-4 text-xs tracking-[0.25em] uppercase font-body hover:bg-ivory transition-colors whitespace-nowrap">
                Подписаться
              </button>
            </form>
          )}
        </FadeSection>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 lg:py-36 max-w-7xl mx-auto px-6 lg:px-12">
        <FadeSection>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="section-label mb-4">Блог</p>
              <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal">О стиле<br /><em>и культуре моды</em></h2>
            </div>
          </div>
        </FadeSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {BLOG_POSTS.map((post, i) => (
            <FadeSection key={post.id}>
              <article
                className="bg-ivory p-8 lg:p-10 group cursor-pointer h-full hover:bg-charcoal transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs tracking-[0.25em] text-gold font-body uppercase">{post.category}</span>
                  <span className="text-border">—</span>
                  <span className="text-xs text-muted-foreground group-hover:text-ivory/40 transition-colors font-body">{post.date}</span>
                </div>
                <h3 className="font-display text-2xl font-light text-charcoal group-hover:text-ivory transition-colors duration-500 mb-4 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-ivory/60 transition-colors duration-500 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-gold">
                  <span className="text-xs tracking-[0.2em] uppercase font-body">Читать</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </article>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-36 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeSection>
            <div className="text-center mb-16">
              <p className="section-label mb-4">FAQ</p>
              <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal">Частые<br /><em>вопросы</em></h2>
            </div>
          </FadeSection>
          <div className="divide-y divide-border">
            {FAQ_ITEMS.map((item, i) => (
              <FadeSection key={i}>
                <div className="py-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 text-left group"
                  >
                    <span className="font-display text-xl lg:text-2xl font-light text-charcoal group-hover:text-gold transition-colors">
                      {item.q}
                    </span>
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={18} className="text-gold flex-shrink-0 mt-1" />
                  </button>
                  {openFaq === i && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-body max-w-2xl">
                      {item.a}
                    </p>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 lg:py-36 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <FadeSection>
            <div>
              <p className="section-label mb-6">Контакты</p>
              <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal mb-12">
                Свяжитесь<br /><em>с нами</em>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: "MapPin", label: "Шоурум", value: "Москва, Патриаршие пруды, ул. Малая Бронная, 12" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "hello@maison-brand.ru" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Пт 10:00–20:00, Сб–Вс 11:00–19:00" },
                ].map((contact) => (
                  <div key={contact.label} className="flex items-start gap-5 group">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-300">
                      <Icon name={contact.icon as "MapPin"} size={16} className="text-gold group-hover:text-charcoal transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] text-muted-foreground font-body uppercase mb-1">{contact.label}</p>
                      <p className="text-charcoal text-sm font-body">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-12">
                {["Instagram", "Send", "Youtube"].map((social) => (
                  <button key={social}
                    className="w-10 h-10 border border-border hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-muted-foreground">
                    <Icon name={social as "Send"} size={16} fallback="ExternalLink" />
                  </button>
                ))}
              </div>
            </div>
          </FadeSection>
          <FadeSection>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "Имя", type: "text", placeholder: "Ваше имя" },
                { label: "Email", type: "email", placeholder: "email@example.com" },
                { label: "Тема", type: "text", placeholder: "Тема обращения" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase font-body block mb-2">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder}
                    className="w-full border-b border-border bg-transparent py-3 text-sm text-charcoal placeholder-muted-foreground focus:outline-none focus:border-gold transition-colors font-body" />
                </div>
              ))}
              <div>
                <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase font-body block mb-2">Сообщение</label>
                <textarea placeholder="Расскажите, чем мы можем помочь..." rows={4}
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-charcoal placeholder-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none font-body" />
              </div>
              <button type="submit" className="btn-primary w-full text-center">
                Отправить сообщение
              </button>
            </form>
          </FadeSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h3 className="font-display text-4xl text-ivory font-light tracking-[0.15em] mb-4">MAISON</h3>
              <p className="text-ivory/40 text-sm leading-relaxed font-body max-w-xs">
                Премиальная одежда для людей с безупречным вкусом. Натуральные материалы, вечный стиль.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-gold uppercase font-body mb-6">Навигация</p>
              <div className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <button key={link.href} onClick={() => scrollTo(link.href)}
                    className="block text-sm text-ivory/40 hover:text-gold transition-colors font-body text-left">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-gold uppercase font-body mb-6">Информация</p>
              <div className="space-y-3">
                {["Политика конфиденциальности", "Условия доставки", "Возврат и обмен", "Программа лояльности"].map((item) => (
                  <button key={item} className="block text-sm text-ivory/40 hover:text-gold transition-colors font-body text-left">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-ivory/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-ivory/30 text-xs font-body tracking-wider">© 2026 MAISON. Все права защищены.</p>
            <p className="text-ivory/20 text-xs font-body tracking-wider">Премиальная одежда · Москва</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Index;
