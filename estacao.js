const estacoes = {
    Alfa: { x: 100, y: 100, onibus: ["101", "606"] },
    Beta: { x: 200, y: 150, onibus: ["101","909"] },
    Gama: { x: 300, y: 200, onibus: ["101", "202","909"] },
    Delta: { x: 400, y: 100, onibus: ["202","909"] },
    Épsilon: { x: 500, y: 300, onibus: ["202", "303"] },
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
    ['Delta', 'Épsilon'],
    ['Épsilon', 'Zeta'],
    ['Zeta', 'Lambda'],
    ['Lambda', 'Mu'],
    ['Mu', 'Iota'],
    ['Iota', 'Teta'],
    ['Teta', 'Eta'],
    ['Eta', 'Alfa'],
    ['Alfa', 'Gama'],
    ['Épsilon', 'Kappa'],
    ['Kappa', 'Mu']
];

const canvas = document.getElementById('mapa-estacoes');
const ctx = canvas.getContext('2d');

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


canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (const estacao in estacoes) {
        const { x: ex, y: ey, onibus } = estacoes[estacao];
        const distancia = Math.sqrt((x - ex) ** 2 + (y - ey) ** 2);

        if (distancia < 15) {
            document.getElementById('nome-estacao').textContent = `Estação ${estacao}`;
            document.getElementById('onibus-estacao').textContent = `Ônibus: ${onibus.join(", ")}`;
            document.getElementById('info-estacao').classList.remove('hidden');
            break;
        }
    }
});

desenharEstacoes();
