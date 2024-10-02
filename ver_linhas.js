// Dados das estações com coordenadas e ônibus que passam por elas
const estacoes = {
    Alfa: { x: 100, y: 100, onibus: ["101", "606"] },
    Beta: { x: 200, y: 150, onibus: ["101", "909"] },
    Gama: { x: 300, y: 200, onibus: ["101", "202", "909"] },
    Delta: { x: 400, y: 100, onibus: ["202", "909"] },
    Epsilon: { x: 500, y: 300, onibus: ["202", "303"] },
    Zeta: { x: 600, y: 400, onibus: ["202", "303"] },
    Eta: { x: 100, y: 400, onibus: ["606", "1010"] },
    Teta: { x: 200, y: 350, onibus: ["505", "606", "1010"] },
    Iota: { x: 350, y: 500, onibus: ["505", "1010"] },
    Kappa: { x: 450, y: 450, onibus: ["303", "1010"] },
    Lambda: { x: 650, y: 200, onibus: ["303", "404"] },
    Mu: { x: 700, y: 500, onibus: ["303", "404", "505"] }
};

// Conexões entre as estações
const conexoes = [
    ['Alfa', 'Beta'],
    ['Beta', 'Gama'],
    ['Gama', 'Delta'],
    ['Delta', 'Epsilon'],
    ['Epsilon', 'Zeta'],
    ['Zeta', 'Lambda'],
    ['Lambda', 'Mu'],
    ['Mu', 'Iota'],
    ['Iota', 'Teta'],
    ['Teta', 'Eta'],
    ['Eta', 'Alfa'],
    ['Alfa', 'Gama'],
    ['Epsilon', 'Kappa'],
    ['Kappa', 'Mu']
];

// Informações sobre os ônibus, estações e horários
const informacoes = {
    "101": {
        estacoes: ["Alfa", "Beta", "Gama"],
        horarios: ["08:00", "09:00", "10:00"],
        rota: "Alfa -> Beta -> Gama"
    },
    "202": {
        estacoes: ["Delta", "Epsilon", "Zeta"],
        horarios: ["08:15", "09:15", "10:15"],
        rota: "Delta -> Epsilon -> Zeta"
    },
    "303": {
        estacoes: ["Eta", "Teta", "Iota"],
        horarios: ["08:30", "09:30", "10:30"],
        rota: "Eta -> Teta -> Iota"
    },
    "404": {
        estacoes: ["Gama", "Kappa", "Lambda"],
        horarios: ["09:00", "10:00", "11:00"],
        rota: "Gama -> Kappa -> Lambda"
    },
    "505": {
        estacoes: ["Teta", "Iota", "Mu"],
        horarios: ["09:15", "10:15", "11:15"],
        rota: "Teta -> Iota -> Mu"
    },
    "606": {
        estacoes: ["Alfa", "Eta", "Mu"],
        horarios: ["08:45", "09:45", "10:45"],
        rota: "Alfa -> Eta -> Mu"
    },
    "909": {
        estacoes: ["Beta", "Gama", "Delta"],
        horarios: ["09:30", "10:30", "11:30"],
        rota: "Beta -> Gama -> Delta"
    },
    "1010": {
        estacoes: ["Kappa", "Lambda", "Mu"],
        horarios: ["09:45", "10:45", "11:45"],
        rota: "Kappa -> Lambda -> Mu"
    }
};

// Canvas e contexto para desenhar o mapa
const canvas = document.getElementById('mapa-estacoes');
const ctx = canvas.getContext('2d');

