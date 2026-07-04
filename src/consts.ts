export const SITE_TITLE = 'strichliste — the digital tally sheet for hackerspaces & clubs';

export const SITE_DESCRIPTION =
  'strichliste is the free, open-source digital tally sheet for hackerspaces, clubs and offices — track drinks and snacks by the fridge, no logins required.';

interface NavItem {
  name: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  { name: 'Install', href: '/install/' },
  { name: 'Docs', href: '/docs/' },
  { name: 'Demo', href: 'https://demo.strichliste.org' },
  { name: 'Source', href: 'https://github.com/strichliste' },
  { name: 'FAQ', href: '/faq/' },
];
