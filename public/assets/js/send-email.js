document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    try {
        // Desabilita o botão de submit para evitar múltiplos envios
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }

        // Prepara os dados do formulário
        const formData = new FormData(event.target);
        const jsonData = Object.fromEntries(formData.entries());

        // Configuração da requisição
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(jsonData)
        };

        // Faz a requisição
        const response = await fetch(
            "https://formsubmit.co/ajax/uandersonferreiradeoliveira@gmail.com", 
            config
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Mensagem enviada com sucesso:", data);


        // Redireciona para a página de sucesso
        window.location.href = "https://uandersonferreira.netlify.app/sucesso.html";


    } catch (error) {
        console.error("Erro no envio:", error);
        
        // Reativa o botão de submit em caso de erro
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
        }

        // Feedback visual do erro
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.';
        errorMessage.style.color = 'red';
        event.target.appendChild(errorMessage);
    }
});