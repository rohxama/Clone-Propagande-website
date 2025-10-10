// Animate title on page load
window.addEventListener("load", () => {
  gsap.to(".w-name h1 span", {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const info = document.querySelector(".info");
  if (!info) return;
  const items = gsap.utils.toArray(".info .item");
  if (items.length === 0) return;
  const inner = document.createElement("div");
  inner.className = "loop-inner";
  inner.style.willChange = "transform";
  while (info.firstChild) inner.appendChild(info.firstChild);
  info.appendChild(inner);
  items.forEach((it) => inner.appendChild(it.cloneNode(true)));
  let originalHeight = 0;
  items.forEach((it) => {
    const r = it.getBoundingClientRect();
    originalHeight += r.height;
  });
  if (!originalHeight) originalHeight = inner.scrollHeight / 2;
  let target = 0;
  let current = 0;
  let autoSpeed = 1;
  let pointerActive = false;
  let lastPointerY = 0;
  let manualVelocity = 0;
  const lerp = 0.07; 
  const friction = 0.02; 
  let paused = false;
  info.style.overflow = "hidden";
  info.style.position = info.style.position || "relative";
  inner.style.position = "absolute";
  inner.style.top = "0";
  inner.style.left = "0";
  inner.style.width = "100%";
  const wrap = gsap.utils.wrap(-originalHeight, 0);
  gsap.ticker.add(() => {
    const dt = gsap.ticker.deltaRatio();
    if (!paused) {
      target += autoSpeed * dt;
    }
    target += manualVelocity * dt;
    current += (target - current) * lerp;
    const y = wrap(-current);
    inner.style.transform = `translateY(${y}px)`;
    manualVelocity *= friction;
    if (Math.abs(target) > 1e6) {
      target = wrap(target);
      current = wrap(current);
    }
  });
  info.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      manualVelocity += e.deltaY * 0.4; // Reduced wheel sensitivity
      manualVelocity = Math.max(Math.min(manualVelocity, 1000), -1000); // Reduced max velocity
    },
    { passive: false }
  );
  info.addEventListener("pointerdown", (e) => {
    pointerActive = true;
    lastPointerY = e.clientY;
    info.setPointerCapture?.(e.pointerId);
  });
  info.addEventListener("pointermove", (e) => {
    if (!pointerActive) return;
    const delta = e.clientY - lastPointerY;
    lastPointerY = e.clientY;
    manualVelocity += -delta * 4; // Reduced pointer sensitivity
    manualVelocity = Math.max(Math.min(manualVelocity, 1000), -1000); // Reduced max velocity
  });
  info.addEventListener("pointerup", (e) => {
    pointerActive = false;
    try {
      info.releasePointerCapture?.(e.pointerId);
    } catch (err) {}
  });
  info.addEventListener("pointercancel", () => (pointerActive = false));
  info.addEventListener("mouseenter", () => (paused = true));
  info.addEventListener("mouseleave", () => (paused = false));
  info.addEventListener("touchstart", () => (paused = true), { passive: true });
  info.addEventListener("touchend", () => (paused = false), { passive: true });
  const recalc = () => {
    const firstItems = gsap.utils.toArray(".info .item").slice(0, items.length);
    originalHeight = 0;
    firstItems.forEach((it) => {
      const r = it.getBoundingClientRect();
      originalHeight += r.height;
    });
    if (!originalHeight) originalHeight = inner.scrollHeight / 2;
  };
  window.addEventListener("resize", recalc);
  setTimeout(recalc, 500);
});
