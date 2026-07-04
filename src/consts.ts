export const SITE_TITLE = 'Strichliste ‒ The Tally Sheet Replacement for Your Organization';

export const SITE_DESCRIPTION =
  'strichliste is the digital tally sheet for hackerspaces, club rooms and small offices.';

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
