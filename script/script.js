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

// Smooth scrolling and infinite scroll effect
document.addEventListener("DOMContentLoaded", () => {
  const info = document.querySelector(".info");
  const items = gsap.utils.toArray(".item");

  info.appendChild(items[0].cloneNode(true));

  const locoScroll = new LocomotiveScroll({
    el: info,
    smooth: true,
    lerp: 0.07, 
    multiplier: 1,
    touchMultiplier: 2,
    tablet: { smooth: true },
    smartphone: { smooth: true },
  });

  const scrollAnim = gsap.to(items, {
    yPercent: -100 * items.length,
    ease: "none",
    duration: 80,
    repeat: -1,
    modifiers: {
      yPercent: gsap.utils.wrap(-100 * items.length, 0),
    },
  });

  // pause on hover
  info.addEventListener("mouseenter", () => scrollAnim.pause());
  info.addEventListener("mouseleave", () => scrollAnim.play());

  info.addEventListener("scroll", () => {
    if (info.scrollTop >= info.scrollHeight - info.clientHeight) {
      info.scrollTop = 1;
    } else if (info.scrollTop <= 0) {
      info.scrollTop = info.scrollHeight - info.clientHeight - 1;
    }
  });

  window.addEventListener("resize", () => {
    scrollAnim.invalidate();
    locoScroll.update();
  });
});