import Icon from "@/components/ui/icon";
import { FadeSection } from "./FadeSection";
import { HERO_IMAGE, COLLECTION_IMAGE, COLLECTIONS, CATALOG_ITEMS } from "./constants";

interface HeroCatalogProps {
  scrollTo: (href: string) => void;
}

export default function HeroCatalog({ scrollTo }: HeroCatalogProps) {
  return (
    <>
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
    </>
  );
}
