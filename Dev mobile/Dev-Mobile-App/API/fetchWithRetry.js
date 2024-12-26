const addJitter = (time) => {
  const jitter = Math.random() * 700;
  return time + jitter;
}
const maxRetries = 5;
const delay = 700;

async function FetchWithRetry(url, options, onUnauthorized = () => {return null}, attempt =0) {
  const response = await fetch(url, options);
  if (response.ok) {
    if(url.includes('login')) {
      return await response.text();
    }
    return await response.json();
  }
  if(attempt < maxRetries) {
    if (response.status >= 500) {
      attempt++;
      console.error(`Erreur lors de la tentative ${attempt}`);
      const waitTime = addJitter(delay * (2 ** attempt));
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return await FetchWithRetry(url, options, onUnauthorized, attempt);
    } else {
      if(response.status === 401) {
        onUnauthorized();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  } else {
    throw new Error('Les tentatives ont échouées');
  }
}

export default FetchWithRetry;