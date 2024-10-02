document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se o usuário já existe no localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some(user => user.username === username);

    if (userExists) {
        document.getElementById('register-status').innerText = 'Usuário já existe!';
    } else {
        // Adiciona o novo usuário ao localStorage
        existingUsers.push({ email, username, password });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        document.getElementById('register-status').innerText = 'Conta criada com sucesso!';
        
        // Opcional: Redirecionar para a tela de login após o registro
        setTimeout(() => {
            window.location.href = 'login.html'; // Redireciona para a tela de login
        }, 2000);
    }
});
