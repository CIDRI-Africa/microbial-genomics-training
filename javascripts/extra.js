// Custom JavaScript for microbial genomics training website

document.addEventListener('DOMContentLoaded', function() {
    
    // Add copy button functionality to code blocks
    addCodeCopyButtons();
    
    // Initialize progress indicators
    initializeProgressIndicators();
    
    // Add interactive timeline functionality
    initializeTimeline();
    
    // Make all external links open in new tabs
    makeExternalLinksOpenInNewTab();
    
});

// Add copy buttons to code blocks
function addCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentNode;
        const button = document.createElement('button');
        button.className = 'code-copy-button';
        button.innerHTML = '<span class="material-icons">content_copy</span>';
        button.title = 'Copy to clipboard';
        
        // Position button
        pre.style.position = 'relative';
        button.style.position = 'absolute';
        button.style.top = '0.5rem';
        button.style.right = '0.5rem';
        button.style.border = 'none';
        button.style.background = 'rgba(255, 255, 255, 0.1)';
        button.style.color = 'white';
        button.style.borderRadius = '4px';
        button.style.padding = '0.25rem';
        button.style.cursor = 'pointer';
        button.style.opacity = '0.7';
        button.style.transition = 'opacity 0.2s';
        
        button.addEventListener('mouseenter', function() {
            button.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.opacity = '0.7';
        });
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                button.innerHTML = '<span class="material-icons">check</span>';
                setTimeout(function() {
                    button.innerHTML = '<span class="material-icons">content_copy</span>';
                }, 2000);
            });
        });
        
        pre.appendChild(button);
    });
}

// Initialize progress indicators
function initializeProgressIndicators() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(function(bar) {
        const targetWidth = bar.dataset.progress || '0';
        setTimeout(function() {
            bar.style.width = targetWidth + '%';
        }, 500);
    });
}

// Initialize interactive timeline
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            item.classList.toggle('timeline-item-expanded');
        });
        
        // Add staggered animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Make all external links open in new tabs
function makeExternalLinksOpenInNewTab() {
    // Get all links on the page
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(function(link) {
        const href = link.getAttribute('href');
        
        // Check if link is external (starts with http/https and not the current domain)
        // or if it's a document/file link
        if (href) {
            const isExternal = href.startsWith('http://') || href.startsWith('https://');
            const isCurrentDomain = href.includes('cidri-africa.github.io/microbial-genomics-training') || 
                                   href.includes('mamanambiya.github.io/microbial-genomics-training') ||
                                   href.includes(window.location.hostname);
            const isFile = href.endsWith('.pdf') || href.endsWith('.doc') || href.endsWith('.docx') || 
                          href.endsWith('.xls') || href.endsWith('.xlsx') || href.endsWith('.ppt') || 
                          href.endsWith('.pptx') || href.endsWith('.sh');
            
            // Open external links and file downloads in new tab
            if ((isExternal && !isCurrentDomain) || isFile) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Add an icon to indicate external link (optional)
                if (!link.querySelector('.external-link-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'external-link-icon';
                    icon.innerHTML = ' ↗';
                    icon.style.fontSize = '0.8em';
                    icon.style.verticalAlign = 'super';
                    link.appendChild(icon);
                }
            }
        }
    });
}