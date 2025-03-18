document.addEventListener("DOMContentLoaded", function () {
    const stations = document.querySelectorAll(".station");

    // Сопоставление станций и страниц игр
    const games = {
        1: "game1/index.html", // Станция 1 → Игра 1
        2: "game2/index.html", // Станция 2 → Игра 2
        3: "game3/index.html"  // Станция 3 → Игра 3
    };

    stations.forEach((station, index) => {
        station.addEventListener("click", function () {
            const gameUrl = games[index + 1]; // Получаем ссылку на игру
            if (gameUrl) {
                window.location.href = gameUrl; // Переход на страницу игры
            }
        });
    });
});

