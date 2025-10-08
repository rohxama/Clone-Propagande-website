 // Animate title on page load
    window.addEventListener("load", () => {
      gsap.to(".w-name h1 span", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1
      });
    });

    // Vertical scrolling
const info = document.querySelector(".info");
    const inner = info.querySelector(".inner");
    inner.innerHTML += inner.innerHTML;

    const getDistance = () => inner.scrollHeight / 2;

    const scrollAnim = gsap.to(inner, {
      y: () => -getDistance(),
      duration: 120, 
      repeat: -1,
    });

    // pause on hover
    info.addEventListener("mouseenter", () => scrollAnim.pause());
    info.addEventListener("mouseleave", () => scrollAnim.play());

    // responsive recalculation
    window.addEventListener("resize", () => {
      scrollAnim.invalidate(); 
    });