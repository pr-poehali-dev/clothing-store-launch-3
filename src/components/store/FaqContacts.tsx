import Icon from "@/components/ui/icon";
import { FadeSection } from "./FadeSection";
import { FAQ_ITEMS, NAV_LINKS } from "./constants";

interface FaqContactsProps {
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
  scrollTo: (href: string) => void;
}

export default function FaqContacts({ openFaq, setOpenFaq, scrollTo }: FaqContactsProps) {
  return (
    <>
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
    </>
  );
}
