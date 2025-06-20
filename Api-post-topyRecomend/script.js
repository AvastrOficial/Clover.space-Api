  // ========== Funciones compartidas ==========
    function renderBlogs(blogs, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      const reversedBlogs = blogs.slice().reverse();

      reversedBlogs.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';

        let imageUrl = '';
        if (Array.isArray(blog.mediaList) && blog.mediaList.length > 0) {
          const media = blog.mediaList[0];
          if (Array.isArray(media.resourceList) && media.resourceList.length > 0) {
            imageUrl = media.resourceList[0].url;
          }
        }
        if (imageUrl) {
          const img = document.createElement('img');
          img.className = 'blog-image';
          img.src = imageUrl;
          img.alt = 'Imagen del blog';
          card.appendChild(img);
        }

        const updated = document.createElement('div');
        updated.className = 'blog-updated';
        updated.textContent = `Actualizado: ${blog.updatedTime || 'Desconocido'}`;
        card.appendChild(updated);

        const language = document.createElement('div');
        language.className = 'blog-language';
        language.textContent = `Idioma: ${blog.language || 'Desconocido'}`;
        card.appendChild(language);

        const content = document.createElement('div');
        content.className = 'blog-content';
        content.textContent = `Contenido: ${blog.content ? blog.content : 'No disponible'}`;
        card.appendChild(content);

        const description = document.createElement('div');
        description.className = 'blog-description';
        description.textContent = blog.summary || 'Sin descripción.';
        card.appendChild(description);

        const userInfo = document.createElement('div');
        userInfo.className = 'blog-userinfo';
        const nickname = blog.author?.nickname || 'Usuario desconocido';
        const socialId = blog.author?.socialId || '';
        userInfo.textContent = `Publicado por: ${nickname}`;
        card.appendChild(userInfo);

        if (socialId) {
          const profileButton = document.createElement('button');
          profileButton.classList.add('profile-button');
          profileButton.textContent = 'Ver Perfil';
          profileButton.onclick = () => {
            window.open(`https://clover.space/s/u/${socialId}`, '_blank');
          };
          card.appendChild(profileButton);
        }

        const link = document.createElement('a');
        link.className = 'blog-link';
        link.href = blog.url || '#';
        link.target = '_blank';
        link.textContent = 'Leer más';
        card.appendChild(link);

        container.appendChild(card);
      });
    }

    async function fetchAllBlogs(apiUrl, pageToken = '', collectedBlogs = []) {
      let fullUrl = apiUrl;
      if (pageToken) fullUrl += `&pageToken=${pageToken}`;
      console.log(`Solicitando: ${fullUrl}`);

      try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.list && Array.isArray(data.list)) {
          collectedBlogs = collectedBlogs.concat(data.list);
        }

        if (data.nextPageToken) {
          return fetchAllBlogs(apiUrl, data.nextPageToken, collectedBlogs);
        } else {
          return collectedBlogs;
        }
      } catch (error) {
        console.error('Error al obtener blogs:', error);
        throw error;
      }
    }

    // Endpoints del servidor proxy
    const recommendedApi = '/api/recommended';
    const latestApi = '/api/latest';

    // Eventos para botones
    document.getElementById('loadRecommendedBtn').addEventListener('click', () => {
      const btn = document.getElementById('loadRecommendedBtn');
      const container = document.getElementById('recommendedContainer');
      btn.textContent = 'Cargando...';
      container.textContent = '';
      fetchAllBlogs(recommendedApi)
        .then(blogs => {
          renderBlogs(blogs, 'recommendedContainer');
          btn.textContent = 'Recargar Recomendados';
        })
        .catch(err => {
          console.error(err);
          container.textContent = 'Error al cargar blogs recomendados: ' + err.message;
          btn.textContent = 'Cargar Recomendados';
        });
    });

    document.getElementById('loadLatestBtn').addEventListener('click', () => {
      const btn = document.getElementById('loadLatestBtn');
      const container = document.getElementById('latestContainer');
      btn.textContent = 'Cargando...';
      container.textContent = '';
      fetchAllBlogs(latestApi)
        .then(blogs => {
          renderBlogs(blogs, 'latestContainer');
          btn.textContent = 'Recargar Recientes';
        })
        .catch(err => {
          console.error(err);
          container.textContent = 'Error al cargar blogs recientes: ' + err.message;
          btn.textContent = 'Cargar Recientes';
        });
    });
