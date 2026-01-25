# Per-View Interactivity

Each view can have its own interactive behavior handled by a view-specific script. These scripts are located in the same folder as each view's template.

## Script Location

View scripts are located at: `views/{view-name}/script.js`

For example:
- [views/home/script.js](views/home/script.js)
- [views/about/script.js](views/about/script.js)
- [views/contact/script.js](views/contact/script.js)

## Simple Example

Here's a basic example of how a view script handles interactivity:

```javascript
// views/contact/script.js
export default class ContactView {
    constructor() {
        this.formHandler = null;
    }

    init() {
        console.log('Contact view initialized');
        this.setupContactForm();
    }

    destroy() {
        // Clean up event listeners when navigating away
        const form = document.getElementById('contact-form');
        if (form && this.formHandler) {
            form.removeEventListener('submit', this.formHandler);
        }
        this.formHandler = null;
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        this.formHandler = (e) => {
            e.preventDefault();
            alert('Form submitted!');
        };

        form.addEventListener('submit', this.formHandler);
    }
}
```

The view script exports a class that:
- Sets up interactive behavior in the `init()` method
- Cleans up event listeners in the `destroy()` method
- Keeps all view-specific interactivity self-contained
