export default async (req, res) => {
  try {
    const response = await fetch('https://eapi.binance.com/eapi/v1/mark', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'API request failed: ' + response.status + ' ' + errorText });
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      return res.status(500).json({ error: 'Failed to parse API response: ' + jsonError.message });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};