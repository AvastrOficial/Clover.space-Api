import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Necesario para __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS por si haces peticiones desde otro dominio
app.use(cors());

// Servir HTML y recursos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta proxy con headers personalizados
app.get('/api/videos', async (req, res) => {
  const pageToken = req.query.pageToken || '';
  let apiUrl = 'https://api.clover.space/f/v1/blogs?type=recommend&rcmdBlogLabel=video&size=5';
  if (pageToken) apiUrl += `&pageToken=${encodeURIComponent(pageToken)}`;

  try {
    const response = await fetch(apiUrl, {
      // Dentro de fetch(apiUrl, { headers: { ... } })
      headers: {
        "Accept-Language": "es-MX,es-AR,es-CL,es-CO,es-PE,es-VE,es;q=0.9,es-419;q=0.8",
        "AppPlatform": "3",
        "AppType": "CloverApp",
        "AppVersion": "10000.0.1",
        "Connection": "keep-alive",
        "ContentRegion": "5",
        "CountryCode": "US"
      }

    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servir index.html en raíz /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
