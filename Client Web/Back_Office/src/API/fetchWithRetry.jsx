const addJitter = (time) => {
  const jitter = Math.random() * 700;
  return time + jitter;
}

async function FetchWithRetry(url, options, onUnauthorized = () => {return null}) {

  let attempt = 0;
  const maxRetries = 5;
  const delay = 700;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
      if(response.status === 401 || response.status === 403) {
        onUnauthorized();
        throw new Error(`Unauthorized: ${response.status}`);
      }
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Erreur client : ${response.status}`);
      }
      console.error(`Tentative ${attempt + 1} échouée: http : ${response.status}`);
    } catch (err) {
      console.error(`Erreur lors de la tentative ${attempt + 1}: ${err.message}`);
      throw err;
    }
    attempt++;
    const waitTime = addJitter(delay * (2 ** attempt));
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
  throw new Error('Les tentatives ont échouées');
}
export default FetchWithRetry;