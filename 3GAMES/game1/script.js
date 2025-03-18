const glossary = [
    { stone: "Автоматическая блокировка (АБ)", wagon: "система сигнализации, обеспечивающая автоматическое управление движением поездов." },
    { stone: "Автоматический тормоз", wagon: "тормозная система, приводимая в действие автоматически при нарушении нормальной работы." },
    { stone: "Балластный слой", wagon: "слой щебня или гравия, на который укладывают рельсы для обеспечения устойчивости пути." },
    { stone: "Вагон", wagon: "подвижной состав для перевозки грузов или пассажиров на железной дороге." },
    { stone: "Верхнее строение пути", wagon: "комплекс элементов, обеспечивающих безопасность движения поездов (рельсы, шпалы, скрепления, балласт)." },
    { stone: "Выемка", wagon: "искусственное углубление в земле, предназначенное для прокладки железнодорожного пути." },
    { stone: "Габарит подвижного состава", wagon: "максимальные размеры транспортного средства, допустимые на железной дороге." },
    { stone: "Двухпутная линия", wagon: "железнодорожная линия, состоящая из двух параллельных путей, по которым движение ведется в обоих направлениях." },
    { stone: "Депо", wagon: "предприятие для ремонта, обслуживания и стоянки локомотивов и вагонов." },
    { stone: "Зона таможенного контроля", wagon: "участок, где производится проверка и оформление грузов при международных перевозках." },
    { stone: "Мультимодальные перевозки", wagon: "транспортировка грузов с использованием нескольких видов транспорта (например, железнодорожного и автомобильного)." },
    { stone: "Логистическая цепочка", wagon: "последовательность действий, необходимых для перемещения товара от производителя до конечного потребителя." },
    { stone: "Маршрут", wagon: "установленный путь движения транспорта для доставки грузов или пассажиров." },
    { stone: "Перевалка грузов (перегруз)", wagon: "перемещение грузов с одного вида транспорта на другой в процессе интермодальных перевозок." },
    { stone: "Склад временного хранения (СВХ)", wagon: "помещение, где хранятся товары до их таможенного оформления." },
    { stone: "Аренда вагонов", wagon: "услуга, при которой владельцы вагонов предоставляют их в пользование другим организациям или физическим лицам на определенный срок." },
    { stone: "Транспортно-экспедиционные услуги", wagon: "комплекс услуг, оказываемых экспедиторскими компаниями по организации перевозки грузов различными видами транспорта." },
    { stone: "Дополнительные сборы", wagon: "различные платежи, которые взимаются помимо основной ставки за перевозку грузов или аренду вагонов." },
    { stone: "Станционная работа", wagon: "комплекс операций, выполняемых на железнодорожных станциях, связанных с обслуживанием поездов и вагонов." },
    { stone: "Погрузочно-разгрузочные работы", wagon: "процессы, связанные с перемещением груза в и из транспортных средств, таких как вагоны, автомобили или контейнеры." },
    { stone: "Пломбирование вагонов", wagon: "процесс установки специальных пломб на вагоны после их загрузки, с целью обеспечения сохранности груза." },
    { stone: "Дефектоскоп", wagon: "оборудование для проверки состояния вагонов и рельсов на наличие трещин и других повреждений." },
    { stone: "Инвентарный парк вагонов", wagon: "парк вагонов, находящихся в собственности железной дороги и эксплуатируемых для перевозки грузов и пассажиров." },
    { stone: "Колесная пара", wagon: "узел вагона, состоящий из двух колес и оси, передающий нагрузку на рельсы." },
    { stone: "Кузов вагона", wagon: "основная конструкция вагона, предназначенная для размещения грузов или пассажиров." },
    { stone: "Полувагон", wagon: "открытый грузовой вагон с высокими бортами, используемый для перевозки насыпных и навалочных грузов." },
    { stone: "Ремонтный парк вагонов", wagon: "часть вагонов, временно выведенных из эксплуатации для проведения текущего или капитального ремонта." },
    { stone: "Сцепка вагонов", wagon: "процесс соединения вагонов для формирования железнодорожного состава." },
    { stone: "Тормозной путь", wagon: "расстояние, которое проходит поезд от момента начала торможения до полной остановки." },
    { stone: "Цистерна", wagon: "специализированный вагон для перевозки жидких грузов, таких как нефть, химикаты или вода." }
];
// проверяем относится ли камень к вагону
function checkIntoGlossary(stoneValue, wagonValue) {
    return !!glossary.find((item) =>
        item.stone === stoneValue && item.wagon === wagonValue
    )
}

