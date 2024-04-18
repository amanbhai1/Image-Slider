const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

let currentIndex = 0;
let images = [];

async function fetchImages(searchTerm) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${searchTerm}&count=5&client_id=unZlgSYMwUkiNKPVfcfyO8zdsLy-3iX9TYwQkJDuuFE`);
    const data = await response.json();
    images = data.map(img => img.urls.regular);
    renderImages();
}

function renderImages() {
    slider.innerHTML = '';
    images.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Image ${index + 1}`;
        slider.appendChild(img);
    });
    updateSliderPosition();
}

function updateSliderPosition() {
    const newPosition = -currentIndex * slider.clientWidth;
    slider.style.transform = `translateX(${newPosition}px)`;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateSliderPosition();
    }
});

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        fetchImages(searchTerm);
    }
});

fetchImages('landscape');
