const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let lugares = [
    {
        id: 1,
        nombre: "Bar Irlanda Tucumán",
        ubicacion: "San Miguel de Tucumán",
        categoria: "bar",
        fuente: "mock",
        fecha_obtencion: new Date().toISOString(),
        activo: true,
    },
    {
        id: 2,
        nombre: "Café Martínez",
        ubicacion: "Yerba Buena",
        categoria: "café",
        fuente: "mock",
        fecha_obtencion: new Date().toISOString(),
        activo: true,
    },
];

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/bar|tucuman|restaurante|cafe|café/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function esDuplicado(nombreNuevo) {
    const nombreNormalizado = normalizarTexto(nombreNuevo);

    return lugares.some((lugar) => {
        const nombreExistente = normalizarTexto(lugar.nombre);
        return nombreExistente === nombreNormalizado;
    });
}

function clasificarConIA(nombre) {
    const texto = nombre.toLowerCase();

    if (texto.includes("bar")) return "bar";
    if (texto.includes("cafe") || texto.includes("café")) return "café";
    if (texto.includes("recital")) return "recital";
    if (texto.includes("teatro")) return "evento cultural";
    if (texto.includes("restaurante")) return "restaurante";

    return "otro";
}

app.get("/lugares", (req, res) => {
    res.json(lugares);
});

app.post("/lugares", (req, res) => {
    const nuevoLugar = {
        id: lugares.length + 1,
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        categoria: req.body.categoria,
        fuente: req.body.fuente || "manual",
        fecha_obtencion: new Date().toISOString(),
        activo: true,
    };

    lugares.push(nuevoLugar);
    res.status(201).json(nuevoLugar);
});

app.put("/lugares/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const lugar = lugares.find((l) => l.id === id);

    if (!lugar) {
        return res.status(404).json({ mensaje: "Lugar no encontrado" });
    }

    lugar.nombre = req.body.nombre || lugar.nombre;
    lugar.ubicacion = req.body.ubicacion || lugar.ubicacion;
    lugar.categoria = req.body.categoria || lugar.categoria;

    res.json(lugar);
});

app.delete("/lugares/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const lugar = lugares.find((l) => l.id === id);

    if (!lugar) {
        return res.status(404).json({ mensaje: "Lugar no encontrado" });
    }

    lugar.activo = false;

    res.json({
        mensaje: "Lugar desactivado correctamente",
        lugar,
    });
});

app.post("/automatizacion/cargar", (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, "mock-data.json"), "utf8");
    const datosExternos = JSON.parse(data);

    let insertados = 0;
    let duplicados = 0;

    datosExternos.forEach((item) => {
        const yaExiste = lugares.some(
            (lugar) =>
                lugar.nombre.toLowerCase().trim() === item.nombre.toLowerCase().trim()
        );

        if (yaExiste) {
            duplicados++;
        } else {
            const nuevoLugar = {
                id: lugares.length + 1,
                nombre: item.nombre,
                ubicacion: item.ubicacion,
                categoria: item.categoria || "clasificado con IA",
                fuente: item.fuente || "mock",
                fecha_obtencion: new Date().toISOString(),
                activo: true,
            };

            lugares.push(nuevoLugar);
            insertados++;
        }
    });

    res.json({
        mensaje: "Carga automática finalizada",
        log: {
            fecha: new Date().toISOString(),
            total_procesados: datosExternos.length,
            insertados,
            duplicados,
            errores: 0,
        },
        lugares,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});