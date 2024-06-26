document.addEventListener("DOMContentLoaded", () => {
  function createBubble() {
    const bubbleZone = document.querySelector(".bubble-zone");
    if (!bubbleZone) return;

    const bubble = document.createElement("span");
    bubble.classList.add("bubble");
    bubbleZone.appendChild(bubble);

    const size = Math.random() * 60 + 40 + "px";
    bubble.style.width = size;
    bubble.style.height = size;

    const iconClasses = [
      "fa-brands fa-css3-alt",
      "fa-brands fa-sass",
      "fa-brands fa-js",
      "fa-brands fa-react",
    ];
    const iconClass =
      iconClasses[Math.floor(Math.random() * iconClasses.length)];
    const icon = document.createElement("i");
    icon.className = iconClass;

    const iconSize = parseFloat(size) * 0.6 + "px";
    icon.style.fontSize = iconSize;
    bubble.appendChild(icon);

    // Position initiale aléatoire à l'intérieur de bubbleZone
    const bubbleZoneRect = bubbleZone.getBoundingClientRect();
    const bubbleLeft =
      Math.random() * (bubbleZoneRect.width - parseFloat(size));
    const bubbleTop =
      Math.random() * (bubbleZoneRect.height - parseFloat(size));

    bubble.style.left = bubbleLeft + "px";
    bubble.style.top = bubbleTop + "px";

    function checkBubblePosition() {
      const bubbleRect = bubble.getBoundingClientRect();
      if (
        bubbleRect.top < bubbleZoneRect.top ||
        bubbleRect.bottom > bubbleZoneRect.bottom ||
        bubbleRect.left < bubbleZoneRect.left ||
        bubbleRect.right > bubbleZoneRect.right
      ) {
        bubble.style.display = "none";
      } else {
        bubble.style.display = "block";
      }
    }

    checkBubblePosition();
    window.addEventListener("scroll", checkBubblePosition);

    let velocityX = (Math.random() - 0.5) * 2; // Adjust the speed as needed
    let velocityY = (Math.random() - 0.5) * 2; // Adjust the speed as needed

    function moveBubble() {
      let currentTop = parseFloat(bubble.style.top);
      let currentLeft = parseFloat(bubble.style.left);

      bubble.style.top = currentTop + velocityY + "px";
      bubble.style.left = currentLeft + velocityX + "px";

      checkBubblePosition();

      if (bubble.style.display !== "none") {
        requestAnimationFrame(moveBubble);
      }
    }

    moveBubble();

    bubble.addEventListener("click", () => {
      const staticZone = document.querySelector(".static-zone");
      if (staticZone) {
        const banner = document.createElement("span");
        banner.classList.add("banner");
        banner.textContent = "SERIAL CODEUR";
        staticZone.appendChild(banner);
        staticZone.style.opacity = 1;

        setTimeout(() => {
          banner.remove();
          staticZone.style.opacity = 1;
        }, 900);
      }
    });
  }

  const staticIcones = document.querySelectorAll(".static-icones");
  staticIcones.forEach((icon) => {
    icon.addEventListener("click", () => {
      for (let i = 0; i < 10; i++) {
        createBubble();
      }
      const staticZone = document.querySelector(".static-zone");
      if (staticZone) {
        staticZone.style.opacity = 0.5;

        setTimeout(() => {
          staticZone.style.opacity = 1;
        }, 2000);
      }
    });
  });
});
