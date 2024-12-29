// Script para manipulação do menu e cabeçalho ao rolar a página
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

function toggleMenu() {
  const menuToggle = document.querySelector(".menuToggle");
  const navigation = document.querySelector(".navigation");
  menuToggle.classList.toggle("active");
  navigation.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const logos = document.querySelector(".projeto_logos");

  // Pausa a animação ao tocar
  logos.addEventListener("touchstart", function () {
    logos.classList.add("paused");
  });

  // Retoma a animação ao liberar o toque
  logos.addEventListener("touchend", function () {
    logos.classList.remove("paused");
  });
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = event.target; // Captura o formulário
    const formData = new FormData(form); // Cria um objeto FormData com os dados do formulário

    // Converte o FormData para um objeto JSON
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    // Envia os dados usando fetch com os headers corretos
    fetch("https://formsubmit.co/ajax/uandersonferreiradeoliveira@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(jsonData), // Dados em formato JSON
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Erro ao enviar mensagem. Verifique os dados e tente novamente."
          );
        }
      })
      .then((data) => {
        console.log("Mensagem enviada com sucesso:", data);
        // Redireciona para a página de sucesso
        window.location.href =
          "https://uandersonferreira.github.io/projetos-web-html-css-js/my-portifolio/sucesso.html";
      })
      .catch((error) => {
        console.error("Erro no envio:", error);
        alert(
          "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente."
        );
      });
  });

// Controle do slider de logos
document.addEventListener("DOMContentLoaded", function () {
  // Cria uma cópia do slide para a animação infinita
  var copy = document.querySelector(".logos-slide").cloneNode(true);
  document.querySelector(".logos").appendChild(copy);

  // Adiciona controles de toque
  const logosContainer = document.querySelector(".logos");

  // Toggle de pausa no toque
  let touchTimeout;

  logosContainer.addEventListener("touchstart", function (e) {
    this.classList.add("paused");
    // Previne scroll da página durante o toque
    e.preventDefault();
  });

  logosContainer.addEventListener("touchend", function () {
    // Remove a pausa após 300ms para permitir ver o título
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      this.classList.remove("paused");
    }, 300);
  });
});

document.querySelectorAll(".navigation a").forEach((link) => {
  const baseUrl = window.location.origin; // URL base (ex: https://uandersonferreira.netlify.app)
  const section = link.getAttribute("href"); // Obtém o href original (#banner, #sobre, etc.)

  // Remove barra extra no início do `href` caso exista
  const normalizedSection = section.startsWith("/")
    ? section.substring(1)
    : section;

  // Define o novo `href` sem duplicar barras
  link.setAttribute("href", `${baseUrl}/${normalizedSection}`);
});
