    let currentPageToken = '';
    let allUsers = [];
    let isLoading = false;
    let hasMorePages = false;

    const corsProxy = 'https://api.allorigins.win/raw?url=';

    function getAvatarUrl(user) {
      if (user.icon && Array.isArray(user.icon.resourceList) && user.icon.resourceList.length > 0) {
        const exact = user.icon.resourceList.find(r => r.width === 121 && r.height === 121 && r.url);
        if (exact) return exact.url;

        const sortedResources = user.icon.resourceList
          .filter(r => r.url)
          .sort((a, b) => (a.width * a.height) - (b.width * b.height));
        if (sortedResources.length > 0) return sortedResources[0].url;
      }
      return '';
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    }

    function renderUsers(users) {
      const container = document.getElementById("userList");

      // Ordenar usuarios del más viejo al más reciente
      const sortedUsers = [...users].sort((a, b) => {
        const dateA = new Date(a.extensions?.lastOpenDate || 0);
        const dateB = new Date(b.extensions?.lastOpenDate || 0);
        return dateA - dateB;
      });

      container.innerHTML = "";

      sortedUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        const avatarImage = document.createElement('img');
        avatarImage.src = getAvatarUrl(user);
        avatar.appendChild(avatarImage);

        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info');

        const userName = document.createElement('h3');
        userName.textContent = user.nickname || 'Nombre no disponible';
        userInfo.appendChild(userName);

        const userSocialId = document.createElement('p');
        userSocialId.textContent = `ID Social: ${user.socialId || 'No disponible'}`;
        userInfo.appendChild(userSocialId);

        const userGender = document.createElement('p');
        userGender.textContent = `Género: ${user.gender === 1 ? 'Masculino' : user.gender === 2 ? 'Femenino' : 'No especificado'}`;
        userInfo.appendChild(userGender);

        const userStatus = document.createElement('p');
        userStatus.textContent = `Estado: ${user.status === 1 ? 'Activo' : 'Inactivo'}`;
        userInfo.appendChild(userStatus);

        const userLocation = document.createElement('p');
        const location = user.location?.address?.es || 'Dirección no disponible';
        userLocation.textContent = `Ubicación: ${location}`;
        userInfo.appendChild(userLocation);

        const userLastOpenDate = document.createElement('p');
        const lastOpenDate = user.extensions?.lastOpenDate ? formatDate(user.extensions.lastOpenDate) : 'Fecha no disponible';
        userLastOpenDate.textContent = `Última apertura: ${lastOpenDate}`;
        userInfo.appendChild(userLastOpenDate);

        const profileButton = document.createElement('button');
        profileButton.classList.add('profile-button');
        profileButton.textContent = 'Ver Perfil';
        profileButton.onclick = () => {
          window.open(`https://clover.space/s/u/${user.socialId}`, '_blank');
        };
        userInfo.appendChild(profileButton);

        userCard.appendChild(avatar);
        userCard.appendChild(userInfo);
        container.appendChild(userCard);
      });
    }

    async function fetchUsers(pageToken = '') {
      const baseUrl = 'https://api.clover.space/f/v1/users/namecards';
      let url = pageToken ? `${baseUrl}?pageToken=${encodeURIComponent(pageToken)}` : `${baseUrl}?size=30`;
      const finalUrl = corsProxy + encodeURIComponent(url);

      if (isLoading) return;
      isLoading = true;

      document.getElementById('loadingMessage').style.display = 'block';
      document.getElementById('endMessage').style.display = 'none';

      try {
        const response = await fetch(finalUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data.list) && data.list.length > 0) {
          allUsers = allUsers.concat(data.list);
          renderUsers(allUsers);
        }

        const nextToken = data.pagination?.nextPageToken;
        if (nextToken) {
          currentPageToken = nextToken;
          hasMorePages = true;
        } else {
          hasMorePages = false;
          document.getElementById('endMessage').style.display = 'block';
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error.message || error);
        hasMorePages = false;
        document.getElementById('endMessage').style.display = 'block';
      } finally {
        isLoading = false;
        document.getElementById('loadingMessage').style.display = 'none';
        // Delay para evitar error 429
        await new Promise(res => setTimeout(res, 1500));
      }
    }

    async function main() {
      await fetchUsers();
    }

    // Scroll infinito
    window.addEventListener('scroll', async () => {
      const scrollY = window.scrollY;
      const visible = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollY + visible >= fullHeight - 100 && hasMorePages && !isLoading) {
        await fetchUsers(currentPageToken);
      }
    });

    main();
