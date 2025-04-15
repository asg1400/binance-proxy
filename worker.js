addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = 'https://eapi.binance.com/eapi/v1/mark';
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}