# Clover.space-Api

📜 Documentación del Script de WebSocket y Envío de Mensajes
Descripción general
Este script JavaScript establece una conexión WebSocket a un servidor en wss://api.clover.space/v1/chat/web-ws, escucha los mensajes entrantes, los procesa y los muestra en el navegador dentro de un div con id messages.
Además, envía la información del mensaje recibido a una API externa (https://680adf85d5075a76d989255b.mockapi.io/DeepNet/R/1/P) utilizando una petición HTTP POST.

📂 Estructura del Script
1. Definición de Variables Iniciales
javascript
Copiar
Editar
const url = 'wss://api.clover.space/v1/chat/web-ws?...'; 
const messagesDiv = document.getElementById('messages');
url: contiene la dirección WebSocket con parámetros de conexión codificados.

messagesDiv: referencia al elemento HTML donde se mostrarán los mensajes recibidos.

2. Creación de Conexión WebSocket
javascript
Copiar
Editar
const socket = new WebSocket(url);
Se instancia un objeto WebSocket que abre una conexión con la URL especificada.

3. Manejadores de Eventos de WebSocket
socket.onopen
javascript
Copiar
Editar
socket.onopen = function() {
  console.log('Conexión WebSocket abierta');
  socket.send('¡Hola, servidor!');
};
Cuando la conexión se abre, se imprime un mensaje en consola.

Se envía un mensaje inicial (¡Hola, servidor!) al servidor para confirmar la conexión.

socket.onmessage
javascript
Copiar
Editar
socket.onmessage = function(event) {
  const messageData = JSON.parse(event.data);
  ...
};
Cuando se recibe un mensaje:

Se parsea el event.data de JSON a un objeto de JavaScript (messageData).

Se valida que messageData tenga estructura (msg y msg.author).

Se extraen datos importantes:

nickname → nombre del autor

socialId → identificador social del autor

content → contenido del mensaje

recipientNickname → nombre del destinatario

recipientSocialId → identificador social del destinatario

senderUID → identificador único del remitente

Si el contenido no está vacío:

Se crea dinámicamente un bloque HTML (div) para mostrar el mensaje y sus metadatos.

Se clasifica el mensaje como enviado (sent) o recibido (received) dependiendo del senderUID.

Se añade el mensaje al messagesDiv.

Se envía un objeto messagePayload con la información relevante a la API externa usando fetch.

Detalle del fetch
javascript
Copiar
Editar
fetch('https://680adf85d5075a76d989255b.mockapi.io/DeepNet/R/1/P', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(messagePayload)
})
Envía la información del mensaje recibido como un objeto JSON a una API REST.

socket.onerror
javascript
Copiar
Editar
socket.onerror = function(error) {
  console.error('Error en WebSocket:', error);
};
Captura y muestra errores de conexión del WebSocket.

socket.onclose
javascript
Copiar
Editar
socket.onclose = function(event) {
  console.log('Conexión WebSocket cerrada:', event);
};
Informa cuando la conexión WebSocket se ha cerrado.

4. Scroll Automático de Mensajes
javascript
Copiar
Editar
setInterval(function() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}, 2000);
Cada 2 segundos, se fuerza el scroll del messagesDiv hacia abajo para siempre mostrar el último mensaje recibido, como en un chat en vivo.

🛠️ Resumen de funcionalidades

Función	Descripción
Conexión WebSocket	Se conecta al servidor clover.space para recibir mensajes de chat.
Recepción de mensajes	Lee, procesa y muestra los mensajes entrantes en pantalla.
Clasificación de mensajes	Diferencia si el mensaje fue enviado o recibido según el senderUID.
Envío de datos a API externa	Reporta la información de los mensajes a una API REST pública usando POST.
Scroll automático	Mantiene siempre visible el último mensaje en pantalla.
Manejo de errores	Registra fallos en la conexión WebSocket.
💡 Notas adicionales
El senderUID 1885294858220892160 parece representar al usuario actual.
Si un mensaje es de este UID, se clasifica como sent (enviado); de lo contrario como received (recibido).

sId en la URL es un parámetro de sesión codificado en base64/URL, posiblemente usado para autenticar al cliente.

fetch realiza una llamada asincrónica (promise) para enviar los datos.

No hay un sistema de reconexión automática si se pierde la conexión (onclose solo muestra en consola).

