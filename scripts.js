document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.slide');
    const videos = document.querySelectorAll('video');

    // Function to check if an element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Function to handle video play/pause based on visibility
    function handleVideoPlay() {
        videos.forEach(video => {
            if (isElementInViewport(video)) {
                video.play();
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }

    // Function to handle section visibility and opacity transition
    function handleSectionVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            // Check if the section is partially visible
            if ((sectionTop >= 0 && sectionTop <= window.innerHeight) || // Top is in view
                (sectionBottom >= 0 && sectionBottom <= window.innerHeight)) { // Bottom is in view
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    // Function to handle scroll events
    function scrollHandler() {
        handleVideoPlay();
        handleSectionVisibility();
    }

    // Event listeners for scroll and resize events
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', scrollHandler);

    // Initial check on page load
    scrollHandler();
});
s