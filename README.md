# Clover.space-Api

📜 Documentación del Script de WebSocket y Envío de Mensajes
📖 Descripción General
Este script JavaScript establece una conexión WebSocket con el servidor en wss://api.clover.space/v1/chat/web-ws, escucha los mensajes entrantes, los procesa y los muestra en el navegador dentro de un <div> con id messages.
Además, envía la información de los mensajes recibidos a una API externa mediante una petición HTTP POST:

https://680adf85d5075a76d989255b.mockapi.io/DeepNet/R/1/P

📂 Estructura del Script
1. Definición de Variables Iniciales
javascript
Copiar
Editar
const url = 'wss://api.clover.space/v1/chat/web-ws?...';
const messagesDiv = document.getElementById('messages');
url: Contiene la dirección WebSocket con parámetros de conexión codificados.

messagesDiv: Referencia al elemento HTML donde se mostrarán los mensajes recibidos.

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
Se imprime en consola que la conexión está abierta.

Se envía un mensaje inicial para confirmar la conexión.

socket.onmessage
javascript
Copiar
Editar
socket.onmessage = function(event) {
  const messageData = JSON.parse(event.data);
  // Procesamiento de mensaje...
};
Se convierte event.data de JSON a objeto JavaScript.

Se valida que messageData contenga estructura.

Se extraen los siguientes datos:

nickname

socialId

content

recipientNickname

recipientSocialId

senderUID

Si el contenido no está vacío:

Se crea un bloque HTML dinámico para mostrar el mensaje.

Se clasifica como enviado o recibido.

Se añade al messagesDiv.

Se envía la información a la API externa.

Detalle del fetch:
javascript
Copiar
Editar
fetch('https://680adf85d5075a76d989255b.mockapi.io/DeepNet/R/1/P', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(messagePayload)
});
Envía la información de cada mensaje a una API REST en formato JSON.

socket.onerror
javascript
Copiar
Editar
socket.onerror = function(error) {
  console.error('Error en WebSocket:', error);
};
Captura y muestra errores en consola.

socket.onclose
javascript
Copiar
Editar
socket.onclose = function(event) {
  console.log('Conexión WebSocket cerrada:', event);
};
Informa el cierre de la conexión WebSocket.

4. Scroll Automático de Mensajes
javascript
Copiar
Editar
setInterval(function() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}, 2000);
Cada 2 segundos, fuerza el scroll hacia el último mensaje recibido (efecto de chat en vivo).

🛠️ Resumen de Funcionalidades

Función	Descripción
Conexión WebSocket	Se conecta al servidor Clover.space para recibir mensajes de chat.
Recepción de mensajes	Lee, procesa y muestra los mensajes entrantes en pantalla.
Clasificación de mensajes	Distingue si el mensaje fue enviado o recibido usando senderUID.
Envío de datos a API externa	Envía la información del mensaje a una API REST pública usando POST.
Scroll automático	Mantiene visible el último mensaje en pantalla constantemente.
Manejo de errores	Registra errores de la conexión WebSocket en consola.
💡 Notas Adicionales
El senderUID 1885294858220892160 parece representar al usuario actual.

Si un mensaje proviene de este UID, se clasifica como enviado (sent), de lo contrario como recibido (received).

El parámetro sId en la URL parece ser un identificador de sesión codificado (Base64/URL).

fetch es una llamada asincrónica (Promise).

Actualmente no existe un sistema de reconexión automática en caso de que la conexión WebSocket se cierre.


