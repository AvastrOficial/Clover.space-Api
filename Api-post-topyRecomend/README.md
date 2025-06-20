# Api Clover.Space Post Recomend y Top

Aplicación web para visualizar blogs recomendados y recientes desde Clover.space.

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
