// 
export const ICONS = {
  appIcon: "/assets/app-icon.svg",

  // Navigation & UI Actions
  menu: "menu",
  close: "close",
  login: "login",
  arrowRight: "arrow_forward",
  arrowDown: "keyboard_arrow_down",

  // Industrial / Workshop Specific
  dashboard: "dashboard",
  tools: "build",
  analytics: "monitoring",
  users: "group",
  settings: "settings",
  inventory: "inventory_2",
  vehicle: "directions_car",
  invoice: "receipt_long",
  schedule: "calendar_month",

  // Status & Signals
  warning: "warning",
  success: "check_circle",
  error: "error",
  info: "info",

} as const;

export type IconName = keyof typeof ICONS;
