document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.querySelector('.projects-container');
    const progressFill = document.querySelector('.scroll-progress-fill-vertical');
    
    // Scroll progress functionality
    if (projectsContainer && progressFill) {
        function updateScrollProgress() {
            const scrollTop = projectsContainer.scrollTop;
            const scrollHeight = projectsContainer.scrollHeight - projectsContainer.clientHeight;
            const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            
            progressFill.style.height = Math.min(100, Math.max(0, scrollProgress)) + '%';
        }
        
        projectsContainer.addEventListener('scroll', updateScrollProgress);
        
        // Initial call and retry after a short delay to ensure content is loaded
        updateScrollProgress();
        setTimeout(updateScrollProgress, 100);
    } else {
        console.warn('Scroll progress elements not found');
    }
    
    // Scroll hint arrow functionality
    const scrollHintArrow = document.createElement('div');
    scrollHintArrow.className = 'scroll-hint-arrow';
    document.body.appendChild(scrollHintArrow);
    
    let hasScrolledFromFirst = false;
    let arrowTimer = null;
    
    function showArrow() {
        // Clear existing timer if any
        if (arrowTimer) {
            clearTimeout(arrowTimer);
            arrowTimer = null;
        }
        
        // Force restart animation by removing and re-adding class
        scrollHintArrow.classList.remove('show', 'hide');
        
        // Use requestAnimationFrame to ensure the class removal takes effect
        requestAnimationFrame(() => {
            scrollHintArrow.classList.add('show');
            
            // Auto-hide after 20 seconds
            arrowTimer = setTimeout(() => {
                hideArrow();
            }, 20000);
        });
    }
    
    function hideArrow() {
        scrollHintArrow.classList.add('hide');
        scrollHintArrow.classList.remove('show');
        if (arrowTimer) {
            clearTimeout(arrowTimer);
            arrowTimer = null;
        }
    }
    
    function checkFirstProject() {
        if (projectsContainer) {
            const scrollTop = projectsContainer.scrollTop;
            const scrollHeight = projectsContainer.scrollHeight - projectsContainer.clientHeight;
            const sections = document.querySelectorAll('.section-container');
            const firstSectionHeight = sections[0]?.offsetHeight || 0;
            
            // Calculate if user is at the last project (bottom 10% of scroll area)
            const isAtLastProject = scrollHeight > 0 && scrollTop > scrollHeight * 0.9;
            
            // If user is at the first project (top 10% of first section) and not at last project
            if (scrollTop < firstSectionHeight * 0.1 && !isAtLastProject) {
                // Always show arrow when at top, restart animation cycle
                if (!scrollHintArrow.classList.contains('show')) {
                    hasScrolledFromFirst = false; // Reset flag when returning to top
                    showArrow();
                }
            } else {
                // User has scrolled away from first project or is at last project
                if (scrollTop >= firstSectionHeight * 0.1) {
                    hasScrolledFromFirst = true;
                }
                hideArrow();
            }
        }
    }
    
    // Show arrow initially if at first project
    setTimeout(() => {
        checkFirstProject();
    }, 1000);
    
    // Monitor scroll to hide arrow when user scrolls away
    if (projectsContainer) {
        projectsContainer.addEventListener('scroll', checkFirstProject);
    }
});