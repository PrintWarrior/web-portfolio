// ===== SMOOTH SCROLL NAVIGATION =====
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          const targetPosition = target.offsetTop - 100; // Account for fixed nav
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 800; // Animation duration in ms
          let start = null;

          function animation(currentTime) {
            if (start === null) start = currentTime;
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-in-out-cubic)
            const ease = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + distance * ease);

            if (progress < 1) {
              requestAnimationFrame(animation);
            }
          }

          requestAnimationFrame(animation);
        }
      });
    });

    // ===== PROJECT CAROUSEL =====
    // Project data
    const projects = [
      {
        title: 'Moelci - II Queue System',
        image: '/img/moelci.png',
        link: 'https://moelci-2tangub-city.com/'
      },
      {
        title: 'Internship Application Portal',
        image: '/img/intern.png',
        link: 'https://internshipportal.nmsc.online/'
      },
      {
        title: '3D Web Portfolio',
        image: '/img/3Dwebport.png',
        link: 'https://printwarrior.github.io/web-portfolio3d/'
      },
      {
        title: 'Beauty Mart',
        image: '/img/beauty.png',
        link: 'https://beautymart.nmsc.online/'
      }
    ];

    // Carousel state
    let currentIndex = 0;
    const itemWidth = 320; // w-80
    const gap = 24; // gap-6

    // DOM elements
    const carouselSlider = document.getElementById('carouselSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');

    // Initialize carousel
    function init() {
      renderProjects();
      renderIndicators();
      updateCarousel();
    }

    // Render project cards
    function renderProjects() {
      carouselSlider.innerHTML = projects
        .map(
          (project) => `
        <div class="project-card" onclick="openProject('${project.link}')">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" />
          </div>
          <h3 class="project-title">${project.title}</h3>
        </div>
      `
        )
        .join('');
    }

    // Render indicator dots
    function renderIndicators() {
      indicatorsContainer.innerHTML = projects
        .map(
          (_, idx) => `
        <button 
          class="indicator ${idx === 0 ? 'active' : ''}" 
          onclick="goToSlide(${idx})"
          aria-label="Go to project ${idx + 1}"
        ></button>
      `
        )
        .join('');
    }

    // Update carousel position and buttons
    function updateCarousel() {
      const offset = currentIndex * (itemWidth + gap);
      carouselSlider.style.transform = `translateX(-${offset}px)`;

      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === projects.length - 1;

      // Update indicators
      document.querySelectorAll('.indicator').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // Navigation functions
    function next() {
      if (currentIndex < projects.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    }

    function prev() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function openProject(link) {
      window.open(link, '_blank');
    }

    // Event listeners
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // Initialize on load
    document.addEventListener('DOMContentLoaded', init);

    // ===== TYPING EFFECT FOR BIO =====
    const bioElement = document.querySelector('.bio-section');
    const bioText = "I'm an I.T college student, passionate about learning and creating functional web systems that make everyday tasks simpler. I love turning ideas into reality through code and design.";

    function typeEffect() {
      let i = 0;
      bioElement.innerHTML = '';

      function type() {
        if (i < bioText.length) {
          bioElement.innerHTML += bioText[i];
          i++;
          setTimeout(type, 10 + Math.random() * 40);
        }
      }
      type();
    }

    // Start typing effect when page loads
    window.addEventListener('load', typeEffect);