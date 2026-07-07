import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

// Función auxiliar para quitar tildes
const normalizar = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

app.get('/api/universidades', async (req, res) => {
    const { name } = req.query;
    if (!name) return res.json([]);

    try {
        // Pedimos universidades de Peru
        const response = await axios.get(`http://universities.hipolabs.com/search?country=Peru`);
        const todasLasUnis = response.data;

        // Filtramos manualmente en nuestro servidor
        const busquedaNormalizada = normalizar(name);
        const resultadosFiltrados = todasLasUnis.filter(uni => 
            normalizar(uni.name).includes(busquedaNormalizada)
        );

        res.json(resultadosFiltrados);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la API' });
    }
});

app.listen(3001, () => console.log('Backend corriendo'));