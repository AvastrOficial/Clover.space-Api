# 🌐 Blog Crawler y Almacenamiento – Clover API → MockAPI
> Este script realiza la búsqueda automatizada de publicaciones tipo blog relacionadas con `t.me` en la API de **Clover.space**, y las guarda en la API de **MockAPI.io** por lotes (batch) hasta alcanzar un límite definido.
![image](https://github.com/user-attachments/assets/42eb5db6-80a9-490c-9c64-6b5747981645)

---

## 🚀 ¿Qué hace este script?

- Realiza peticiones a la API `https://api.clover.space` para buscar blogs que contengan `t.me`.
- Almacena cada blog encontrado en la API externa de MockAPI (`https://mockapi.io/Api/Bsz/Busqueda`).
- Controla el flujo por páginas (`nextPageToken`), maneja errores y permite guardar hasta una cantidad máxima definida (`blogsGoal`).

---

## 📌 Variables principales

| Variable      | Descripción                                                                 |
|---------------|------------------------------------------------------------------------------|
| `API_BASE`    | URL base de la API de Clover, configurada para buscar `t.me`.               |
| `MOCKAPI_URL` | Endpoint donde se almacenarán los datos procesados.                         |
| `HEADERS`     | Encabezados requeridos por Clover API para autenticación y simulación de app.|
| `blogsGoal`   | Cantidad máxima de blogs a recolectar (por defecto: 100).                   |

---

## 🧠 Funciones importantes

### 🔁 `delay(ms)`
> Agrega una pausa en milisegundos para evitar sobrecargar las APIs.

```js
const delay = ms => new Promise(res => setTimeout(res, ms));
```

---

## 📥 async function postBlog(blog, batchId)
> Envía un blog al servidor de MockAPI con un identificador de lote (batchId).
```js
await fetch(MOCKAPI_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ batchId, blog })
});
```

---

## 🌐 async function fetchPage(nextPageToken = '')
> Solicita una página de blogs desde Clover API. Usa nextPageToken si existe para continuar con la siguiente página.
```js
const { list, pagination } = await fetch(url).then(res => res.json());
```

---

## 🔄 async function loop()
> Función principal que coordina el proceso:
> Itera sobre las páginas de blogs.
> Guarda cada blog en MockAPI.
> Aumenta el batchId cada 1000 blogs.
> Se detiene al alcanzar blogsGoal.

---

## 🔐 Headers de Clover API
Los headers como rawdeviceid, appversion, sid, etc., son necesarios para simular una aplicación legítima de Clover.
No deben omitirse ni modificarse sin comprender su función, ya que pueden invalidar la autenticación con el servidor.

