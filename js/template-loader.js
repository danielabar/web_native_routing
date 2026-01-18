const cache = new Map();

export async function loadTemplate(path) {
  if (cache.has(path)) {
    return cache.get(path);
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Template not found: ${path} (${response.status})`);
    }

    const html = await response.text();
    const container = document.createElement('div');
    container.innerHTML = html;

    const template = container.querySelector('template');
    if (!template) {
      throw new Error(`No <template> element found in ${path}`);
    }

    cache.set(path, template);
    return template;
  } catch (error) {
    console.error('Template loading failed:', error);
    return getFallbackTemplate();
  }
}

function getFallbackTemplate() {
  const template = document.createElement('template');
  template.innerHTML = `
    <div>
      <h1>Error</h1>
      <p>Sorry, there was an error loading this page.</p>
    </div>
  `;
  return template;
}
