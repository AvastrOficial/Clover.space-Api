# Clover.space-Api📡 WebSocket Chat Sender
> Es una herramienta web que establece una conexión en vivo mediante WebSocket para recibir mensajes y enviarlos automáticamente a una API externa. Ideal para integraciones en sistemas de notificaciones, chats en tiempo real o dashboards de monitoreo.

## 🚀 ¿Cómo funciona?
> El script crea una conexión WebSocket hacia un servidor específico, escucha los mensajes entrantes y, cada vez que recibe uno, lo muestra en pantalla y lo reenvía a una API externa usando fetch().

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
