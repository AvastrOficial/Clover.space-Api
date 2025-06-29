// Solo podras hacer una busquda si estas registrado en https://clover.space/ funciona igual para https://clover.social/

(async function () {
  const API_BASE = 'https://api.clover.space/v2/search/blogs?word=t.me&size=30';
  const MOCKAPI_URL = 'https://mockapi.io/';

  const HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-MX,es;q=0.9,es-419;q=0.8",
    "appplatform": "3",
    "apptype": "CloverApp",
    "appversion": "10000.0.1",
    "contentregion": "5",
    "countrycode": "US",
    "devicetype": "1",
    "hjtrfs": "", ---> esto lo tendras que agregar tu 
    "nonce": "", ---> esto lo tendras que agregar tu 
    "ostype": "2",
    "rawdeviceid": "", ---> esto lo tendras que agregar tu 
    "rawdeviceidthree": "", ---> esto lo tendras que agregar tu 
    "reqtime": "", ---> esto lo tendras que agregar tu 
    "sec-ch-ua": "\"Microsoft Edge\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sid": "", ---> esto lo tendras que agregar tu 
    "timezone": "-360",
    "timezoneid": "America/Mexico_City"
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function postBlog(blog, batchId) {
    const payload = { batchId, blog };
    const res = await fetch(MOCKAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`❌ Error al guardar blogId ${blog.blogId}`);
    return res.json();
  }

  async function fetchPage(nextPageToken = '') {
    let url = API_BASE;
    if (nextPageToken) url += `&pageToken=${encodeURIComponent(nextPageToken)}`;
    const res = await fetch(url, { method: 'GET', headers: HEADERS });
    if (!res.ok) throw new Error('❌ HTTP error ' + res.status);
    const data = await res.json();
    return {
      nextPageToken: data.pagination?.nextPageToken || null,
      list: data.list || []
    };
  }

  async function loop() {
    let token = '';
    let batchId = 1;
    let blogCounter = 0;
    const blogsPerBatch = 1000;

    while (token !== null) {
      try {
        const { nextPageToken, list } = await fetchPage(token);
        token = nextPageToken;

        for (const item of list) {
          try {
            await postBlog(item.blog, batchId);
            blogCounter++;
            console.log(`✅ Blog #${blogCounter} guardado en batch ${batchId}`);
            await delay(100);

            if (blogCounter >= blogsPerBatch) {
              batchId++;
              blogCounter = 0;
              console.log(`🚩 Límite alcanzado. Cambiando a batch ${batchId}`);
              await delay(1000);
            }
          } catch (e) {
            console.error('⚠️ Error al guardar blog:', e.message);
          }
        }

        await delay(500);
      } catch (e) {
        console.error('⚠️ Error en fetch de página:', e.message);
        break;
      }
    }

    console.log('🎉 Proceso completado.');
  }

  loop();
})();
