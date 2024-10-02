window.onload = () => {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === currentUser);

    if (user) {
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('user-username').textContent = user.username;
        document.getElementById('user-password').textContent = user.password;
    }

    // Carrega a foto do usuário, se houver
    const storedPhoto = localStorage.getItem('userPhoto');
    if (storedPhoto) {
        document.getElementById('user-photo').src = storedPhoto;
    }

    // Função para trocar a foto do perfil
    document.getElementById('photo-upload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoURL = e.target.result;
                document.getElementById('user-photo').src = photoURL;
                localStorage.setItem('userPhoto', photoURL); // Salva a foto no localStorage
            };
            reader.readAsDataURL(file);
        }
    });

    // Carregar os ônibus e rotas favoritados
    carregarOnibusFavoritados(currentUser); // Atualizada para carregar ônibus favoritados
    carregarRotasFavoritadas(currentUser); // Adiciona o carregamento das rotas favoritadas
};

// Função para carregar ônibus favoritados
function carregarOnibusFavoritados(usuario) {
    const linhasFavoritas = JSON.parse(localStorage.getItem('linhasFavoritas')) || {};
    const usuarioLinhas = linhasFavoritas[usuario] || [];

    const listaOnibus = document.getElementById('onibus-favoritados');
    listaOnibus.innerHTML = ''; // Limpa a lista antes de adicionar

    if (usuarioLinhas.length > 0) {
        usuarioLinhas.forEach(onibus => {
            const li = document.createElement('li');
            li.textContent = `Ônibus ${onibus}`; // Exibe o número do ônibus favoritado
            
            // Botão para remover a linha de ônibus
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-button'); // Adiciona a classe de estilo
            removeButton.onclick = () => removerLinhaFavoritada(usuario, onibus);
            
            li.appendChild(removeButton);
            listaOnibus.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Nenhum ônibus favoritado.';
        listaOnibus.appendChild(li);
    }
}

// Função para carregar rotas favoritas
function carregarRotasFavoritadas(usuario) {
    const rotasSalvas = JSON.parse(localStorage.getItem('rotasSalvas')) || {};
    const usuarioRotas = rotasSalvas[usuario] || [];

    const listaRotas = document.getElementById('rotas-favoritadas');
    listaRotas.innerHTML = ''; // Limpa a lista antes de adicionar

    if (usuarioRotas.length > 0) {
        usuarioRotas.forEach(rota => {
            const li = document.createElement('li');
            li.textContent = `${rota[0]} -> ${rota[1]}`; // Formata a rota
            
            // Botão para remover a rota
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-button'); // Adiciona a classe de estilo
            removeButton.onclick = () => removerRotaFavoritada(usuario, rota);
            
            li.appendChild(removeButton);
            listaRotas.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Nenhuma rota favoritada.';
        listaRotas.appendChild(li);
    }
}

// Função para remover uma linha de ônibus favorita
function removerLinhaFavoritada(usuario, linha) {
    const linhasFavoritas = JSON.parse(localStorage.getItem('linhasFavoritas')) || {};
    if (linhasFavoritas[usuario]) {
        linhasFavoritas[usuario] = linhasFavoritas[usuario].filter(l => l !== linha);
        
        // Atualiza o localStorage
        localStorage.setItem('linhasFavoritas', JSON.stringify(linhasFavoritas));
        
        // Recarrega a lista de ônibus
        carregarOnibusFavoritados(usuario);
    }
}

// Função para remover uma rota favorita
function removerRotaFavoritada(usuario, rota) {
    const rotasSalvas = JSON.parse(localStorage.getItem('rotasSalvas')) || {};
    if (rotasSalvas[usuario]) {
        rotasSalvas[usuario] = rotasSalvas[usuario].filter(r => r[0] !== rota[0] || r[1] !== rota[1]);
        
        // Atualiza o localStorage
        localStorage.setItem('rotasSalvas', JSON.stringify(rotasSalvas));
        
        // Recarrega a lista de rotas
        carregarRotasFavoritadas(usuario);
    }
}
