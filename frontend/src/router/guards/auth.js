import store from "../../store";

const authGuard = async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const isLoggedIn = store.getters.isLoggedIn;
  const userRoles = store.getters.getUserRoles;

  const requiredRoles = to.matched
    .map((record) => record.meta.roles)
    .flat()
    .filter(Boolean);

  if (requiresAuth && !isLoggedIn) {
    next({ name: "Login" });
  } else if (
    requiresAuth &&
    isLoggedIn &&
    requiredRoles.length > 0 &&
    !requiredRoles.some((role) => userRoles.includes(role))
  ) {
    next(false);
  } else {
    next();
  }
};

export default authGuard;
