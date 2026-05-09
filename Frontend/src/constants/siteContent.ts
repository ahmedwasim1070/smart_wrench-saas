// Interfaces
export interface SiteContentSkeleton {
  brand: {
    name: string;
    tagline: string;
  };
  navigation: {
    links: GeneralDictionary[];
    login: GeneralDictionary;
    cta: GeneralDictionary;
  };
  hero: {
    badge: string;
    title: string[];
    subtitle: string;
    primaryBtn: GeneralDictionary;
    secondaryBtn: GeneralDictionary;
  }
}
export interface GeneralDictionary {
  label: string;
  href: string;
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
    login: { label: "Login", href: "/login" },
    cta: { label: "Get Started", href: "/get-started" },
  },
  hero: {
    badge: "SYSTEM ONLINE v1.0.0",
    title: ["Run your workshop on", "autopilot"],
    subtitle: "The heavy-duty mechanical reliability of a 10mm socket meets the high-velocity digital intelligence of modern SaaS. Diagnose,invoice, and track in real-time.",
    primaryBtn: { label: "Start Free Trial", href: "/plans" },
    secondaryBtn: { label: "View Demo", href: "/demo" },
  }
};
