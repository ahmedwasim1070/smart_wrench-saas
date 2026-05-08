// Interfaces
export interface SiteContentSkeleton {
  brand: {
    name: string;
    tagline: string;
  };
  navigation: {
    links: NavigationLink[];
    login: generalDictionary;
    cta: generalDictionary;
  };
}
export interface NavigationLink {
  label: string;
  href: string;
}
export interface generalDictionary {
  text: string;
  link: string;
}

// 
export const SITE_CONTENT: SiteContentSkeleton = {
  brand: {
    name: "SmartWrench",
    tagline: "[Enter Tagline: e.g., Industrial-Grade Workshop Management]",
  },

  navigation: {
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Solutions", href: "/solutions" },
      { label: "Support", href: "/support" },
    ],
    login: { text: "Login", link: "/login" },
    cta: { text: "Get Started", link: "/get-started" },
  },
};
