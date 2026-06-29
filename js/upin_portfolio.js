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

(function () {

    const SECRET_PIN = "1911";   // ← YOUR PIN HERE
    const BIRTHDAY = "16 May 2003";  // ← shown after correct PIN

    /* ---- State ---- */
    let pinBuffer = "";
    let isUnlocked = sessionStorage.getItem("bday_unlocked") === "1";

    /* ---- Elements ---- */
    const bdayValue = document.getElementById("birthday-value");
    const lockBtn = document.getElementById("bday-lock-btn");
    const lockIcon = document.getElementById("bday-lock-icon");
    const modal = document.getElementById("bday-modal");
    const modalClose = document.getElementById("bday-modal-close");
    const overlay = document.getElementById("bday-modal-overlay");
    const dots = document.querySelectorAll(".bday-pin-dot");
    const errorEl = document.getElementById("bday-error");
    const modalBox = document.getElementById("bday-modal-box");

    if (!bdayValue || !lockBtn || !modal) return;

    /* ---- If already unlocked this session, show immediately ---- */
    if (isUnlocked) showBirthday();

    /* ---- Open modal on lock icon click ---- */
    lockBtn.addEventListener("click", () => {
        if (isUnlocked) {
            // Toggle hide/show if already unlocked
            if (bdayValue.textContent === BIRTHDAY) {
                hideBirthday();
            } else {
                showBirthday();
            }
            return;
        }
        openModal();
    });

    /* ---- Close modal ---- */
    modalClose.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
        if (modal.classList.contains("open")) {
            if (e.key >= "0" && e.key <= "9") appendDigit(e.key);
            if (e.key === "Backspace") deleteDigit();
        }
    });

    /* ---- Number pad ---- */
    document.querySelectorAll(".bday-key").forEach(key => {
        key.addEventListener("click", () => {
            const val = key.dataset.val;
            const action = key.dataset.action;
            if (val !== undefined) appendDigit(val);
            if (action === "back") deleteDigit();
            if (action === "clear") clearPin();
        });
    });

    /* ---- PIN logic ---- */
    function appendDigit(d) {
        if (pinBuffer.length >= 4) return;
        pinBuffer += d;
        updateDots();
        if (pinBuffer.length === 4) checkPin();
    }

    function deleteDigit() {
        pinBuffer = pinBuffer.slice(0, -1);
        clearError();
        updateDots();
    }

    function clearPin() {
        pinBuffer = "";
        clearError();
        updateDots();
    }

    function checkPin() {
        if (pinBuffer === SECRET_PIN) {
            // Correct — flash dots green then close
            dots.forEach(d => d.classList.add("filled"));
            setTimeout(() => {
                isUnlocked = true;
                sessionStorage.setItem("bday_unlocked", "1");
                showBirthday();
                closeModal();
            }, 350);
        } else {
            // Wrong — shake + error
            dots.forEach(d => { d.classList.remove("filled"); d.classList.add("error"); });
            modalBox.classList.add("bday-shake");
            showError("Incorrect PIN. Try again.");
            setTimeout(() => {
                modalBox.classList.remove("bday-shake");
                dots.forEach(d => d.classList.remove("error"));
                clearPin();
            }, 600);
        }
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle("filled", i < pinBuffer.length);
        });
    }

    function showError(msg) {
        errorEl.textContent = msg;
        errorEl.style.display = "block";
        errorEl.classList.add("visible");
    }

    function clearError() {
        errorEl.classList.remove("visible");
        setTimeout(() => { errorEl.style.display = "none"; }, 200);
    }

    /* ---- Modal open/close ---- */
    function openModal() {
        clearPin();
        clearError();
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";
        setTimeout(clearPin, 300);
    }

    /* ---- Show / hide birthday ---- */
    function showBirthday() {
        bdayValue.textContent = BIRTHDAY;
        bdayValue.classList.remove("bday-hidden");
        lockIcon.className = "fa-solid fa-lock-open";
        lockBtn.classList.add("unlocked");
        lockBtn.title = "Click to hide";
        lockBtn.setAttribute("aria-label", "Hide birthday");
    }

    function hideBirthday() {
        bdayValue.textContent = "••••••••••";
        bdayValue.classList.add("bday-hidden");
        lockIcon.className = "fa-solid fa-lock";
        lockBtn.classList.remove("unlocked");
        lockBtn.title = "Unlock to view";
        lockBtn.setAttribute("aria-label", "Unlock birthday");
        // Don't clear session — next unlock is instant
    }

})();

// ====================================================================

(function () {

    // ===== LOGO NAVIGATION FIX =====
    // Logo clicks trigger the same section-switch as nav links
    function navigateToSection(targetId) {
        // Remove active from all nav links
        document.querySelectorAll(".nav a").forEach(a => a.classList.remove("active"));

        // Activate the matching nav link
        const matchingLink = document.querySelector(`.nav a[href="#${targetId}"]`);
        if (matchingLink) matchingLink.classList.add("active");

        // Hide all sections, show target
        document.querySelectorAll(".section").forEach(s => {
            s.classList.remove("active", "back-section");
        });

        const target = document.getElementById(targetId);
        if (target) target.classList.add("active");

        // Close sidebar on mobile
        if (window.innerWidth < 1200) {
            document.querySelector(".aside")?.classList.remove("open");
            document.querySelector(".menu-toggle")?.classList.remove("active");
            document.querySelector(".sidebar-overlay")?.classList.remove("active");
        }
    }

    // Wire up sidebar logo
    const logoLink = document.getElementById("logo-link");
    if (logoLink) {
        logoLink.addEventListener("click", function (e) {
            e.preventDefault();
            navigateToSection("home");
        });
    }

    // Wire up footer logo
    const footerLogoLink = document.getElementById("footer-logo-link");
    if (footerLogoLink) {
        footerLogoLink.addEventListener("click", function (e) {
            e.preventDefault();
            navigateToSection("home");
        });
    }

    // Wire up footer quick links
    document.querySelectorAll(".footer-links-col a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href && href.startsWith("#")) {
                navigateToSection(href.slice(1));
            }
        });
    });

    // Wire up footer bottom "Back to top"
    document.querySelectorAll(".footer-bottom-links a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href && href.startsWith("#")) {
                navigateToSection(href.slice(1));
                // Also scroll to top of section
                const section = document.getElementById(href.slice(1));
                if (section) section.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) {
        document.querySelectorAll(".section").forEach(section => {
            section.addEventListener("scroll", () => {
                if (section.scrollTop > 350) {
                    scrollBtn.classList.add("visible");
                } else {
                    scrollBtn.classList.remove("visible");
                }
            });
        });

        scrollBtn.addEventListener("click", () => {
            const active = document.querySelector(".section.active");
            if (active) active.scrollTo({ top: 0, behavior: "smooth" });
            scrollBtn.classList.remove("visible");
        });
    }

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