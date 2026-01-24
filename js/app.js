// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Create router instance
    const router = new Router();

    // Define routes - now pointing to view directories
    router.addRoute('/', 'home');
    router.addRoute('/about', 'about');
    router.addRoute('/contact', 'contact');

    // Initialize router
    router.init();

    // Make router globally available for debugging
    window.app = { router };

    console.log('Web Native Router initialized with view-based architecture');
});
