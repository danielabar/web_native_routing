export default class ContactView {
    constructor() {
        this.formHandler = null;
    }

    /**
     * Initialize the contact view - called after template is loaded
     */
    init() {
        console.log('Contact view initialized');
        this.setupContactForm();
    }

    /**
     * Cleanup when navigating away from this view
     */
    destroy() {
        console.log('Contact view destroyed');
        // Clean up event listeners
        const form = document.getElementById('contact-form');
        if (form && this.formHandler) {
            form.removeEventListener('submit', this.formHandler);
        }
        this.formHandler = null;
    }

    /**
     * Set up the contact form with submission handling
     */
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) {
            console.warn('Contact form not found in template');
            return;
        }

        this.formHandler = async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);

            // Get submit button for loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            try {
                // Show loading state
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Simulate API call (replace with real endpoint)
                await this.simulateFormSubmission(formData);

                // Show success message
                this.showSuccessMessage(form);

            } catch (error) {
                console.error('Form submission failed:', error);
                this.showErrorMessage(form, 'Failed to send message. Please try again.');

                // Restore button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        };

        form.addEventListener('submit', this.formHandler);
    }

    /**
     * Simulate form submission (replace with real API call)
     */
    async simulateFormSubmission(formData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Log form data for development
        console.log('Form submitted with data:', Object.fromEntries(formData));

        // In a real app, you would make an actual API call here:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // });
        //
        // if (!response.ok) {
        //     throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        // }
    }

    /**
     * Show success message after form submission
     */
    showSuccessMessage(form) {
        form.innerHTML = `
            <div class="success">
                <h3>✅ Message Sent!</h3>
                <p>Thank you for your message. We'll get back to you soon.</p>
            </div>
        `;
    }

    /**
     * Show error message if submission fails
     */
    showErrorMessage(form, message) {
        const existingError = form.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <p style="color: var(--error-color); margin: 1rem 0;">
                ❌ ${message}
            </p>
        `;

        form.insertBefore(errorDiv, form.firstChild);
    }
}
