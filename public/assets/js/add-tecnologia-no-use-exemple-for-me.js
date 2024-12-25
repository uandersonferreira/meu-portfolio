document.getElementById('add-tecnologia').addEventListener('click', () => {
    const nomeTecnologia = document.getElementById('nome-tecnologia');
    const imagemTecnologia = document.getElementById('imagem-tecnologia');
    
    if (!nomeTecnologia.value || !imagemTecnologia.files[0]) {
        alert("Por favor, preencha o nome e escolha uma imagem para a tecnologia.");
        return;
    }

    const lista = document.getElementById('lista-tecnologias');
    const listItem = document.createElement('li');
    listItem.className = 'tecnologia-item';

    const img = document.createElement('img');
    img.src = URL.createObjectURL(imagemTecnologia.files[0]);
    img.alt = `Ícone da tecnologia ${nomeTecnologia.value}`;

    const span = document.createElement('span');
    span.textContent = nomeTecnologia.value;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remover";
    removeBtn.className = 'btn btn-remove';
    removeBtn.setAttribute('aria-label', `Remover ${nomeTecnologia.value}`);
    removeBtn.addEventListener('click', () => {
        lista.removeChild(listItem);
    });

    listItem.appendChild(img);
    listItem.appendChild(span);
    listItem.appendChild(removeBtn);
    lista.appendChild(listItem);

    // Limpar os campos após adicionar
    nomeTecnologia.value = '';
    imagemTecnologia.value = '';
});

// Mostrar nome do arquivo selecionado
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function() {
        const label = this.previousElementSibling;
        label.textContent = this.files[0] ? this.files[0].name : 'Escolher arquivo';
    });
});