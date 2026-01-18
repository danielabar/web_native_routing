import Router from './js/router.js';
import { home } from './views/home/home.js';
import { about } from './views/about/about.js';
import { contact } from './views/contact/contact.js';

// Create router instance
const router = new Router();

// Register routes
router.addRoute('/', home);
router.addRoute('/about', about);
router.addRoute('/contact', contact);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  router.init();
});
