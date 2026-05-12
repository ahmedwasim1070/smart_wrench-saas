// Imports
import { SITE_CONTENT, WrenchIcon } from "../constants";

//
export const Header = () => {
  return (
    <header
      id="header"
      role="banner"
      className="fixed top-0 w-full z-50 p-4 bg-bg-surface/90 backdrop-blur-md border-b border-border-default"
    >
      <nav className="flex flex-row justify-between max-w-7xl mx-auto items-center">
        {/*  */}
        <a
          className="flex flex-row items-center gap-x-4 cursor-pointer group "
          href="/"
        >
          <WrenchIcon className="w-6 h-6 fill-brand-blue" />
          <h1 className="nav-label group-hover:text-brand-blue transition-colors">
            {SITE_CONTENT.brand.name.toUpperCase()}
          </h1>
        </a>

        {/*  */}
        <ul className="flex flex-row items-center gap-x-12">
          {SITE_CONTENT.navigation.links.map((item) => (
            <li key={item.href} className="nav-items">
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        {/*  */}
        <div className="flex flex-row items-center gap-x-6">
          <a href={SITE_CONTENT.navigation.login.href} className="nav-items">
            {SITE_CONTENT.navigation.login.label}
          </a>
          {/*  */}
          <a
            href={SITE_CONTENT.navigation.cta.href}
            className="nav-btn bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
          >
            {SITE_CONTENT.navigation.cta.label}
          </a>
        </div>
      </nav>
    </header>
  );
};
