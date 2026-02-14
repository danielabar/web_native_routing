# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A vanilla JavaScript SPA demonstrating client-side routing using only native web APIs (History API, Fetch API, ES6 modules). No frameworks or build tools required for development. The project includes a build system specifically for handling deployment base path configuration (critical for GitHub Pages deployment).

## Development Commands

```bash
# Start development server with live reload
npm run dev

# Build for deployment (creates dist/ with configured base path)
npm run build

# Deploy to GitHub Pages
npm run deploy

# Run all e2e tests (Playwright + BDD)
npm run test:e2e

# Run e2e tests in headed mode (visible browser)
npm run test:e2e:headed

# Run tests for specific browser
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
```

## Architecture Overview

### Router-Based View System

The application uses a custom `Router` class that:
- Manages client-side navigation using the History API
- Dynamically loads HTML templates via Fetch API
- Dynamically imports view-specific JavaScript modules using ES6 `import()`
- Handles base path configuration for deployment flexibility
- Caches both templates and view instances for performance

### Key Flow

1. User clicks navigation link with `[data-route]` attribute
2. Router intercepts click and prevents default navigation
3. Router loads template from `views/{viewname}/template.html`
4. Router dynamically imports `views/{viewname}/script.js`
5. View class is instantiated and its `init()` method is called
6. On navigation away, view's `destroy()` method is called for cleanup

### Base Path Management (Critical for Deployment)

The project uses **explicit base path configuration** to handle different deployment contexts:
- **Development**: `basePath: '/'` (root path)
- **GitHub Pages**: `basePath: '/web_native_routing/'` (project subdirectory)

**Single source of truth**: `js/config.js` exports `deploymentConfig.basePath`
**Build system**: `scripts/build.sh` modifies `config.js` for deployment using package.json's `deploy_base_path`

## Key Files and Their Roles

### Core Application Files

- `js/router.js` - Router class implementation, handles all routing logic
  - `normalizePath()` - Strips base path from incoming paths for route matching
  - `buildFullPath()` - Adds base path to routes for browser history
  - `navigate()` - Main navigation method, loads templates and view scripts
  - `loadViewScript()` - Dynamically imports view modules using ES6 `import()`

- `js/app.js` - Application initialization, creates router instance and registers routes
- `js/config.js` - **Single source of truth** for base path configuration
- `js/routes.js` - Centralized route definitions array

### View Structure

Each view follows this pattern in `views/{viewname}/`:
- `template.html` - HTML template for the view
- `script.js` - View class with `init()` and `destroy()` lifecycle methods

View classes must:
- Export a default class
- Implement `init()` method (called after template loads)
- Implement `destroy()` method (called before navigating away)

### Build and Deployment

- `scripts/build.sh` - Bash script that:
  1. Copies all files to `dist/` (excluding node_modules, docs, etc.)
  2. Replaces `basePath: '/'` in `dist/js/config.js` with value from `package.json`
  3. Enables universal deployment without code changes

- `404.html` - SPA fallback for direct URL access on static hosts

### Testing

- `playwright.config.js` - Playwright configuration with playwright-bdd integration
- `tests/e2e/features/*.feature` - Gherkin BDD feature files
- `tests/e2e/steps/*.js` - Step definitions for BDD tests

Tests run against `http://localhost:3000` with automatic dev server startup.

## Adding New Routes

To add a new route:

1. Create view directory: `views/{routename}/`
2. Create `template.html` with view content
3. Create `script.js` with default export class implementing `init()` and `destroy()`
4. Add route to `js/routes.js` array (e.g., `'/newroute'`)
5. Add navigation link to `index.html` with `data-route` attribute

The router will automatically map routes to view directories:
- `/` → `views/home/`
- `/about` → `views/about/`
- `/{name}` → `views/{name}/`

## Important Patterns

### View Script Pattern

```javascript
export default class YourView {
    init() {
        // Setup: attach event listeners, initialize state
    }

    destroy() {
        // Cleanup: remove event listeners, clear timers
    }
}
```

### Navigation Links

Always use `data-route` attribute for SPA navigation:
```html
<a href="/about" class="nav-link" data-route>About</a>
```

### Path Normalization

When working with routes:
- Routes in `routes.js` are normalized paths without base path (e.g., `/`, `/about`)
- Router automatically handles base path for browser URLs
- Use `router.debug()` in console to troubleshoot deployment path issues

## Documentation

Detailed documentation available in `docs/`:
- `architecture.md` - System architecture overview
- `router-implementation.md` - Router deep dive with limitations
- `view-system.md` - View creation and lifecycle
- `references.md` - Further reading and resources
