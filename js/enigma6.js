function renderAlchemicalPuzzle(container) {
    if (container && getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }

    container.innerHTML = `
        <div class="alchemical-box" style="text-align: center; padding: 10px; font-family: inherit;">
            <p class="subtitle" style="font-size:0.85rem; text-align:center; color: var(--text-dust); margin-bottom: 8px;">
                "As quatro sentinelas guardam o tempo na escuridão. Cada uma guarda um fragmento da noite eterna."
            </p>
            <p style="font-size: 0.75rem; color: var(--text-dust); margin-bottom: 15px;">
                Inspecione as pistas de cada sentinela e ajuste os seus sigilos para a fase correta da vigília.
            </p>
            
            <div id="alchemy-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 12px; justify-content: center; margin: 20px auto; max-width: 380px;">
                <!-- Os 4 painéis das sentinelas -->
            </div>

            <div id="alchemy-status" style="font-size: 0.8rem; color: #ef4444; margin-bottom: 10px; letter-spacing: 1px;">
                Sentinelas Alinhadas: <span id="alignment-counter">0</span> / 4
            </div>

            <div id="alchemy-input-section" class="hidden" style="margin-top: 15px; width: 100%;">
                <p style="color:#ef4444; font-size:0.85rem; letter-spacing: 1px;">✦ A Harmonia da Noite Revelada ✦</p>
                <p style="font-size:0.80rem; color:var(--text-dust); margin: 6px 0;">Qual é o estado de consciência de quem vigia a transmutação na noite profunda?</p>
                <div class="input-wrap">
                    <input type="text" id="alchemyInput" autocomplete="off" placeholder="Insira a palavra da guarda..." />
                    <button id="submitAlchemyBtn" class="btn-submit">Consagrar</button>
                </div>
            </div>
        </div>
    `;

    // Estados atuais de cada guarda (0 a 3) e o estado correto exigido por dedução
    let states = [0, 0, 0, 0];
    const targetStates = [1, 3, 0, 2]; // Solução fixa baseada nas pistas lógicas
    
    const sentinelas = [
        { 
            name: "Prima Guarda", 
            clue: "O sol afunda-se no horizonte; o primeiro véu da noite desce sobre a pedra." 
        },
        { 
            name: "Segunda Guarda", 
            clue: "O silêncio é absoluto no coração da abóbada celeste; a sombra reina soberana." 
        },
        { 
            name: "Terceira Guarda", 
            clue: "O galo ainda dorme, mas o ar gélido anuncia o limiar da viragem invisível." 
        },
        { 
            name: "Quarta Guarda", 
            clue: "Os primeiros fios de luz dourada rasgam o véu antes de o dia quebrar por completo." 
        }
    ];

    const fasesNoite = [
        { sigilo: "CREPÚSCULO", desc: "A Luz Desvanece" },
        { sigilo: "UMBRA", desc: "A Sombra Profunda" },
        { sigilo: "SILÊNCIO", desc: "O Limiar do Vazio" },
        { sigilo: "AURORA", desc: "O Prefácio do Alvor" }
    ];
    
    const gridContainer = document.getElementById('alchemy-grid');
    const inputSection = document.getElementById('alchemy-input-section');
    const counterDisplay = document.getElementById('alignment-counter');
    let isMatrixSolved = false;

    function updateCounter() {
        let matching = states.filter((val, idx) => val === targetStates[idx]).length;
        if (counterDisplay) counterDisplay.innerText = matching;
        
        if (matching === 4 && !isMatrixSolved) {
            isMatrixSolved = true;
            if (gridContainer) gridContainer.style.pointerEvents = 'none';
            if (inputSection) inputSection.classList.remove('hidden');

            const feedback = document.getElementById('feedbackMsg');
            if (feedback) {
                feedback.classList.remove('hidden', 'error');
                feedback.classList.add('success');
                feedback.innerText = "✦ As quatro sentinelas reconhecem a harmonia! Insira a palavra final.";
            }

            const submitBtn = document.getElementById('submitAlchemyBtn');
            const inputEl = document.getElementById('alchemyInput');
            
            if (submitBtn) submitBtn.onclick = handleAlchemySubmit;
            if (inputEl) inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAlchemySubmit(); });
        }
    }

    function renderAlchemyGrid() {
        if (!gridContainer || isMatrixSolved) return;
        gridContainer.innerHTML = '';

        states.forEach((val, idx) => {
            const card = document.createElement('div');
            const isCorrect = (val === targetStates[idx]);
            
            card.style.background = 'rgba(255, 255, 255, 0.03)';
            card.style.border = isCorrect ? '1px solid #ef4444' : '1px solid var(--border-stone, rgba(255,255,255,0.1))';
            card.style.borderRadius = '8px';
            card.style.padding = '10px';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.justifyContent = 'space-between';
            card.style.transition = 'all 0.3s ease';

            const currentFase = fasesNoite[val];

            card.innerHTML = `
                <div>
                    <span style="font-size: 0.75rem; font-family: 'Cinzel', serif; color: #ef4444; font-weight: bold;">${sentinelas[idx].name}</span>
                    <p style="font-size: 0.65rem; color: var(--text-dust); margin: 6px 0; font-style: italic; line-height: 1.2;">"${sentinelas[idx].clue}"</p>
                </div>
                <button class="cycle-btn-${idx}" style="background: ${isCorrect ? '#ef4444' : 'rgba(255,255,255,0.08)'}; color: ${isCorrect ? '#ffffff' : '#ef4444'}; border: 1px solid ${isCorrect ? '#ef4444' : 'rgba(255,255,255,0.15)'}; border-radius: 4px; padding: 8px; cursor: pointer; font-size: 0.75rem; font-family: 'Cinzel', serif; font-weight: bold; transition: all 0.2s;">
                    ${currentFase.sigilo}
                </button>
            `;

            const btn = card.querySelector(`.cycle-btn-${idx}`);
            btn.onclick = () => {
                if (isMatrixSolved) return;
                states[idx] = (states[idx] + 1) % fasesNoite.length;
                renderAlchemyGrid();
                updateCounter();
            };

            gridContainer.appendChild(card);
        });
    }

    function handleAlchemySubmit() {
        const inputEl = document.getElementById('alchemyInput');
        if (!inputEl) return;
        const input = inputEl.value.trim().toLowerCase();
        const feedback = document.getElementById('feedbackMsg');
        if (!input || !feedback) return;

        const normInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const validWords = ["vigilia", "vigília"];

        if (validWords.includes(normInput)) {
            feedback.classList.remove('hidden', 'error');
            feedback.classList.add('success');
            feedback.innerText = "✦ A Vigília eterna foi compreendida. Enigma VI superado!";

            if (!gameState.solved.includes(6)) {
                gameState.solved.push(6);
                saveState();
                renderCards();
            }

            setTimeout(() => { closeModal(); }, 1800);
        } else {
            feedback.classList.remove('hidden', 'success');
            feedback.classList.add('error');
            feedback.innerText = "✕ Resposta incorreta. O santuário permanece na penumbra.";
        }
    }

    renderAlchemyGrid();
    updateCounter();
}