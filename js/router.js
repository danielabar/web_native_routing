class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.currentView = null; // Track current view instance
        this.contentElement = document.getElementById('content');
        this.cache = new Map(); // Template cache
        this.viewCache = new Map(); // View script cache
    }

    /**
     * Register a route with its view directory
     */
    addRoute(path, viewDir) {
        this.routes.set(path, viewDir);
    }

    /**
     * Navigate to a specific route
     */
    async navigate(path, { pushState = true } = {}) {
        // Don't navigate if we're already on this route
        if (this.currentRoute === path) return;

        const viewDir = this.routes.get(path);
        if (!viewDir) {
            console.warn(`No route found for ${path}`);
            this.show404();
            return;
        }

        try {
            // Show loading state
            this.showLoading();

            // Destroy current view if exists
            if (this.currentView && typeof this.currentView.destroy === 'function') {
                try {
                    this.currentView.destroy();
                } catch (error) {
                    console.error(`Error in view destroy():`, error);
                    // Continue navigation anyway
                }
                this.currentView = null;
            }

            // Load template
            await this.loadView(`views/${viewDir}/template.html`);

            // Try to load and initialize view script
            await this.loadViewScript(viewDir);

            // Update browser history (only for user-initiated navigation)
            if (pushState && this.currentRoute !== null) {
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
    }

    /**
     * Load view-specific JavaScript module
     */
    async loadViewScript(viewDir) {
        try {
            // Check if we already have this view cached
            if (this.viewCache.has(viewDir)) {
                const ViewClass = this.viewCache.get(viewDir);
                return this.initializeView(ViewClass, viewDir);
            }

            // Dynamically import the view script (every view should have one)
            const viewModule = await import(`../views/${viewDir}/script.js`);
            const ViewClass = viewModule.default;

            if (!ViewClass) {
                console.warn(`View ${viewDir}/script.js has no default export`);
                return;
            }

            // Cache the view class
            this.viewCache.set(viewDir, ViewClass);

            // Initialize the view safely
            this.initializeView(ViewClass, viewDir);

        } catch (error) {
            this.handleViewScriptError(error, viewDir);
        }
    }

    /**
     * Handle errors when loading view scripts
     */
    handleViewScriptError(error, viewDir) {
        console.error(`Error loading ${viewDir} script:`, error);

        // Show user-friendly error in development
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            console.warn(`Expected script file: views/${viewDir}/script.js`);
        }

        // Template still works, just no interactivity
    }

    /**
     * Safely initialize view with error handling
     */
    initializeView(ViewClass, viewDir) {
        try {
            this.currentView = new ViewClass();

            if (typeof this.currentView.init === 'function') {
                this.currentView.init();
            }
        } catch (error) {
            console.error(`Error initializing ${viewDir} view:`, error);
            this.currentView = null; // Clean up
        }
    }

    /**
     * Initialize router - set up event listeners and handle initial route
     */
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            const path = event.state?.route || location.pathname;
            this.navigate(path, { pushState: false }); // Don't push state for browser navigation
        });

        // Intercept navigation link clicks
        document.addEventListener('click', (event) => {
            const link = event.target.closest('[data-route]');
            if (link) {
                event.preventDefault();
                this.navigate(link.getAttribute('href')); // Uses default pushState: true
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
        await this.navigate(path, { pushState: false }); // Initial load shouldn't push state
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

// ... rest of router methods remain similar
}

// Make Router available globally
window.Router = Router;
