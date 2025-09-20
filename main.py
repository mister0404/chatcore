from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Разрешаем CORS для всех (для теста)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Пример данных астероидов
asteroids = [
    {"id": 1, "name": "Impactor-2025", "size_km": 0.5, "velocity_kms": 25, "impact_energy_mt": 50},
    {"id": 2, "name": "Apophis", "size_km": 0.37, "velocity_kms": 30, "impact_energy_mt": 30},
    {"id": 3, "name": "Bennu", "size_km": 0.49, "velocity_kms": 28, "impact_energy_mt": 45},
]

@app.get("/asteroids")
def get_asteroids():
    return [{"id": a["id"], "name": a["name"], "size_km": a["size_km"], "velocity_kms": a["velocity_kms"]} for a in asteroids]

@app.get("/asteroid/{asteroid_id}")
def get_asteroid(asteroid_id: int):
    asteroid = next((a for a in asteroids if a["id"] == asteroid_id), None)
    if asteroid:
        return asteroid
    return {"error": "Asteroid not found"}
