document.addEventListener('DOMContentLoaded', function () {
    // Update dynamic About Me image
    const handleThemedImages = (isLightMode) => {
        const aboutMeImage = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-about-me-image');

        // Set the src attribute of the img element with the CSS variable value
        document.getElementById('about-me-dynamic-image').src = aboutMeImage;
        
        const images = document.querySelectorAll('.invert');
        images.forEach(item => {
            item.style.filter = isLightMode ? 'invert(0%)' : 'invert(100%)';
        });
    };

    const updateButtonIcon = (isLightMode) => {
        // Get the element to be updated
        var element = document.getElementById("toggleTheme");
      
        // Update the element using textContent
        element.innerHTML = isLightMode ? "light_mode" : "dark_mode";
    }

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        const themeStylesheet = document.getElementById('themeStylesheet');
        const isLightMode = themeStylesheet.href.includes('/css/theme/theme.light.css');
        themeStylesheet.href = isLightMode ? '/css/theme/theme.dark.css' : '/css/theme/theme.light.css';
        
        // Set a delay
        setTimeout(() => {
            handleThemedImages(!isLightMode);
            updateButtonIcon(isLightMode);
        }, 50);
    }

    handleThemedImages(isLightMode = true); // Initialize once
    
    // Add click event listener to the button
    const themeToggleBtn = document.getElementById('toggleTheme');
    themeToggleBtn.addEventListener('click', toggleTheme);
});