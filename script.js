// Variables globales
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typewriterElement = document.getElementById('typewriter');
const contactForm = document.getElementById('contact-form');

// Texte pour l'animation de frappe
const typewriterText = 'Développeur Full Stack';
let typewriterIndex = 0;

// Animation de frappe
function typeWriter() {
    if (typewriterIndex < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(typewriterIndex);
        typewriterIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Démarrer l'animation de frappe au chargement
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeWriter, 1000);
});

// Gestion du menu mobile
mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Gestion du scroll pour la navbar
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Navigation active basée sur le scroll
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Retirer la classe active de tous les liens
            navLinks.forEach(link => link.classList.remove('active'));
            // Ajouter la classe active au lien correspondant
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// Écouter le scroll pour mettre à jour la navigation active
window.addEventListener('scroll', updateActiveNavigation);

// Navigation fluide
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Hauteur de la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation des barres de compétences
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
}

// Initialiser l'animation des barres de compétences
animateSkillBars();

// Animation d'apparition des éléments au scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .about-text, .contact-info');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialiser les animations au scroll
animateOnScroll();

// Gestion du formulaire de contact
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validation simple
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide');
        return;
    }
    
    // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        alert('Message envoyé avec succès! Je vous répondrai bientôt.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Indicateur de scroll pour la section hero
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Effet de parallaxe léger pour le hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animation des liens sociaux
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${0.8 + index * 0.1}s`;
});

// Gestion des liens de projets
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Ici vous pouvez ajouter la logique pour ouvrir les liens réels
        console.log('Lien cliqué:', this.textContent);
    });
});

// Animation de chargement
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Smooth scroll pour les navigateurs qui ne le supportent pas nativement
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill pour smooth scroll
    const smoothScrollPolyfill = function(target, duration = 1000) {
        const targetPosition = target.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Remplacer le comportement de scroll pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                smoothScrollPolyfill(targetSection);
            }
        });
    });
}