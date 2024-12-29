document.addEventListener('DOMContentLoaded', () => {
  const projetosContainer = document.getElementById('projetos');
  const projetoTemplate = document.getElementById('projeto_template').content;
  const verTodosProjetosBtn = document.getElementById('ver_todos_projetos');

  if (!projetosContainer || !projetoTemplate || !verTodosProjetosBtn) {
      console.error('Erro ao encontrar elementos necessários no DOM.');
      return;
  }

  // Função para truncar texto
  function truncateText(element, maxLength) {
      const text = element.textContent;
      if (text.length > maxLength) {
          const truncated = text.substring(0, maxLength) + '...';
          element.textContent = truncated;
          element.dataset.fullText = text; // Guarda o texto completo
          element.dataset.expanded = 'false';
          return true;
      }
      return false;
  }

  // Função para alternar visibilidade do texto completo
  function toggleFullText(descricaoElement, button) {
      const isExpanded = descricaoElement.dataset.expanded === 'true';
      const fullText = descricaoElement.dataset.fullText;
      const truncatedText = fullText.substring(0, 450) + '...';

      if (isExpanded) {
        descricaoElement.textContent = truncatedText;
        button.querySelector('.button-text').textContent = 'Saber mais';
    } else {
        descricaoElement.textContent = fullText;
        button.querySelector('.button-text').textContent = 'Mostrar menos';
    }

      descricaoElement.dataset.expanded = !isExpanded;
  }

  fetch('https://raw.githubusercontent.com/uandersonferreira/meu-portfolio/main/projetos.json')
      .then(response => response.json())
      .then(projetos => {
          if (projetos.length === 0) {
              projetosContainer.innerHTML = '<p>Ainda não há projetos criados.</p>';
              verTodosProjetosBtn.style.display = 'none';
              return;
          }

          const projetosPrincipais = projetos.slice(0, 3);

          projetosPrincipais.forEach(projeto => {
              const clone = document.importNode(projetoTemplate, true);

              // Atualizar imagem e textos básicos
              clone.querySelector('.projeto_img').src = projeto.imagemCapa || 'assets/img/default-capa-projeto.png';
              clone.querySelector('.projeto_titulo').textContent = projeto.titulo || 'Título não disponível';
              
              const descricaoElement = clone.querySelector('.projeto_descricao');
              descricaoElement.textContent = projeto.descricao || 'Descrição não disponível';

              // Truncar texto se necessário e configurar botão Learn More
              const learnMoreBtn = clone.querySelector('.learn-more');
              if (truncateText(descricaoElement, 450)) {
                  learnMoreBtn.addEventListener('click', () => {
                      toggleFullText(descricaoElement, learnMoreBtn);
                  });
              } else {
                  // Se o texto for curto, esconde o botão Learn More
                  learnMoreBtn.style.display = 'none';
              }

              // Atualizar links
              const actionButtons = clone.querySelector('.projeto_actions');
              actionButtons.querySelector('.projeto_btn:nth-child(1)').href = projeto.urlDeploy || '#';
              actionButtons.querySelector('.projeto_btn:nth-child(2)').href = projeto.urlGithub || '#';
              actionButtons.querySelector('.status span').textContent = projeto.status || 'Status não disponível';

              // Adicionar tecnologias
              const logosContainer = clone.querySelector('.projeto_logos');
              if (projeto.tecnologias && projeto.tecnologias.length > 0) {
                  projeto.tecnologias.forEach(tecnologia => {
                      const img = document.createElement('img');
                      img.src = tecnologia.icone || 'assets/img/default-icon.png';
                      img.alt = tecnologia.nome || 'Tecnologia desconhecida';
                      img.title = tecnologia.nome || 'Tecnologia desconhecida';
                      logosContainer.appendChild(img);
                  });
              } else {
                  logosContainer.innerHTML = '<p>Tecnologias não disponíveis</p>';
              }

              projetosContainer.appendChild(clone);
          });
      })
      .catch(error => {
          console.error('Erro ao carregar os projetos:', error);
          projetosContainer.innerHTML = '<p>Erro ao carregar os projetos. Tente novamente mais tarde.</p>';
          verTodosProjetosBtn.style.display = 'none';
      });

  verTodosProjetosBtn.addEventListener('click', () => {
      window.location.href = 'todos_projetos.html';
  });
});