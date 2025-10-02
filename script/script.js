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

    // Infinite vertical scroll animation for info section
    const info = document.querySelector(".info");
    const items = gsap.utils.toArray(".item");

    let scrollAnim = gsap.to(items, {
      yPercent: -100,
      ease: "none",
      duration: 10,
      repeat: -1,
      modifiers: {
        yPercent: gsap.utils.wrap(-100, 0)
      }
    });

    // Pause animation on hover
    info.addEventListener("mouseenter", () => scrollAnim.pause());
    info.addEventListener("mouseleave", () => scrollAnim.resume());