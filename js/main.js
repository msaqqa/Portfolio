// ==================== GLOBAL STATE ====================
const state = {
  projectPage: 0,
  testimonialIndex: 0,
  accent: "#2b7fff",
  sphereSpeed: 1,
  skillOrbits: true,
  heroGraphic: "3D Sphere",
};

// ==================== DATA ====================
// Each icon uses the official brand logo served from the Simple Icons CDN.
// Black-on-dark logos (Next.js, Vercel, shadcn/ui) are forced to white via the
// /[slug]/[color] CDN route so they stay visible on the dark theme.
const ICON_CDN = "https://cdn.simpleicons.org";
const icon = (slug, color) =>
  `<img src="${ICON_CDN}/${slug}${color ? "/" + color : ""}" width="34" height="34" loading="lazy" alt="" onerror="this.style.display='none'">`;

const technologies = [
  { name: "React", svg: icon("react") },
  { name: "Next.js", svg: icon("nextdotjs", "white") },
  { name: "TypeScript", svg: icon("typescript") },
  { name: "JavaScript", svg: icon("javascript") },
  { name: "HTML", svg: icon("html5") },
  { name: "CSS", svg: icon("css") },
  { name: "Tailwind CSS", svg: icon("tailwindcss") },
  { name: "Bootstrap", svg: icon("bootstrap") },
  { name: "Redux", svg: icon("redux") },
  { name: "TanStack", svg: icon("tanstack") },
  { name: "shadcn/ui", svg: icon("shadcnui", "white") },
  { name: "Prisma", svg: icon("prisma", "white") },
  { name: "Supabase", svg: icon("supabase") },
  { name: "PostgreSQL", svg: icon("postgresql") },
  { name: "Vercel", svg: icon("vercel", "white") },
  { name: "Git", svg: icon("git") },
  // { name: "Vite", svg: icon("vite") },
  // { name: "Node.js", svg: icon("nodedotjs") },
  // { name: "MongoDB", svg: icon("mongodb") },
  // { name: "Firebase", svg: icon("firebase") },
];

const projects = [
  {
    title: "Liberation Language Labs CMS",
    description:
      "Production-ready CMS and public marketing site with an admin panel, blog, REST & GraphQL APIs, and S3-backed media storage.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Payload CMS", "PostgreSQL"],
    gradient: "linear-gradient(135deg,#102a4f,#0a1428)",
    caption: "headless cms",
    image: "assets/images/liberation-language-labs.png",
    link: "https://github.com/msaqqa/liberation-language-labs-cms",
  },
  {
    title: "Shoplit",
    description:
      "Full-stack e-commerce platform with smart search, persistent carts, Stripe payments, and an analytics-rich admin dashboard.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind 4",
      "Prisma",
      "Zustand",
      "Stripe",
    ],
    gradient: "linear-gradient(135deg,#0c2f3a,#0a1626)",
    caption: "storefront",
    image: "assets/images/shoplit.png",
    link: "https://github.com/msaqqa/shoplit",
  },
  {
    title: "Freelancer Platform",
    description:
      "Bilingual freelance marketplace connecting clients with freelancers — profiles, services, OAuth auth, onboarding flows, and full Arabic/English RTL support.",
    tags: ["Next.js 15", "React 19", "Tailwind 4", "Supabase", "TanStack Query", "Zustand"],
    gradient: "linear-gradient(135deg,#2a1f4f,#0a1428)",
    caption: "marketplace",
    image: "assets/images/freelancer-platform-dark.png",
    link: "https://github.com/msaqqa/freelancer-platform",
  },
];

const testimonials = [
  {
    quote:
      "Mahmoud is an exceptional developer who consistently delivers high-quality solutions on time. His attention to detail and problem-solving skills have been instrumental in our project's success.",
    author: "Eng. Sharif Naim",
    role: "Chief Executive Officer - Taqat",
    initials: "SN",
  },
  {
    quote:
      "Working with him felt effortless. Clear communication, thoughtful trade-offs, and code reviews that genuinely made the whole team better.",
    author: "Eng. Mahmoud Tafesh",
    role: "Talent Acquisition - GGateway",
    initials: "MT",
  },
  {
    quote:
      "He delivered ahead of schedule and the result was flawless across every device. I'd hire Mahmoud again without a second thought.",
    author: "Eng. Mohammed Shamia",
    role: "MERN Stack Developer",
    initials: "MS",
  },
];

