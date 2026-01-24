// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Create router instance
    const router = new Router();

    // Define routes
    router.addRoute('/', 'views/home.html');
    router.addRoute('/about', 'views/about.html');
    router.addRoute('/contact', 'views/contact.html');

    // Initialize router
    router.init();

    // Make router globally available for debugging
    window.app = { router };

    console.log('Web Native Router initialized');
});
