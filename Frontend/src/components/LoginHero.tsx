import { RoboticWrenchIcon, SITE_CONTENT } from "../constants";

//
export const LoginHero = () => {
  return (
    <section id="login-hero" className="relative w-1/2 h-full overflow-hidden">
      {/* */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="machine_geras.webp"
        alt="SmartWrench Hero"
      />

      {/* */}
      <div className="absolute inset-0 bg-black/90 z-10" />

      {/*  */}
      <div className="relative w-full h-full pt-24 p-12 z-20">
        {/*  */}
        <div className="absolute flex items-center gap-x-4">
          <RoboticWrenchIcon className="w-7 h-7 fill-brand-blue-light" />
          <h2 className="main-heading">
            {SITE_CONTENT.brand.name.toUpperCase()}
          </h2>
        </div>

        {/*  */}
        <div className="w-full absolute bottom-10 flex items-center gap-x-4">
          <RoboticWrenchIcon className="w-7 h-7 fill-brand-blue-light" />
          <h2 className="main-heading">
            {SITE_CONTENT.brand.name.toUpperCase()}
          </h2>
        </div>
      </div>
    </section>
  );
};