// ==================== FUNCTIONS ====================
function handleHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav-links__item"));
  if (!links.length) return;

  // Map each nav link to the section element it points to.
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")?.replace("#", "");
      const el = id ? document.getElementById(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  const setActive = () => {
    const offset = 120; // approx header height + breathing room
    let current = sections[0];

    for (const section of sections) {
      if (section.el.getBoundingClientRect().top - offset <= 0) {
        current = section;
      }
    }

    // Near the bottom of the page, force the last section active.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }

    links.forEach((l) => l.classList.remove("nav-links__item--active"));
    current?.link.classList.add("nav-links__item--active");
  };

  setActive();
  window.addEventListener("scroll", setActive, { passive: true });
  window.addEventListener("resize", setActive);
}

function initNavigation() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavClose = document.getElementById("mobile-nav-close");

  if (!hamburger || !mobileNav) return;

  function toggleMenu() {
    mobileNav.classList.toggle("open");
    hamburger.classList.toggle("open");
    document.body.style.overflow = mobileNav.classList.contains("open")
      ? "hidden"
      : "";
  }

  hamburger.addEventListener("click", toggleMenu);
  mobileNavClose?.addEventListener("click", toggleMenu);
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("open"))
      toggleMenu();
  });
}

function renderTechCards() {
  const grid = document.getElementById("techGrid");
  if (!grid) return;
  grid.innerHTML = technologies
    .map(
      (t) => `
    <div class="tech-card">
      <div class="tech-card__icon">${t.svg}</div>
      <div class="tech-card__name">${t.name}</div>
    </div>
  `,
    )
    .join("");
}

function renderProjects() {
  const track = document.getElementById("projectsTrack");
  if (!track) return;
  track.innerHTML = projects
    .map(
      (p, i) => `
    <a href="${p.link || "#"}"${p.link ? ' target="_blank" rel="noopener"' : ""} class="project-card" style="display: block; border-radius: 16px; background: rgba(11,17,32,0.6); overflow: hidden; border: 1px solid rgba(120,160,240,0.12); transition: transform 0.25s, box-shadow 0.25s">
      <div style="height: 170px; background: ${p.gradient}; position: relative; border-bottom: 1px solid rgba(120,160,240,0.1); overflow: hidden">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center">` : '<div style="position: absolute; inset: 0; background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 11px)"></div>'}
      </div>
      <div style="padding: 22px">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 9px">
          <h3 style="font-size: 18px; font-weight: 600; margin: 0; letter-spacing: -0.01em">${p.title}</h3>
          <span style="display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; border: 1px solid rgba(120,160,240,0.16); color: #8a92a6; flex-shrink: 0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17L17 7"></path>
              <path d="M8 7h9v9"></path>
            </svg>
          </span>
        </div>
        <p style="font-size: 13.5px; line-height: 1.6; color: #8a92a6; margin: 0 0 15px">${p.description}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 7px">
          ${p.tags.map((tag) => `<span style="font-family: 'IBM Plex Mono'; font-size: 11.5px; color: #c3cad9; padding: 4px 10px; border-radius: 7px">${tag}</span>`).join("")}
        </div>
      </div>
    </a>
  `,
    )
    .join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
      card.style.borderColor = "rgba(43,127,255,0.45)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "none";
      card.style.borderColor = "rgba(120,160,240,0.12)";
    });
  });
}

function initProjectNav() {
  // Grid layout - no navigation needed
}

function renderTestimonials() {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;
  track.innerHTML = testimonials
    .map(
      (t) => `
    <div class="testimonial-slide">
      <div class="testimonial-stars">
        ${[...Array(5)].map(() => '<span class="testimonial-star">★</span>').join("")}
      </div>
      <p class="testimonial-quote">"${t.quote}"</p>
      <div class="testimonial-author">
        <span class="testimonial-avatar">${t.initials}</span>
        <div class="testimonial-info">
          <div class="testimonial-name">${t.author}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function updateTestimonialSlider() {
  const track = document.getElementById("testimonialsTrack");
  if (track) {
    track.style.transform = `translateX(-${state.testimonialIndex * 100}%)`;
  }
}

function initTestimonialNav() {
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      state.testimonialIndex =
        (state.testimonialIndex - 1 + testimonials.length) %
        testimonials.length;
      updateTestimonialSlider();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      state.testimonialIndex =
        (state.testimonialIndex + 1) % testimonials.length;
      updateTestimonialSlider();
    });
  }
}

