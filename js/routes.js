// Valid routes for the application
// Used by router initialization
export const routes = [
    '/',
    '/about',
    '/contact'
];

// Check if a path is a known route
export function isValidRoute(path) {
    return routes.includes(path);
}
