import ParticleBackground from "./ParticleBackground";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 17.32V52L30 60L0 52V17.32L30 0z' fill='none' stroke='%23C84FE8' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-30"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, hsl(285 74% 61% / 0.15), transparent 70%)",
        }}
      />
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8 pt-[70px]">
        <div className="hidden lg:block lg:w-[50%]" />
        <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-end text-center lg:text-right">
          <h1 className="font-display text-[80px] sm:text-[100px] lg:text-[140px] leading-none tracking-wider text-foreground drop-shadow-lg">
            AIFT
          </h1>
          <p className="text-sm sm:text-base tracking-[3px] text-white-80 mt-2">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 gradient-primary text-foreground px-6 py-3 rounded-full text-sm inline-block">
            {t("hero.tag")}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-12 z-10">
        <p className="font-display text-[28px] sm:text-[40px] lg:text-[60px] text-foreground italic tracking-wider opacity-90">
          {t("hero.brand")}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
