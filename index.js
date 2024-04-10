document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

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

  window.addEventListener("scroll", toggleActiveClass);
  window.addEventListener("resize", toggleActiveClass);

  toggleActiveClass();

  // Agregar un controlador de eventos para el envío del formulario
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    // Obtener los valores de los campos del formulario
    const name = document.querySelector(".name").value;
    const phone = document.querySelector(".phone").value;
    const email = document.querySelector(".email").value;
    const subject = document.querySelector(".subject").value;
    const message = document.querySelector(".message").value;

    // Realizar la solicitud AJAX para enviar los datos
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "tu_url_de_envio_aqui"); // Reemplaza 'tu_url_de_envio_aqui' con la URL de tu servidor para enviar mensajes
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        alert("Mensaje enviado con éxito");
        // Puedes agregar aquí cualquier otra acción que desees realizar después de enviar el mensaje
      } else {
        alert(
          "Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };
    xhr.send(
      JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        message: message,
      })
    );
  });
});
