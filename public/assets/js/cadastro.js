document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const listaTecnologias = document.getElementById('lista-tecnologias');
    const tecnologias = [];

    // Função para converter arquivo em Base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Função para limpar campos
    const limparCampos = () => {
        document.getElementById('nome-tecnologia').value = '';
        document.getElementById('imagem-tecnologia').value = '';
    };

    // Função para criar e adicionar tecnologia na lista
    const adicionarTecnologiaNaLista = async (nome, iconFile) => {
        try {
            const iconBase64 = await fileToBase64(iconFile);
            const tecnologia = {
                nome: nome,
                icone: iconBase64
            };

            tecnologias.push(tecnologia);

            const li = document.createElement('li');
            li.innerHTML = `
                <div class="tecnologia-item">
                    <img src="${iconBase64}" alt="${nome}" style="width: 30px; height: 30px;">
                    <span>${nome}</span>
                    <button type="button" class="btn remove-tecnologia" data-index="${tecnologias.length - 1}">
                       Remover
                    </button>
                </div>
            `;
            listaTecnologias.appendChild(li);

            limparCampos();
        } catch (error) {
            console.error('Erro ao processar imagem da tecnologia:', error);
        }
    };

    // Preview da imagem de capa
    document.getElementById('imagem').addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64Image = await fileToBase64(file);
                const previewDiv = document.createElement('div');
                previewDiv.innerHTML = `<img src="${base64Image}" alt="Preview" style="max-width: 200px;">`;
                this.parentElement.appendChild(previewDiv);
            } catch (error) {
                console.error('Erro ao carregar preview:', error);
            }
        }
    });

    // Adicionar tecnologia ao clicar no botão
    document.getElementById('add-tecnologia').addEventListener('click', async () => {
        const nomeTecnologia = document.getElementById('nome-tecnologia').value;
        const imagemTecnologia = document.getElementById('imagem-tecnologia').files[0];

        if (!nomeTecnologia || !imagemTecnologia) {
            alert("Por favor, preencha o nome e escolha uma imagem para a tecnologia.");
            return;
        }

        await adicionarTecnologiaNaLista(nomeTecnologia, imagemTecnologia);
    });

    // Mostrar nome do arquivo selecionado
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            const label = this.previousElementSibling;
            label.textContent = this.files[0] ? this.files[0].name : 'Escolher arquivo';
        });
    });

    // Remover tecnologia da lista
    listaTecnologias.addEventListener('click', function(e) {
        if (e.target.closest('.remove-tecnologia')) {
            const index = e.target.closest('.remove-tecnologia').dataset.index;
            tecnologias.splice(index, 1);
            e.target.closest('li').remove();
        }
    });

    // Enviar formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const imagemCapa = document.getElementById('imagem').files[0];
            if (!imagemCapa) {
                alert('Por favor, selecione uma imagem de capa para o projeto');
                return;
            }

            const imagemCapaBase64 = await fileToBase64(imagemCapa);
            const formData = new FormData(form);

            const projeto = {
                titulo: formData.get('titulo'),
                descricao: formData.get('descricao'),
                status: formData.get('status'),
                imagemCapa: imagemCapaBase64,
                urlDeploy: formData.get('url-deploy'),
                urlGithub: formData.get('url-github'),
                tecnologias: tecnologias
            };

            const response = await fetch('/.netlify/functions/update-projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
