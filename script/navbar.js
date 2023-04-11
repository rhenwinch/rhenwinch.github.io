document.addEventListener('DOMContentLoaded', () => {
	// Get all the nav items and dot items
	const navItems = document.querySelectorAll('nav ul li');
	const dotItems = document.querySelectorAll('.tab-indicator span');

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
			scrollToSection(sectionIndex);
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
			scrollToSection(sectionIndex);
		});
	});

	// Function to scroll to a section with smooth behavior
	function scrollToSection(sectionIndex) {
		const sections = document.querySelectorAll('section');
		const section = sections[sectionIndex - 1];
		console.log(section);
		section.scrollIntoView({
			behavior: 'smooth'
		});
	}
});
