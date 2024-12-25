document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const listaTecnologias = document.getElementById('lista-tecnologias');
    const tecnologias = [];

    // Adicionar tecnologia à lista
    document.getElementById('add-tecnologia').addEventListener('click', function() {
        const nome = document.getElementById('nome-tecnologia').value;
        if (nome) {
            tecnologias.push(nome);
            const li = document.createElement('li');
            li.textContent = nome;
            listaTecnologias.appendChild(li);
            document.getElementById('nome-tecnologia').value = '';
        }
    });

    // Enviar formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const projeto = {
            titulo: formData.get('titulo'),
            descricao: formData.get('descricao'),
            status: formData.get('status'),
            urlDeploy: formData.get('url-deploy'),
            urlGithub: formData.get('url-github'),
            tecnologias: tecnologias
        };

        try {
            const response = await fetch('/.netlify/functions/update-projects', {
                method: 'POST',
                body: JSON.stringify({ projeto })
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar projeto');
            }

            alert('Projeto cadastrado com sucesso!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar projeto');
        }
    });
});