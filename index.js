document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  // Función para verificar si una sección está en el viewport
  function isSectionInViewport(section) {
    const rect = section.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const sectionTopIsInView = rect.top >= 0;
    const sectionBottomIsInView = rect.bottom <= viewportHeight;
    const sectionHeight = rect.bottom - rect.top;
    const sectionIsCentrallyInView =
      viewportHeight / 2 >= rect.top && viewportHeight / 2 <= rect.bottom;

    return (
      (sectionTopIsInView && sectionBottomIsInView) || sectionIsCentrallyInView
    );
  }

  // Función para agregar la clase 'active' al enlace correspondiente cuando una sección está en el viewport
  function toggleActiveClass() {
    sections.forEach((section) => {
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(
        `nav a[href="#${sectionId}"]`
      );

      if (isSectionInViewport(section)) {
        correspondingLink.classList.add("active");
      } else {
        correspondingLink.classList.remove("active");
      }
    });
  }

  // Evento de desplazamiento para actualizar el estado de los enlaces al desplazarse por la página
  window.addEventListener("scroll", toggleActiveClass);
  window.addEventListener("resize", toggleActiveClass);

  // Llamar a la función inicialmente para aplicar los estilos correctos al cargar la página
  toggleActiveClass();
});