// проверяем остались ли камни
function checkCountStones() {
    const stones = document.querySelectorAll('.stone')
    const score = document.querySelector('.score-value').textContent
    if (!stones.length) {
        const modal = document.querySelector('.modal');
        modal.classList.add('active');
        const btn = document.querySelector('.btn-reload');
        btn.addEventListener('click', () => {
            location.reload()
        })
        // здесь просто покажи модалку с результатом (score)
        // и кнопку для перезапуска игры (location.reload())
    }
}

// прибавляем счет
function incrementScore() {
    document.querySelector('.score-value').textContent++
}

// рисуем камни
function drawStones() {
    const wrapper = document.querySelector('.stones-wrapper');
    wrapper.innerHTML = ''; // Очистка перед добавлением элементов

    glossary.forEach((item) => {
        const stoneDiv = document.createElement('div');
        stoneDiv.classList.add('stone');
        stoneDiv.setAttribute('data-stone', item.stone);

        const stoneText = document.createElement('span');
        stoneText.classList.add('stone-text');
        stoneText.textContent = item.stone;

        stoneDiv.appendChild(stoneText);
        wrapper.appendChild(stoneDiv);
    });
}


// рисуем вагоны и локомотив
function drawWagons() {
    const wrapper = document.querySelector('.train');
    wrapper.innerHTML = ''; // Очистка перед добавлением элементов

    // Вагоны
    glossary.forEach((item) => {
        const wagonDiv = document.createElement('div');
        wagonDiv.classList.add('wagon');
        wagonDiv.setAttribute('data-wagon', item.wagon);

        const wagonText = document.createElement('p');
        wagonText.classList.add('wagon-text');
        wagonText.textContent = item.wagon;

        const wagonImg = document.createElement('img');
        wagonImg.classList.add('wagon-img');
        wagonImg.src = './images/wagon.png';
        wagonImg.alt = 'wagon';

        const wagonWheelsDiv = document.createElement('div');
        wagonWheelsDiv.classList.add('wagon-wheels');

        for (let i = 1; i <= 4; i++) {
            const wagonWheelDiv = document.createElement('div');
            wagonWheelDiv.classList.add('wagon-wheel', `wagon-wheel-${i}`);

            const wheelImg = document.createElement('img');
            wheelImg.src = './images/wheel.png';
            wheelImg.alt = 'wheel';

            wagonWheelDiv.appendChild(wheelImg);
            wagonWheelsDiv.appendChild(wagonWheelDiv);
        }

        wagonDiv.appendChild(wagonText);
        wagonDiv.appendChild(wagonImg);
        wagonDiv.appendChild(wagonWheelsDiv);

        wrapper.appendChild(wagonDiv);
    });

    // локомотив
    wrapper.innerHTML += `
        <div class="locomotive">
                <div class="locomotive-main">
                    <img src="./images/train.png" alt="train">
                </div>
                <div class="locomotive-wheels">
                    <div class="locomotive-wheel locomotive-wheel-1">
                        <img src="./images/wheel.png" alt="wheel">
                    </div>
                    <div class="locomotive-wheel locomotive-wheel-2">
                        <img src="./images/wheel.png" alt="wheel">
                    </div>
                    <div class="locomotive-wheel locomotive-wheel-3">
                        <img src="./images/wheel.png" alt="wheel">
                    </div>
                    <div class="locomotive-wheel locomotive-wheel-4">
                        <img src="./images/wheel.png" alt="wheel">
                    </div>
                    <div class="locomotive-wheel locomotive-wheel-5">
                        <img src="./images/wheel.png" alt="wheel">
                    </div>
                    <div class="locomotive-wheel locomotive-wheel-6">
                        <img src="./images/wheel.png" alt="wheel">
                    </div>
                    <div class="locomotive-wheel locomotive-wheel-7">
                        <img src="./images/wheel.png" alt="wheel">
                    </div>
                </div>
            </div>
    `
}

