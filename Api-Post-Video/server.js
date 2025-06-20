import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración para __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors()); // Permitir CORS para todas las peticiones
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde /public

// Función genérica para hacer proxy a la API de Clover con headers personalizados
async function proxyCloverApi(req, res, apiUrlBase) {
  try {
    const pageToken = req.query.pageToken || '';
    let apiUrl = apiUrlBase;
    if (pageToken) {
      apiUrl += `&pageToken=${encodeURIComponent(pageToken)}`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        "Accept-Language": "es-MX,es-AR,es-CL,es-CO,es-PE,es-VE,es;q=0.9,es-419;q=0.8",
        "AppPlatform": "3",
        "AppType": "CloverApp",
        "AppVersion": "10000.0.1",
        "Connection": "keep-alive",
        "ContentRegion": "5",
        "CountryCode": "US",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `HTTP error! Status: ${response.status}` });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Rutas proxy para Clover API
app.get('/api/videos', (req, res) => {
  const apiUrl = 'https://api.clover.space/f/v1/blogs?type=recommend&rcmdBlogLabel=video&size=5';
  proxyCloverApi(req, res, apiUrl);
});

app.get('/api/recommended', (req, res) => {
  console.log('Petición /api/recommended recibida');
  const apiUrl = 'https://api.clover.space/f/v1/blogs?type=recommend&size=5';
  proxyCloverApi(req, res, apiUrl);
});

app.get('/api/latest', (req, res) => {
  console.log('Petición /api/latest recibida');
  const apiUrl = 'https://api.clover.space/f/v1/blogs?type=latest&size=5';
  proxyCloverApi(req, res, apiUrl);
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
