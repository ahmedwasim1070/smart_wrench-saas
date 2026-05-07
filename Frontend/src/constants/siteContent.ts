// Interfaces
export interface NavigationLink {
  label: string;
  href: string;
}
export interface SiteContentSkeleton {
  brand: {
    name: string;
    tagline: string;
  };
  navigation: {
    links: NavigationLink[];
    loginText: string;
    ctaText: string;
  };
}

// 
export const SITE_CONTENT: SiteContentSkeleton = {
  brand: {
    name: "SmartWrench",
    tagline: "[Enter Tagline: e.g., Industrial-Grade Workshop Management]",
  },

  navigation: {
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Solutions", href: "#solutions" },
      { label: "Support", href: "#support" },
    ],
    loginText: "Login",
    ctaText: "Get Started",
  },

};
