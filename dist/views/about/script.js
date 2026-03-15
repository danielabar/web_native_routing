export default class AboutView {
    /**
     * Initialize the about view - called after template is loaded
     */
    init() {
        console.log('About view initialized');
        // Add any about-specific functionality here
    }

    /**
     * Cleanup when navigating away from this view
     */
    destroy() {
        console.log('About view destroyed');
        // Add any cleanup logic here
    }
}
