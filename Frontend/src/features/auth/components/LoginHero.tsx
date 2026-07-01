// Imports
import { PrimaryBadge } from "../../../components/ui/PrimaryBadge";
import { PrimaryLogo } from "../../../components/ui/PrimaryLogo";
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
      <div className="relative w-full h-full p-12 z-20">
        {/*  */}
        <div className="absolute top-24">
          <PrimaryLogo
            icon="secondaryIcon"
            iconStyle="w-7 h-7 fill-brand-blue-light"
            label={SITE_CONTENT.brand.name}
            labelStyle="primary-logo"
          />
        </div>

        {/*  */}
        <div className="w-auto absolute bottom-10 space-y-4">
          {/*  */}
          <div>
            <PrimaryBadge
              label={SITE_CONTENT.login.hero.badge}
              badgeStyle="bg-bg-base"
            />
          </div>

          {/*  */}
          <div className="space-y-2">
            {/*  */}
            <h1 className="primary-title">
              {SITE_CONTENT.login.hero.title[0]}{" "}
            </h1>

            {/*  */}
            <h2 className="primary-title text-brand-blue-light">
              {SITE_CONTENT.login.hero.title[1]}
            </h2>
          </div>

          {/*  */}
          <p className="primary-subtitle">{SITE_CONTENT.login.hero.subtitle}</p>

          {/*  */}
          <hr className="text-border-subtle border-2" />
        </div>
      </div>
    </section>
  );
};
