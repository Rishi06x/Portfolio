document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------
  // Navbar & Hamburger Menu
  // ----------------------------------------
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

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // ----------------------------------------
  // Scroll Events: Header & Active Links
  // ----------------------------------------
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

  // ----------------------------------------
  // 3D Profile Card Tilt Effect
  // ----------------------------------------
  const card = document.querySelector(".profile-card-container");
  const wrapper = document.querySelector(".main-profile-wrapper");

  if (card && wrapper) {
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
  }

  // ----------------------------------------
  // Reveal Elements Observer
  // ----------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ----------------------------------------
  // Text-Fill Scroll Trigger Observer (NEW)
  // ----------------------------------------
  const textFillElements = document.querySelectorAll('.text-fill[data-tf-trigger="scroll"]');

  if (textFillElements.length > 0) {
    const defaultObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-filled');
        } else {
          entry.target.classList.remove('is-filled');
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });

    textFillElements.forEach(el => {
      const customThreshold = el.getAttribute('data-tf-threshold');
      
      if (customThreshold) {
        const customObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-filled');
            } else {
              entry.target.classList.remove('is-filled');
            }
          });
        }, { threshold: parseFloat(customThreshold) });
        customObserver.observe(el);
      } else {
        defaultObserver.observe(el);
      }
    });
  }

  // ----------------------------------------
  // Achievement Cards Expand/Collapse
  // ----------------------------------------
  const achieveCards = document.querySelectorAll(".achieve-card");
  achieveCards.forEach((card) => {
    card.addEventListener("click", () => {
      const isExpanded = card.classList.contains("expanded");
      
      if (!isExpanded) {
        card.classList.add("expanded");
      } else {
        card.classList.remove("expanded");
      }
    });
  });

  // ----------------------------------------
  // Contact Form Handling (Formspree)
  // ----------------------------------------
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
/* =========================================
   Pixel Drift Engine (Multi-line & Multi-color)
   ========================================= */
class TextPixelDrift {
    constructor(container) {
        this.container = container;
        this.rafId = null;
        this.pointer = { x: -99999, y: -99999, active: false };
        this.formVal = 0;
        this.lastFrame = null;
        this.hidden = false;
        
        // Physics and Engine Options
        this.particleSize = window.innerWidth < 768 ? 4 : 5;
        this.particleCount = 70;
        this.mouseRadius = 100;
        this.mouseForce = 35;
        this.formDurationMs = 1500;
        
        this.prevMx = -99999;
        this.prevMy = -99999;
        this.mouseSpeed = 0;
        this.smoothX = -99999;
        this.smoothY = -99999;
        this.cssW = 0;
        this.cssH = 0;
        this.dpr = 1;

        this.setupDOM();
        this.bindEvents();
        
        this.loop = this.loop.bind(this);
        this.rafId = requestAnimationFrame(this.loop);
    }

    setupDOM() {
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";
        this.canvas.style.inset = 0;
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.display = "block";
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d", { alpha: true });
    }

    bindEvents() {
        this.onMove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = rect.width > 0 ? this.cssW / rect.width : 1;
            const scaleY = rect.height > 0 ? this.cssH / rect.height : 1;
            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY;
            
            if (this.prevMx > -9000) {
                const ddx = mx - this.prevMx;
                const ddy = my - this.prevMy;
                this.mouseSpeed = Math.sqrt(ddx * ddx + ddy * ddy);
            }
            this.prevMx = mx;
            this.prevMy = my;
            this.pointer.x = mx;
            this.pointer.y = my;
            this.pointer.active = true;
        };

        this.onLeave = () => {
            this.pointer.x = -99999;
            this.pointer.y = -99999;
            this.pointer.active = false;
            this.prevMx = -99999;
            this.prevMy = -99999;
        };

        this.canvas.addEventListener("pointermove", this.onMove);
        this.canvas.addEventListener("pointerleave", this.onLeave);
        this.canvas.addEventListener("pointercancel", this.onLeave);

