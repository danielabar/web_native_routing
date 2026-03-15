import { basePath } from './base-path.js';
import { routes } from './routes.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const router = new Router({ basePath });

    // Register routes from centralized config
    routes.forEach(route => {
        const viewDir = route === '/' ? 'home' : route.slice(1);
        router.addRoute(route, viewDir);
    });

    // Initialize router
    router.init();

    // Make router globally available for debugging
    window.app = { router };

    console.log('Web Native Router initialized with base path:', basePath);
});
