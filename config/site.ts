import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: "ReFocus",
  description:
    "Take back control of your focus and distribute it to what matters.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/sdburt",
    github: "https://github.com/sdburt/refocus",
  },
}
