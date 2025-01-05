const carousel = document.getElementById("carousel");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentIndex = 0;
const cardsPerView = 5;
let carouselData = [];

async function fetchCarouselData() {
    try {
        const response = await fetch("package.json"); 
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        carouselData = data.popularshows || [];
        renderCarousel();
    } catch (error) {
        console.error("Error fetching carousel data:", error);
    }
}

function renderCarousel() {
    carousel.innerHTML = carouselData
        .map((item) => `
            <div class="carousel-card">
                <img src="${item.des.image}" alt="${item.show}">
            </div>
        `)
        .join("");
    updateCarousel();
}

function updateCarousel() {
    const gap = 10; 
    const cardWidth = carousel.querySelector(".carousel-card").getBoundingClientRect().width;
    const offset = (cardWidth + gap) * currentIndex;
    carousel.style.transform = `translateX(-${offset}px)`;
}

prevButton.addEventListener("click", () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
});

nextButton.addEventListener("click", () => {
    const maxIndex = carouselData.length - cardsPerView;
    currentIndex = Math.min(currentIndex + 1, maxIndex);
    updateCarousel();
});

fetchCarouselData();