// логика игры, слушаем разные события (drag and drop и пр.)
function listenGame(token) {
    const stones = document.querySelectorAll(".stone");

    stones.forEach((stone) => {
        let offsetX, offsetY, isDragging = false;

        stone.style.position = "absolute";

        function moveAt(x, y) {
            stone.style.left = `${x - offsetX}px`;
            stone.style.top = `${y - offsetY}px`;
        }

        function startDrag(x, y) {
            isDragging = true;
            offsetX = x - stone.offsetLeft;
            offsetY = y - stone.offsetTop;
            stone.style.cursor = "grabbing";
        }

        function endDrag(clientX, clientY) {
            if (!isDragging) return;
            isDragging = false;
            stone.style.cursor = "grab";

            // Скрываем камень, чтобы определить, что под ним
            stone.style.visibility = "hidden";
            const elementBehind = document.elementFromPoint(clientX, clientY);
            stone.style.visibility = "visible";

            if (elementBehind) {
                const classesToCheck = ["wagon", "wagon-text", "wagon-wheels", "wagon-img"];
                if (classesToCheck.some(cls => elementBehind.classList.contains(cls))) {
                    const stoneValue = stone.getAttribute('data-stone');
                    const wagonValue = elementBehind.getAttribute('data-wagon');

                    if (checkIntoGlossary(stoneValue, wagonValue)) {
                        incrementScore();
                    }

                    stone.remove(); // Удаляем только тот камень, который переместили
                    checkCountStones();
                }
            }
        }

        function onMouseMove(event) {
            if (isDragging) moveAt(event.clientX, event.clientY);
        }

        function onMouseUp(event) {
            endDrag(event.clientX, event.clientY);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        function onTouchMove(event) {
            if (isDragging) {
                event.preventDefault();
                moveAt(event.touches[0].clientX, event.touches[0].clientY);
            }
        }

        function onTouchEnd(event) {
            if (event.changedTouches.length > 0) {
                const touch = event.changedTouches[0]; // Последний отпущенный палец
                endDrag(touch.clientX, touch.clientY);
            }
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        }

        // Обработчики для мыши
        stone.addEventListener("mousedown", (event) => {
            startDrag(event.clientX, event.clientY);
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        // Обработчики для сенсорных устройств
        stone.addEventListener("touchstart", (event) => {
            if (event.touches.length > 0) {
                startDrag(event.touches[0].clientX, event.touches[0].clientY);
                document.addEventListener("touchmove", onTouchMove, { passive: false });
                document.addEventListener("touchend", onTouchEnd);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    drawStones()
    drawWagons()
    listenGame()
})
// Добавляем 15-минутный таймер
let timeLeft = 15 * 60; // 15 минут в секундах
const timerElement = document.createElement("div");
timerElement.style.position = "fixed";
timerElement.style.top = "10px";
timerElement.style.right = "10px";
timerElement.style.background = "rgba(0, 0, 0, 0.7)";
timerElement.style.color = "white";
timerElement.style.padding = "10px 15px";
timerElement.style.borderRadius = "5px";
timerElement.style.fontSize = "18px";
timerElement.style.zIndex = "1000"; // Чтобы таймер был поверх всех элементов
document.body.appendChild(timerElement);

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `Осталось времени: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (timeLeft <= 0) {
        endGame();
    } else {
        timeLeft--;
    }
}
setInterval(updateTimer, 1000);

function endGame() {
    alert("Время вышло! Ваш счет: " + getScore());
    if (confirm("Хотите сыграть снова?")) {
        location.reload();
    }
}

function getScore() {
    // Заглушка: здесь должен быть код, возвращающий текущий счёт игрока
    return Math.floor(Math.random() * 100); 
}

