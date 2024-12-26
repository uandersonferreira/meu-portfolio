document.addEventListener('DOMContentLoaded', () => {
    const projetosContainer = document.getElementById('projetos');
    const projetoTemplate = document.getElementById('projeto_template').content;
    const verTodosProjetosBtn = document.getElementById('ver_todos_projetos');

    if (!projetosContainer || !projetoTemplate || !verTodosProjetosBtn) {
      console.error('Erro ao encontrar elementos necessários no DOM.');
      return;
    }

    fetch('https://raw.githubusercontent.com/uandersonferreira/meu-portfolio/main/projetos.json')
      .then(response => response.json())
      .then(projetos => {
        if (projetos.length === 0) {
          projetosContainer.innerHTML = '<p>Ainda não há projetos criados.</p>';
          verTodosProjetosBtn.style.display = 'none'; // Ocultar o botão de ver todos os projetos
          return;
        }

        const projetosPrincipais = projetos.slice(0, 3); // Pega os 3 primeiros projetos

        projetosPrincipais.forEach(projeto => {
          const clone = document.importNode(projetoTemplate, true);

          // Verificações de campos nulos ou vazios
          clone.querySelector('.projeto_img').src = projeto.imagemCapa || 'assets/img/default-capa-projeto.png';
          clone.querySelector('.projeto_titulo').textContent = projeto.titulo || 'Título não disponível';
          clone.querySelector('.projeto_descricao').textContent = projeto.descricao || 'Descrição não disponível';
          clone.querySelector('.projeto_btn:nth-child(3)').href = projeto.urlDeploy || '#';
          clone.querySelector('.projeto_btn:nth-child(4)').href = projeto.urlGithub || '#';
          clone.querySelector('.status span').textContent = projeto.status || 'Status não disponível';

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
        verTodosProjetosBtn.style.display = 'none'; // Ocultar o botão de ver todos os projetos em caso de erro
      });

    verTodosProjetosBtn.addEventListener('click', () => {
      window.location.href = 'todos_projetos.html';
    });
  });