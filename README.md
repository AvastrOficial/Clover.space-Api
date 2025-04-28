# Clover.space-Api

<div align="center">
📜 WebSocket Chat & API Sender
Script para conexión WebSocket, recepción de mensajes en vivo y envío de datos a una API externa.

</div>
🚀 Descripción General
Este script JavaScript establece una conexión WebSocket a:

wss://api.clover.space/v1/chat/web-ws

Permite:

📥 Escuchar mensajes entrantes.

📤 Mostrar mensajes en un <div id="messages">.

🌐 Enviar los mensajes recibidos a una API externa mediante una petición HTTP POST:

https://680adf85d5075a76d989255b.mockapi.io/DeepNet/R/1/P

📂 Estructura del Script
1. Variables Iniciales
javascript
Copiar
Editar
const url = 'wss://api.clover.space/v1/chat/web-ws?...';
const messagesDiv = document.getElementById('messages');
url: Dirección WebSocket con parámetros codificados.

messagesDiv: Contenedor HTML donde se imprimirán los mensajes.

2. Conexión WebSocket
javascript
Copiar
Editar
const socket = new WebSocket(url);
Se instancia la conexión al servidor WebSocket.

3. Manejadores de Eventos

Evento	Acción
onopen	Notifica la apertura de la conexión y envía un mensaje de saludo.
onmessage	Procesa y muestra el mensaje, además de enviarlo a una API externa.
onerror	Muestra los errores de conexión en consola.
onclose	Informa el cierre de la conexión WebSocket.
✉️ Ejemplo de onmessage
javascript
Copiar
Editar
socket.onmessage = function(event) {
  const messageData = JSON.parse(event.data);
  
  // Procesar mensaje
  if (messageData?.msg?.content) {
    // Crear HTML dinámico
    // Enviar información a la API externa
  }
};
4. Envío de Datos a API Externa
javascript
Copiar
Editar
fetch('https://680adf85d5075a76d989255b.mockapi.io/DeepNet/R/1/P', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(messagePayload)
});
Método: POST

Formato: application/json

Objetivo: Reportar cada mensaje recibido a la API.

5. Scroll Automático
javascript
Copiar
Editar
setInterval(function() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}, 2000);
Simula el efecto de "chat en vivo", mostrando siempre el último mensaje.

🛠️ Funcionalidades

Función	Descripción
🔌 Conexión WebSocket	Se conecta al servidor para recepción de mensajes.
📨 Recepción de mensajes	Procesa y muestra mensajes nuevos en pantalla.
🧹 Clasificación de mensajes	Diferencia entre enviados y recibidos usando senderUID.
🔄 Envío a API externa	Envía cada mensaje a un servidor REST público.
📜 Scroll automático	Asegura que siempre se vea el último mensaje.
⚠️ Manejo de errores	Detecta y registra errores de la conexión WebSocket.
💡 Notas Adicionales
🆔 senderUID = 1885294858220892160 identifica al usuario actual (mensajes enviados).

📎 El parámetro sId en la URL parece ser un token de sesión codificado en Base64.

🔗 fetch() usa promesas asincrónicas para enviar datos.

❌ No hay reconexión automática implementada si la conexión WebSocket se cierra.

<div align="center">
Hecho con 💻, ☕ y mucha paciencia.
Contribuciones y mejoras son bienvenidas.

</div>

