gsap.registerPlugin(ScrollTrigger);

const imgWrapper = document.getElementById("main-image-wrapper");
const logoNome = document.querySelector(".logo img");
const logoCentro = document.querySelector(".logo-centro");
const menuBtn = document.querySelector(".menu-button");
const menuText = document.querySelector(".menu-text");
const menuSpans = document.querySelectorAll(".menu-icon span");
const horizontalContainer = document.querySelector(".horizontal-container");

function setLogoDark() {
    if (logoNome) logoNome.src = "./photos/nome_preto.png";
    if (logoCentro) logoCentro.src = "./photos/logo_preto.png";
    if (menuText) menuText.style.color = "#000";
    menuSpans.forEach(s => s.style.background = "#000");
}

function setLogoLight() {
    if (logoNome) logoNome.src = "./photos/nome.png";
    if (logoCentro) logoCentro.src = "./photos/logo.png";
    if (menuText) menuText.style.color = "#fff";
    menuSpans.forEach(s => s.style.background = "#fff");
}

function initHeroIntro() {
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: "power2.out" });
    gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    gsap.from(".hero-mockup", { y: 100, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.4 });
    gsap.from(".hero-showcase .minimal-text", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.7 });
}

function initImageMask() {
    if (!imgWrapper) return;

    imgWrapper.addEventListener("mousemove", (e) => {
        const rect = imgWrapper.getBoundingClientRect();
        imgWrapper.style.setProperty("--mask-x", `${e.clientX - rect.left}px`);
        imgWrapper.style.setProperty("--mask-y", `${e.clientY - rect.top}px`);
    });
}

function initHeroSection() {
    if (!document.querySelector("#hero-section")) return;

    ScrollTrigger.create({
        trigger: "#hero-section",
        start: "10px top",
        onEnter: () => imgWrapper && (imgWrapper.style.pointerEvents = "none"),
        onLeaveBack: () => imgWrapper && (imgWrapper.style.pointerEvents = "auto")
    });

    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1
        }
    });

    heroTl
        .to("#hero-shrink-container", { width: "30vw", height: "40vh", duration: 1, ease: "power1.inOut" }, 0)
        .to(".img-base", { filter: "grayscale(100%)", duration: 1 }, 0)
        .to(".marquee-container, .marquee-container2", { opacity: 1, duration: 0.5 }, 0.2)
        .to(".signature-wrapper", { opacity: 1, duration: 0.5 }, 0.4)
        .to(".info-card", { opacity: 0, duration: 0.3 }, 0.1)
        .to({}, {
            duration: 0.1,
            onStart: setLogoDark,
            onReverseComplete: () => {
                if (logoNome) logoNome.src = "./photos/nome.png";
                if (logoCentro) logoCentro.src = "./photos/logo.png";
                if (menuText) menuText.style.color = "var(--primary-color)";
                menuSpans.forEach(s => s.style.background = "var(--primary-color)");
            }
        }, 0.8);
}

function initHorizontalSection() {
    if (!horizontalContainer) return;

    const horizontalTween = gsap.to(horizontalContainer, {
        x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: "#horizontal-section",
            pin: true,
            start: "top top",
            scrub: 1,
            end: () => "+=" + (horizontalContainer.scrollWidth - window.innerWidth)
        }
    });

    ScrollTrigger.create({
        trigger: ".vertical-gallery-item",
        containerAnimation: horizontalTween,
        start: "left 250px",
        end: "right 50px",
        onEnter: () => gsap.to(".logo", { opacity: 0, duration: 0.3 }),
        onLeave: () => gsap.to(".logo", { opacity: 1, duration: 0.3 }),
        onEnterBack: () => gsap.to(".logo", { opacity: 0, duration: 0.3 }),
        onLeaveBack: () => gsap.to(".logo", { opacity: 1, duration: 0.3 })
    });

    ScrollTrigger.create({
        trigger: ".vertical-gallery-item",
        containerAnimation: horizontalTween,
        start: "left 55%",
        end: "right 45%",
        onEnter: () => gsap.to(".logo-centro", { opacity: 0, duration: 0.3 }),
        onLeave: () => gsap.to(".logo-centro", { opacity: 1, duration: 0.3 }),
        onEnterBack: () => gsap.to(".logo-centro", { opacity: 0, duration: 0.3 }),
        onLeaveBack: () => gsap.to(".logo-centro", { opacity: 1, duration: 0.3 })
    });
}

