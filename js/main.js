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
        image: './img/moelci.png',
        link: 'https://moelci-2tangub-city.com/'
      },
      {
        title: 'Internship Application Portal',
        image: './img/intern.png',
        link: 'https://internshipportal.nmsc.online/'
      },
      {
        title: '3D Web Portfolio',
        image: './img/3Dwebport.png',
        link: 'https://printwarrior.github.io/web-portfolio3d/'
      },
      {
        title: 'Beauty Mart',
        image: './img/beauty.png',
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
    const bioText = "Cheese, I'm Xavier a Freelance Full Stack Web Developer | UI/UX Figma Designer | Zapier Automation Knowledgeable  | DNS Admin at Cleons | Email Automation Specialist";
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

    // ===== SKILLS SECTION =====
    const skills = [
      { name: 'HTML', percentage: 95, icon: 'html' },
      { name: 'CSS', percentage: 90, icon: 'css' },
      { name: 'PHP', percentage: 85, icon: 'php' },
      { name: 'NUXT JS', percentage: 80, icon: 'nuxt' },
      { name: 'NODE JS', percentage: 80, icon: 'node' },
      { name: 'VUE', percentage: 85, icon: 'vue' },
      { name: 'FIGMA', percentage: 80, icon: 'figma' },
      { name: 'ZAPIER', percentage: 75, icon: 'zapier' },
      { name: 'SPLINE', percentage: 70, icon: 'spline' }
    ];

    const skillsContainer = document.getElementById('skillsContainer');

    function renderSkills() {
      skillsContainer.innerHTML = skills.map(skill => `
        <div class="skill-card">
          <div class="skill-header">
            <div class="skill-icon">
              ${getSkillIcon(skill.icon)}
            </div>
            <div style="flex: 1;">
              <div class="skill-name">${skill.name}</div>
            </div>
            <div class="skill-percentage">${skill.percentage}%</div>
          </div>
          <div class="skill-bar-container">
            <div class="skill-bar" style="width: ${skill.percentage}%"></div>
          </div>
        </div>
      `).join('');
    }

    function getSkillIcon(iconType) {
      const icons = {
        html: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3m4 14h2v2H7v-2m3-2h2v4h-2v-4m3 2h2v2h-2v-2m3-2h2v4h-2v-4"/></svg>`,
        css: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3m2 2v14h14V5H5m2 2h10v2H7V7m0 4h10v2H7v-2m0 4h6v2H7v-2"/></svg>`,
        php: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="3"/><circle cx="12" cy="12" r="3"/><circle cx="18" cy="12" r="3"/></svg>`,
        nuxt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>`,
        node: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/></svg>`,
        vue: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5m0 4.86L6.55 10h2.9L12 6.9l2.55 3.1h2.9L12 6.86z"/></svg>`,
        figma: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z"/></svg>`,
        zapier: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h4v4H3V3m7 0h4v4h-4V3m7 0h4v4h-4V3M3 10h4v4H3v-4m7 0h4v4h-4v-4m7 0h4v4h-4v-4M3 17h4v4H3v-4m7 0h4v4h-4v-4m7 0h4v4h-4v-4"/></svg>`,
        spline: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15h4v-6h-4v6m0-8h4V5h-4v4z"/></svg>`
      };
      return icons[iconType] || icons.html;
    }

    // Render skills when page loads
    document.addEventListener('DOMContentLoaded', renderSkills);

    // ===== CONTACTS SECTION =====
    const socialMedia = [
      { name: 'Gmail', icon: 'gmail', url: 'mailto: xavierazcona0422@gmail.com' },
      { name: 'Facebook', icon: 'facebook', url: '#' },
      { name: 'Instagram', icon: 'instagram', url: '#' },
      { name: 'GitHub', icon: 'github', url: 'https://github.com/PrintWarrior' },
      { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/print-warrior-54a768324/' }
    ];

    const socialLinksContainer = document.getElementById('socialLinks');

    function renderSocialLinks() {
      socialLinksContainer.innerHTML = socialMedia.map(social => `
        <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-icon" title="${social.name}">
          ${getSocialIcon(social.icon)}
        </a>
      `).join('');
    }

    function getSocialIcon(iconType) {
      const icons = {
        gmail: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
        facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
        instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>`,
        github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.186.092-.923.35-1.545.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.268.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
        linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`
      };
      return icons[iconType] || icons.gmail;
    }

    // Render social links when page loads
    document.addEventListener('DOMContentLoaded', renderSocialLinks);
