# Web Native Routing

A lightweight single-page application router built with native web APIs only. No frameworks, no build tools, no dependencies - just vanilla JavaScript demonstrating modern browser capabilities for simple routing needs.

## Why This Project?

Modern browsers can handle most problems that frontend frameworks were originally created to solve. This project explores the a "no-framework" approach - starting with zero dependencies and using only web platform APIs to build a functional SPA router.

Perfect for:
- Small marketing sites
- Portfolio websites
- GitHub Pages deployment
- Learning web fundamentals
- Projects where bundle size matters

## Features

- ✅ Client-side routing with History API
- ✅ HTML template loading with Fetch API
- ✅ Zero dependencies (~2-3KB total)
- ✅ No build step required
- ✅ Progressive enhancement
- ✅ Browser back/forward support

## Quick Start

### Development Setup

```bash
# Install development tools (optional)
npm install

# Start development server with live reload
npm run dev
```

The application will be available at `http://localhost:3000`

### Manual Setup

Since this uses native web APIs, you can also run it with any static file server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Or any other static server
```

## Project Structure

```
├── index.html          # Main application entry point
├── css/styles.css      # Application styling
├── js/
│   ├── router.js       # Core routing logic
│   └── app.js          # Application initialization
└── views/
    ├── home.html       # Home page template
    ├── about.html      # About page template
    └── contact.html    # Contact page template
```

## Browser Support

Works in all modern browsers that support:
- History API
- Fetch API
- ES6 Classes
- Arrow functions

## Documentation

Detailed documentation and architecture decisions will be available in the `docs/` directory.

## License

MIT
