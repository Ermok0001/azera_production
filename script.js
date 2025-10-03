document.addEventListener('DOMContentLoaded', () => {

    // 1. Логика мобильной навигации (меню-гамбургер)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');

        const icon = menuToggle.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // ------------------------------------------------------------------
    // 2. Логика Слайдера Портфолио
    const sliderTrack = document.querySelector('.slide-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.slide-item'); 
    
    if (slides.length > 0) {
        const slideWidth = slides[0].clientWidth;
        let currentIndex = 0; 

        function updateSlider() {
            const offset = -currentIndex * slideWidth;
            sliderTrack.style.transform = `translateX(${offset}px)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1; 
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0; 
            updateSlider();
        });
    }

    // ------------------------------------------------------------------
    // 3. Логика отзывов
    const reviewForm = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    if (reviewForm && reviewsList) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        function renderReviews() {
            reviewsList.innerHTML = "";
            if (reviews.length === 0) {
                reviewsList.innerHTML = "<p>Пока нет отзывов. Будьте первым!</p>";
                return;
            }
            reviews.forEach(r => {
                const div = document.createElement("div");
                div.classList.add("review");
                div.innerHTML = `<h3>${r.name}</h3><p>${r.message}</p>`;
                reviewsList.appendChild(div);
            });
        }

        renderReviews();

        reviewForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !message) return;

            const newReview = { name, message };
            reviews.push(newReview);
            localStorage.setItem("reviews", JSON.stringify(reviews));

            renderReviews();
            reviewForm.reset();
        });
    }
});
