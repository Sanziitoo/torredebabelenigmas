const ENIGMAS = [
    {
        id: 1,
        roman: "Enigma I",
        title: "A Pedra Fundamental",
        teaser: "Nas trevas que antecedem as eras, dorme o nome do primeiro instante.",
        fullQuote: "Antes da voz existir, o vazio guardava o gérmen do universo.",
        hint: "Procure o nome dado ao grande nascimento nos cânones da criação. O primeiro tomo guarda a chave.",
        glyphSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="50" cy="50" r="40" stroke-dasharray="2 4"/>
            <path d="M50 20 L50 80 M30 60 L50 20 L70 60 Z"/>
            <circle cx="50" cy="45" r="5" fill="currentColor"/>
        </svg>`
    },
    {
        id: 2,
        roman: "Enigma II",
        title: "A Tapeçaria Invisível",
        teaser: "Nove guardiões tecem o véu. Forme o Eneagrama Sagrado e decifre a palavra cifrada nas cinzas.",
        fullQuote: "Mentes distintas unidas por algo que a distância não consome.",
        hint: "A estrela de 9 pontas exige saltos de 4 nós a cada passo. Quando a palavra distorcida se projetar, busque a chave no código do imperador romano.",
        glyphSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 80 L50 15 L80 80 M35 55 L65 55 M20 80 L80 80"/>
        </svg>`
    },
    {
        id: 3,
        roman: "Enigma III",
        title: "O Espírito Inabalável",
        teaser: "Mesmo quando a névoa oculta os degraus, o espírito recusa-se a fraquejar.",
        fullQuote: "O verdadeiro poder não reside na velocidade do golpe, mas na recusa absoluta em ceder às sombras.",
        hint: "Rompendo os três selos de vontade, uma antiga página emergirá das cinzas. As coordenadas nas sombras apontam cada caractere oculto (Parágrafo:Palavra:Letra).",
        glyphSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="50" cy="50" r="35"/>
            <path d="M25 25 L75 75 M75 25 L25 75"/>
        </svg>`
    },
    {
        id: 4,
        roman: "Enigma IV",
        title: "A Roda do Tempo",
        teaser: "A ruína do passado é o alicerce da nova era. O tempo consome a si mesmo num ciclo perpétuo.",
        fullQuote: "O que desmorona em poeira retorna à terra; tudo o que se ergue caminha para o inevitável declínio.",
        hint: "Alinhe o sol primordial, o oitavo pilar e a herança ancestral no zênite superior. Arraste ou clique em cada anel de forma individual. A mensagem que se projetar só entregará o verdadeiro verbo àquele que recuar três eras no tempo.",
        glyphSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="50" cy="50" r="38"/>
            <circle cx="50" cy="50" r="26"/>
            <circle cx="50" cy="50" r="14"/>
            <path d="M50 10 L50 90 M10 50 L90 50"/>
        </svg>`
    },
    {
        id: 5,
        roman: "Enigma V",
        title: "O Vazio Sagrado",
        teaser: "Quando a grande algazarra adormece, a verdade só pode ser ouvida no silêncio.",
        fullQuote: "A verdade mais profunda só pode ser ouvida no espaço vago.",
        hint: "Não prima nenhuma tecla, não desloque o cursor e evite qualquer ação. O tempo do vazio exige imobilidade absoluta.",
        glyphSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="25" y="25" width="50" height="50" rx="4"/>
        </svg>`
    },
    {
        id: 6,
        roman: "Enigma VI",
        title: "A Matriz da Vigília",
        teaser: "Os olhos que se recusam a adormecer na escuridão guardam o limiar.",
        fullQuote: "Esperar na sombra é o dever daquele que protege o conhecimento.",
        hint: "Sincronize as quatro fases da vigília na matriz interdependente para revelar a palavra guardada.",
        glyphSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 80 L35 40 L50 65 L65 30 L80 80 Z"/>
        </svg>`
    },
    {
        id: 7,
        roman: "Enigma VII",
        title: "O Salto Decisivo",
        teaser: "A força contida que rompe a inércia e incendeia o ar.",
        fullQuote: "Um salto definitivo que lança o buscador além da prudência.",
        hint: "Complete a mecânica de ímpeto para romper o selo final.",
        glyphSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="50" cy="50" r="35"/>
        </svg>`
    }
];

let gameState = {
    solved: [],
    activeModalId: null
};

const STORAGE_KEY = "babel_enigmas_state_v2";

// --- VARIÁVEIS ENIGMA II ---
let vinculoSequence = [];
const NODE_COORDS = {
    1: { x: 140, y: 35 }, 2: { x: 206, y: 58 }, 3: { x: 240, y: 118 },
    4: { x: 228, y: 187 }, 5: { x: 175, y: 231 }, 6: { x: 105, y: 231 },
    7: { x: 52,  y: 187 }, 8: { x: 40,  y: 118 }, 9: { x: 74,  y: 58 }
};
const TARGET_VINCULO_SEQ = [1, 5, 9, 4, 8, 3, 7, 2, 6, 1];

// --- VARIÁVEIS ENIGMA III ---
let convictionStage = 1;
let convictionClicks = 0;
let convictionDecayTimer = null;
const STAGE_CONFIG = {
    1: { targetClicks: 12, decayInterval: null, name: "Estágio I: A Faísca" },
    2: { targetClicks: 22, decayInterval: 600, decayAmount: 1, name: "Estágio II: A Resistência" },
    3: { targetClicks: 32, decayInterval: 380, decayAmount: 1, name: "Estágio III: O Teste de Vontade" }
};

// --- VARIÁVEIS ENIGMA IV ---
let wheelState = { ring1: 3, ring2: 6, ring3: 1 };
const RING_1_SYMBOLS = ["☉", "☾", "☿", "♀", "♂", "♃", "♄", "🜂"];
const RING_2_SYMBOLS = ["VIII", "I", "II", "III", "IV", "V", "VI", "VII"];
const RING_3_SYMBOLS = ["ᛟ", "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ"];

let isDraggingRing = false;
let activeRingIndex = null;
let startAngle = 0;
let baseAngle = 0;

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            gameState.solved = parsed.solved || [];
        }
    } catch (e) {
        console.warn("Erro ao carregar estado", e);
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ solved: gameState.solved }));
    } catch (e) {
        console.warn("Erro ao salvar estado", e);
    }
}

function renderCards() {
    const container = document.getElementById('cardsGrid');
    if (!container) return;
    container.innerHTML = '';

    ENIGMAS.forEach((enigma, index) => {
        const isSolved = gameState.solved.includes(enigma.id);
        const isUnlocked = index === 0 || gameState.solved.includes(ENIGMAS[index - 1].id);

        const card = document.createElement('div');
        card.className = `card ${isSolved ? 'solved' : isUnlocked ? 'unlocked' : 'locked'}`;

        card.onclick = () => { if (isUnlocked) openModal(enigma.id); };

        let statusText = "🔒 Selado";
        if (isSolved) statusText = "✦ Revelado";
        else if (isUnlocked) statusText = "🕁 Despertado";

        card.innerHTML = `
            <div class="card-header">
                <span class="card-roman">${enigma.roman}</span>
                <span class="status-badge">${statusText}</span>
            </div>
            <div class="card-glyph">${enigma.glyphSvg}</div>
            <p class="card-teaser">"${enigma.teaser}"</p>
            <div class="card-footer">
                <span>Portal ${enigma.id}</span>
                <span>→</span>
            </div>
        `;
        container.appendChild(card);
    });

    updateProgressUI();
    updateTowerTiers();
}

function updateProgressUI() {
    const count = gameState.solved.length;
    const percent = Math.round((count / 7) * 100);

    const txt = document.getElementById('progressText');
    const pct = document.getElementById('progressPercent');
    const bar = document.getElementById('progressBar');

    if (txt) txt.innerText = `Ascensão: ${count} de 7 Selos Decifrados`;
    if (pct) pct.innerText = `${percent}%`;
    if (bar) bar.style.width = `${percent}%`;

    const unificationBanner = document.getElementById('unificationBanner');
    if (unificationBanner) {
        if (count >= 7) {
            unificationBanner.classList.remove('hidden');
        } else {
            unificationBanner.classList.add('hidden');
        }
    }
}

function updateTowerTiers() {
    document.querySelectorAll('.tower-tier').forEach(tier => {
        const match = tier.id ? tier.id.match(/\d+/) : null;
        const tierId = match ? parseInt(match[0]) : null;

        if (tierId && gameState.solved.includes(tierId)) {
            tier.classList.add('solved');
        } else {
            tier.classList.remove('solved');
        }
    });
}

function openModal(id) {
    const enigma = ENIGMAS.find(e => e.id === id);
    if (!enigma) return;

    gameState.activeModalId = id;
    const isSolved = gameState.solved.includes(id);

    const modalNum = document.getElementById('modalNumber');
    const modalQuote = document.getElementById('modalQuote');
    const modalGlyph = document.getElementById('modalGlyph');
    const hintContent = document.getElementById('hintContent');
    const badge = document.getElementById('modalStatusBadge');
    const feedback = document.getElementById('feedbackMsg');

    if (modalNum) modalNum.innerText = enigma.roman;
    if (modalQuote) modalQuote.innerText = `"${enigma.fullQuote}"`;
    if (modalGlyph) modalGlyph.innerHTML = enigma.glyphSvg;
    if (hintContent) hintContent.innerText = enigma.hint;
    if (feedback) feedback.className = 'feedback-msg hidden';
    if (badge) badge.innerText = isSolved ? "[ REVELADO ]" : "[ DESPERTADO ]";

    renderInteractiveArea(id, isSolved);

    if (hintContent) hintContent.classList.add('hidden');
    const modalOverlay = document.getElementById('riddleModal');
    if (modalOverlay) modalOverlay.classList.remove('hidden');
}

function closeModal() {
    stopConvictionDecay();
    const modalOverlay = document.getElementById('riddleModal');
    if (modalOverlay) modalOverlay.classList.add('hidden');
    gameState.activeModalId = null;
}

function openUnificationModal() {
    const modal = document.getElementById('unificationModal');
    if (modal) modal.classList.remove('hidden');
}

function closeUnificationModal() {
    const modal = document.getElementById('unificationModal');
    if (modal) modal.classList.add('hidden');
}

function renderInteractiveArea(id, isSolved) {
    const area = document.getElementById('interactiveArea');
    if (!area) return;
    area.innerHTML = '';

    if (isSolved) {
        area.innerHTML = `<div class="solved-msg">✦ O selo deste enigma já foi decifrado e gravado na pedra.</div>`;
        return;
    }

    switch(id) {
        case 1: renderGenesisMechanic(area); break;
        case 2: renderVinculoMechanic(area); break;
        case 3: renderConvictionMechanic(area); break;
        case 4: renderWheelOfTimeMechanic(area); break;
        case 5: 
            if (typeof renderSilenceMechanic === 'function') {
                renderSilenceMechanic(area);
            } else {
                area.innerHTML = `<p style="text-align:center; color:var(--text-dust);">Mecânica do Silêncio em carregamento...</p>`;
            }
            break;
        case 6: 
            if (typeof renderAlchemicalPuzzle === 'function') {
                renderAlchemicalPuzzle(area);
            } else {
                area.innerHTML = `<p style="text-align:center; color:var(--text-dust);">Mecânica da Vigília em carregamento...</p>`;
            }
            break;
        case 7: 
            if (typeof renderImpetoMechanic === 'function') {
                renderImpetoMechanic(area);
            } else {
                area.innerHTML = `<p style="text-align:center; color:var(--text-dust);">Mecânica de Ímpeto em carregamento...</p>`;
            }
            break;
        default: area.innerHTML = `<p style="text-align:center; color:var(--text-dust);">Mecânica em desenvolvimento...</p>`; break;
    }
}

// --- MECÂNICA ENIGMA I ---
function renderGenesisMechanic(container) {
    container.innerHTML = `
        <div class="parchment-box">
            <p class="parchment-instruction">"Sete alvoradas ergueram o domo e dividiram as águas, mas um único conceito nomeia o instante em que a primeira faísca rompeu o nada."</p>
            <div class="answer-section">
                <div class="input-wrap">
                    <input type="text" id="genesisInput" autocomplete="off" placeholder="Insira o conceito primordial..." />
                    <button id="submitGenesisBtn" class="btn-submit">Decifrar</button>
                </div>
            </div>
        </div>
    `;
    const btn = document.getElementById('submitGenesisBtn');
    const input = document.getElementById('genesisInput');
    if (btn) btn.onclick = handleGenesisSubmit;
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleGenesisSubmit(); });
}

function handleGenesisSubmit() {
    const inputEl = document.getElementById('genesisInput');
    if (!inputEl) return;
    const input = inputEl.value.trim().toLowerCase();
    const feedback = document.getElementById('feedbackMsg');
    if (!input || !feedback) return;

    const normInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const isCorrect = ["genese", "genesis"].includes(normInput);

    feedback.classList.remove('hidden', 'success', 'error');
    if (isCorrect) {
        feedback.classList.add('success');
        feedback.innerText = "✦ O verbo primordial ressoou. O selo foi rompido!";
        if (!gameState.solved.includes(1)) { gameState.solved.push(1); saveState(); renderCards(); }
        setTimeout(() => { closeModal(); }, 1600);
    } else {
        feedback.classList.add('error');
        feedback.innerText = "✕ O portal permanece inerte. Esta palavra não ressoa com a origem.";
    }
}

// --- MECÂNICA ENIGMA II ---
function renderVinculoMechanic(container) {
    vinculoSequence = [];
    container.innerHTML = `
        <div class="vinculo-box">
            <p class="vinculo-instruction">"Nove nós cercam o santuário. Teça o Eneagrama canalizando a energia no padrão dos saltos para revelar a mensagem oculta."</p>
            <div class="vinculo-canvas-wrap">
                <svg id="vinculoSvg" viewBox="0 0 280 280"></svg>
                <button class="vinculo-node" data-id="1" style="top: 12.5%; left: 50%;">I</button>
                <button class="vinculo-node" data-id="2" style="top: 20.7%; left: 73.5%;">II</button>
                <button class="vinculo-node" data-id="3" style="top: 42.1%; left: 85.7%;">III</button>
                <button class="vinculo-node" data-id="4" style="top: 66.8%; left: 81.4%;">IV</button>
                <button class="vinculo-node" data-id="5" style="top: 82.5%; left: 62.5%;">V</button>
                <button class="vinculo-node" data-id="6" style="top: 82.5%; left: 37.5%;">VI</button>
                <button class="vinculo-node" data-id="7" style="top: 66.8%; left: 18.6%;">VII</button>
                <button class="vinculo-node" data-id="8" style="top: 42.1%; left: 14.3%;">VIII</button>
                <button class="vinculo-node" data-id="9" style="top: 20.7%; left: 26.4%;">IX</button>
            </div>
            <div id="cipherSection" class="hidden" style="margin-top: 15px;">
                <p style="color:var(--accent-gold); font-size:0.9rem;">✦ A Trama Brilha em Glória! ✦</p>
                <p style="font-size:0.85rem; color:var(--text-dust); margin-top:4px;">Uma palavra ancestral materializou-se nas pedras:</p>
                <p style="font-family:monospace; font-size:1.5rem; letter-spacing:6px; color:var(--accent-gold); margin:10px 0;">Ivaphyb</p>
                <div class="input-wrap">
                    <input type="text" id="cipherInput" autocomplete="off" placeholder="Decifre o significado..." />
                    <button id="submitCipherBtn" class="btn-submit">Decifrar</button>
                </div>
            </div>
            <div class="vinculo-controls" id="vinculoControls">
                <button id="resetVinculoBtn" class="btn-subtle">Desfazer Fios</button>
            </div>
        </div>
    `;
    document.querySelectorAll('.vinculo-node').forEach(node => {
        node.onclick = () => handleVinculoNodeClick(parseInt(node.getAttribute('data-id')));
    });
    const resetBtn = document.getElementById('resetVinculoBtn');
    if (resetBtn) resetBtn.onclick = resetVinculoWeb;
}

function handleVinculoNodeClick(nodeId) {
    const feedback = document.getElementById('feedbackMsg');
    if (vinculoSequence.length === TARGET_VINCULO_SEQ.length) return;
    if (vinculoSequence.length > 0 && vinculoSequence[vinculoSequence.length - 1] === nodeId) return;

    vinculoSequence.push(nodeId);
    updateVinculoUI();

    const currentStep = vinculoSequence.length - 1;
    if (TARGET_VINCULO_SEQ[currentStep] !== nodeId) {
        if (feedback) {
            feedback.classList.remove('hidden', 'success');
            feedback.classList.add('error');
            feedback.innerText = "✕ A energia colapsou! A trama de 9 pontas não suportou a desconexão.";
        }
        const svg = document.getElementById('vinculoSvg');
        if (svg) svg.classList.add('error-pulse');
        setTimeout(() => { if (svg) svg.classList.remove('error-pulse'); resetVinculoWeb(); }, 700);
        return;
    }

    if (vinculoSequence.length === TARGET_VINCULO_SEQ.length) {
        if (feedback) {
            feedback.classList.remove('hidden', 'error');
            feedback.classList.add('success');
            feedback.innerText = "✦ O Eneagrama foi selado! Uma runa oculta emergiu da pedra.";
        }
        const controls = document.getElementById('vinculoControls');
        if (controls) controls.classList.add('hidden');
        const cipherSec = document.getElementById('cipherSection');
        if (cipherSec) cipherSec.classList.remove('hidden');

        const submitBtn = document.getElementById('submitCipherBtn');
        const inputEl = document.getElementById('cipherInput');
        if (submitBtn) submitBtn.onclick = handleCipherSubmit;
        if (inputEl) inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleCipherSubmit(); });
    }
}

function handleCipherSubmit() {
    const inputEl = document.getElementById('cipherInput');
    if (!inputEl) return;
    const input = inputEl.value.trim().toLowerCase();
    const feedback = document.getElementById('feedbackMsg');
    if (!input || !feedback) return;

    const normInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normInput === "vinculo") {
        feedback.classList.remove('hidden', 'error');
        feedback.classList.add('success');
        feedback.innerText = "✦ A palavra oculta libertou o nó da torre! O Enigma II foi superado.";
        if (!gameState.solved.includes(2)) { gameState.solved.push(2); saveState(); renderCards(); }
        setTimeout(() => { closeModal(); }, 1800);
    } else {
        feedback.classList.remove('hidden', 'success');
        feedback.classList.add('error');
        feedback.innerText = "✕ Significado incorreto! As sombras rejeitam esta palavra.";
    }
}

function updateVinculoUI() {
    const svg = document.getElementById('vinculoSvg');
    if (!svg) return;
    svg.innerHTML = '';

    for (let i = 0; i < vinculoSequence.length - 1; i++) {
        const fromNode = NODE_COORDS[vinculoSequence[i]];
        const toNode = NODE_COORDS[vinculoSequence[i + 1]];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromNode.x); line.setAttribute("y1", fromNode.y);
        line.setAttribute("x2", toNode.x); line.setAttribute("y2", toNode.y);
        line.setAttribute("class", "vinculo-line");
        svg.appendChild(line);
    }

    document.querySelectorAll('.vinculo-node').forEach(nodeBtn => {
        const id = parseInt(nodeBtn.getAttribute('data-id'));
        if (vinculoSequence.includes(id)) nodeBtn.classList.add('active');
        else nodeBtn.classList.remove('active');
    });
}

function resetVinculoWeb() {
    vinculoSequence = [];
    updateVinculoUI();
    const cipherSec = document.getElementById('cipherSection');
    if (cipherSec) cipherSec.classList.add('hidden');
    const controls = document.getElementById('vinculoControls');
    if (controls) controls.classList.remove('hidden');
    const feedback = document.getElementById('feedbackMsg');
    if (feedback) feedback.classList.add('hidden');
}

// --- MECÂNICA ENIGMA III ---
function renderConvictionMechanic(container) {
    convictionStage = 1; convictionClicks = 0;
    stopConvictionDecay();
    renderConvictionStageUI(container);
}

function renderConvictionStageUI(container) {
    if (convictionStage > 3) {
        renderManuscriptPassageUI(container);
        return;
    }
    const config = STAGE_CONFIG[convictionStage];
    container.innerHTML = `
        <div class="conviction-box">
            <p class="conviction-stage-indicator">${config.name}</p>
            <p class="subtitle" style="font-size:0.85rem; text-align:center;">"Toque na runa repetidamente para dissipar a névoa acumulada."</p>
            <div class="conviction-wrap">
                <svg class="conviction-ring" viewBox="0 0 120 120">
                    <circle class="ring-bg" cx="60" cy="60" r="50" />
                    <circle class="ring-fill" id="convictionRingFill" cx="60" cy="60" r="50" />
                </svg>
                <button id="convictionBtn" class="conviction-btn stage-${convictionStage}">
                    <span id="convictionIcon">🕁</span>
                    <span id="convictionPercent">0%</span>
                </button>
            </div>
        </div>
    `;
    const btn = document.getElementById('convictionBtn');
    if (btn) {
        const handleClick = (e) => { e.preventDefault(); handleConvictionClick(); };
        btn.addEventListener('mousedown', handleClick);
        btn.addEventListener('touchstart', handleClick);
    }
    startConvictionDecay();
}

function handleConvictionClick() {
    if (convictionStage > 3) return;
    const config = STAGE_CONFIG[convictionStage];
    convictionClicks += 1;

    if (convictionClicks >= config.targetClicks) {
        convictionClicks = config.targetClicks;
        updateConvictionCircleProgress();
        convictionStage += 1; convictionClicks = 0;
        stopConvictionDecay();
        const container = document.getElementById('interactiveArea');
        setTimeout(() => { renderConvictionStageUI(container); }, 300);
    } else {
        updateConvictionCircleProgress();
    }
}

function updateConvictionCircleProgress() {
    if (convictionStage > 3) return;
    const config = STAGE_CONFIG[convictionStage];
    const percentage = Math.floor((convictionClicks / config.targetClicks) * 100);
    const fill = document.getElementById('convictionRingFill');
    const percentText = document.getElementById('convictionPercent');

    if (fill) {
        const strokeDash = 314.159;
        fill.style.strokeDashoffset = strokeDash - (strokeDash * percentage) / 100;
    }
    if (percentText) percentText.innerText = `${percentage}%`;
}

function startConvictionDecay() {
    stopConvictionDecay();
    const config = STAGE_CONFIG[convictionStage];
    if (!config || !config.decayInterval) return;

    convictionDecayTimer = setInterval(() => {
        if (convictionClicks > 0 && convictionStage <= 3) {
            convictionClicks = Math.max(0, convictionClicks - config.decayAmount);
            updateConvictionCircleProgress();
        }
    }, config.decayInterval);
}

function stopConvictionDecay() {
    if (convictionDecayTimer) { clearInterval(convictionDecayTimer); convictionDecayTimer = null; }
}

function renderManuscriptPassageUI(container) {
    container.innerHTML = `
        <div class="manuscript-container">
            <div class="manuscript-text">
                <p>Há coisas que o tempo não consegue apagar, mesmo quando ninguém mais se lembra delas. Os que permanecem diante da ruína raramente sabem explicar o motivo de ainda estarem ali. Não é a ausência do medo que sustenta um homem quando tudo ao redor começa a desabar.</p>
                <p>Vez após vez, ele retornava ao mesmo lugar, embora cada retorno lhe custasse alguma coisa. Em certas noites, a dúvida parecia mais pesada do que qualquer pedra erguida pela cidade. Contudo, havia algo nele que recusava o caminho mais fácil, mesmo quando ninguém o observava.</p>
                <p>Quando a última chama vacilou, uma pequena centelha ainda resistiu entre as cinzas, perto de uma velha força esquecida. Às vezes, permanecer não significa esperar por uma resposta, mas aceitar o peso de cada decisão. O mundo pode mudar de nome, de forma e de destino, mas algumas decisões permanecem.</p>
            </div>
            <div class="coordinates-guide">
                ✦ COORDENADAS RÚNICAS ✦<br/>
                [ 1:2:1 | 1:26:2 | 1:6:1 | 2:1:1 | 2:18:3 | 2:17:1 | 3:18:4 | 3:23:2 | 3:31:1 ]
            </div>
            <div class="input-wrap">
                <input type="text" id="convictionInput" autocomplete="off" placeholder="Qual virtude foi velada no texto?" />
                <button id="submitConvictionBtn" class="btn-submit">Decifrar</button>
            </div>
        </div>
    `;
    const btn = document.getElementById('submitConvictionBtn');
    const input = document.getElementById('convictionInput');
    if (btn) btn.onclick = handleConvictionManuscriptSubmit;
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleConvictionManuscriptSubmit(); });
}

function handleConvictionManuscriptSubmit() {
    const inputEl = document.getElementById('convictionInput');
    if (!inputEl) return;
    const input = inputEl.value.trim().toLowerCase();
    const feedback = document.getElementById('feedbackMsg');
    if (!input || !feedback) return;

    const normInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normInput === "conviccao" || normInput === "convicção") {
        feedback.classList.remove('hidden', 'error');
        feedback.classList.add('success');
        feedback.innerText = "✦ O espírito inabalável prevaleceu! O Enigma III foi gravado na eternidade.";
        if (!gameState.solved.includes(3)) { gameState.solved.push(3); saveState(); renderCards(); }
        setTimeout(() => { closeModal(); }, 1800);
    } else {
        feedback.classList.remove('hidden', 'success');
        feedback.classList.add('error');
        feedback.innerText = "✕ A chave não coincide com o padrão das sombras. Examine as coordenadas.";
    }
}

// --- MECÂNICA ENIGMA IV: A RODA DO TEMPO ---
function renderWheelOfTimeMechanic(container) {
    wheelState = { ring1: 3, ring2: 6, ring3: 1 };

    container.innerHTML = `
        <div class="wheel-container">
            <p class="subtitle" style="font-size:0.85rem; text-align:center;">
                "O tempo gira em engrenagens cegas. Arraste ou clique em cada anel individualmente para manipular o relógio das sombras."
            </p>

            <div class="wheel-stage">
                <div class="wheel-pointer"></div>
                <svg class="wheel-svg" id="wheelSvg" viewBox="0 0 280 280">
                    <g id="wheelRing1" class="ring-group" data-ring="1"></g>
                    <g id="wheelRing2" class="ring-group" data-ring="2"></g>
                    <g id="wheelRing3" class="ring-group" data-ring="3"></g>
                </svg>
            </div>

            <button class="btn-subtle" onclick="resetWheelOfTime()">Resetar Engrenagens</button>

            <div id="wheelCipherSection" class="wheel-cipher-box hidden">
                <p style="color:var(--accent-gold); font-size:0.85rem; letter-spacing:1px;">✦ O RELÓGIO TEMPORAL DESTRAVOU ✦</p>
                <p style="font-size:0.8rem; color:var(--text-dust); margin-top:4px;">As engrenagens ecoam um sussurro cifrado. Recue 3 eras no zênite do tempo:</p>
                <div class="wheel-cipher-code">FLFOR</div>
                <div class="input-wrap">
                    <input type="text" id="wheelInput" autocomplete="off" placeholder="Decifre o conceito temporal..." />
                    <button id="submitWheelBtn" class="btn-submit">Decifrar</button>
                </div>
            </div>
        </div>
    `;

    renderWheelSymbols();
    attachWheelDragEvents();
    updateWheelRotations(true);
}

function renderWheelSymbols() {
    const r1 = document.getElementById('wheelRing1');
    const r2 = document.getElementById('wheelRing2');
    const r3 = document.getElementById('wheelRing3');

    if (!r1 || !r2 || !r3) return;

    r1.innerHTML = buildRingSVGContent(RING_1_SYMBOLS, 118, 1);
    r2.innerHTML = buildRingSVGContent(RING_2_SYMBOLS, 83, 2);
    r3.innerHTML = buildRingSVGContent(RING_3_SYMBOLS, 48, 3);
}

function buildRingSVGContent(symbols, radius, ringIndex) {
    let html = '';
    const cx = 140, cy = 140;

    const strokeWidths = { 1: 35, 2: 30, 3: 30 };
    html += `<circle cx="${cx}" cy="${cy}" r="${radius}" stroke-width="${strokeWidths[ringIndex]}" class="ring-hitbox" />`;
    html += `<circle cx="${cx}" cy="${cy}" r="${radius}" class="ring-circle" />`;

    symbols.forEach((sym, idx) => {
        const angleDeg = idx * 45 - 90;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = cx + radius * Math.cos(angleRad);
        const y = cy + radius * Math.sin(angleRad);

        html += `<text x="${x}" y="${y}" data-x="${x}" data-y="${y}" class="ring-symbol">${sym}</text>`;
    });

    return html;
}

function applyCounterRotation(ringIndex, groupAngle) {
    const ringGroup = document.getElementById(`wheelRing${ringIndex}`);
    if (!ringGroup) return;
    
    const symbols = ringGroup.querySelectorAll('.ring-symbol');
    symbols.forEach(sym => {
        const x = sym.getAttribute('data-x');
        const y = sym.getAttribute('data-y');
        sym.setAttribute('transform', `rotate(${-groupAngle}, ${x}, ${y})`);
    });
}

function attachWheelDragEvents() {
    [1, 2, 3].forEach(ringIndex => {
        const ringGroup = document.getElementById(`wheelRing${ringIndex}`);
        if (!ringGroup) return;

        ringGroup.onpointerdown = (e) => startRingDrag(e, ringIndex);
    });
}

function getAngleFromEvent(e) {
    const svg = document.getElementById('wheelSvg');
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

function startRingDrag(e, ringIndex) {
    e.preventDefault();
    e.stopPropagation();

    activeRingIndex = ringIndex;
    isDraggingRing = true;

    const ringGroup = document.getElementById(`wheelRing${ringIndex}`);
    if (ringGroup) {
        ringGroup.classList.add('dragging');
        ringGroup.setPointerCapture(e.pointerId);
    }

    startAngle = getAngleFromEvent(e);
    baseAngle = -wheelState[`ring${ringIndex}`] * 45;

    ringGroup.onpointermove = (ev) => handleRingDrag(ev, ringIndex);
    ringGroup.onpointerup = (ev) => stopRingDrag(ev, ringIndex);
    ringGroup.onpointercancel = (ev) => stopRingDrag(ev, ringIndex);
}

function handleRingDrag(e, ringIndex) {
    if (!isDraggingRing || activeRingIndex !== ringIndex) return;

    const currentAngle = getAngleFromEvent(e);
    const delta = currentAngle - startAngle;
    const currentTotalAngle = baseAngle + delta;

    const ringGroup = document.getElementById(`wheelRing${ringIndex}`);
    if (ringGroup) {
        ringGroup.style.transition = 'none';
        ringGroup.style.transform = `rotate(${currentTotalAngle}deg)`;
        applyCounterRotation(ringIndex, currentTotalAngle);
    }
}

function stopRingDrag(e, ringIndex) {
    if (!isDraggingRing) return;
    isDraggingRing = false;

    const ringGroup = document.getElementById(`wheelRing${ringIndex}`);
    if (ringGroup) {
        ringGroup.classList.remove('dragging');
        ringGroup.onpointermove = null;
        ringGroup.onpointerup = null;
        ringGroup.onpointercancel = null;

        const currentAngle = getAngleFromEvent(e);
        const delta = currentAngle - startAngle;
        let finalAngle = baseAngle + delta;

        if (Math.abs(delta) < 4) {
            finalAngle = baseAngle - 45;
        }

        let steps = Math.round(-finalAngle / 45) % 8;
        if (steps < 0) steps += 8;

        wheelState[`ring${ringIndex}`] = steps;

        ringGroup.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        updateWheelRotations(false);
        checkWheelAlignment();
    }
}

function updateWheelRotations(immediate = false) {
    [1, 2, 3].forEach(i => {
        const r = document.getElementById(`wheelRing${i}`);
        if (r) {
            const angle = -wheelState[`ring${i}`] * 45;
            if (immediate) r.style.transition = 'none';
            else r.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            r.style.transform = `rotate(${angle}deg)`;
            applyCounterRotation(i, angle);
        }
    });
}

function checkWheelAlignment() {
    if (wheelState.ring1 === 0 && wheelState.ring2 === 0 && wheelState.ring3 === 0) {
        const feedback = document.getElementById('feedbackMsg');
        if (feedback) {
            feedback.classList.remove('hidden', 'error');
            feedback.classList.add('success');
            feedback.innerText = "✦ O mecanismo travou no alinhamento perfeito! A cifra do tempo emergiu.";
        }

        const cipherSec = document.getElementById('wheelCipherSection');
        if (cipherSec) cipherSec.classList.remove('hidden');

        const submitBtn = document.getElementById('submitWheelBtn');
        const inputEl = document.getElementById('wheelInput');
        if (submitBtn) submitBtn.onclick = handleWheelCipherSubmit;
        if (inputEl) inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleWheelCipherSubmit();
        });
    }
}

function resetWheelOfTime() {
    wheelState = { ring1: 3, ring2: 6, ring3: 1 };
    updateWheelRotations(false);
    const feedback = document.getElementById('feedbackMsg');
    if (feedback) feedback.classList.add('hidden');
}

function handleWheelCipherSubmit() {
    const inputEl = document.getElementById('wheelInput');
    if (!inputEl) return;
    const input = inputEl.value.trim().toLowerCase();
    const feedback = document.getElementById('feedbackMsg');
    if (!input || !feedback) return;

    const normInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (normInput === "ciclo") {
        feedback.classList.remove('hidden', 'error');
        feedback.classList.add('success');
        feedback.innerText = "✦ O ciclo perpétuo do tempo foi compreendido. O Enigma IV foi vencido!";

        if (!gameState.solved.includes(4)) {
            gameState.solved.push(4);
            saveState();
            renderCards();
        }

        setTimeout(() => { closeModal(); }, 1800);
    } else {
        feedback.classList.remove('hidden', 'success');
        feedback.classList.add('error');
        feedback.innerText = "✕ O tempo rejeita essa palavra. Aplique o recuo de 3 posições na cifra.";
    }
}

// --- INICIALIZAÇÃO ---
function resetProgress() {
    if (confirm("Tem certeza de que deseja reiniciar todos os enigmas e voltar ao início?")) {
        gameState.solved = [];
        saveState();
        renderCards();
    }
}

function initCanvas() {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.5 + 0.1,
        vx: (Math.random() - 0.5) * 0.2, vy: -Math.random() * 0.3 - 0.1
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.y < 0) p.y = height;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(226, 222, 212, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

window.onload = function() {
    loadState();
    renderCards();
    initCanvas();

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) closeBtn.onclick = closeModal;

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.onclick = resetProgress;

    const toggleHintBtn = document.getElementById('toggleHintBtn');
    if (toggleHintBtn) {
        toggleHintBtn.onclick = () => {
            const hint = document.getElementById('hintContent');
            if (hint) hint.classList.toggle('hidden');
        };
    }
};