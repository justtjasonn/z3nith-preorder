const slides = Array.from(document.querySelectorAll('.slides img'));
let slideIndex = 0;
let intervalId = null;
let activeColor = null;

document.addEventListener('DOMContentLoaded', initializeSlider);

function initializeSlider() {
    if (!slides.length) {
        return;
    }

    activeColor = slides[0].dataset.color || null;
    showSlide(0);
    startSlider();
}

function startSlider() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
}

function getVisibleSlides() {
    if (!activeColor) {
        return slides;
    }

    const visibleSlides = slides.filter(slide => slide.dataset.color === activeColor);
    return visibleSlides.length > 0 ? visibleSlides : slides;
}

function showSlide(index) {
    const visibleSlides = getVisibleSlides();

    if (!visibleSlides.length) {
        return;
    }

    slideIndex = ((index % visibleSlides.length) + visibleSlides.length) % visibleSlides.length;

    slides.forEach(slide => {
        slide.classList.remove('displaySlide');
    });

    visibleSlides[slideIndex].classList.add('displaySlide');
}

function setColor(color) {
    const matchingSlides = slides.filter(slide => slide.dataset.color === color);

    if (!matchingSlides.length) {
        return;
    }

    activeColor = color;
    slideIndex = 0;
    showSlide(slideIndex);
    startSlider();
}

function turnWhite() {
    setColor('white');
}

function turnBlack() {
    setColor('black');
}

function prevSlide() {
    slideIndex -= 1;
    showSlide(slideIndex);
    startSlider();
}

function nextSlide() {
    slideIndex += 1;
    showSlide(slideIndex);
    startSlider();
}

function selectS() {
    document.querySelector('.size_btn.selected')?.classList.remove('selected');
    event.target.classList.add('selected');
}

function selectM() {
    document.querySelector('.size_btn.selected')?.classList.remove('selected');
    event.target.classList.add('selected');
}

function selectL() {
    document.querySelector('.size_btn.selected')?.classList.remove('selected');
    event.target.classList.add('selected');
}