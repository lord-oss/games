document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const turnsCounter = document.getElementById("turns");
    const backgroundSelect = document.getElementById("backgroundSelect");
    const timerDisplay = document.createElement("div");

    let moves = 0;
    let selectedPiece = null;
    const gridSize = 3;
    let pieces = [];
    let timer;
    let timeLeft = 600; // 10 минут (600 секунд)

    const images = ["10.png", "11.png", "12.png", "13.png", "14.png"];
    let currentImageIndex = 0;

    // Отображение таймера
    timerDisplay.style.position = "absolute";
    timerDisplay.style.top = "10px";
    timerDisplay.style.right = "10px";
    timerDisplay.style.fontSize = "24px";
    timerDisplay.style.fontWeight = "bold";
    timerDisplay.style.color = "white";
    timerDisplay.style.background = "rgba(0, 0, 0, 0.7)";
    timerDisplay.style.padding = "10px";
    timerDisplay.style.borderRadius = "5px";
    document.body.appendChild(timerDisplay);

    function startTimer() {
        timer = setInterval(() => {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerDisplay.textContent = `⏳ ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Время вышло! Игра окончена.");
                location.reload(); // Перезапуск игры
            }

            timeLeft--;
        }, 1000);
    }

    function createPuzzle() {
        if (currentImageIndex === 0) startTimer(); // Запускаем таймер на первом уровне

        if (currentImageIndex >= images.length) {
            alert("Поздравляем! Вы собрали весь контракт!");
            return;
        }

        pieces = [];
        board.innerHTML = "";
        moves = 0;
        turnsCounter.textContent = moves;

        let indexes = Array.from({ length: gridSize * gridSize }, (_, i) => i).sort(() => Math.random() - 0.5);
        const pieceSize = board.clientWidth / gridSize;
        const image = images[currentImageIndex];

        for (let i = 0; i < gridSize * gridSize; i++) {
            let row = Math.floor(i / gridSize);
            let col = i % gridSize;
            let actualIndex = indexes[i];

            let piece = document.createElement("div");
            piece.classList.add("puzzle-piece");
            piece.dataset.index = actualIndex;
            piece.dataset.correctIndex = i;

            piece.style.backgroundImage = `url(${image})`;
            piece.style.backgroundSize = `${board.clientWidth}px ${board.clientHeight}px`;
            piece.style.backgroundPosition = `${-(actualIndex % gridSize) * pieceSize}px ${-(Math.floor(actualIndex / gridSize) * pieceSize)}px`;

            piece.addEventListener("click", () => handlePieceClick(piece));
            pieces.push(piece);
            board.appendChild(piece);
        }
    }

    function handlePieceClick(piece) {
        if (!selectedPiece) {
            selectedPiece = piece;
            piece.classList.add("selected");
        } else {
            swapPieces(selectedPiece, piece);
            selectedPiece.classList.remove("selected");
            selectedPiece = null;
        }
    }

    function swapPieces(piece1, piece2) {
        let tempIndex = piece1.dataset.index;
        piece1.dataset.index = piece2.dataset.index;
        piece2.dataset.index = tempIndex;

        const pieceSize = board.clientWidth / gridSize;

        piece1.style.backgroundPosition = `${-(piece1.dataset.index % gridSize) * pieceSize}px ${-(Math.floor(piece1.dataset.index / gridSize) * pieceSize)}px`;
        piece2.style.backgroundPosition = `${-(piece2.dataset.index % gridSize) * pieceSize}px ${-(Math.floor(piece2.dataset.index / gridSize) * pieceSize)}px`;

        moves++;
        turnsCounter.textContent = moves;

        checkWin();
    }

    function checkWin() {
        let isSolved = pieces.every(piece => piece.dataset.index === piece.dataset.correctIndex);

        if (isSolved) {
            setTimeout(() => {
                alert("Контракт собран! Следующий уровень...");
                currentImageIndex++;
                createPuzzle();
            }, 500);
        }
    }

    backgroundSelect.addEventListener("change", (event) => {
        document.body.style.backgroundImage = `url(${event.target.value})`;
    });

    createPuzzle();
});