        this.ro = new ResizeObserver(() => this.resize());
        this.ro.observe(this.container);
    }

    sampleText() {
        const W = this.cssW;
        const H = this.cssH;
        if (W <= 0 || H <= 0) return;

        const off = document.createElement("canvas");
        off.width = Math.floor(W * this.dpr);
        off.height = Math.floor(H * this.dpr);
        const offCtx = off.getContext("2d", { willReadFrequently: true });
        offCtx.scale(this.dpr, this.dpr);

        // Responsive Font Sizing
        let effectiveSize = Math.min(W / 10, 65);
        if (window.innerWidth < 768) effectiveSize = Math.min(W / 7, 45); 
        
        const fontFamily = '"Plus Jakarta Sans", sans-serif';

        offCtx.textAlign = "left"; // Aligning left to match your layout
        offCtx.textBaseline = "middle";
        offCtx.font = `800 ${effectiveSize}px ${fontFamily}`;

        // Draw Line 1 (White)
        offCtx.fillStyle = "#ffffff";
        offCtx.fillText("Building the", 0, H / 2 - (effectiveSize * 0.6));
        
        // Draw Line 2 (Red text matching your theme)
        offCtx.fillStyle = "#ff4d4d"; 
        offCtx.fillText("User Experience.", 0, H / 2 + (effectiveSize * 0.6));

        const imgData = offCtx.getImageData(0, 0, Math.floor(W * this.dpr), Math.floor(H * this.dpr));
        const data = imgData.data;

        const pCount = Math.max(1, Math.min(100, this.particleCount));
        const stride = Math.max(2, Math.round(150 / pCount));

        let candidates = 0;
        for (let y = 0; y < H; y += stride) {
            for (let x = 0; x < W; x += stride) {
                const idx = (Math.floor(y * this.dpr) * imgData.width + Math.floor(x * this.dpr)) * 4;
                if (data[idx + 3] > 128) candidates++; 
            }
        }

        const allocCount = Math.min(candidates, 50000);

        this.ox = new Float32Array(allocCount);
        this.oy = new Float32Array(allocCount);
        this.sx = new Float32Array(allocCount);
        this.sy = new Float32Array(allocCount);
        this.px = new Float32Array(allocCount);
        this.py = new Float32Array(allocCount);
        this.repX = new Float32Array(allocCount);
        this.repY = new Float32Array(allocCount);
        this.colors = new Array(allocCount);

        let i = 0;
        for (let y = 0; y < H && i < allocCount; y += stride) {
            for (let x = 0; x < W && i < allocCount; x += stride) {
                const idx = (Math.floor(y * this.dpr) * imgData.width + Math.floor(x * this.dpr)) * 4;
                const alpha = data[idx + 3];
                
                if (alpha > 128) { 
                    this.ox[i] = x;
                    this.oy[i] = y;
                    
                    const ang = Math.random() * Math.PI * 2;
                    const rad = Math.max(W, H) * (0.6 + Math.random() * 0.5);
                    this.sx[i] = W / 2 + Math.cos(ang) * rad;
                    this.sy[i] = H / 2 + Math.sin(ang) * rad;
                    
                    this.px[i] = this.sx[i];
                    this.py[i] = this.sy[i];
                    
                    // Sample exact RGB to preserve the white and red split
                    this.colors[i] = `rgba(${data[idx]}, ${data[idx+1]}, ${data[idx+2]}, 1)`;
                    i++;
                }
            }
        }
        
        this.count = i;
        this.formVal = 0;
        this.lastFrame = null;
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.floor(rect.height);
        if (w <= 0 || h <= 0) return;
        
        this.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        this.cssW = w;
        this.cssH = h;
        
        this.canvas.width = Math.floor(this.cssW * this.dpr);
        this.canvas.height = Math.floor(this.cssH * this.dpr);
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        
        this.sampleText();
    }

    drawFrame() {
        this.ctx.clearRect(0, 0, this.cssW, this.cssH);

        const easeFn = t => 1 - (1 - t) * (1 - t); // easeOut
        const drawSize = Math.max(1, this.particleSize / 2);
        const half = drawSize / 2;

        const now = performance.now();
        const last = this.lastFrame ?? now;
        const dt = Math.min(64, Math.max(0, now - last));
        this.lastFrame = now;

        const target = 1;
        const stepv = dt / this.formDurationMs;
        
        if (this.formVal < target) this.formVal = Math.min(target, this.formVal + stepv);

        const forming = this.formVal < 1;
        const factor = easeFn(this.formVal);

        const hitSpeed = this.mouseSpeed;
        this.mouseSpeed *= 0.88;
        const active = !forming && this.pointer.active;
        
        if (active) {
            const lerpFactor = Math.max(0.08, 0.3 - hitSpeed * 0.006);
            if (this.smoothX < -9000) {
                this.smoothX = this.pointer.x;
                this.smoothY = this.pointer.y;
            } else {
                this.smoothX += (this.pointer.x - this.smoothX) * lerpFactor;
                this.smoothY += (this.pointer.y - this.smoothY) * lerpFactor;
            }
        } else {
            this.smoothX = -99999;
            this.smoothY = -99999;
        }

        const mx = this.smoothX;
        const my = this.smoothY;
        const repCutoffSq = this.mouseRadius * this.mouseRadius;

        this.ctx.globalAlpha = forming ? Math.min(1, Math.max(0, factor)) : 1;

        for (let i = 0; i < this.count; i++) {
            const oxi = this.ox[i], oyi = this.oy[i];

            if (forming) {
                this.px[i] = this.sx[i] + (oxi - this.sx[i]) * factor;
                this.py[i] = this.sy[i] + (oyi - this.sy[i]) * factor;
            } else {
                let inZone = false;
                if (active) {
                    const dx = oxi - mx, dy = oyi - my;
                    const distSq = dx * dx + dy * dy;
                    if (distSq > 0 && distSq < repCutoffSq) {
                        const dist = Math.sqrt(distSq);
                        const nx = dx / dist, ny = dy / dist;
                        const falloff = 1 - dist / this.mouseRadius;
                        const push = falloff * hitSpeed * this.mouseForce * 0.05;
                        
                        this.repX[i] += nx * push;
                        this.repY[i] += ny * push;
                        
                        const targetRepX = nx * (this.mouseRadius - dist);
                        const targetRepY = ny * (this.mouseRadius - dist);
                        this.repX[i] += (targetRepX - this.repX[i]) * 0.06;
                        this.repY[i] += (targetRepY - this.repY[i]) * 0.06;
                        inZone = true;
                    }
                }
                if (!inZone) {
                    this.repX[i] *= 0.97;
                    this.repY[i] *= 0.97;
                }

                this.px[i] = oxi + this.repX[i];
                this.py[i] = oyi + this.repY[i];
            }

            this.ctx.fillStyle = this.colors[i];
            this.ctx.fillRect(this.px[i] - half, this.py[i] - half, drawSize, drawSize);
        }
        this.ctx.globalAlpha = 1;
    }

    loop() {
        this.drawFrame();
        this.rafId = requestAnimationFrame(this.loop);
    }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    const heroContainer = document.getElementById("hero-pixel-drift");
    if (heroContainer) {
        new TextPixelDrift(heroContainer);
    }
});

