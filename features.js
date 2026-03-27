document.addEventListener("DOMContentLoaded", () => {
    // Register scroll trigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Reveal Animation
    const heroTl = gsap.timeline();
    heroTl.from(".f-hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .from(".f-hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".floating-ring", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
    }, "-=0.8");

    // Continuous rotation for rings
    gsap.to(".floating-ring", {
        rotationX: 360,
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 2
    });

    // 2. Bento Grid & Dual Panel Show-up on Scroll via IntersectionObserver
    // Set initial hidden states to prevent jumping
    gsap.set(".f-section-title, .f-card, .f-dual-panel > div, .f-horiz-card, .f-cta-text", { opacity: 0, y: 80 });
    gsap.set(".f-horiz-card", { x: 50, rotationY: 10, y: 0 }); // specialized initial state for horizontal

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const tg = entry.target;
                
                if(tg.classList.contains('f-section-title-wrap')) {
                    gsap.to(".f-section-title", { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
                }
                else if(tg.classList.contains('f-bento-grid')) {
                    gsap.to(".f-card", { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "back.out(1.4)" });
                }
                else if(tg.classList.contains('f-dual-panel')) {
                    gsap.to(".f-dual-panel > div", { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" });
                }
                else if(tg.classList.contains('f-cards-wrapper')) {
                    gsap.to(".f-horiz-card", { x: 0, y: 0, opacity: 1, rotationY: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" });
                }
                else if(tg.classList.contains('f-cta')) {
                    gsap.to(".f-cta-text", { y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" });
                }
                obs.unobserve(tg);
            }
        });
    }, { threshold: 0.1 });

    const observerTargets = [
        ".f-section-title-wrap", 
        ".f-bento-grid", 
        ".f-dual-panel", 
        ".f-cards-wrapper", 
        ".f-cta"
    ];

    observerTargets.forEach(selector => {
        const el = document.querySelector(selector);
        if(el) revealObserver.observe(el);
    });

    // 3. Marquee Scroll interaction (Retaining ScrollTrigger here for speed interaction)
    const marquee1 = gsap.to(".f-marquee:not(.f-marquee-reverse)", {
        xPercent: -50,
        ease: "none",
        duration: 10,
        repeat: -1
    });
    
    const marquee2 = gsap.to(".f-marquee-reverse", {
        xPercent: 50,
        ease: "none",
        duration: 10,
        repeat: -1
    });

    ScrollTrigger.create({
        trigger: ".f-marquee-wrap",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
            gsap.to([marquee1, marquee2], {
                timeScale: self.direction === 1 ? 3 : -3,
                overwrite: true,
                duration: 0.3
            });
            gsap.to([marquee1, marquee2], {
                timeScale: 1,
                delay: 0.3,
                overwrite: true,
                duration: 1
            });
        }
    });
});
