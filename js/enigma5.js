function renderSilenceMechanic(container) {
    // Garantir que o container principal permite posicionamento absoluto das ondas
    if (container && getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }

    // Injetar os estilos globais da animação de ondas sonoras fluidas
    if (!document.getElementById('silence-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'silence-ripple-style';
        style.innerHTML = `
            @keyframes soundWave {
                0% { width: 10px; height: 10px; opacity: 1; box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.9); }
                100% { width: 140px; height: 140px; opacity: 0; box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); }
            }
        `;
        document.head.appendChild(style);
    }

    container.innerHTML = `
        <div class="silence-box">
            <p class="silence-instruction">
                "Os ecos do mundo corrompem o santuário. Extinga todas as fontes de ruído para alcançar o silêncio absoluto."
            </p>
            <p style="font-size: 0.75rem; color: var(--text-dust, #a8a29e); margin-bottom: 15px;">
                Interaja com as runas para harmonizar o tabuleiro e eliminar o ruído.
            </p>
            
            <div id="echo-grid" style="display: grid; grid-template-columns: repeat(3, 60px); grid-gap: 8px; justify-content: center; margin: 15px auto; position: relative; cursor: pointer;">
                <!-- As 9 runas do tabuleiro -->
            </div>

            <div id="silence-input-section" class="hidden" style="margin-top: 15px; width: 100%;">
                <p style="color:var(--accent-gold, #d4af37); font-size:0.85rem; letter-spacing: 1px;">✦ O Ruído foi Extinto ✦</p>
                <p style="font-size:0.80rem; color:var(--text-dust, #a8a29e); margin: 6px 0;">O que consome o som e habita o templo antes da primeira voz?</p>
                <div class="input-wrap">
                    <input type="text" id="silenceInput" autocomplete="off" placeholder="Insira a chave do abismo..." />
                    <button id="submitSilenceBtn" class="btn-submit">Revelar</button>
                </div>
            </div>
        </div>
    `;

    // Tabuleiro inicial com runas acesas (impossível apagar apenas por cliques)
    let grid = [true, false, true, false, true, false, true, false, true];
    
    const neighborsMap = [
        [0, 1, 3],
        [0, 1, 2, 4],
        [1, 2, 5],
        [0, 3, 4, 6],
        [1, 3, 4, 5, 7],
        [2, 4, 5, 8],
        [3, 6, 7],
        [4, 6, 7, 8],
        [5, 7, 8]
    ];

    const gridContainer = document.getElementById('echo-grid');
    const inputSection = document.getElementById('silence-input-section');
    
    let stillnessTimer = null;
    const stillnessTimeNeeded = 15000; // 15 segundos de imobilidade rigorosa
    let isCompleted = false;

    function renderGrid() {
        if (!gridContainer || isCompleted) return;
        gridContainer.innerHTML = '';
        
        grid.forEach((isLit, idx) => {
            const tile = document.createElement('button');
            tile.className = `echo-tile ${isLit ? 'lit' : 'dark'}`;
            tile.style.width = '60px';
            tile.style.height = '60px';
            tile.style.background = isLit ? 'var(--accent-gold, #d4af37)' : 'rgba(255, 255, 255, 0.05)';
            tile.style.border = '1px solid var(--border-stone, rgba(255,255,255,0.1))';
            tile.style.borderRadius = '4px';
            tile.style.cursor = 'pointer';
            tile.style.position = 'relative';
            tile.style.transition = 'all 0.2s ease';
            tile.style.fontSize = '1.2rem';
            tile.innerHTML = isLit ? '✦' : '·';
            tile.style.color = isLit ? '#121214' : 'var(--text-dust, #a8a29e)';

            // Clicar gera a onda sonora fluida e reinicia o temporizador de imobilidade
            tile.onclick = (e) => {
                e.stopPropagation();
                if (isCompleted) return;
                
                // Obter as coordenadas exatas da runa para centrar a onda sonora no container
                const tileRect = tile.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.left = `${(tileRect.left - containerRect.left) + (tileRect.width / 2)}px`;
                ripple.style.top = `${(tileRect.top - containerRect.top) + (tileRect.height / 2)}px`;
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.borderRadius = '50%';
                ripple.style.border = '2px solid var(--accent-gold, #d4af37)';
                ripple.style.pointerEvents = 'none';
                ripple.style.zIndex = '50';
                ripple.style.animation = 'soundWave 0.6s cubic-bezier(0, 0.2, 0.8, 1) forwards';
                
                container.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);

                neighborsMap[idx].forEach(n => {
                    grid[n] = !grid[n];
                });
                renderGrid();
                startStillnessCheck(); // Punição por clique (reinicia os 15s)
            };

            gridContainer.appendChild(tile);
        });
    }

    function clearStillness() {
        if (stillnessTimer) {
            clearTimeout(stillnessTimer);
            stillnessTimer = null;
        }
    }

    function startStillnessCheck() {
        if (isCompleted) return;
        clearStillness();
        
        stillnessTimer = setTimeout(() => {
            if (isCompleted) return;
            
            // Sucesso absoluto após 15 segundos sem mexer o rato nem clicar
            isCompleted = true;
            grid = [false, false, false, false, false, false, false, false, false];
            renderGrid();
            
            if (gridContainer) gridContainer.style.pointerEvents = 'none';
            if (inputSection) inputSection.classList.remove('hidden');

            const feedback = document.getElementById('feedbackMsg');
            if (feedback) {
                feedback.classList.remove('hidden', 'error');
                feedback.classList.add('success');
                feedback.innerText = "✦ A imobilidade silenciou os ecos! Decifre a charada final.";
            }

            const submitBtn = document.getElementById('submitSilenceBtn');
            const inputEl = document.getElementById('silenceInput');
            
            if (submitBtn) submitBtn.onclick = handleSilenceSubmit;
            if (inputEl) inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSilenceSubmit(); });
        }, stillnessTimeNeeded);
    }

    if (gridContainer) {
        gridContainer.addEventListener('mouseenter', () => {
            startStillnessCheck();
        });

        gridContainer.addEventListener('mousemove', () => {
            startStillnessCheck();
        });

        gridContainer.addEventListener('mouseleave', () => {
            clearStillness();
        });
    }

    function handleSilenceSubmit() {
        const inputEl = document.getElementById('silenceInput');
        if (!inputEl) return;
        const input = inputEl.value.trim().toLowerCase();
        const feedback = document.getElementById('feedbackMsg');
        if (!input || !feedback) return;

        const normInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const validWords = ["silencio", "silêncio", "vazio"];

        if (validWords.includes(normInput)) {
            feedback.classList.remove('hidden', 'error');
            feedback.classList.add('success');
            feedback.innerText = "✦ A essência primordial foi compreendida. Enigma V superado!";

            if (!gameState.solved.includes(5)) {
                gameState.solved.push(5);
                saveState();
                renderCards();
            }

            setTimeout(() => { closeModal(); }, 1800);
        } else {
            feedback.classList.remove('hidden', 'success');
            feedback.classList.add('error');
            feedback.innerText = "✕ Resposta incorreta. O templo rejeita esta palavra.";
        }
    }

    renderGrid();
}