/* =========================================
   Spotlight Text Engine
   ========================================= */
class SpotlightText {
    constructor(container) {
        this.container = container;
        this.brightLayer = container.querySelector('.bright-text');

        // Animation state
        this.maskX = 0;
        this.maskY = 0;
        this.currentRadius = 0;
        this.targetRadius = 0;
        
        // Settings (Adjust these to tweak the effect)
        this.maxRadius = 150; // Size of the flashlight
        this.intensity = 20;  // Core solid percentage (10-100)

        this.bindEvents();
        
        // Start animation loop
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    bindEvents() {
        // Track mouse movement relative to the container
        this.container.addEventListener('pointermove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.maskX = e.clientX - rect.left;
            this.maskY = e.clientY - rect.top;
        });

        // Open spotlight on hover
        this.container.addEventListener('pointerenter', () => {
            this.targetRadius = this.maxRadius;
        });

        // Close spotlight on leave
        this.container.addEventListener('pointerleave', () => {
            this.targetRadius = 0;
        });
    }

    loop() {
        // Smooth interpolation for the radius (easing)
        this.currentRadius += (this.targetRadius - this.currentRadius) * 0.15;

        // Apply dynamic values to CSS variables
        if (this.brightLayer) {
            this.brightLayer.style.setProperty('--mask-x', `${this.maskX}px`);
            this.brightLayer.style.setProperty('--mask-y', `${this.maskY}px`);
            this.brightLayer.style.setProperty('--mask-radius', `${this.currentRadius}px`);
            this.brightLayer.style.setProperty('--mask-core', `${this.intensity}%`);
        }

        requestAnimationFrame(this.loop);
    }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const spotlightContainer = document.getElementById("spotlight-desc");
    if (spotlightContainer) {
        // Only run the effect if the user doesn't prefer reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            new SpotlightText(spotlightContainer);
        } else {
            // Fallback for accessibility: keep it fully bright
            const brightText = spotlightContainer.querySelector('.bright-text');
            if(brightText) brightText.style.setProperty('--mask-radius', '1000px');
        }
    }
});