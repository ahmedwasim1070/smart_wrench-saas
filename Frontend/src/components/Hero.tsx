// Imports
import { ArrowRightIcon, PlayCircle } from "lucide-react";
import { SITE_CONTENT } from "../constants";

//
export const Hero = () => {
  return (
    <main id="hero">
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-215">
        {/*  */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.webp"
            alt="SmartWrench - Hero Image"
            className="w-full h-full object-cover "
          />
        </div>

        {/*  */}
        <div className="absolute inset-0 min-w-full min-h-full bg-bg-base/50 backdrop-blur-sm z-10"></div>

        {/*  */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <div className="hero-badge">
            <span className="w-2 h-2 rounded-full bg-brand-blue-light animate-pulse"></span>
            {SITE_CONTENT.hero.badge}
          </div>

          <h1 className="hero-title">
            {SITE_CONTENT.hero.title[0]}{" "}
            <span className="text-brand-blue-light">
              {SITE_CONTENT.hero.title[1]}
            </span>
          </h1>

          <p className="hero-subtitle">{SITE_CONTENT.hero.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="hero-btn border-2 border-brand-gold bg-brand-gold text-brand-gold-deep hover:bg-brand-gold/90"
              href={SITE_CONTENT.hero.primaryBtn.href}
            >
              {SITE_CONTENT.hero.primaryBtn.label}
              <span className="material-symbols-outlined text-lg">
                <ArrowRightIcon className="w-6 h-6 fill-brand-gold-deep" />
              </span>
            </a>
            <a
              className="hero-btn border border-border-subtle bg-transparent hover:border-brand-blue-light hover:bg-bg-base"
              href={SITE_CONTENT.hero.secondaryBtn.href}
            >
              <span className="material-symbols-outlined text-lg">
                <PlayCircle className="w-6 h-6" />
              </span>
              {SITE_CONTENT.hero.secondaryBtn.label}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
