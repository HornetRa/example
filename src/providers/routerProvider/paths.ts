const MAIN = {
  ABOUT_ROOT: '/about',
  CONTACTS_ROOT: '/contacts',
} as const;

export const ROUTES = {
  ...MAIN,
  ROOT: '/',
} as const;
