/* =========================================================
   SIGNAL WORKSHOP INTERACTIONS
   The shared logo URL keeps dynamic service content branded.
   ========================================================= */
const LOGO_URL = "images/zl-logo.png";

/* Service module data ------------------------------------- */
const services = [
  { id: "01", icon: "⌘", title: "Software repair", detail: "Focused troubleshooting for applications, operating systems, slowdowns, error states, and setup friction.", tags: ["System cleanup", "App recovery", "OS support"] },
  { id: "02", icon: "⌁", title: "Network care", detail: "Thoughtful help with Wi-Fi reliability, device connectivity, basic home-office networks, and practical safeguards.", tags: ["Wi-Fi issues", "Device setup", "Access checks"] },
  { id: "03", icon: "◫", title: "Device readiness", detail: "A clean start for laptops, workstations, accessories, updates, data organization, and daily workflows.", tags: ["New devices", "Updates", "Workspace setup"] }
];

/* Mobile navigation --------------------------------------- */
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { mobileNav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); menuButton.textContent = "☰"; }));

/* Pointer-responsive diagnostic ring ---------------------- */
const ring = document.querySelector(".hero-ring");
document.querySelector(".hero-section").addEventListener("pointermove", event => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width - .5) * 16;
  const y = ((event.clientY - bounds.top) / bounds.height - .5) * 16;
  ring.style.transform = `translate(${x}px, ${y}px)`;
});

/* Interactive service panel ------------------------------- */
const focus = document.querySelector(".service-focus");
document.querySelectorAll(".service-tab").forEach(tab => tab.addEventListener("click", () => {
  const service = services[Number(tab.dataset.service)];
  document.querySelectorAll(".service-tab").forEach(button => { button.classList.remove("selected"); button.setAttribute("aria-selected", "false"); });
  tab.classList.add("selected");
  tab.setAttribute("aria-selected", "true");
  focus.innerHTML = `
    <img class="focus-logo" src="${LOGO_URL}" alt="ZL logo" />
    <span class="focus-status">◉ CURRENT MODULE / ${service.id}</span>
    <b class="focus-icon">${service.icon}</b>
    <h3>${service.title}</h3>
    <p>${service.detail}</p>
    <div class="focus-tags">${service.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    <a href="#contact">Discuss this service ↗</a>
    <div class="focus-decoration"><i></i><i></i><i></i></div>
  `;
}));

/* Diagnostic console -------------------------------------- */
const status = { operating: document.querySelector('[data-status="operating"]'), network: document.querySelector('[data-status="network"]'), workspace: document.querySelector('[data-status="workspace"]') };
document.querySelectorAll(".console-controls button").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".console-controls button").forEach(item => item.classList.remove("active-control"));
  button.classList.add("active-control");
  const mode = button.dataset.mode;
  status.operating.textContent = mode === "scan" ? "READY" : "REVIEWING";
  status.network.textContent = mode === "network" ? "STABLE" : "MONITORED";
  status.workspace.textContent = mode === "workspace" ? "TUNED" : "ACTIVE";
}));