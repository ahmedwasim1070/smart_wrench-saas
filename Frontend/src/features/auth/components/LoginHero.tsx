// Imports
import { PrimaryBadge } from "../../../components/ui/PrimaryBadge";
import { PrimaryHeading } from "../../../components/ui/PrimaryHeading";
import { SITE_CONTENT } from "../../../constants";

//
export const LoginHero = () => {
  return (
    <section id="login-hero" className="relative w-1/2 h-full overflow-hidden">
      {/* */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="./machine_geras.webp"
        alt="Car Engine Machine Gears - SmartWrench"
      />

      {/* */}
      <div className="absolute inset-0 bg-black/80 z-10" />

      {/*  */}
      <div className="relative w-full h-full pt-24 p-12 z-20">
        {/*  */}
        <div className="absolute">
          <PrimaryHeading
            icon="secondaryIcon"
            iconStyle="w-7 h-7 fill-brand-blue-light"
            label={SITE_CONTENT.brand.name}
            labelStyle="primary-heading"
          />
        </div>

        {/*  */}
        <div className="w-auto absolute bottom-10 flex flex-col">
          {/*  */}
          <div>
            <PrimaryBadge
              label={SITE_CONTENT.loginHero.badge}
              badgeStyle="bg-bg-base"
            />
          </div>

          {/*  */}
          <div className="gap-y-0">
            {/*  */}
            <h1 className="hero-title">{SITE_CONTENT.loginHero.title[0]} </h1>

            {/*  */}
            <h2 className="hero-title text-brand-blue-light">
              {SITE_CONTENT.loginHero.title[1]}{" "}
            </h2>
          </div>

          {/*  */}
          <p className="hero-subtitle">{SITE_CONTENT.loginHero.subtitle}</p>

          {/*  */}
          <hr className="text-border-subtle border-2" />
        </div>
      </div>
    </section>
  );
};
