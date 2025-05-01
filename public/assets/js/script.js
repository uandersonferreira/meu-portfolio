// Script para manipulação do menu e cabeçalho ao rolar a página
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (header) {
    header.classList.toggle("sticky", window.scrollY > 0);
  }
});

function toggleMenu() {
  const menuToggle = document.querySelector(".menuToggle");
  const navigation = document.querySelector(".navigation");
  if (menuToggle && navigation) {
    menuToggle.classList.toggle("active");
    navigation.classList.toggle("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Verifica se a seção de logos existe antes de adicionar eventos
  const logos = document.querySelector(".projeto_logos");
  
  if (logos) {
    // Pausa a animação ao tocar
    logos.addEventListener("touchstart", function () {
      logos.classList.add("paused");
    });

    // Retoma a animação ao liberar o toque
    logos.addEventListener("touchend", function () {
      logos.classList.remove("paused");
    });
  }

  // Controle do slider de logos - só executa se o elemento existir
  const logosSlide = document.querySelector(".logos-slide");
  const logosContainer = document.querySelector(".logos");
  
  if (logosSlide && logosContainer) {
    // Cria uma cópia do slide para a animação infinita
    var copy = logosSlide.cloneNode(true);
    logosContainer.appendChild(copy);

    // Adiciona controles de toque
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
  }

  // Links de navegação - só executa se existirem links
  const navLinks = document.querySelectorAll(".navigation a");
  if (navLinks.length > 0) {
    const baseUrl = window.location.origin;
    
    navLinks.forEach((link) => {
      const section = link.getAttribute("href");
      // Remove barra extra no início do `href` caso exista
      const normalizedSection = section.startsWith("/")
        ? section.substring(1)
        : section;
      // Define o novo `href` sem duplicar barras
      link.setAttribute("href", `${baseUrl}/${normalizedSection}`);
    });
  }
});