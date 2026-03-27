if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Premium Hero Reveal
    const heroTl = gsap.timeline();
    
    heroTl.from(".m-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .from(".m-subtitle", {
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

    // Continuous 3D rotation for rings
    gsap.to(".floating-ring", {
        rotationX: 360,
        rotationY: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
        stagger: 3
    });

    // Pricing Cards Stagger
    gsap.from(".price-card", {
        scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all" // Ensures styles are cleared after animation
    });

    // Benefits Grid Stagger
    gsap.from(".benefit-box", {
        scrollTrigger: {
            trigger: ".m-benefits",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
    });

    // Hover effect for cards
    document.querySelectorAll('.price-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -10, borderColor: "rgba(56,189,248,0.6)", backgroundColor: "rgba(56,189,248,0.15)", duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, borderColor: "rgba(255,255,255,0.05)", backgroundColor: "rgba(255,255,255,0.03)", duration: 0.3 });
        });
    });
}
