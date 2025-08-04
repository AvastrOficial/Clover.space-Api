# 🌐 Clover Space Namecards Viewer

Este proyecto es una interfaz web que permite listar y visualizar usuarios de **Clover Space** utilizando su API pública. Los usuarios se muestran con su avatar, nombre, ID social, género, estado, ubicación y fecha de última actividad.

Incluye funcionalidad de **scroll infinito** para cargar automáticamente más usuarios conforme se navega hacia el final de la página.
<img width="1596" height="326" alt="image" src="https://github.com/user-attachments/assets/5cfa1fa6-04b2-4389-882f-472a48135145" />


web : https://appbsz.crearforo.net/h166-usuarios-clover	
---

## 🚀 Funcionalidades

- 🔄 Carga dinámica de usuarios desde la API de Clover Space.
- 🖼️ Muestra avatares en alta calidad si están disponibles.
- 📅 Muestra fecha de última apertura en formato local (es-ES).
- 📍 Detalla ubicación si está disponible.
- 🧭 Ordena usuarios por última actividad (de más antiguo a reciente).
- 🖱️ Botón "Ver Perfil" que abre el perfil público del usuario.
- ⏬ Soporta scroll infinito.
- 🌐 Uso de proxy CORS (`allorigins.win`) para evitar restricciones cross-domain.

---

## 📦 Archivos principales

- `index.html`: HTML que contiene el contenedor para los usuarios y los mensajes de carga.
- `main.js`: Código JavaScript con lógica de renderizado, llamada a la API, y manejo de scroll.
- `styles.css`: (No incluido aquí, pero se espera un diseño responsivo con tarjetas de usuario).

---

## 🧠 Cómo funciona

1. Se hace una petición a la API de Clover Space a través de un proxy CORS.
2. Se procesan los datos y se ordenan según la fecha de última apertura.
3. Se renderiza cada usuario en una tarjeta personalizada con:
   - Avatar
   - Nombre y ID Social
   - Género y estado
   - Ubicación
   - Fecha de última actividad
   - Enlace al perfil

4. El scroll infinito detecta cuando el usuario está cerca del final de la página y automáticamente carga más usuarios si hay más páginas disponibles (`nextPageToken`).

---

## 📌 Requisitos

- Navegador moderno con soporte para `fetch`, `async/await` y `ES6`.
- Conexión a internet (el sistema depende de una API externa).
- Permitir ejecución de JavaScript y acceso a recursos remotos (CORS).

---

## 🛠️ Tecnologías utilizadas

- HTML5
- JavaScript (ES6+)
- API pública de Clover Space
- [allorigins.win](https://allorigins.win) como proxy CORS

---

## 📎 Notas

- Se utiliza `setTimeout` para evitar errores 429 (too many requests).
- La API de Clover Space puede cambiar o restringirse, lo que podría afectar la funcionalidad del visor.
- Si deseas un diseño más atractivo, puedes agregar un archivo CSS que le dé estilo a las `.user-card`, `.avatar`, `.user-info`, etc.

## 📌 Requisitos Técnicos para Acceder a la Lista

### ✅ 1. **Permiso Público de API**
La API de Clover Space utilizada en este proyecto no requiere autenticación (`public endpoint`) y permite acceso sin token:

```js
GET https://api.clover.space/f/v1/users/namecards

```
### ✅ 2. **Uso de Proxy CORS**
Debido a que la API **no permite llamadas directas desde el navegador por CORS**, se necesita un **proxy CORS**. Este proyecto utiliza:

`https://api.allorigins.win/raw?url=`

El endpoint final queda así:

`https://api.allorigins.win/raw?url=https%3A%2F%2Fapi.clover.space%2Ff%2Fv1%2Fusers%2Fnamecards`

> ⚠️ Si quieres evitar el proxy, deberás montar un servidor backend que reenvíe la solicitud (Node.js, Python, etc.).

