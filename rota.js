const mapa = {
    Alfa: ['Beta', 'Eta'],
    Beta: ['Alfa', 'Gama'],
    Gama: ['Beta', 'Delta'],
    Delta: ['Gama', 'Epsilon'],
    Epsilon: ['Delta','Zeta','Kappa'],
    Zeta: ['Epsilon', 'Lambda'],
    Lambda: ['Zeta','Mu'],
    Mu: ['Lambda','Kappa','Iota'],
    Kappa: ['Epsilon','Mu'],
    Iota: ['Mu','Teta'],
    Teta: ['Iota','Eta'],
    Eta: ['Teta','Alfa']
};

const caminhoMaisCurto = (comeco, destino) => {
    const visited = new Set();
    const fila = [[comeco, [comeco]]]; 

    while (fila.length > 0) {
        const [node, caminho] = fila.shift();

        if (node === destino) return caminho; 

        visited.add(node);

        for (let vizinho of mapa[node]) {
            if (!visited.has(vizinho)) {
                fila.push([vizinho, [...caminho, vizinho]]); 
            }
        }
    }

    return null; 
};

let rotaSalva = null; // Variável para armazenar a rota salva

function criarRota() {
    const partida = document.getElementById("ponto-partida").value;
    const chegada = document.getElementById("ponto-chegada").value;
    const resultadoDiv = document.getElementById("resultado");
    const listaOnibus = document.getElementById("lista-onibus");

    listaOnibus.innerHTML = '';

    const caminho = caminhoMaisCurto(partida, chegada);

    if (caminho && caminho.length > 1) {
        const listItem = document.createElement('li');
        listItem.textContent = `${caminho.join(' -> ')}`;
        listaOnibus.appendChild(listItem);

        onibusDaRota(caminho, listaOnibus);
        
        desenharRota(caminho);
        
        resultadoDiv.classList.remove('hidden');

        // Armazena a rota salva
        rotaSalva = caminho;
    } else {
        listaOnibus.innerHTML = '<li>Mesmo ponto de parada e saida, escolha uma rota valida.</li>';
        resultadoDiv.classList.remove('hidden');
    }
}

function salvarRota() {
    const pontoPartida = document.getElementById('ponto-partida').value;
    const pontoChegada = document.getElementById('ponto-chegada').value;
    if (!pontoPartida || !pontoChegada) {
        alert("Por favor, selecione tanto o ponto de partida quanto o ponto de chegada.");
        return;
    }
    const currentUser = localStorage.getItem('currentUser');
    const rotasSalvas = JSON.parse(localStorage.getItem('rotasSalvas')) || {};

    if (!rotasSalvas[currentUser]) {
        rotasSalvas[currentUser] = [];
    }

    rotasSalvas[currentUser].push([pontoPartida, pontoChegada]);
    localStorage.setItem('rotasSalvas', JSON.stringify(rotasSalvas));
    alert(`Rota salva: ${pontoPartida} -> ${pontoChegada}`);
}



// Função para visualizar as rotas salvas (opcional)
function visualizarRotasSalvas() {
    const usuarioAtual = JSON.parse(localStorage.getItem('currentUser')); // Obtem o usuário logado
    const rotasSalvas = JSON.parse(localStorage.getItem('rotasSalvas')) || {};
    const rotasDoUsuario = rotasSalvas[usuarioAtual] || [];
    if (rotasDoUsuario.length === 0) {
        alert('Nenhuma rota salva.');
        return;
    }

    let rotasText = 'Rotas Salvas:\n';
    rotasDoUsuario.forEach((rota, index) => {
        rotasText += `Rota ${index + 1}: ${rota.join(' -> ')}\n`;
    });
    alert(rotasText);
}

function onibusDaRota(caminho, listaOnibus) {
    const onibusCaminho = []; 
    const output = [];
    const estacaoParada = [];
    let refill = true;
    for (let i = 0; i < caminho.length - 1; i++) {
        const estacaoAtual = caminho[i];
        const proximaEstacao = caminho[i + 1]; 
        
        // Combine ônibus da estação atual com os novos ônibus
        let onibus = new Set(estacoes[estacaoAtual].onibus);

        // Adiciona os ônibus à lista de ônibus a serem pegos
        if(refill){
            onibus.forEach(bus => {
                onibusCaminho.push(bus);
            });
            refill = false;
        };

        // Verifica os ônibus da próxima estação
        const onibusProxima = new Set(estacoes[proximaEstacao].onibus);

        // Remove ônibus que não estão na próxima estação
        onibus.forEach(bus => {
            if (!onibusProxima.has(bus) && onibusCaminho.length > 1) {
                onibusCaminho.splice(onibusCaminho.indexOf(bus),1);
            }
        });

        // Se houver apenas um ônibus restante ou estiver no final da rota
        if (onibusCaminho.length == 1 && !onibusProxima.has(onibusCaminho[0])|| i + 1 == caminho.length - 1) {
            const onibusRestante = onibusCaminho[0]; 
            
            output.push(onibusRestante);
            if (i != caminho.length - 2 ) estacaoParada.push(estacaoAtual);
            

            onibusCaminho.splice(0,onibusCaminho.length);
            refill = true;
            onibus.clear(); 
        }
    }


    // Exibe os ônibus a serem pegos
    const onibusListItem = document.createElement('li');
    const estacoesListItem = document.createElement('li');
    onibusListItem.textContent = `Ônibus a serem pegos: ${output.join(' -> ')}`;
    if(estacaoParada.length > 0){
        estacoesListItem.textContent = `Estações de trocas de ônibus: ${estacaoParada.join(' , ')}`;
    }else{
        estacoesListItem.textContent = "Estações de trocas de ônibus: Nenhuma";
    }
    
    listaOnibus.appendChild(onibusListItem);
    listaOnibus.appendChild(estacoesListItem);
}

const estacoes = {
    Alfa: { x: 100, y: 100, onibus: ["101", "606"] },
    Beta: { x: 200, y: 150, onibus: ["101","909"] },
    Gama: { x: 300, y: 200, onibus: ["101", "202","909"] },
    Delta: { x: 400, y: 100, onibus: ["202","909"] },
    Epsilon: { x: 500, y: 300, onibus: ["202", "303"] },
    Zeta: { x: 600, y: 400, onibus: ["202", "303"] },
    Eta: { x: 100, y: 400, onibus: ["606","1010"] },
    Teta: { x: 200, y: 350, onibus: ["505", "606","1010"] },
    Iota: { x: 350, y: 500, onibus: ["505","1010"] },
    Kappa: { x: 450, y: 450, onibus: ["303","1010"] },
    Lambda: { x: 650, y: 200, onibus: ["303", "404"] },
    Mu: { x: 700, y: 500, onibus: ["303", "404", "505"] }
};

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

const canvas = document.getElementById('mapa-estacoes');
const ctx = canvas.getContext('2d');

function desenharRota(caminho) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.font = '15px Arial';
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
}

function desenharEstacoes() {
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

desenharEstacoes(); 

