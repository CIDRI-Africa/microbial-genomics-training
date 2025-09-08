// Mermaid initialization for MkDocs Material
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Mermaid library to load
    if (typeof mermaid !== 'undefined') {
        // Initialize Mermaid with configuration
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            themeVariables: {
                primaryColor: '#009688',
                primaryTextColor: '#000000',
                primaryBorderColor: '#00695c',
                lineColor: '#757575',
                secondaryColor: '#e0f2f1',
                tertiaryColor: '#ffffff'
            },
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            },
            sequence: {
                useMaxWidth: true,
                wrap: true
            },
            gantt: {
                useMaxWidth: true
            }
        });

        // Process any existing Mermaid diagrams
        mermaid.run();
    } else {
        // If Mermaid is not loaded yet, wait and try again
        setTimeout(function() {
            if (typeof mermaid !== 'undefined') {
                mermaid.initialize({
                    startOnLoad: true,
                    theme: 'default',
                    themeVariables: {
                        primaryColor: '#009688',
                        primaryTextColor: '#000000',
                        primaryBorderColor: '#00695c',
                        lineColor: '#757575',
                        secondaryColor: '#e0f2f1',
                        tertiaryColor: '#ffffff'
                    }
                });
                mermaid.run();
            }
        }, 1000);
    }
});

// Handle theme changes (light/dark mode)
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                // Re-initialize Mermaid when theme changes
                if (typeof mermaid !== 'undefined') {
                    const isDark = document.body.getAttribute('data-md-color-scheme') === 'slate';
                    mermaid.initialize({
                        startOnLoad: true,
                        theme: isDark ? 'dark' : 'default',
                        themeVariables: isDark ? {
                            primaryColor: '#4db6ac',
                            primaryTextColor: '#ffffff',
                            primaryBorderColor: '#26a69a',
                            lineColor: '#90a4ae',
                            secondaryColor: '#263238',
                            tertiaryColor: '#37474f'
                        } : {
                            primaryColor: '#009688',
                            primaryTextColor: '#000000',
                            primaryBorderColor: '#00695c',
                            lineColor: '#757575',
                            secondaryColor: '#e0f2f1',
                            tertiaryColor: '#ffffff'
                        }
                    });
                    
                    // Re-render all Mermaid diagrams
                    const mermaidElements = document.querySelectorAll('.mermaid');
                    mermaidElements.forEach(function(element) {
                        element.removeAttribute('data-processed');
                    });
                    mermaid.run();
                }
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
});
