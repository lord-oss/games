document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start");
    const levelDisplay = document.getElementById("level");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question");
    const trueButton = document.getElementById("true-btn");
    const falseButton = document.getElementById("false-btn");
    const livesDisplay = document.getElementById("lives");
    const timerDisplay = document.getElementById("timer");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupButton = document.getElementById("popup-button");

    let questions = {
        easy: [
            { text: "Казахстан – крупнейшая страна в мире без выхода к морю.", answer: true },
            { text: "В Казахстане нет железнодорожного сообщения с Китаем.", answer: false },
            { text: "Длина железных дорог Казахстана превышает 15 000 км.", answer: true },
            { text: "Первая железная дорога в Казахстане построена в 19 веке.", answer: false },
            { text: "Железнодорожные перевозки в Казахстане составляют 80% от всех грузоперевозок.", answer: true },
            { text: "Поезда в Казахстане используют исключительно дизельное топливо.", answer: false },
            { text: "Казахстан является крупнейшим транзитным узлом между Китаем и Европой.", answer: true }
        ],
        medium: [
            { text: "Компания Шынгар Транс была основана в 2020 году.", answer: false },
            { text: "Главный офис находится в Нур-Султане.", answer: false },
            { text: "Компания занимается логистикой и транспортом.", answer: true },
            { text: "Шынгар Транс использует только автомобили для перевозок.", answer: false },
            { text: "Компания работает как внутри Казахстана, так и за его пределами.", answer: true },
            { text: "Компания специализируется только на перевозке крупногабаритных грузов.", answer: false },
            { text: "Скорость, честность и внимание к клиенту – ключевые ценности компании.", answer: true }
        ],
        hard: [
            { text: "Скоростные поезда в Казахстане называются 'Тулпар-Тальго'.", answer: true },
            { text: "Все пассажирские поезда в Казахстане ходят только внутри страны.", answer: false },
            { text: "Железнодорожный мост между Казахстаном и Узбекистаном был построен в 2015 году.", answer: true },
            { text: "Грузовые поезда в Казахстане перевозят нефть и металлы.", answer: true },
            { text: "Казахстанские железные дороги управляются китайской компанией.", answer: false },
            { text: "Скоростные поезда в Казахстане могут достигать скорости 250 км/ч.", answer: true },
            { text: "В Казахстане нет железнодорожного сообщения с Туркменистаном.", answer: false }
        ],
        extra: [
            { text: "Можно перелезать через автосцепку между вагонами, если поезд стоит.", answer: false },
            { text: "Разрешается обходить стоящий поезд, если расстояние от автосцепки не менее 5 метров.", answer: true },
            { text: "Если на путях стоят вагоны, их можно пересекать в любом месте.", answer: false },
            { text: "При переходе через железнодорожные пути можно использовать наушники и мобильный телефон.", answer: false },
            { text: "При спуске с вагона нужно стоять спиной к нему.", answer: false },
            { text: "Красный сигнал светофора означает 'Отправляться'.", answer: false },
            { text: "Звуковой сигнал локомотива 'Остановиться поезду' – это один длинный гудок.", answer: true },
            { text: "Если пути заняты вагонами, можно подлезть под них, чтобы сократить путь.", answer: false },
            { text: "При посадке в поезд или выходе из вагона важно убедиться, что нет приближающегося состава.", answer: true },
            { text: "Оголенные провода на железной дороге безопасны, если не касаться их руками.", answer: false }
        ]
    };

    let levelOrder = ["easy", "medium", "hard", "extra"];
    let levelNames = ["Лёгкий", "Средний", "Тяжёлый", "Экстра"];
    let currentLevelIndex = 0;
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let lives = 3;
    let score = { easy: 0, medium: 0, hard: 0, extra: 0 };
    let timer;
    let canAnswer = true;

    function startGame() {
        startButton.style.display = "none";
        questionContainer.style.display = "block";
        currentLevelIndex = 0;
        startLevel();
    }

    function startLevel() {
        if (currentLevelIndex >= levelOrder.length) {
            showPopup("Игра окончена! Итоговый результат: " + 
                `Лёгкий: ${score.easy}/7, ` + 
                `Средний: ${score.medium}/7, ` +
                `Тяжёлый: ${score.medium}/7, ` + 
                `Экстра: ${score.hard}/10`, restartGame);
            return;
        }

        showPopup(`${levelNames[currentLevelIndex]} уровень начался!`, () => {
            currentQuestions = [...questions[levelOrder[currentLevelIndex]]];
            currentQuestionIndex = 0;
            lives = 3;
            updateLives();
            updateLevel();
            nextQuestion();
        });
    }

    function updateLevel() {
        levelDisplay.textContent = `Текущий уровень: ${levelNames[currentLevelIndex]}`;
    }

    function nextQuestion() {
        if (currentQuestionIndex >= currentQuestions.length) {
            currentLevelIndex++;
            showPopup(`${levelNames[currentLevelIndex - 1]} уровень пройден!`, startLevel);
            return;
        }

        canAnswer = true;
        questionText.textContent = currentQuestions[currentQuestionIndex].text;
        startTimer();
    }

    function startTimer() {
        let timeLeft = 10;
        timerDisplay.textContent = `Время: ${timeLeft}`;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Время: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                loseLife();
            }
        }, 1000);
    }

    function answer(isTrue) {
        if (!canAnswer) return;
        canAnswer = false;
        clearInterval(timer);

        let correct = currentQuestions[currentQuestionIndex].answer === isTrue;
        if (correct) {
            score[levelOrder[currentLevelIndex]]++;
        } else {
            loseLife();
            return;
        }

        currentQuestionIndex++;
        setTimeout(nextQuestion, 500);
    }

    function loseLife() {
        lives--;
        updateLives();
        if (lives <= 0) {
            showPopup("Вы проиграли! Попробуйте снова.", startLevel);
        } else {
            currentQuestionIndex++;
            nextQuestion();
        }
    }

    function updateLives() {
        livesDisplay.textContent = `Жизни: ${lives}`;
    }

    function showPopup(message, callback) {
        popupText.textContent = message;
        popup.style.display = "block";
        popupButton.onclick = () => {
            popup.style.display = "none";
            if (callback) callback();
        };
    }

    function restartGame() {
        score = { easy: 0, medium: 0, hard: 0 };
        startGame();
    }

    startButton.addEventListener("click", startGame);
    trueButton.addEventListener("click", () => answer(true));
    falseButton.addEventListener("click", () => answer(false));
});














