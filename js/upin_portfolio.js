// ====================== typing animation ==============================
document.addEventListener("DOMContentLoaded", function () {
    const typedInstance = new Typed(".typing", {
        strings: ["Frontend Engineer", "Python Software Engineer", "CyberSecurity Analyst", "Digital Product Designer"],
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

    // Using Intersection Observer to start counting when stats come into view
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

// ===================== Load More Projects =====================

const projectCards =
    document.querySelectorAll(".project-card");

const loadMoreBtn =
    document.querySelector(".load-more-btn");

let visibleProjects = 6;

/* Tablet */

if (window.innerWidth <= 991) {
    visibleProjects = 4;
}

/* Mobile */

if (window.innerWidth <= 767) {
    visibleProjects = 2;
}

/* Hide Extra Projects */
projectCards.forEach((card, index) => {
    if (index >= visibleProjects) {
        card.classList.add("hidden-project");
    }
});

/* Load More */

loadMoreBtn.addEventListener("click", () => {

    let hiddenProjects =
        document.querySelectorAll(
            ".project-card.hidden-project"
        );

    /* Reveal next batch */

    for (let i = 0; i < 3; i++) {

        if (hiddenProjects[i]) {
            hiddenProjects[i]
                .classList.remove("hidden-project");
        }
    }

    /* Hide button if no more */

    if (
        document.querySelectorAll(
            ".project-card.hidden-project"
        ).length === 0
    ) {
        loadMoreBtn.style.display = "none";
    }
});

// ================= Project Modal ===========================

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

// ===== SCROLL TO TOP =====
(function () {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;

    // Show/hide based on scroll position within the active section
    document.querySelectorAll(".section").forEach(section => {
        section.addEventListener("scroll", () => {
            if (section.scrollTop > 500) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        });
    });

    btn.addEventListener("click", () => {
        // Scroll active section to top
        const active = document.querySelector(".section.active");
        if (active) {
            active.scrollTo({ top: 0, behavior: "smooth" });
        }
        btn.classList.remove("visible");
    });
})();

// ===================== EMAILJS CONTACT FORM =====================

const contactForm =
    document.getElementById("contact-form");

const contactBtn =
    document.querySelector(".contact-btn");

const formMessage =
    document.querySelector(".form-message");

/* Prevent JS crash */

if (contactForm) {

    let lastSubmissionTime = 0;

    contactForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            /* Spam cooldown */

            const now = Date.now();

            if (
                now - lastSubmissionTime < 60000
            ) {

                showMessage(
                    "Please wait before sending another message.",
                    "error"
                );

                return;
            }

            /* Honeypot protection */

            const honeypot =
                contactForm.querySelector(".honeypot").value;

            if (honeypot) {
                return;
            }

            /* Loading state */

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

                console.error(error);

                showMessage(
                    "Something went wrong. Please try again.",
                    "error"
                );
            }

            /* Reset button */

            contactBtn.classList.remove("loading");

            contactBtn.innerHTML = `
                <span>Send Message</span>
                <i class="fa-solid fa-paper-plane"></i>
            `;
        }
    );
}

// ==================== SHOW MESSAGE =======================

function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className =
        `form-message ${type}`;

    setTimeout(() => {

        formMessage.textContent = "";

    }, 5000);
}