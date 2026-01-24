class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.contentElement = document.getElementById('content');
        this.cache = new Map(); // Simple template cache
    }

    /**
     * Register a route with its corresponding template path
     */
    addRoute(path, templatePath) {
        this.routes.set(path, templatePath);
    }

    /**
     * Navigate to a specific route
     */
    async navigate(path) {
        // Don't navigate if we're already on this route
        if (this.currentRoute === path) return;

        const templatePath = this.routes.get(path);
        if (!templatePath) {
            console.warn(`No route found for ${path}`);
            this.show404();
            return;
        }

        try {
            // Show loading state
            this.showLoading();

            // Load and display the template
            await this.loadView(templatePath);

            // Update browser history (don't use pushState on initial load)
            if (this.currentRoute !== null) {
                history.pushState({ route: path }, '', path);
            }

            // Update current route
            this.currentRoute = path;

            // Update navigation active state
            this.updateNavigation(path);

        } catch (error) {
            console.error('Navigation error:', error);
            this.showError('Failed to load page content.');
        }
    }

    /**
     * Load HTML template and inject into content area
     */
    async loadView(templatePath) {
        // Check cache first
        if (this.cache.has(templatePath)) {
            this.contentElement.innerHTML = this.cache.get(templatePath);
            return;
        }

        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.status}`);
        }

        const html = await response.text();

        // Cache the template
        this.cache.set(templatePath, html);

        // Inject into DOM
        this.contentElement.innerHTML = html;

        // Initialize any JavaScript for the loaded view
        this.initializeView();
    }

    /**
     * Initialize router - set up event listeners and handle initial route
     */
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            const path = event.state?.route || location.pathname;
            this.navigate(path);
        });

        // Intercept navigation link clicks
        document.addEventListener('click', (event) => {
            const link = event.target.closest('[data-route]');
            if (link) {
                event.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });

        // Handle initial page load
        this.handleInitialRoute();
    }

    /**
     * Handle the initial page load route
     */
    async handleInitialRoute() {
        const path = location.pathname;
        await this.navigate(path);
    }

    /**
     * Update navigation active states
     */
    updateNavigation(currentPath) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === currentPath);
        });
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.contentElement.innerHTML = '<div class="loading">Loading...</div>';
    }

    /**
     * Show 404 error
     */
    show404() {
        this.contentElement.innerHTML = `
            <div class="error-page">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" class="btn btn-primary" data-route>Go Home</a>
            </div>
        `;
    }

    /**
     * Show error message
     */
    showError(message) {
        this.contentElement.innerHTML = `
            <div class="error-page">
                <h1>Error</h1>
                <p>${message}</p>
                <button class="btn btn-secondary" onclick="location.reload()">Reload Page</button>
            </div>
        `;
    }

    /**
     * Initialize any JavaScript needed for the current view
     */
    initializeView() {
        // Add any view-specific initialization here
        // For example, form handlers, interactive elements, etc.

        // Handle contact form if on contact page
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            this.initContactForm(contactForm);
        }
    }

    /**
     * Initialize contact form (example of view-specific functionality)
     */
    initContactForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            form.innerHTML = '<p class="success">Thank you! Your message has been sent.</p>';
        });
    }
}

// Make Router available globally
window.Router = Router;
