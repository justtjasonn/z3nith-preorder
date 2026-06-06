const slides = Array.from(document.querySelectorAll('.slides img'));
let slideIndex = 0;
let intervalId = null;
let activeColor = null;
let selectedColor = null;
let selectedSize = null;

document.addEventListener('DOMContentLoaded', initializeSlider);

function initializeSlider() {
    if (!slides.length) {
        return;
    }

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
    selectedColor = color;
    slideIndex = 0;
    showSlide(slideIndex);
    startSlider();
}

function turnWhite(button) {
    document.querySelector('.color_selector .selected')?.classList.remove('selected');
    button?.classList.add('selected');
    setColor('white');
}

function turnBlack(button) {
    document.querySelector('.color_selector .selected')?.classList.remove('selected');
    button?.classList.add('selected');
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

function selectSize(button, size) {
    document.querySelector('.size_btn.selected')?.classList.remove('selected');
    button.classList.add('selected');
    selectedSize = size;
}

const emailSection = document.getElementById('email_section');

if (emailSection) {
    emailSection.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!selectedColor || !selectedSize) {
            alert('Please select a color and size before submitting.');
            return;
        }

        const shirtName = document.querySelector('.main_body')?.dataset.shirtName
            || document.querySelector('.page_title')?.textContent.trim()
            || document.title;
        const email = event.target.querySelector('input[type="email"]').value;

        const orderData = {
            shirtName,
            size: selectedSize,
            color: selectedColor,
            email
        };

        fetch("https://formspree.io/f/xqeoedql", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success!
                alert("Thanks for your interest! We'll notify you with updates!");
                emailSection.reset(); // Clears the email input box
            } else {
                // Formspree returned an error
                alert("Oops! There was a problem submitting your order. Please try again.");
            }
        }).catch(error => {
            // A network error occurred
            alert("Oops! There was a network problem. Please check your connection and try again.");
            console.error(error);
        });
    });
}