const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const asteroidSelect = document.getElementById('asteroidSelect');
const destructionRadiusInput = document.getElementById('destructionRadius');
const fallBtn = document.getElementById('fallBtn');

let fallPoint = null; // Точка падения на карте

// Пример списка астероидов
const asteroids = [
    { id: 1, name: "Impactor-2025", size_km: 0.5, velocity_kms: 25, impact_energy_mt: 50 },
    { id: 2, name: "Apophis", size_km: 0.37, velocity_kms: 30, impact_energy_mt: 30 },
    { id: 3, name: "Bennu", size_km: 0.49, velocity_kms: 20, impact_energy_mt: 40 }
];

// Заполняем селект
asteroids.forEach(a => {
    const option = document.createElement('option');
    option.value = a.id;
    option.textContent = `${a.name} (Размер: ${a.size_km} км, Скорость: ${a.velocity_kms} км/с)`;
    asteroidSelect.appendChild(option);
});

// Выбираем точку падения кликом
map.on('click', e => {
    fallPoint = e.latlng;
    if (window.fallMarker) map.removeLayer(window.fallMarker);
    window.fallMarker = L.marker(fallPoint).addTo(map)
        .bindPopup("Точка падения выбрана").openPopup();
});

// Обработчик кнопки
fallBtn.addEventListener('click', () => {
    const asteroidId = parseInt(asteroidSelect.value);
    const asteroid = asteroids.find(a => a.id === asteroidId);

    if (!asteroid) {
        alert("Выберите астероид!");
        return;
    }

    if (!fallPoint) {
        alert("Выберите точку падения на карте!");
        return;
    }

    const radius = parseFloat(destructionRadiusInput.value) * 1000; // в метры

    // Начальные координаты астероида (сверху карты)
    const start = [fallPoint.lat + 10, fallPoint.lng];
    const end = [fallPoint.lat, fallPoint.lng];
    let step = 0;
    const steps = 50;

    const marker = L.marker(start, {
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
            iconSize: [40, 40]
        })
    }).addTo(map);

    const interval = setInterval(() => {
        step++;
        const curLat = start[0] + ((end[0] - start[0]) * step) / steps;
        const curLng = start[1] + ((end[1] - start[1]) * step) / steps;
        marker.setLatLng([curLat, curLng]);

        if (step >= steps) {
            clearInterval(interval);
            map.removeLayer(marker);

            // Взрыв: создаём круг зоны разрушений
            L.circle(end, {
                radius: radius,
                color: 'red',
                fillColor: 'orange',
                fillOpacity: 0.4
            }).addTo(map)
              .bindPopup(`💥 ${asteroid.name} упал здесь!\nЭнергия удара: ${asteroid.impact_energy_mt} Мт`)
              .openPopup();

            // Можно добавить эффект “взрыва” через анимированный маркер
            const explosion = L.circleMarker(end, {
                radius: 10,
                color: 'yellow',
                fillColor: 'red',
                fillOpacity: 0.8
            }).addTo(map);

            let explodeStep = 0;
            const explodeInterval = setInterval(() => {
                explodeStep++;
                explosion.setRadius(10 + explodeStep * 5);
                explosion.setStyle({ fillOpacity: Math.max(0, 0.8 - explodeStep * 0.1) });
                if (explodeStep >= 8) {
                    clearInterval(explodeInterval);
                    map.removeLayer(explosion);
                }
            }, 50);
        }
    }, 50);
});
