# Web Native Routing

A simple demo application showing how to achieve SPA-like routing with a single index.html file using native web APIs only. No frameworks, no build tools, no dependencies - vanilla JavaScript demonstrating how modern browsers can handle client-side routing without heavyweight SPA frameworks. Inspired by: [Anti-frameworkism: Choosing native web APIs over frameworks](https://blog.logrocket.com/anti-frameworkism-native-web-apis).

## Why This Project?

Modern browsers can handle most problems that frontend frameworks were originally created to solve. This project explores the a "no-framework" approach - starting with zero dependencies and using only web platform APIs to build a functional SPA router.

Perfect for:
- Small marketing sites
- Portfolio websites
- GitHub Pages deployment
- Learning web fundamentals

## Features

- Client-side routing with History API
- HTML template loading with Fetch API
- Zero dependencies
- No build step required
- Browser back/forward support

## Quick Start

### Development Setup

```bash
# Install development tool
npm install

# Start development server with live reload
npm run dev
```

The application will be available at `http://localhost:3000`.

Click on the navigation links with browser developer tools open to see how we remain on the same index.html while the view content gets swapped out in the main section.

## Project Structure

```
├── index.html          # Main application entry point
├── css/styles.css      # Application styling
├── js/
│   ├── router.js       # Core routing logic
│   └── app.js          # Application initialization
└── views/
    ├── home/
    │   ├── script.js   # Home page JavaScript
    │   └── template.html # Home page template
    ├── about/
    │   ├── script.js   # About page JavaScript
    │   └── template.html # About page template
    └── contact/
        ├── script.js   # Contact page JavaScript
        └── template.html # Contact page template
```

## Browser Support

Works in all modern browsers that support:
- History API
- Fetch API
- ES6 Classes
- Arrow functions

## Documentation

Detailed documentation is available in the `docs/` directory:

- [Architecture Overview](docs/architecture.md) - How the system works
- [Router Implementation](docs/router-implementation.md) - Deep dive into the Router class (includes limitations)
- [View System](docs/view-system.md) - Creating and managing views
- [View Scripts & Interactivity](docs/view-system.md#writing-view-scripts--interactivity) - Adding behavior to views
- [References](docs/references.md) - Further reading and learning resources

## License

MIT
