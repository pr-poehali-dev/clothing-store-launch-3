import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "./constants";

interface NavbarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (href: string) => void;
}

export default function Navbar({ scrolled, menuOpen, setMenuOpen, scrollTo }: NavbarProps) {
  return (
    <>
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
    </>
  );
}