function initHeadToHead() {
    if (!document.querySelector("#head-to-head")) return;

    ScrollTrigger.create({
        trigger: "#head-to-head",
        start: "top 100px",
        end: "bottom 100px",
        onEnter: () => gsap.to(".logo, .logo-centro, .menu-button", { y: -100, opacity: 0, duration: 0.5, ease: "power2.out", pointerEvents: "none" }),
        onLeave: () => {
            gsap.to(".logo, .menu-button", { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", pointerEvents: "auto" });
            gsap.set(".logo-centro", { opacity: 0, pointerEvents: "none" });
        },
        onEnterBack: () => gsap.to(".logo, .logo-centro, .menu-button", { y: -100, opacity: 0, duration: 0.5, ease: "power2.out", pointerEvents: "none" }),
        onLeaveBack: () => gsap.to(".logo, .logo-centro, .menu-button", { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", pointerEvents: "auto" })
    });
}

function initITProjects() {
    if (!document.querySelector("#it-projects-section")) return;

    ScrollTrigger.create({
        trigger: "#it-projects-section",
        start: "top 80px",
        end: "bottom top",
        onUpdate: () => {
            if (!logoNome) return;

            const logoRect = logoNome.getBoundingClientRect();
            const bentoItems = document.querySelectorAll("#it-projects-section .bento-item");
            let overlap = false;

            bentoItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                if (
                    logoRect.left < itemRect.right &&
                    logoRect.right > itemRect.left &&
                    logoRect.top < itemRect.bottom &&
                    logoRect.bottom > itemRect.top
                ) {
                    overlap = true;
                }
            });

            overlap ? setLogoDark() : setLogoLight();
        },
        onLeaveBack: setLogoDark
    });
}

function initEditorial() {
    if (!document.querySelector("#editorial-section")) return;

    const edTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#editorial-section",
            start: "top top",
            end: "+=600%",
            pin: true,
            scrub: 1,
            onEnter: setLogoDark,
            onUpdate: (self) => {
                self.progress > 0.85 ? setLogoLight() : setLogoDark();
            },
            onLeaveBack: setLogoDark
        }
    });

    edTl
        .to(".panel-2", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.inOut" })
        .fromTo(".panel-2 .ed-image-art", { scale: 1.1, filter: "grayscale(100%)" }, { scale: 1, filter: "grayscale(0%)", ease: "power2.inOut" }, "<")
        .fromTo(".panel-2 .ed-floating-card", { x: -100, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out" }, "-=0.2")
        .to(".panel-3", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.inOut" })
        .fromTo(".panel-3 .ed-image-art", { scale: 1.1, filter: "grayscale(100%)" }, { scale: 1, filter: "grayscale(0%)", ease: "power2.inOut" }, "<")
        .fromTo(".panel-3 .ed-floating-card", { x: -100, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out" }, "-=0.2")
        .to(".panel-4", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.inOut" })
        .fromTo(".panel-4 .ed-image-art", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.inOut" }, "<")
        .fromTo(".panel-4 .ed-floating-card", { x: 100, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out" }, "-=0.2")
        .to(".panel-5", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.inOut" })
        .fromTo(".panel-5 .ed-image-art", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "back.out(1.2)" }, "<")
        .fromTo(".panel-5 .ed-floating-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, "-=0.2");
}

function alignBackgrounds() {
    document.querySelectorAll(".anim-bg-container").forEach(bg => {
        const section = bg.closest("section");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        bg.style.backgroundPosition = `0px -${rect.top + window.scrollY}px`;
    });
}

function initGlobal() {
    ScrollTrigger.addEventListener("refresh", alignBackgrounds);

    window.addEventListener("load", () => {
        alignBackgrounds();
        ScrollTrigger.refresh();

        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        if (window.location.hash) {
            const hash = window.location.hash;

            setTimeout(() => {
                const edSection = document.querySelector("#editorial-section");
                const edSt = ScrollTrigger.getAll().find(s => s.trigger === edSection);

                if (hash === "#panel-hamilton" && edSt) {
                    window.scrollTo(0, edSt.end);
                } else if (hash === "#panel-ivan" && edSt) {
                    window.scrollTo(0, edSt.start + (edSt.end - edSt.start) * 0.75);
                } else if (hash === "#panel-gothem" && edSt) {
                    window.scrollTo(0, edSt.start + (edSt.end - edSt.start) * 0.5);
                } else if (hash === "#panel-voz" && edSt) {
                    window.scrollTo(0, edSt.start + (edSt.end - edSt.start) * 0.25);
                } else {
                    const target = document.querySelector(hash);
                    if (target) {
                        const st = ScrollTrigger.getAll().find(s => s.trigger === target);
                        st ? window.scrollTo(0, st.start) : target.scrollIntoView();
                    }
                }

                gsap.to(document.body, { opacity: 1, duration: 0.6, ease: "power2.out" });
            }, 100);

            return;
        }

        gsap.to(document.body, { opacity: 1, duration: 0.6, ease: "power2.out" });
    });
}

function init() {
    initHeroIntro();
    initImageMask();
    initHeroSection();
    initHorizontalSection();
    initHeadToHead();
    initITProjects();
    initEditorial();
    initGlobal();
}

init();