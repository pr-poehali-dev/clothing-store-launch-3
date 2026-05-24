import Icon from "@/components/ui/icon";
import { FadeSection } from "./FadeSection";
import { ABOUT_IMAGE, BLOG_POSTS } from "./constants";

interface AboutSubscribeProps {
  scrollTo: (href: string) => void;
  subscribed: boolean;
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: (e: React.FormEvent) => void;
}

export default function AboutSubscribe({ scrollTo, subscribed, email, setEmail, handleSubscribe }: AboutSubscribeProps) {
  return (
    <>
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
    </>
  );
}
