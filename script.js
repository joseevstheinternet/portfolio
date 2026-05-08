document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    const links = document.querySelectorAll('a, .project-card, .contact-btn');

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate movement for primary cursor
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth movement for follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor Expansion on Hover
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.width = '80px';
            follower.style.height = '80px';
            follower.style.backgroundColor = 'rgba(166, 58, 57, 0.1)';
            follower.style.borderColor = 'rgba(166, 58, 57, 1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
            follower.style.borderColor = 'rgba(166, 58, 57, 0.5)';
        });
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Hero Text Reveal (Staggered)
    const revealText = document.querySelector('.reveal-text');
    if (revealText) {
        revealText.style.opacity = '1';
        // In CSS we could do more complex stuff, but here we just ensure visibility
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        } else {
            header.style.padding = '2rem 0';
            header.style.background = 'rgba(10, 10, 10, 0.5)';
        }
    });
});
