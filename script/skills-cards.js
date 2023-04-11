const cards = document.querySelectorAll('.skills-card');
const buttons = document.querySelectorAll('#skills-btn');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        cards.forEach(card => {
            card.style.transform = 'scale(0)';
            card.classList.remove('active');
        });
        setTimeout(() => {
            cards[index].classList.add('active');
            cards[index].style.transform = 'scale(1)';
        }, 300);
    });
});