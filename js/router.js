class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
  }

  // Register a route with its handler function
  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  // Navigate to a route
  async navigate(path, options = {}) {
    const { replace = false } = options;

    // Add loading state
    document.body.classList.add('navigating');

    try {
      // Update browser history
      if (replace) {
        history.replaceState({}, '', path);
      } else {
        history.pushState({}, '', path);
      }

      await this.render(path);
    } finally {
      // Remove loading state
      document.body.classList.remove('navigating');
    }
  }

  // Render the current route
  async render(path = window.location.pathname) {
    const route = this.routes.get(path) || this.routes.get('/404') || this.routes.get('/');

    if (!route) {
      console.error('No route handler found for:', path);
      return;
    }

    try {
      this.currentRoute = path;
      await route();
      this.updatePageTitle(path);
    } catch (error) {
      console.error('Route rendering failed:', error);
      this.handleRenderError(error, path);
    }
  }

  // Handle rendering errors
  async handleRenderError(error, path) {
    const errorRoute = this.routes.get('/error');
    if (errorRoute) {
      await errorRoute({ error, path });
    } else {
      // Emergency fallback
      const app = document.querySelector('#app');
      app.innerHTML = `
        <div>
          <h1>Error</h1>
          <p>Sorry, something went wrong while loading this page.</p>
        </div>
      `;
    }
  }

  // Update page title based on route
  updatePageTitle(path) {
    const titles = {
      '/': 'Home - Native Routing SPA',
      '/about': 'About - Native Routing SPA',
      '/contact': 'Contact - Native Routing SPA'
    };
    document.title = titles[path] || 'Native Routing SPA';
  }

  // Initialize router
  init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.render();
    });

    // Intercept navigation clicks
    document.addEventListener('click', async (e) => {
      const link = e.target.closest('a[href]');
      if (!link || link.hasAttribute('target')) return;

      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      e.preventDefault();
      await this.navigate(url.pathname);
    });

    // Handle redirected routes from 404.html
    this.handleRedirect();

    // Render initial route
    this.render();
  }

  // Handle GitHub Pages redirect from 404.html
  handleRedirect() {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      history.replaceState(null, '', redirectPath);
    }
  }
}

export default Router;
