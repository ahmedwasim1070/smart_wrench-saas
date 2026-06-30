// 
export const SITE_CONTENT = {
  brand: {
    name: "SmartWrench",
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

  // Home Hero
  homeHero: {
    badge: "SYSTEM ONLINE v1.0.0",
    title: ["Run your workshop on", "autopilot"],
    subtitle: "The heavy-duty mechanical reliability of a 10mm socket meets the high-velocity digital intelligence of modern SaaS. Diagnose,invoice, and track in real-time.",
    primaryBtn: { label: "Start Free Trial", href: "/plans" },
    secondaryBtn: { label: "View Demo", href: "/demo" },
  },

  // Login Hero
  loginHero: {
    badge: "MAINFRAME SECURE",
    title: ["Industrial Grade", " Digital Precision"],
    subtitle: "Access the central diagnostic terminal to manage repair orders, inventory protocols, and bay schedules with uncompromising efficiency.",
  }
} as const;
