# Explora Tucumán

Sistema automatizado para obtener, procesar y administrar bares, restaurantes y eventos de Tucumán.

Desarrollado como prueba técnica utilizando automatización, procesamiento de datos, clasificación automática y dashboard web.

---
# Capturas

## Dashboard principal

![Dashboard](./screenshots/dashboard.png)

## Logs de automatización

![Logs](./screenshots/logs.png)

## Endpoint de lugares

![API](./screenshots/api.png)

## Demo

Frontend desplegado en Vercel:

https://julietasleiman-explora-tucuman-5hts6uyuf.vercel.app

# Tecnologías utilizadas

## Backend
- Node.js
- Express

## Frontend
- React

## Automatización

El sistema incluye un flujo automatizado/script que permite cargar datos de bares/eventos, procesarlos, evitar duplicados y registrar logs de ejecución.

Cada vez que se ejecuta el flujo, se consultan los datos disponibles, se normalizan y se agregan únicamente los registros nuevos.

## Uso de IA

Se aplica IA para clasificar automáticamente los lugares/eventos según su nombre y descripción, generando categorías como bar, café, boliche, restaurante o evento.

También se contempla la detección de posibles duplicados con nombres similares, por ejemplo:
- "Bar Irlanda Tucumán"
- "Irlanda Bar"

# Funcionalidades

- CRUD de lugares/eventos
- Dashboard web interactivo
- Búsqueda y filtrado
- Carga automática de datos
- Detección de duplicados
- Clasificación automática
- Logs de ejecución
- Datos mock simulando fuente externa

---

# Parte 1 — Obtención de datos

Se utilizó un dataset mock (`mock-data.json`) como simulación de una fuente externa.

Esto permite:
- evitar scraping agresivo
- mantener estabilidad durante las pruebas
- simular una API/dataset real

Campos utilizados:
- nombre
- ubicación
- categoría
- fuente
- fecha de obtención

---

# Parte 2 — CRUD

Endpoints implementados:

## Obtener lugares

```http
GET /lugares