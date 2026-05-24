import { useState, useEffect } from "react";
import Navbar from "@/components/store/Navbar";
import HeroCatalog from "@/components/store/HeroCatalog";
import AboutSubscribe from "@/components/store/AboutSubscribe";
import FaqContacts from "@/components/store/FaqContacts";

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
      <Navbar
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroCatalog scrollTo={scrollTo} />
      <AboutSubscribe
        scrollTo={scrollTo}
        subscribed={subscribed}
        email={email}
        setEmail={setEmail}
        handleSubscribe={handleSubscribe}
      />
      <FaqContacts
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
        scrollTo={scrollTo}
      />
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
