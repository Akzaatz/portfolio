document.addEventListener("DOMContentLoaded", () => {
  // Fonction pour créer et animer une bulle
  function createBubble() {
    const bubbleZone = document.querySelector(".bubble-zone");
    if (!bubbleZone) return; // Vérifier si .bubble-zone existe

    const bubble = document.createElement("span");
    bubble.classList.add("bubble");
    bubbleZone.appendChild(bubble); // Ajouter à .bubble-zone

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

    const iconSize = parseFloat(size) * 0.6 + "px"; // 60% de la taille de la bulle
    icon.style.fontSize = iconSize;
    bubble.appendChild(icon);

    const bubbleZoneRect = bubbleZone.getBoundingClientRect();
    const bubbleLeft =
      Math.random() * (bubbleZoneRect.width - parseFloat(size));
    const bubbleTop =
      Math.random() * (bubbleZoneRect.height - parseFloat(size));

    bubble.style.left = bubbleLeft + "px";
    bubble.style.top = bubbleTop + "px";

    // Vérification de la position de la bulle par rapport à bubbleZone
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

    let velocityX = (Math.random() - 0.5) * 2;
    let velocityY = (Math.random() - 0.5) * 2;

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

    // Ajouter l'écouteur d'événements à la bulle créée
    bubble.addEventListener("click", () => {
      const staticZone = document.querySelector(".static-zone");
      if (staticZone) {
        const banner = document.createElement("span");
        banner.classList.add("banner");

        const slogans = [
          "SERIAL CODEUR",
          "GREEN CODEUR",
          "FRIENDLY CODEUR",
          "SERIOUS CODEUR",
        ];
        const randomSlogan =
          slogans[Math.floor(Math.random() * slogans.length)];
        banner.textContent = randomSlogan; // Ajouter du texte aléatoire à banner

        // Définir la couleur de fond en fonction du slogan
        switch (randomSlogan) {
          case "SERIAL CODEUR":
            banner.style.backgroundColor = "red";
            break;
          case "GREEN CODEUR":
            banner.style.backgroundColor = "green";
            break;
          case "FRIENDLY CODEUR":
            banner.style.backgroundColor = "blue";
            break;
          case "SERIOUS CODEUR":
            banner.style.backgroundColor = "beige";
            break;
        }

        staticZone.appendChild(banner); // Ajouter à .static-zone
        staticZone.style.opacity = 1; // Réinitialiser l'opacité après l'ajout de la bannière

        // Supprimer la bannière après un délai (par exemple, 2 secondes)
        setTimeout(() => {
          banner.remove();
          staticZone.style.opacity = 1; // Rétablir l'opacité de staticZone
        }, 2000); // Durée de l'animation en millisecondes
      }
    });
  }

  // Appeler la fonction createBubble pour créer une bulle lorsque nécessaire
  const staticIcones = document.querySelectorAll(".static-icones");
  staticIcones.forEach((icon) => {
    icon.addEventListener("click", () => {
      for (let i = 0; i < 10; i++) {
        createBubble();
      }
      const staticZone = document.querySelector(".static-zone");
      if (staticZone) {
        staticZone.style.opacity = 0.5;

        // Rétablir l'opacité de staticZone après 2 secondes
        setTimeout(() => {
          staticZone.style.opacity = 1;
        }, 2000); // Durée de l'animation en millisecondes
      }
    });
  });
});