// Função para desenhar todas as estações no início
function desenharEstacoes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    conexoes.forEach(([est1, est2]) => {
        const { x: x1, y: y1 } = estacoes[est1];
        const { x: x2, y: y2 } = estacoes[est2];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#FF9800";
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Desenha as estações como círculos
    for (const estacao in estacoes) {
        const { x, y } = estacoes[estacao];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF5722";
        ctx.fill();
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        ctx.fillStyle = "#FFF";
        ctx.fillText(estacao, x - 20, y - 15);
    }
}

// Função para exibir a rota do ônibus selecionado
document.getElementById('ver-rota').addEventListener('click', () => {
    const onibusSelecionado = document.getElementById('onibus').value;
    desenharRotaOnibus(onibusSelecionado);
});

// Função para desenhar a rota do ônibus no canvas
function desenharRotaOnibus(onibus) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    ctx.font = '15px Arial';

    const caminho = encontrarRotaPorOnibus(onibus);

    if (caminho) {
        // Desenha as linhas da rota
        for (let i = 0; i < caminho.length - 1; i++) {
            const est1 = caminho[i];
            const est2 = caminho[i + 1];
            const { x: x1, y: y1 } = estacoes[est1];
            const { x: x2, y: y2 } = estacoes[est2];
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "#FF9800";
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        // Desenha as estações como círculos
        caminho.forEach(estacao => {
            const { x, y } = estacoes[estacao];
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "#FF5722";
            ctx.fill();
            ctx.strokeStyle = "#FFF";
            ctx.stroke();
            ctx.fillStyle = "#FFF";
            ctx.fillText(estacao, x - 20, y - 15);
        });

        // Exibe informações do ônibus na tela
        const info = informacoes[onibus];
        exibirInformacoes(info, onibus);
    } else {
        document.getElementById('resultado').innerText = 'Não há rota disponível para este ônibus.';
    }
}
// Carregar ônibus no select
const onibusSelect = document.getElementById('onibus');

for (const numero in informacoes) {
    const option = document.createElement('option');
    option.value = numero;
    option.textContent = numero; // Exibe o número do ônibus
    onibusSelect.appendChild(option);
}

// Exibir rota ao clicar no botão
document.getElementById('ver-rota').addEventListener('click', () => {
    const numeroSelecionado = onibusSelect.value;
    const infoSelecionada = informacoes[numeroSelecionado];

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>Rota do Ônibus ${numeroSelecionado}</h2>
        <p><strong>Estações:</strong> ${infoSelecionada.estacoes.join(', ')}</p>
        <p><strong>Horários:</strong> ${infoSelecionada.horarios.join(', ')}</p>
        <p><strong>Rota:</strong> ${infoSelecionada.rota}</p>
    `;
});
// Função para encontrar a rota de um ônibus específico
function encontrarRotaPorOnibus(onibus) {
    return informacoes[onibus] ? informacoes[onibus].estacoes : null;
}

// Função para exibir informações do ônibus na tela
function exibirInformacoes(info, onibus) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>Informações do Ônibus ${onibus}</h2>
        <p>Estações: ${info.estacoes.join(', ')}</p>
        <p>Horários: ${info.horarios.join(', ')}</p>
        <p>Rota: ${info.rota}</p>
    `;
}

// Função para salvar a linha do ônibus favorito
function salvarLinhaFavorita() {
    const onibusSelecionado = document.getElementById('onibus').value;
    
    if (!onibusSelecionado) {
        alert("Por favor, selecione uma linha de ônibus.");
        return;
    }

    const currentUser = localStorage.getItem('currentUser'); // Supondo que você já tenha a lógica de usuário logado
    const linhasFavoritas = JSON.parse(localStorage.getItem('linhasFavoritas')) || {};

    if (!linhasFavoritas[currentUser]) {
        linhasFavoritas[currentUser] = [];
    }

    // Verifica se a linha já foi favoritada
    if (!linhasFavoritas[currentUser].includes(onibusSelecionado)) {
        linhasFavoritas[currentUser].push(onibusSelecionado);
        localStorage.setItem('linhasFavoritas', JSON.stringify(linhasFavoritas));
        alert(`Ônibus ${onibusSelecionado} salvo como favorito.`);
        document.getElementById('estrela').textContent = '★'; // Muda o ícone para favorito
    } else {
        alert("Esta linha de ônibus já está nos favoritos.");
    }
}

// Adiciona o evento de clique para o botão de favoritar
document.getElementById('favoritar').addEventListener('click', salvarLinhaFavorita);

// Função para carregar as linhas favoritas ao carregar a página
function carregarLinhasFavoritas() {
    const currentUser = localStorage.getItem('currentUser');
    const linhasFavoritas = JSON.parse(localStorage.getItem('linhasFavoritas')) || {};

    if (linhasFavoritas[currentUser]) {
        linhasFavoritas[currentUser].forEach((linha) => {
            // Caso deseje destacar as linhas favoritas na lista
            const options = document.querySelectorAll('#onibus option');
            options.forEach(option => {
                if (option.value === linha) {
                    option.textContent += ' ★'; // Adiciona um ícone de favorito na lista
                }
            });
        });
    }
}

// Chama essa função ao iniciar a aplicação
carregarLinhasFavoritas();


// Função para carregar ônibus cadastrados do localStorage e adicionar a exibição
function carregarOnibus() {
    const buses = JSON.parse(localStorage.getItem('buses')) || {};
    Object.entries(buses).forEach(([nome, info]) => {
        informacoes[nome] = info; // Adiciona ônibus ao informacoes
        // Atualiza a lista suspensa com ônibus disponíveis
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        document.getElementById('onibus').appendChild(option);
    });
}

// Chamadas de função para iniciar o aplicativo
desenharEstacoes();
carregarOnibus();
