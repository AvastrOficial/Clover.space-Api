# Api Clover.Space Post Video

Este proyecto es un servidor Node.js con Express que actúa como intermediario (proxy) para acceder a una API externa (`https://api.clover.space/f/v1/blogs`) con cabeceras personalizadas. Además, sirve una página web estática desde la carpeta `/public`.

## ¿Para qué sirve?

Este servidor permite:

- Obtener videos recomendados desde la API de Clover Space usando una ruta local (`/api/videos`).
- Agregar cabeceras específicas necesarias para que la API funcione correctamente.
- Evitar problemas de **CORS** cuando accedes a esta API desde el frontend (navegador).
- Servir contenido estático (HTML, CSS, JS) desde una carpeta pública.

## ¿Cómo funciona?

1. **Servidor Express:** Levanta un servidor en el puerto `3000`.
2. **CORS habilitado:** Usa el middleware `cors()` para permitir solicitudes desde otros orígenes.
3. **Rutas:**
   - `/api/videos`: Hace una solicitud a la API de Clover con los headers requeridos, devuelve los resultados en JSON.
   - `/`: Sirve el archivo `index.html` desde la carpeta `/public`.
4. **Cabeceras personalizadas:** Se usan para simular una app oficial que accede a Clover Space y evitar bloqueos.

## Instalación y uso

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/clover-proxy-server.git
 
   cd clover-proxy-server
     ```
## Instala las dependencias:

   ```bash
npm install
   ```

## Ejecuta el servidor:

   ```bash
node index.js
   ```

Si estás usando ES modules, asegúrate de que el archivo sea .mjs o que "type": "module" esté en package.json.

Abre tu navegador y visita:

   ```bash
http://localhost:3000

   ```
## Tecnologías utilizadas
> Node.js
> Express
> node-fetch: Para hacer solicitudes HTTP a la API externa.
> cors: Para habilitar solicitudes entre dominios.
> ES Modules: Para utilizar import/export en lugar de require.

## Estructura del proyecto

   ```bash
📁 clover-proxy-server/
├── public/
│   └── index.html
├── index.js
└── README.md
   ```
