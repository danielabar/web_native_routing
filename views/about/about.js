import { loadTemplate } from '../../js/template-loader.js';

export async function about() {
  const app = document.querySelector('#app');
  const template = await loadTemplate('./views/about/about.html');

  const fragment = template.content.cloneNode(true);
  app.replaceChildren(fragment);

  // Focus management for accessibility
  const heading = app.querySelector('h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  }
}
