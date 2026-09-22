// --- FUNÇÕES INDEPENDENTES DA CIFRA DE BABEL (LÓGICA VIGENÈRE) ---

function normalizeText(text) {
    if (!text) return "";
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

function letterToValue(letter) {
    return letter.toUpperCase().charCodeAt(0) - 65;
}

function valueToLetter(value) {
    return String.fromCharCode(((value % 26) + 26) % 26 + 65);
}

function encryptBabel(text, key) {
    const cleanKey = normalizeText(key).replace(/[^A-Z]/g, "");
    const normalizedText = normalizeText(text);
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < normalizedText.length; i++) {
        let char = normalizedText[i];
        if (char >= 'A' && char <= 'Z') {
            let pVal = letterToValue(char);
            let kChar = cleanKey[keyIndex % cleanKey.length];
            let kVal = letterToValue(kChar);
            let encVal = (pVal + kVal) % 26;
            result += valueToLetter(encVal);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

function decryptBabel(text, key) {
    const cleanKey = normalizeText(key).replace(/[^A-Z]/g, "");
    const normalizedText = normalizeText(text);
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < normalizedText.length; i++) {
        let char = normalizedText[i];
        if (char >= 'A' && char <= 'Z') {
            let cVal = letterToValue(char);
            let kChar = cleanKey[keyIndex % cleanKey.length];
            let kVal = letterToValue(kChar);
            let decVal = (cVal - kVal + 26) % 26;
            result += valueToLetter(decVal);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}


// --- MECÂNICA ENIGMA VII: RODA DE 3 ANÉIS E CIFRA DE BABEL ---
function renderImpetoMechanic(container) {
    const chave = "escolhido";
    const plaintextOriginal = "Ímpeto";
    const textoCifrado = encryptBabel(plaintextOriginal, chave); // Gera "MERSEV"

    // Conjunto de 26 símbolos rúnicos para o anel interno
    const runes = [
        "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", 
        "ᛁ", "ᛃ", "ᛈ", "ᛇ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", 
        "ᛚ", "ᛜ", "ᛟ", "ᛞ", "ᚫ", "ᚬ"
    ];

    container.innerHTML = `
        <div class="impeto-box" style="text-align: center; padding: 8px;">
            <p class="subtitle" style="font-size: 0.82rem; color: var(--text-dust); margin-bottom: 8px;">
                "Alinhe os três anéis alfabéticos e o círculo rúnico central para decodificar a mensagem."
            </p>
            
            <div style="background: rgba(0,0,0,0.6); border: 1px solid rgba(201,24,74,0.4); padding: 10px; border-radius: 8px; margin-bottom: 12px; box-shadow: inset 0 0 12px rgba(0,0,0,0.8);">
                <p style="font-size: 0.72rem; color: var(--text-dust); text-transform: uppercase; letter-spacing: 1px;">Texto Cifrado:</p>
                <p id="dynamicCipherDisplay" style="font-size: 1.4rem; color: #c9184a; letter-spacing: 4px; font-weight: bold; margin: 4px 0; text-shadow: 0 0 10px rgba(201,24,74,0.4);">${textoCifrado}</p>
                <div style="display: flex; justify-content: center; gap: 20px; font-size: 0.75rem; color: var(--text-dust); margin-top: 6px;">
                    <span>Anel Ext: <strong id="shiftExtLbl" style="color:#c9184a;">0</strong></span>
                    <span>Anel Médio: <strong id="shiftMidLbl" style="color:#c9184a;">0</strong></span>
                    <span>Runas (Centro): <strong id="shiftIntLbl" style="color:#fff;">ᚠ</strong></span>
                </div>
                <div id="activeRingStatus" style="font-size: 0.7rem; color: #c9184a; margin-top: 6px; font-style: italic; min-height: 16px;">
                    ✦ Clique num anel para selecioná-lo e mova o mouse para girar ✦
                </div>
            </div>

            <!-- Roda Complexa com 3 Anéis Independentes (Ampliada e Uniforme) -->
            <div id="cipherWheelContainer" style="position: relative; width: 300px; height: 300px; margin: 0 auto 8px auto; cursor: pointer; filter: drop-shadow(0 6px 16px rgba(0,0,0,0.8)); user-select: none;">
                <svg id="cipherWheelSvg" viewBox="0 0 300 300" style="width: 100%; height: 100%;">
                    <circle cx="150" cy="150" r="144" fill="rgba(15,13,11,0.95)" stroke="#c9184a" stroke-width="3" />
                    <circle cx="150" cy="150" r="114" fill="rgba(25,22,18,0.95)" stroke="#c9184a" stroke-width="2.5" />
                    <circle cx="150" cy="150" r="85" fill="rgba(10,9,8,0.95)" stroke="#c9184a" stroke-width="2" />

                    <!-- Torre de Babel Central -->
                    <g id="babelTower" transform="translate(150, 150)">
                        <polygon points="-24,20 24,20 18,6 -18,6" fill="rgba(201,24,74,0.25)" stroke="#c9184a" stroke-width="1.2" />
                        <polygon points="-18,5 18,5 12,-7 -12,-7" fill="rgba(201,24,74,0.35)" stroke="#c9184a" stroke-width="1.2" />
                        <polygon points="-12,-8 12,-8 7,-20 -7,-20" fill="rgba(201,24,74,0.45)" stroke="#c9184a" stroke-width="1.2" />
                        <line x1="0" y1="-20" x2="0" y2="-34" stroke="#c9184a" stroke-width="1.8" />
                        <circle cx="0" cy="-34" r="2" fill="#c9184a" />
                    </g>

                    <g id="outerLetters"></g>
                    <g id="middleLetters"></g>
                    <g id="innerRunes"></g>
                </svg>
            </div>

            <div style="font-size: 0.72rem; color: var(--text-dust); margin-bottom: 8px; font-style: italic;">
                ✦ Clique uma vez para girar, clique novamente para fixar ✦
            </div>

            <!-- Botão de Confirmação Permanente -->
            <button id="confirmBabelBtn" class="babel-btn" style="width: 100%; max-width: 300px; padding: 8px; margin: 0 auto; display: block; font-size: 0.8rem; letter-spacing: 1px;">
                CONFIRMAR TENTATIVA
            </button>

            <div id="feedbackMsg" class="hidden" style="margin-top: 8px; font-size: 0.82rem; font-weight: bold;"></div>
        </div>
    `;

    // Dica nas Cinzas
    const hintBox = document.getElementById('hintContent') || document.querySelector('.hint-content') || document.getElementById('hintBox');
    if (hintBox) {
        hintBox.innerHTML = `
            <strong>A Cifra de Babel:</strong><br>
            A chave secreta oculta na torre guia o deslocamento circular de cada letra.<br>
            Gire os anéis para alinhar as engrenagens e revelar a palavra original.
        `;
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const outerGroup = document.getElementById('outerLetters');
    const middleGroup = document.getElementById('middleLetters');
    const innerGroup = document.getElementById('innerRunes');

    let shiftOuter = 2;
    let shiftMiddle = 4;
    let shiftInner = 1;

    const shiftExtLbl = document.getElementById('shiftExtLbl');
    const shiftMidLbl = document.getElementById('shiftMidLbl');
    const shiftIntLbl = document.getElementById('shiftIntLbl');
    const dynamicDisplay = document.getElementById('dynamicCipherDisplay');
    const activeRingStatus = document.getElementById('activeRingStatus');

    function updateWheelsAndText() {
        outerGroup.innerHTML = '';
        for (let i = 0; i < 26; i++) {
            const charIdx = (i - shiftOuter + 2600) % 26;
            const angle = (i * 360) / 26 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 150 + 129 * Math.cos(rad);
            const y = 150 + 129 * Math.sin(rad);

            const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            t.setAttribute("x", x); t.setAttribute("y", y + 3);
            t.setAttribute("fill", "#c9184a"); t.setAttribute("font-size", "10"); t.setAttribute("font-weight", "bold");
            t.setAttribute("text-anchor", "middle"); t.setAttribute("dominant-baseline", "central");
            t.textContent = alphabet[charIdx];
            outerGroup.appendChild(t);
        }

        middleGroup.innerHTML = '';
        for (let i = 0; i < 26; i++) {
            const charIdx = (i - shiftMiddle + 2600) % 26;
            const angle = (i * 360) / 26 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 150 + 99.5 * Math.cos(rad);
            const y = 150 + 99.5 * Math.sin(rad);

            const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            t.setAttribute("x", x); t.setAttribute("y", y + 3);
            t.setAttribute("fill", "#c9184a"); t.setAttribute("font-size", "9.5"); t.setAttribute("font-weight", "bold");
            t.setAttribute("text-anchor", "middle"); t.setAttribute("dominant-baseline", "central");
            t.textContent = alphabet[charIdx];
            middleGroup.appendChild(t);
        }

        innerGroup.innerHTML = '';
        for (let i = 0; i < 26; i++) {
            const runeIdx = (i - shiftInner + 2600) % 26;
            const angle = (i * 360) / 26 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 150 + 72 * Math.cos(rad);
            const y = 150 + 72 * Math.sin(rad);

            const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            t.setAttribute("x", x); t.setAttribute("y", y + 3);
            t.setAttribute("fill", "#ffffff"); t.setAttribute("font-size", "11"); t.setAttribute("font-weight", "bold");
            t.setAttribute("text-anchor", "middle"); t.setAttribute("dominant-baseline", "central");
            t.textContent = runes[runeIdx];
            innerGroup.appendChild(t);
        }

        shiftExtLbl.innerText = shiftOuter;
        shiftMidLbl.innerText = shiftMiddle;
        const activeRuneIdx = (0 - shiftInner + 2600) % 26;
        shiftIntLbl.innerText = runes[activeRuneIdx];

        let transformed = "";
        const cleanKey = normalizeText(chave);
        let keyIndex = 0;
        
        let netOuter = shiftOuter;
        let netMiddle = shiftMiddle;
        let netInner = shiftInner;

        for (let i = 0; i < textoCifrado.length; i++) {
            let char = textoCifrado[i];
            if (char >= 'A' && char <= 'Z') {
                let cVal = letterToValue(char);
                let kChar = cleanKey[keyIndex % cleanKey.length];
                let kVal = letterToValue(kChar);
                
                let ringModifier = 0;
                if (i % 3 === 0) ringModifier = netOuter;
                else if (i % 3 === 1) ringModifier = netMiddle - 2;
                else ringModifier = netInner - 1;

                let decVal = (cVal - (kVal + ringModifier) + 26) % 26;
                transformed += valueToLetter(decVal);
                keyIndex++;
            } else {
                transformed += char;
            }
        }
        
        if (shiftOuter === 0 && shiftMiddle === 2 && shiftInner === 1) {
            transformed = "IMPETO";
        }
        
        dynamicDisplay.innerText = transformed;
    }

    updateWheelsAndText();

    // Sistema de Clique para Selecionar e Mover o Mouse Automaticamente
    const wheelContainer = document.getElementById('cipherWheelContainer');
    let selectedRing = null;
    let startX = 0;
    let baseShiftValue = 0;

    const getRingFromEvent = (e) => {
        const rect = wheelContainer.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const distPx = Math.sqrt(dx * dx + dy * dy);
        
        const scale = rect.width / 300;
        const svgRadius = distPx / scale;

        if (svgRadius > 114) return 'outer';
        if (svgRadius > 85 && svgRadius <= 114) return 'middle';
        return 'inner';
    };

    wheelContainer.addEventListener('click', (e) => {
        const targetRing = getRingFromEvent(e);

        if (selectedRing === targetRing) {
            selectedRing = null;
            wheelContainer.style.cursor = 'pointer';
            if (activeRingStatus) activeRingStatus.innerText = "✦ Anel fixado. Clique num anel para girar ✦";
        } else {
            selectedRing = targetRing;
            startX = e.clientX;
            if (selectedRing === 'outer') baseShiftValue = shiftOuter;
            else if (selectedRing === 'middle') baseShiftValue = shiftMiddle;
            else baseShiftValue = shiftInner;
            
            wheelContainer.style.cursor = 'grabbing';
            const ringNames = { outer: 'Anel Externo', middle: 'Anel Médio', inner: 'Círculo Rúnico (Centro)' };
            if (activeRingStatus) activeRingStatus.innerText = `⚡ ${ringNames[selectedRing]} ativo! Mova o mouse (clique de novo para fixar) ⚡`;
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!selectedRing) return;
        const diffX = e.clientX - startX;
        const delta = Math.floor(diffX / 14);
        const newShift = ((baseShiftValue + delta) % 26 + 26) % 26;

        if (selectedRing === 'outer') shiftOuter = newShift;
        else if (selectedRing === 'middle') shiftMiddle = newShift;
        else if (selectedRing === 'inner') shiftInner = newShift;

        updateWheelsAndText();
    });

    // Event listener para o Botão de Confirmação manual
    const confirmBtn = document.getElementById('confirmBabelBtn');
    confirmBtn.addEventListener('click', () => {
        const feedback = document.getElementById('feedbackMsg');
        feedback.classList.remove('hidden');

        const currentText = dynamicDisplay.innerText;

        if (currentText === "IMPETO" || (shiftOuter === 0 && shiftMiddle === 2 && shiftInner === 1)) {
            feedback.style.color = "#c9184a";
            feedback.innerText = "✦ A Cifra de Babel foi decifrada com sucesso! Palavra correta revelada.";
            
            if (typeof gameState !== 'undefined' && gameState.solved && !gameState.solved.includes(7)) {
                gameState.solved.push(7);
                if (typeof saveState === 'function') saveState();
                if (typeof renderCards === 'function') renderCards();
            }
            setTimeout(() => { if (typeof closeModal === 'function') closeModal(); }, 1800);
        } else {
            feedback.style.color = "#e2ded4";
            feedback.innerText = "✦ Texto incorreto. Os anéis ainda não formam a palavra original. Continue tentando!";
        }
    });
}