// Deployment configuration - single source of truth
export const deploymentConfig = {
    basePath: '/'
};

// Helper function to get current environment config
export function getBasePath() {
    return deploymentConfig.basePath;
}

// Validation helper
export function validateBasePath(path) {
    if (!path.startsWith('/')) {
        throw new Error('Base path must start with "/"');
    }
    if (path !== '/' && !path.endsWith('/')) {
        throw new Error('Base path must end with "/" unless it is root "/"');
    }
    return path;
}