function initSphere() {
  const canvas = document.getElementById("sphereCanvas");
  if (!canvas) return;

  if ((state.heroGraphic || "3D Sphere") !== "3D Sphere") return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const S = 600;
  canvas.width = S * dpr;
  canvas.height = S * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const cx = S / 2,
    cy = 248,
    R = 212;
  const ac = state.accent || "#2b7fff";
  const speed = state.sphereSpeed != null ? state.sphereSpeed : 1;
  const hx = (h, a) => {
    h = h.replace("#", "");
    if (h.length === 3)
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  };

  const N = 150,
    pts = [],
    ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = ga * i;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }

  const edges = [],
    COST = Math.cos(0.46);
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const d =
        pts[i][0] * pts[j][0] + pts[i][1] * pts[j][1] + pts[i][2] * pts[j][2];
      if (d > COST) edges.push([i, j]);
    }
  }

  const tilt = -0.42,
    cT = Math.cos(tilt),
    sT = Math.sin(tilt);
  const rot = (p, a) => {
    const x = p[0] * Math.cos(a) + p[2] * Math.sin(a);
    const z = -p[0] * Math.sin(a) + p[2] * Math.cos(a);
    const y = p[1];
    return [x, y * cT - z * sT, y * sT + z * cT];
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ang = 0.6,
    t2 = 0;

  const showSkills = state.skillOrbits !== false;
  const skillList = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Slack",
    "Jira",
    "Tailwind",
    "GitHub",
    "Redux",
    "React Query",
  ];
  const orbits = skillList.map((label, i) => ({
    label,
    r: R * (1.05 + (i % 3) * 0.07),
    tilt: -0.75 + i * 0.5,
    plane: i * 1.27,
    speed: (i % 2 === 0 ? 1 : -1) * (0.55 + 0.16 * i),
    phase: i * 1.9,
  }));

  const rr = (x, y, w, h, r) => {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, r);
      return;
    }
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const orbitPos = (o) => {
    const a = ang * o.speed * 2.6 + o.phase;
    const px = Math.cos(a) * o.r,
      pz = Math.sin(a) * o.r;
    const y1 = -pz * Math.sin(o.tilt),
      z1 = pz * Math.cos(o.tilt),
      x1 = px;
    const x2 = x1 * Math.cos(o.plane) + z1 * Math.sin(o.plane);
    const z2 = -x1 * Math.sin(o.plane) + z1 * Math.cos(o.plane);
    const yv = y1 * cT - z2 * sT;
    const zv = y1 * sT + z2 * cT;
    return { x: cx + x2, y: cy + yv, z: zv, zn: zv / o.r };
  };

  const drawChip = (o, pos) => {
    const t = (pos.zn + 1) / 2;
    const scale = 0.72 + 0.5 * t,
      alpha = 0.4 + 0.6 * t,
      fs = 11 * scale;
    ctx.font = `500 ${fs}px 'IBM Plex Mono', monospace`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    const tw = ctx.measureText(o.label).width;
    const padX = 9 * scale,
      padY = 5.5 * scale,
      dot = 5 * scale,
      gap = 6 * scale;
    const w = tw + padX * 2 + dot + gap,
      h = fs + padY * 2;
    const x = pos.x - w / 2,
      y = pos.y - h / 2;
    rr(x, y, w, h, h / 2);
    ctx.fillStyle = `rgba(10,16,30,${0.86 * alpha})`;
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 12 * scale;
    ctx.fill();
    ctx.shadowBlur = 0;
    rr(x, y, w, h, h / 2);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = hx(ac, 0.6 * alpha);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + padX + dot / 2, pos.y, dot / 2, 0, Math.PI * 2);
    ctx.fillStyle = hx(ac, alpha);
    ctx.shadowColor = ac;
    ctx.shadowBlur = 7 * scale;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(231,236,246,${alpha})`;
    ctx.fillText(o.label, x + padX + dot + gap, pos.y + 0.5);
  };

  const drawBase = () => {
    const baseY = cy + R * 1.05;
    ctx.save();
    ctx.translate(cx, baseY);
    ctx.scale(1, 0.28);
    const bgl = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.2);
    bgl.addColorStop(0, hx(ac, 0.5));
    bgl.addColorStop(0.5, hx(ac, 0.13));
    bgl.addColorStop(1, hx(ac, 0));
    ctx.fillStyle = bgl;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    for (let k = 0; k < 4; k++) {
      const rx = R * (0.4 + k * 0.34);
      const a = (0.55 - k * 0.1) * (0.7 + 0.3 * Math.sin(t2 * 1.4 + k * 0.8));
      ctx.save();
      ctx.translate(cx, baseY);
      ctx.scale(1, 0.17);
      ctx.strokeStyle = hx(ac, Math.max(0, a));
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    const beam = ctx.createLinearGradient(0, baseY, 0, cy - R * 0.25);
    beam.addColorStop(0, hx(ac, 0.5));
    beam.addColorStop(1, hx(ac, 0));
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(cx - 5, baseY);
    ctx.lineTo(cx + 5, baseY);
    ctx.lineTo(cx + 24, cy - R * 0.25);
    ctx.lineTo(cx - 24, cy - R * 0.25);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, baseY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#dceeff";
    ctx.shadowColor = ac;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  const draw = () => {
    ctx.clearRect(0, 0, S, S);

    drawBase();

    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9);
    cg.addColorStop(0, hx(ac, 0.4));
    cg.addColorStop(0.45, hx(ac, 0.08));
    cg.addColorStop(1, hx(ac, 0));
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.9, 0, Math.PI * 2);
    ctx.fill();

    const op = showSkills ? orbits.map((o) => ({ o, pos: orbitPos(o) })) : [];
    op.filter((e) => e.pos.z < 0)
      .sort((a, b) => a.pos.z - b.pos.z)
      .forEach((e) => drawChip(e.o, e.pos));

    const P = pts.map((p) => rot(p, ang));

    ctx.lineWidth = 0.7;
    for (const [i, j] of edges) {
      const a = P[i],
        b = P[j];
      const za = (a[2] + 1) / 2,
        zb = (b[2] + 1) / 2;
      ctx.strokeStyle = `rgba(90,160,255,${0.04 + 0.15 * ((za + zb) / 2)})`;
      ctx.beginPath();
      ctx.moveTo(cx + a[0] * R, cy + a[1] * R);
      ctx.lineTo(cx + b[0] * R, cy + b[1] * R);
      ctx.stroke();
    }

    for (let i = 0; i < P.length; i++) {
      const p = P[i],
        z = (p[2] + 1) / 2;
      const sx = cx + p[0] * R,
        sy = cy + p[1] * R;
      const accent = i % 5 === 0;
      const rad = 2 + 3 * z;
      ctx.beginPath();
      ctx.arc(sx, sy, rad, 0, Math.PI * 2);
      if (accent) {
        ctx.shadowColor = ac;
        ctx.shadowBlur = 8 + 6 * z;
        ctx.fillStyle = hx(ac, 0.55 + 0.45 * z);
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(12,20,40,${0.5 + 0.4 * z})`;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.4 + 1.1 * z;
      ctx.strokeStyle = accent
        ? `rgba(190,220,255,${0.5 + 0.5 * z})`
        : hx(ac, 0.4 + 0.45 * z);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#dceeff";
    ctx.shadowColor = ac;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    op.filter((e) => e.pos.z >= 0)
      .sort((a, b) => a.pos.z - b.pos.z)
      .forEach((e) => drawChip(e.o, e.pos));

    t2 += 0.016 * Math.max(speed, 0.3);
    if (!reduce) {
      ang += 0.0032 * speed;
      requestAnimationFrame(draw);
    }
  };

  draw();
}

function initRevealAnimation() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ==================== INIT ALL ====================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Initializing Portfolio...");

  handleHeaderScroll();
  initNavigation();
  initScrollSpy();
  renderTechCards();
  renderProjects();
  initProjectNav();
  renderTestimonials();
  initTestimonialNav();
  initSphere();
  initRevealAnimation();

  const root = document.documentElement;
  root.style.setProperty("--ac", state.accent);

  console.log("✅ Portfolio Ready!");
});
