// Delay time for resetting scrolling flag (in milliseconds)
const DELAY_TIME = 200;
const SLIDE_DELAY = 200;

// Flag to track scrolling state
let isScrolling = false;

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
    // Get all sections
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll('nav ul li');
    const dotItems = document.querySelectorAll('.tab-indicator span');

    // Initialize functions
    handleSlideTransitions();
    handleNavClick();


    // Initialize current index and first view
    var currentIndex = 0;
    scrollToSection(currentIndex);

    window.addEventListener('scroll', () => {
        handleSlideTransitions();
        handleFooter();
    });

    // Wheel event listener
    document.addEventListener("wheel", (event) => {
        if (!isScrolling) {
            handleScroll(event.deltaY);
        }
    });

    // Touchstart event listener
    document.addEventListener("touchstart", (event) => {
        if (!isScrolling) {
            touchStartY = event.touches[0].clientY;
        }
    });

    // Touchmove event listener
    document.addEventListener("touchmove", (event) => {
        if (!isScrolling) {
            event.preventDefault();
            const touchEndY = event.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            handleScroll(deltaY);
        }
    });

    // Keydown event listener
    document.addEventListener("keydown", (event) => {
        if (!isScrolling) {
            // Check if key is ArrowDown
            if (event.key === "ArrowDown" || event.key === "PageDown") {
                event.preventDefault();
                handleScroll(1);
            }
            // Check if key is ArrowUp
            else if (event.key === "ArrowUp" || event.key === "PageUp") {
                event.preventDefault();
                handleScroll(-1);
            }
        }
    });

    function handleFooter(totalViews = 5) {

        let display = 'none';
        try {
            const isOnLastNavItem = currentIndex === totalViews - 1;

            // Show the footer if on last page
            if (isOnLastNavItem)
                display = 'block';
        } catch (error) { }

        document.querySelector('.footer-container').style.display = display
    }

    function handleSlideTransitions() {
        const slideLeftElements = document.querySelectorAll('.slide-left');
        const slideRightElements = document.querySelectorAll('.slide-right');
        const slideUpElements = document.querySelectorAll('.slide-up');
        const slideDownElements = document.querySelectorAll('.slide-down');

        handleFooter(currentIndex);

        // Loop through all slide elements
        slideLeftElements.forEach((slideLeftElement) => {
            const elementRect = slideLeftElement.getBoundingClientRect();
            const elementTop = elementRect.top;
            const elementBottom = elementRect.bottom;

            // Check if the element is fully visible in the viewport
            const isElementVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);

            setTimeout(() => {
                slideLeftElement.style.opacity = isElementVisible ? 1 : 0;
                slideLeftElement.style.transform = isElementVisible ? 'translateX(0)' : 'translateX(-50px)';
            }, SLIDE_DELAY);
        });

        slideRightElements.forEach((slideRightElement) => {
            const elementRect = slideRightElement.getBoundingClientRect();
            const elementTop = elementRect.top;
            const elementBottom = elementRect.bottom;

            // Check if the element is fully visible in the viewport
            const isElementVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);

            slideRightElement.style.opacity = isElementVisible ? 1 : 0;
            slideRightElement.style.transform = isElementVisible ? 'translateX(0)' : 'translateX(50px)';
        });

        slideUpElements.forEach((slideUpElement) => {
            const elementRect = slideUpElement.getBoundingClientRect();
            const elementTop = elementRect.top;
            const elementBottom = elementRect.bottom;

            // Check if the element is fully visible in the viewport
            const isElementVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);

            setTimeout(() => {
                slideUpElement.style.opacity = isElementVisible ? 1 : 0;
                slideUpElement.style.transform = isElementVisible ? 'translateY(0)' : 'translateY(-50px)';
            }, SLIDE_DELAY);
        });

        slideDownElements.forEach((slideDownElement) => {
            const elementRect = slideDownElement.getBoundingClientRect();
            const elementTop = elementRect.top;
            const elementBottom = elementRect.bottom;

            // Check if the element is fully visible in the viewport
            const isElementVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);

            setTimeout(() => {
                slideDownElement.style.opacity = isElementVisible ? 1 : 0;
                slideDownElement.style.transform = isElementVisible ? 'translateY(0)' : 'translateY(50px)';
            }, SLIDE_DELAY);
        });
    }

    // Function to handle scrolling
    function handleScroll(deltaY) {
        // If scrolling is in progress, return
        if (isScrolling) {
            return;
        }

        // Check if scrolling down
        if (deltaY > 0) {
            currentIndex = Math.min(currentIndex + 1, sections.length - 1);
        }
        // Check if scrolling up
        else if (deltaY < 0) {
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        // Set scrolling flag to true
        isScrolling = true;

        // Scroll to the next section
        scrollToSection(currentIndex);
        navItems.forEach((item, j) => {
            item.classList.remove('active');
            dotItems[j].classList.remove('active');
        });
        navItems[currentIndex].classList.add('active');
        dotItems[currentIndex].classList.add('active');

        // Wait for scrolling to complete and then reset scrolling flag
        setTimeout(() => {
            isScrolling = false;
        }, DELAY_TIME);
    }

    function handleNavClick() {
        // Add click event listener to each nav item
        navItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                const sectionIndex = item.children[0].getAttribute('data-section');

                // Remove the 'active' class from all nav items and dot items
                navItems.forEach((item, j) => {
                    item.classList.remove('active');
                    dotItems[j].classList.remove('active');
                });

                // Add the 'active' class to the clicked nav item and dot item
                item.classList.add('active');
                dotItems[i].classList.add('active');

                currentIndex = sectionIndex - 1;
                scrollToSection(currentIndex);
            });
        });

        // Add click event listener to each dot item
        dotItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                const sectionIndex = item.getAttribute('data-section');

                // Remove the 'active' class from all nav items and dot items
                dotItems.forEach((item, j) => {
                    item.classList.remove('active');
                    navItems[j].classList.remove('active');
                });

                // Add the 'active' class to the clicked nav item and dot item
                item.classList.add('active');
                navItems[i].classList.add('active');

                currentIndex = sectionIndex - 1;
                scrollToSection(currentIndex);
            });
        });
    }

    // Function to scroll to a section with smooth behavior
	function scrollToSection(index) {
        sections[index]
            .scrollIntoView({
                behavior: "smooth" 
            });
	}
});