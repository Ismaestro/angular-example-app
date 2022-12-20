export const authPaths = {
  base: 'auth',
  logIn: 'log-in',
  register: 'register',
  logout: 'logout',
};

export const authRoutes = {
  logIn: `/${authPaths.base}/${authPaths.logIn}`,
  register: `/${authPaths.base}/${authPaths.register}`,
  logout: `/${authPaths.base}/${authPaths.logout}`,
};
