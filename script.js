// ===============================
// SCROLL TO BOOKS
// ===============================
function scrollToBooks(){
    document.getElementById('books').scrollIntoView({
        behavior:'smooth'
    });
}


// COLLECTION ANIMATION
const collectionCards = document.querySelectorAll('.collection-card');

const collectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});

collectionCards.forEach(card => {
    collectionObserver.observe(card);
});


// ===============================
// FEATURE SECTION (NEW)
// ===============================
const featureCards = document.querySelectorAll('.feature-card');

const featureObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});

featureCards.forEach(card => {
    featureObserver.observe(card);
});


// ===============================
// FOOTER ANIMATION
// ===============================
document.querySelectorAll('.footer-col').forEach(col => {
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }
        });
    });
    observer.observe(col);
});


// ===============================
// HEADER SCROLL EFFECT
// ===============================
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if(window.scrollY > 50){
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// ===============================
// GSAP HERO ANIMATION
// ===============================
gsap.from(".hero h2", {
    y:80,
    opacity:0,
    duration:1
});

gsap.from(".hero p", {
    y:80,
    opacity:0,
    delay:0.3,
    duration:1
});

gsap.from(".hero button", {
    scale:0,
    delay:0.6,
    duration:0.6
});



// ===============================
// TYPING EFFECT
// ===============================
const text = "Unlock Infinite Knowledge";
let index = 0;

function typeEffect(){
    if(index < text.length){
        let el = document.getElementById("typingText");
        if(el) {
            el.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 50);
        }
    }
}

typeEffect();

// ===============================
// MOBILE MENU TOGGLE (ENHANCED)
// ===============================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if(menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isActive = navMenu.classList.toggle("active");
        
        // Change icon to X when open
        menuToggle.textContent = isActive ? "✕" : "☰";
        
        // Premium GSAP Stagger for Nav Links
        if (typeof gsap !== 'undefined' && isActive) {
            gsap.fromTo("#navMenu a", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", delay: 0.2 }
            );
        }

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? "hidden" : "auto";
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.textContent = "☰";
            document.body.style.overflow = "auto";
        });
    });
}

// ===============================
// NEW PREMIUM COMPONENT ANIMATIONS
// ===============================
if (typeof gsap !== 'undefined') {
    gsap.set(".stat-box, .split-left, .split-right, .team-card", { y: 60, opacity: 0 });

    const premiumObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const tg = entry.target;
                if(tg.classList.contains('stats-container')) {
                    gsap.to(".stat-box", { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" });
                }
                if(tg.classList.contains('split-container')) {
                    gsap.to(".split-left", { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
                    gsap.to(".split-right", { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "back.out(1.5)" });
                }
                if(tg.classList.contains('team-grid')) {
                    gsap.to(".team-card", { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" });
                }
                obs.unobserve(tg);
            }
        });
    }, { threshold: 0.15 });

    const pTargets = [".stats-container", ".split-container", ".team-grid"];
    pTargets.forEach(sel => {
        const el = document.querySelector(sel);
        if(el) premiumObs.observe(el);
    });
}

// ===============================
// BACK TO TOP
// ===============================
const backToTop = document.createElement('div');
backToTop.innerHTML = '↑';
backToTop.className = 'back-to-top';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});