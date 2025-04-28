 const url = 'wss://api.clover.space/v1/chat/web-ws?sId=Rr9gArpzOGN3ApFXaKmJY00KWeMEyXmy%2B59IpgXyjwdq8QqYNGDJGO%2FmFdEtnKzrjA4%2BgXpl99MJEK2AY%2B31CkGB66AJrgh3lFS86R60ITBbf%2B7tE9tn14oucw0o9SAownr3AhBEtU5t6GAYPPT7OzktxqQ0lR8MyKTtVDNoqxJKXPGQ%2BbbmdwCUGh7Jzn050qb8QITA7AMT670e6ylk1ODErvDqcHqKsgO0xclW%2BxlU28PmW9VCOimWH9E535Ne%2BFB66LpyEq%2BKxMZTMt6qqw%2BitOfi%2BmOObUpUxcbaEG8%3D';
    const messagesDiv = document.getElementById('messages');

    const socket = new WebSocket(url);

    socket.onopen = function() {
      console.log('Conexión WebSocket abierta');
      socket.send('¡Hola, servidor!');
    };

    socket.onmessage = function(event) {
      const messageData = JSON.parse(event.data);
      console.log('Mensaje recibido:', messageData);

      if (messageData && messageData.msg && messageData.msg.author) {
        const nickname = messageData.msg.author.nickname || 'Desconocido';
        const socialId = messageData.msg.author.socialId || 'Desconocido';
        const content = messageData.msg.content || '';
        const recipientNickname = messageData.msg.recipientNickname || 'Desconocido';
        const recipientSocialId = messageData.msg.recipientSocialId || 'Desconocido';
        const senderUID = messageData.msg.author.uid;

        if (content && content !== 'undefined') {
          const messageElement = document.createElement('div');
          messageElement.classList.add('message');

          if (senderUID !== null) {
            messageElement.classList.add(senderUID === 1885294858220892160 ? 'sent' : 'received');
          }

          const receivedText = document.createElement('div');
          receivedText.classList.add('content');
          receivedText.textContent = 'Mensaje recibido:';
          messageElement.appendChild(receivedText);

          const nicknameElement = document.createElement('div');
          nicknameElement.classList.add('nickname');
          nicknameElement.textContent = `Nickname: ${nickname}`;
          messageElement.appendChild(nicknameElement);

          const socialIdElement = document.createElement('div');
          socialIdElement.classList.add('socialId');
          socialIdElement.textContent = `Social ID: ${socialId}`;
          messageElement.appendChild(socialIdElement);

          const contentElement = document.createElement('div');
          contentElement.classList.add('content');
          contentElement.textContent = `Mensaje: ${content}`;
          messageElement.appendChild(contentElement);

          const recipientElement = document.createElement('div');
          recipientElement.classList.add('recipient');
          recipientElement.textContent = `Destinatario: ${recipientNickname}`;
          messageElement.appendChild(recipientElement);

          messagesDiv.appendChild(messageElement);
          messagesDiv.scrollTop = messagesDiv.scrollHeight;

          const messagePayload = {
            nickname: nickname,
            socialId: socialId,
            content: content,
            recipient: recipientSocialId,
            senderUID: senderUID
          };

          fetch('ServerDondeGurdesMensjes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messagePayload)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Datos enviados correctamente:', data);
          })
          .catch(error => {
            console.error('Error al enviar los datos:', error);
          });
        }
      } else {
        console.error('Estructura de datos inesperada:', messageData);
      }
    };

    socket.onerror = function(error) {
      console.error('Error en WebSocket:', error);
    };

    socket.onclose = function(event) {
      console.log('Conexión WebSocket cerrada:', event);
    };

    setInterval(function() {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 2000);
