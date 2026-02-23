document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const header = document.getElementById("header");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  const card = document.querySelector(".profile-card-container");
  const wrapper = document.querySelector(".main-profile-wrapper");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 20;
    const rotateY = (x - 0.5) * 20;

    wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    wrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
    wrapper.style.transition = `transform 0.5s ease`; 
  });

  card.addEventListener("mouseenter", () => {
    wrapper.style.transition = `none`;
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const contactForm = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Sending...</span>";

      statusMsg.style.color = "var(--text-white)";
      statusMsg.innerText = "Connecting to server...";

      const formData = new FormData(this);

      try {
        const response = await fetch("https://formspree.io/f/mqalprye", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          statusMsg.style.color = "#00ff00";
          statusMsg.innerText = "Success! Your message has been sent.";
          contactForm.reset();
        } else {
          const data = await response.json();
          statusMsg.style.color = "#ff4d4d";
          statusMsg.innerText = data.errors
            ? data.errors[0].message
            : "Oops! Something went wrong.";
        }
      } catch (error) {
        statusMsg.style.color = "#ff4d4d";
        statusMsg.innerText = "Network error. Please try again later.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        setTimeout(() => {
          statusMsg.innerText = "";
        }, 5000);
      }
    });
  }
});
