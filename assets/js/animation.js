document.addEventListener("DOMContentLoaded", function () {
    // Appliquer l'animation de fondu en entrée
    document.body.classList.add('fade-in');

    // Lorsqu'on clique sur un lien, appliquer l'animation de fondu en sortie
    const links = document.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");

        // Animation de fondu en sortie
        document.body.classList.add("fade-out");

        // Attendre la fin de l'animation avant de rediriger
        setTimeout(() => {
          window.location.href = href;
        }, 1000); // Correspond à la durée de l'animation fadeOut
      });
    });
});