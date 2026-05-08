// Imports
import { SITE_CONTENT, WrenchIcon } from "../constants";

//
export const Header = () => {
  return (
    <header
      id="header"
      role="banner"
      className="min-w-full p-4 bg-primary border-b border-bright-p"
    >
      <nav className="flex flex-row justify-between">
        {/*  */}
        <a
          className="flex flex-row items-center gap-x-4 cursor-pointer group "
          href="/"
        >
          <WrenchIcon className="w-8 h-8 fill-bright-p" />
          <h1 className="main-heading  group-hover:text-bright-p transition-colors">
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
          <a href={SITE_CONTENT.navigation.login.link} className="nav-items">
            {SITE_CONTENT.navigation.login.text}
          </a>
          {/*  */}
          <a
            href={SITE_CONTENT.navigation.cta.link}
            className="primary-btn bg-secondary text-bright-p hover:text-mint-p"
          >
            {SITE_CONTENT.navigation.cta.text}
          </a>
        </div>
      </nav>
    </header>
  );
};
