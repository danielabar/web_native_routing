export default class HomeView {
    /**
     * Initialize the home view - called after template is loaded
     */
    init() {
        console.log('Home view initialized');
        // Add any home-specific functionality here
    }

    /**
     * Cleanup when navigating away from this view
     */
    destroy() {
        console.log('Home view destroyed');
        // Add any cleanup logic here
    }
}
