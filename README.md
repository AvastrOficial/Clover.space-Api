# Clover.space-Api📡 WebSocket Chat Sender
![Vistas](https://visitor-badge.laobi.icu/badge?page_id=Clover.Space-Api&left_text=Vistas&left_color=%23000000&right_color=%23666666)
> Es una herramienta web que establece una conexión en vivo mediante WebSocket para recibir mensajes y enviarlos automáticamente a una API externa. Ideal para integraciones en sistemas de notificaciones, chats en tiempo real o dashboards de monitoreo.

## 🚀 ¿Cómo funciona?
> El script crea una conexión WebSocket hacia un servidor específico, escucha los mensajes entrantes y, cada vez que recibe uno, lo muestra en pantalla y lo reenvía a una API externa usando fetch().

## Requesitos :
> Ocupas Un Servidro Temporal 
- `https://cors-anywhere.herokuapp.com/corsdemo`
## 🌐 Servidor WebSocket
- `wss://api.clover.space/v1/chat/web-ws`
La URL incluye parámetros personalizados como sId y accessToken, que identifican al usuario y autorizan la conexión.

## 📤 API de destino para envío
Cada mensaje recibido es enviado a:
- `https://680adf85******.mockapi.io/BszApi`
- El envío es en formato application/json, facilitando la integración con otros sistemas backend.

## ✨ Características principales
> Funcionalidad	Descripción
> Conexión en vivo	Se conecta mediante WebSocket en tiempo real.
> Recepción de mensajes	Escucha y muestra mensajes entrantes.
> Reenvío a API externa	Cada mensaje se reenvía automáticamente a una API REST.
> Scroll automático	El área de mensajes se mantiene siempre enfocada al último mensaje.
> Manejo de errores	Detecta errores de conexión y los muestra en consola.
## 🛠️ Tecnologías utilizadas
- HTML5
- JavaScript (Vanilla)
- WebSocket API
- Fetch API

## 📸 Ejemplo visual
```bash
  [Usuario] Hola, ¿cómo estás?<br>
  [Bot] ¡Hola! ¿En qué puedo ayudarte hoy?<br>
```
El div de mensajes se actualiza en tiempo real conforme llegan nuevos mensajes.
![image](https://github.com/user-attachments/assets/18531523-9559-448f-b980-7ca7f1131195)
![image](https://github.com/user-attachments/assets/5e0b738f-792a-4e29-a017-0c26e9d6eb41)

## 📝 Cómo usar
- Asegúrate de incluir el archivo JavaScript en tu proyecto.
- Personaliza la URL del WebSocket si es necesario.
- Asegúrate que el contenedor HTML tenga el ID messages.
- El script gestionará la conexión, la escucha y el reenvío automáticamente.

##⚠️ Advertencias
- Asegúrate de manejar correctamente la seguridad del WebSocket y la API REST si piensas usar este proyecto en producción.
- El servidor WebSocket puede requerir tokens de sesión válidos y actualizados.
- La API Mock utilizada puede tener límites de uso.

![image](https://github.com/user-attachments/assets/6a054731-cbc8-44d3-b2f9-e763bc8210d0)

## Como Generar Tu Propio Token :
Paso 1 : 
- `https://files.catbox.moe/s5gmv8.mp4`

paso 2 : 
- `https://files.catbox.moe/bw76gu.mp4`
## 📤 API de destintos temas :
Api Y Documentacion Para Ver Los Post Resientes y TOP
- `https://github.com/AvastrOficial/Clover.Space-PostBlog-Apis`

Api Y Documentacion para ver La Lista De Usuarios
- `https://github.com/AvastrOficial/Clover.Space-ListUser-Api`

---

# Api Clover.Space Post Video

Este proyecto es un servidor Node.js con Express que actúa como intermediario (proxy) para acceder a una API externa (`https://api.clover.space/f/v1/blogs`) con cabeceras personalizadas. Además, sirve una página web estática desde la carpeta `/public`.
### Web :
https://appbsz.crearforo.net/h156-videos-clover-space	

## 🌎 Regiones Soportadas
El servidor solo acepta solicitudes de las siguientes regiones:

```javascript
headers: {
  "Accept-Language": "es-MX,es-AR,es-CL,es-CO,es-PE,es-VE,es;q=0.9,es-419;q=0.8"
}
```
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
---

# Api Clover.Space Post Recomend y Top

Aplicación web para visualizar blogs recomendados y recientes desde Clover.space.
### web : 
https://appbsz.crearforo.net/h157-post-de-clover-space-bsz	

## Estructura del Proyecto

```html
<div class="container">
  <!-- Panel Izquierdo - Recomendados -->
  <div class="panel">
    <h1>Blogs Recomendados</h1>
    <button id="loadRecommendedBtn">Cargar Recomendados</button>
    <div id="recommendedContainer"></div>
  </div>

  <!-- Panel Derecho - Recientes -->
  <div class="panel">
    <h1>Blogs Recientes</h1>
    <button id="loadLatestBtn">Cargar Recientes</button>
    <div id="latestContainer"></div>
  </div>
</div>
```

## Funcionalidades JavaScript
Renderizado de Blogs
```javascript
function renderBlogs(blogs, containerId) {
  // Muestra tarjetas de blog con:
  // - Imagen (si está disponible)
  // - Fecha de actualización
  // - Idioma
  // - Contenido resumido
  // - Información del autor
  // - Botón de perfil (si hay socialId)
  // - Enlace al blog completo
}
```
## Obtención de Blogs
```javascript
async function fetchAllBlogs(apiUrl, pageToken = '', collectedBlogs = []) {
  // Recupera todos los blogs paginados de la API
  // Maneja tokens de paginación automáticamente
  // Devuelve una promesa con todos los blogs concatenados
}
```
## Endpoints
> Blogs recomendados: /api/recommended
> Blogs recientes: /api/latest

## Eventos
> Cargar Recomendados: Obtiene y muestra blogs recomendados
> Cargar Recientes: Obtiene y muestra blogs recientes

## Características
> Diseño de dos paneles (recomendados y recientes)
> Carga paginada completa de todos los blogs disponibles
> Visualización de imágenes, metadatos y contenido
> Enlaces a perfiles de usuario y blogs completos
> Estados de carga y manejo de errores

## Requisitos
> Servidor proxy configurado en /api/recommended y /api/latest

## Navegador moderno con soporte para ES6
- Haz clic en "Cargar Recomendados" para ver blogs destacados
- Haz clic en "Cargar Recientes" para ver las publicaciones más nuevas
- Usa "Ver Perfil" para abrir el perfil del autor
- Haz clic en "Leer más" para ver el blog completo

## Estructura de Datos del Blog

| Campo        | Tipo              | Descripción |
|--------------|-------------------|-------------|
| `mediaList`  | Array\<Object\>   | Lista de recursos multimedia asociados al blog. Cada objeto contiene un `resourceList` con URLs de los recursos. |
| `updatedTime`| String            | Fecha y hora de la última actualización del blog en formato ISO. |
| `language`   | String            | Idioma principal del contenido del blog (ej. "es", "en"). |
| `content`    | String            | Texto completo o parcial del blog. Puede contener HTML/markup. |
| `summary`    | String            | Resumen o descripción breve del contenido del blog. |
| `author`     | Object            | Información del autor:<br>- `nickname`: Nombre público<br>- `socialId`: ID único para enlace al perfil |
| `url`        | String            | URL completa para acceder al blog en la plataforma. |
