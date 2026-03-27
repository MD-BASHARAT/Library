document.addEventListener("DOMContentLoaded", () => {
    // 1. Hero Reveal Animation (Transplanted from Features)
    const heroTl = gsap.timeline();
    heroTl.from(".f-hero-title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2 })
    .from(".f-hero-subtitle", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .from(".floating-ring", { scale: 0, opacity: 0, duration: 1.5, stagger: 0.2, ease: "elastic.out(1, 0.5)" }, "-=1.2");

    gsap.to(".floating-ring", { rotationX: 360, rotationY: 360, duration: 20, repeat: -1, ease: "none", stagger: 2 });

    // 2. Contact Cards & Map IntersectionObserver
    gsap.set(".contact-info, .contact-form, .contact-map-wrapper", { y: 60, opacity: 0 });

    const cObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const tg = entry.target;
                if(tg.classList.contains('contact-container')) {
                    gsap.to(".contact-info", { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
                    gsap.to(".contact-form", { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" });

                    // Stagger inputs after form reveals
                    gsap.from(".input-group", { duration: 0.8, y: 30, opacity: 0, stagger: 0.15, ease: "back.out(1.5)", delay: 0.6 });
                    gsap.from(".contact-btn", { duration: 0.8, scale: 0.5, opacity: 0, ease: "elastic.out(1, 0.5)", delay: 1.2 });
                }
                if(tg.classList.contains('contact-map-wrapper')) {
                    gsap.to(".contact-map-wrapper", { y: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" });
                }
                obs.unobserve(tg);
            }
        });
    }, { threshold: 0.15 });

    const container = document.querySelector(".contact-container");
    const mapWrap = document.querySelector(".contact-map-wrapper");
    if(container) cObs.observe(container);
    if(mapWrap) cObs.observe(mapWrap);
    
    // Optional: form submission animation
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector(".contact-btn");
            const originalText = btn.innerHTML;
            
            btn.innerHTML = "Sending...";
            gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
            
            setTimeout(() => {
                btn.innerHTML = "Message Sent! ✓";
                btn.style.background = "linear-gradient(90deg, #10b981, #059669)";
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                }, 3000);
            }, 1500);
        });
    }
});
