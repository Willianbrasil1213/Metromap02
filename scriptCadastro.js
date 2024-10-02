// Dados dos ônibus já cadastrados diretamente no código
const informacoes = [
    {
        linha: "101",
        estacoes: ["Alfa", "Beta", "Gama"],
        horarios: ["08:00", "09:00", "10:00"],
        rota: "Alfa -> Beta -> Gama"
    },
    {
        linha: "202",
        estacoes: ["Delta", "Epsilon", "Zeta"],
        horarios: ["08:15", "09:15", "10:15"],
        rota: "Delta -> Epsilon -> Zeta"
    },
    {
        linha: "303",
        estacoes: ["Eta", "Teta", "Iota"],
        horarios: ["08:30", "09:30", "10:30"],
        rota: "Eta -> Teta -> Iota"
    },
    {
        linha: "404",
        estacoes: ["Gama", "Kappa", "Lambda"],
        horarios: ["09:00", "10:00", "11:00"],
        rota: "Gama -> Kappa -> Lambda"
    },
    {
        linha: "505",
        estacoes: ["Alfa", "Eta", "Mu"],
        horarios: ["08:45", "09:45", "10:45"],
        rota: "Alfa -> Eta -> Mu"
    },
    {
        linha: "909",
        estacoes: ["Beta", "Gama", "Delta"],
        horarios: ["09:30", "10:30", "11:30"],
        rota: "Beta -> Gama -> Delta"
    },
    {
        linha: "1010",
        estacoes: ["Kappa", "Lambda", "Mu"],
        horarios: ["09:45", "10:45", "11:45"],
        rota: "Kappa -> Lambda -> Mu"
    },
    // Adicione os demais ônibus seguindo a mesma estrutura
];

// Função para obter dados do localStorage
function getStoredBuses() {
    const storedBuses = localStorage.getItem('buses');
    // Verifica se o valor é válido e retorna um array, caso contrário, retorna um array vazio
    return storedBuses ? JSON.parse(storedBuses) : [];
}

// Função para salvar ônibus no localStorage
function saveBuses(buses) {
    localStorage.setItem('buses', JSON.stringify(buses));
}

// Função para exibir todos os ônibus cadastrados
function displayBuses() {
    const busList = document.getElementById('listaOnibus');
    busList.innerHTML = ''; // Limpa a lista

    // Carrega ônibus salvos
    const storedBuses = getStoredBuses();
    
    // Verifica se storedBuses é um array
    if (!Array.isArray(storedBuses)) {
        console.error("storedBuses não é um array:", storedBuses);
        return; // Sai da função se não for um array
    }
    
    const allBuses = [...informacoes, ...storedBuses]; // Combina os ônibus do código com os do localStorage

    allBuses.forEach(bus => {
        const li = document.createElement('li');
        li.textContent = `Linha: ${bus.linha}, Estações: ${bus.estacoes.join(", ")}, Horários: ${bus.horarios.join(", ")}, Rota: ${bus.rota}`;
        busList.appendChild(li);
    });
}

// Funções auxiliares para adicionar estações e horários
let selectedEstacoes = [];
let horarios = [];

// Função para adicionar estações à lista
document.getElementById('addEstacao').addEventListener('click', function() {
    const estacaoSelect = document.getElementById('estacoesSelect');
    const estacaoSelecionada = estacaoSelect.value;

    if (estacaoSelecionada && !selectedEstacoes.includes(estacaoSelecionada)) {
        selectedEstacoes.push(estacaoSelecionada);
        const estacaoList = document.getElementById('estacoesList');
        const li = document.createElement('li');
        li.textContent = estacaoSelecionada;
        estacaoList.appendChild(li);
    }
});

// Função para adicionar horários à lista
document.getElementById('addHorario').addEventListener('click', function() {
    const horarioInput = document.getElementById('horarioInput').value;

    if (horarioInput && !horarios.includes(horarioInput)) {
        horarios.push(horarioInput);
        const horarioList = document.getElementById('horariosList');
        const li = document.createElement('li');
        li.textContent = horarioInput;
        horarioList.appendChild(li);
    }
});

// Função para lidar com o envio do formulário
document.getElementById('onibusForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const empresa = document.getElementById('empresa').value;
    const linha = document.getElementById('linha').value;

    const newBus = {
        linha: linha,
        estacoes: selectedEstacoes,
        horarios: horarios,
        rota: selectedEstacoes.join(" -> ")
    };

    // Carregar ônibus do localStorage
    const storedBuses = getStoredBuses();

    // Verifica se storedBuses é um array
    if (!Array.isArray(storedBuses)) {
        console.error("storedBuses não é um array:", storedBuses);
        return; // Sai da função se não for um array
    }

    // Adicionar novo ônibus
    storedBuses.push(newBus);

    // Salvar novamente no localStorage
    saveBuses(storedBuses);

    // Atualiza a exibição dos ônibus
    displayBuses();

    // Limpar formulário e listas temporárias
    document.getElementById('onibusForm').reset();
    document.getElementById('estacoesList').innerHTML = '';
    document.getElementById('horariosList').innerHTML = '';
    selectedEstacoes = [];
    horarios = [];
});

// Exibir todos os ônibus na inicialização
displayBuses();
