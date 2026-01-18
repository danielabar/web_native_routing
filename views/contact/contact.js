import { loadTemplate } from '../../js/template-loader.js';

export async function contact() {
  const app = document.querySelector('#app');
  const template = await loadTemplate('./views/contact/contact.html');

  const fragment = template.content.cloneNode(true);

  // Add event listener for the ping button
  const pingButton = fragment.querySelector('#ping');
  const messageArea = fragment.querySelector('#message-area');

  if (pingButton && messageArea) {
    pingButton.onclick = () => {
      const timestamp = new Date().toLocaleTimeString();
      messageArea.innerHTML = `<p style="color: #0366d6; margin-top: 1rem;">🏓 Pong! Received at ${timestamp}</p>`;
    };
  }

  app.replaceChildren(fragment);

  // Focus management for accessibility
  const heading = app.querySelector('h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  }
}
