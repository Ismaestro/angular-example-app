export const userPaths = {
  base: 'user',
  dashboard: 'dashboard',
  myHeroes: 'my-heroes',
  myAccount: 'my-account',
};

export const userRoutes = {
  dashboard: `/${userPaths.base}/${userPaths.dashboard}`,
  myHeroes: `/${userPaths.base}/${userPaths.myHeroes}`,
  myAccount: `/${userPaths.base}/${userPaths.myAccount}`,
};
