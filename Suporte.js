document.getElementById('suporte-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpar campos após envio (opcional)
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensagem').value = '';

    // Exibir mensagem genérica de sucesso
    document.getElementById('status').textContent = 'Mensagem enviada com sucesso!';
});
