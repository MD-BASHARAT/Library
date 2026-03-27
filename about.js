document.addEventListener("DOMContentLoaded", () => {
    // 1. Hero Reveal Animation (Transplanted from Features)
    const heroTl = gsap.timeline();
    heroTl.from(".f-hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
    })
    .from(".f-hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".about-btn", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    }, "-=0.8")
    .from(".floating-ring", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
    }, "-=1.2");

    // Continuous rotation for rings
    gsap.to(".floating-ring", {
        rotationX: 360,
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 2
    });

    // 2. Core Values Stagger Animation via IntersectionObserver
    gsap.set(".value-card", { opacity: 0, y: 60 });
    const valObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                gsap.to(".value-card", { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.5)" });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    valObs.observe(document.querySelector(".values-section"));
});
