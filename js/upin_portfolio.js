js:
// ====================== typing animation ==============================
document.addEventListener("DOMContentLoaded", function () {
    const typedInstance = new Typed(".typing", {
        strings: ["Web Designer", "Python Developer", "CyberSecurity Graduate", "UI|UX Designer"],
        typeSpeed: 100,
        backSpeed: 40,
        loop: true
    });
});

// ====================== Counting Animation =====================

(function () {
    // Find the stats section on home page
    const statsSection = document.querySelector('.home-stats');
    if (!statsSection) return; // Exit if stats section doesn't exist (not on home page)

    const statNumbers = statsSection.querySelectorAll('.stat-number');
    let countingStarted = false;

    function startCounting() {
        if (countingStarted) return;
        countingStarted = true;

        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1500; // 1.5 seconds animation
            const stepTime = 20; // update every 20ms
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.innerText = target;
                    clearInterval(timer);
                } else {
                    el.innerText = Math.floor(current);
                }
            }, stepTime);
        });
    }

    // Use Intersection Observer to start counting when stats come into view
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounting();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    } else {
        // Fallback for older browsers - start immediately
        startCounting();
    }
})();

// ====================== Aside ==============================

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSelection = document.querySelectorAll(".section"),
    totalSection = allSelection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {

        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
                //   allSelection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if (window.innerWidth < 1200) {
            closeSidebar();
        }
    })
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSelection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSelection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSelection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    // console.log(sectionIndex)
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

const navTogglerBtn = document.querySelector(".menu-toggle"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})
const overlay = document.querySelector(".sidebar-overlay");

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("active");
    overlay.classList.toggle("active");
}

overlay.addEventListener("click", closeSidebar);

function closeSidebar() {
    aside.classList.remove("open");
    navTogglerBtn.classList.remove("active");
    overlay.classList.remove("active");
}

// ======================= Project Modal ================================= //

const projectModal =
    document.querySelector(".project-modal");

const openModalBtns =
    document.querySelectorAll(".open-modal");

const closeModalBtn =
    document.querySelector(".modal-close");

const modalOverlay =
    document.querySelector(".modal-overlay");

/* Modal elements */

const modalImage =
    document.querySelector(".modal-image img");

const modalCategory =
    document.querySelector(".modal-category");

const modalTitle =
    document.querySelector(".modal-content h2");

const modalDescription =
    document.querySelector(".modal-content p");

const modalTech =
    document.querySelector(".modal-tech");

const liveDemo =
    document.querySelector(".live-demo");

const githubLink =
    document.querySelector(".github-link");

/* Open modal */

openModalBtns.forEach(button => {

    button.addEventListener("click", () => {

        /* Get data */

        const title =
            button.dataset.title;

        const image =
            button.dataset.image;

        const category =
            button.dataset.category;

        const description =
            button.dataset.description;

        const live =
            button.dataset.live;

        const github =
            button.dataset.github;

        const tech =
            button.dataset.tech.split(",");

        /* Inject data */

        modalImage.src = image;

        modalCategory.textContent =
            category;

        modalTitle.textContent =
            title;

        modalDescription.textContent =
            description;

        liveDemo.href = live;

        githubLink.href = github;

        /* Tech stack */

        modalTech.innerHTML = "";

        tech.forEach(item => {

            const span =
                document.createElement("span");

            span.textContent = item;

            modalTech.appendChild(span);
        });

        /* Open modal */

        projectModal.classList.add("active");

        document.body.style.overflow = "hidden";
    });

});

/* Close modal */

function closeModal() {

    projectModal.classList.remove("active");

    document.body.style.overflow = "auto";
}

closeModalBtn.addEventListener(
    "click",
    closeModal
);

modalOverlay.addEventListener(
    "click",
    closeModal
);

/* =========================
   EMAILJS CONTACT FORM
========================= */

emailjs.init("zu8J714XTpnUt9HTu");

const contactForm = document.getElementById("contact-form");

const contactBtn = document.querySelector(".contact-btn");

const formMessage = document.querySelector(".form-message");

let lastSubmissionTime = 0;

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* Spam cooldown */

    const now = Date.now();

    if (now - lastSubmissionTime < 60000) {
        showMessage(
            "Please wait before sending another message.",
            "error"
        );
        return;
    }

    /* Honeypot spam protection */

    const honeypot =
        contactForm.querySelector(".honeypot").value;

    if (honeypot) {
        return;
    }

    contactBtn.classList.add("loading");

    contactBtn.innerHTML =
        "Sending...";

    try {

        await emailjs.sendForm(
            "service_gep62at",
            "template_wnbckrl",
            contactForm
        );

        showMessage(
            "Message sent successfully!",
            "success"
        );

        contactForm.reset();

        lastSubmissionTime = now;

    } catch (error) {

        showMessage(
            "Something went wrong. Please try again.",
            "error"
        );

        console.error(error);
    }

    contactBtn.classList.remove("loading");

    contactBtn.innerHTML = "Send Message";
});

function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
        formMessage.textContent = "";
    }, 5000);
}