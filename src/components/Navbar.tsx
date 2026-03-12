import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "關於我們", href: "#about" },
  { label: "交易系統", href: "#products" },
  { label: "運作原理", href: "#how-it-works" },
  { label: "風控機制", href: "#risk" },
  { label: "ECB合作", href: "#ecb" },
  { label: "合作夥伴", href: "#partners" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-6 lg:px-12 transition-all duration-300 border-b border-border ${
          scrolled ? "bg-background/95 backdrop-blur-[20px]" : "bg-background/85 backdrop-blur-[20px]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wider text-foreground">AIFT</span>
          <span className="hidden sm:block text-white-40 text-xs">AI Financial Technology Ltd.</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white-80 hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.europecharteredbank.com/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-primary text-foreground text-sm px-5 py-2 rounded-full glow-box hover:-translate-y-0.5 transition-all duration-200"
          >
            立即開戶
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-[70px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xl text-white-80 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.europecharteredbank.com/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-primary text-foreground px-8 py-3 rounded-full glow-box"
          >
            立即開戶
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
