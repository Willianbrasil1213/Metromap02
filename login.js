document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Recupera os usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário e a senha estão corretos
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Salva o nome do usuário na chave 'loggedIn'
        localStorage.setItem('loggedIn', user.username); // Armazena o nome do usuário logado
        localStorage.setItem('currentUser', username); // Armazena o usuário atual
        
        // Redireciona para a página principal
        window.location.href = 'index.html'; 
    } else {
        document.getElementById('login-status').innerText = 'Usuário ou senha incorretos!';
    }
});

// Função para verificar se o usuário está logado ao carregar a página
window.onload = () => {
    const loggedInUser = localStorage.getItem('loggedIn');
    if (loggedInUser) {
        window.location.href = 'index.html'; // Redireciona se já estiver logado
    }
};
