# Explora Tucumán

Sistema automatizado para obtener, procesar y administrar bares, restaurantes y eventos de Tucumán.

Desarrollado como prueba técnica utilizando automatización, procesamiento de datos, clasificación automática y dashboard web.

---

# Tecnologías utilizadas

## Backend
- Node.js
- Express

## Frontend
- React

## Automatización
- Endpoint automatizado de carga de datos

## IA
- Clasificación automática basada en reglas (simulación de IA)

---

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