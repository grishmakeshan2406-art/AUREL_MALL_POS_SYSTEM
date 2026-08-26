const cards = document.querySelectorAll(".interface-card");

function showCards() {

    cards.forEach(function(card) {

        const position = card.getBoundingClientRect().top;

        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            card.classList.add("show");
        }

    });

}

window.addEventListener("scroll", showCards);

showCards();
const cards = document.querySelectorAll(".interface-card");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2
    }
);

cards.forEach((card) => {
    observer.observe(card);
});