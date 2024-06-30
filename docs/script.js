document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section");

  function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, targetPosition - startPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSection = document.querySelector(link.getAttribute("href"));
      smoothScroll(targetSection, 1000);
    });
  });

  function highlightCurrentSection() {
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 50;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const currentLink = document.querySelector(`nav a[href="#${section.id}"]`);
        navLinks.forEach(link => link.classList.remove("active"));
        currentLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightCurrentSection);
});