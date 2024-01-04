/**
 * An array of routes that are accessible to the public
 * These eoutes do not require authentication
 * @type {sring[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {sring[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {sring[]}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in
 * @type {sring}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
