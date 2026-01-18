# Vanilla JS Static Web App with Client-Side Routing

A demonstration project showcasing how to build client-side routing for static web applications using **vanilla JavaScript** and **external HTML templates**, without relying on SPA frameworks like React, Vue, or Angular.

## 🎯 Project Purpose

This project proves that you don't always need to reach for heavy JavaScript frameworks to create dynamic, routed web applications. It demonstrates:

- **Framework-free routing** using the HTML5 History API
- **External HTML templates** for clean code separation
- **Static hosting compatibility** (GitHub Pages, Netlify, etc.)
- **Modern vanilla JavaScript** patterns and best practices
- **Accessible navigation** with proper focus management

Perfect for small to medium-sized static applications where framework overhead isn't justified.

## ✨ Features

- 🔄 **Client-side routing** with browser back/forward support
- 📄 **External HTML templates** loaded at runtime
- 🚀 **GitHub Pages deployment ready** with 404.html fallback strategy
- ♿ **Accessibility-focused** with proper ARIA and focus management
- 📱 **Responsive design** with system fonts and modern CSS
- 🎨 **Interactive functionality** demonstrating vanilla JS capabilities
- 🔧 **No build tools** required - pure static files

## 🏗️ Architecture

The application uses an **external template architecture** that keeps HTML templates in separate `.html` files rather than embedding them in JavaScript:

```
├── index.html              # Main entry point
├── app.js                  # Application bootstrap
├── 404.html                # GitHub Pages fallback
├── js/
│   ├── router.js           # Core routing system
│   └── template-loader.js  # Template caching
├── views/
│   ├── home/
│   │   ├── home.html       # Template
│   │   └── home.js         # Controller
│   ├── about/
│   └── contact/
└── css/
    └── main.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (for development server only)
- **Modern web browser** with ES6 module support

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd web_native_routing
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - The server supports client-side routing and auto-reload

### Development Commands

```bash
# Start development server with live-reload
npm run dev

# The server will:
# - Serve at http://localhost:3000
# - Watch for file changes to app-specific code
```

## 🛠️ How It Works

### Routing System

The router intercepts navigation clicks and uses the **History API** to update URLs without page reloads:

```javascript
// Intercept link clicks
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;

  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;

  e.preventDefault();
  await router.navigate(url.pathname);
});
```

### Template Loading

External HTML templates are fetched and cached for performance:

```javascript
export async function loadTemplate(path) {
  if (cache.has(path)) return cache.get(path);

  const response = await fetch(path);
  const html = await response.text();
  // Parse and cache template...
}
```

### GitHub Pages Compatibility

The `404.html` file handles direct URL access by redirecting to `index.html` with route information:

```javascript
// Store intended route
sessionStorage.setItem('redirectPath', window.location.pathname);
// Redirect to index.html for app to handle
window.location.replace(window.location.origin + '/index.html');
```

## 📁 Adding New Routes

1. **Create view directory:**
   ```bash
   mkdir views/newpage
   ```

2. **Create template file** `views/newpage/newpage.html`:
   ```html
   <template>
     <h1>New Page</h1>
     <p>Your content here.</p>
   </template>
   ```

3. **Create controller** `views/newpage/newpage.js`:
   ```javascript
   import { loadTemplate } from '../../js/template-loader.js';

   export async function newpage() {
     const app = document.querySelector('#app');
     const template = await loadTemplate('/views/newpage/newpage.html');
     const fragment = template.content.cloneNode(true);
     app.replaceChildren(fragment);
   }
   ```

4. **Register route** in `app.js`:
   ```javascript
   import { newpage } from './views/newpage/newpage.js';
   router.addRoute('/newpage', newpage);
   ```

5. **Add navigation link** to `index.html`:
   ```html
   <nav>
     <a href="/newpage">New Page</a>
   </nav>
   ```


This project demonstrates:

- **Modern vanilla JavaScript** patterns without framework complexity
- **Client-side routing** implementation using web standards
- **Template-based architecture** for scalable code organization
- **Static hosting strategies** for single-page applications
- **Accessibility best practices** in vanilla JS applications
- **Performance optimization** through caching and minimal dependencies

## 🤔 When to Use This Approach

**Great for:**
- Small to medium static sites with routing needs
- Educational projects and prototypes
- Situations where framework overhead isn't justified
- Teams prioritizing minimal dependencies
- Learning vanilla JavaScript and web standards

**Consider frameworks when:**
- Building large, complex applications
- Need extensive state management
- Require advanced component systems
- Working with large development teams
- Need extensive third-party integrations

## 🔗 Resources

- [HTML5 History API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Template Element Guide](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Anti-frameworkism and Native Web APIs](https://blog.logrocket.com/anti-frameworkism-native-web-apis)

## 📄 License

MIT License - feel free to use this project as a starting point for your own applications.
