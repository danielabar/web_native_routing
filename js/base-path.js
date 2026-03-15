/**
 * Auto-detect the base path from this module's URL.
 * Works because this file always lives at <base>/js/base-path.js
 *
 * Local dev:     http://localhost:3000/js/base-path.js       → basePath = /
 * GitHub Pages:  https://x.github.io/repo-name/js/base-path.js → basePath = /repo-name/
 */
const moduleDir = new URL(".", import.meta.url).pathname;
export const basePath = moduleDir.replace(/js\/$/, "");
