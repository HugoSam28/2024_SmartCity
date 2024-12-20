const addJitter = (time) => {
  const jitter = Math.random() * 700;
  return time + jitter;
}

async function FetchWithRetry(url, options, onUnauthorized = () => {return null}, attempt =0) {
  const maxRetries = 5;
  const delay = 700;

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    }
    if(attempt < maxRetries) {
      if (response.status >= 500) {
        attempt++;
        const waitTime = addJitter(delay * (2 ** attempt));
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        await FetchWithRetry(url, options, onUnauthorized, attempt);
      } else {
        if(response.status === 401) {
          onUnauthorized();
        }
      }
    }

  } catch (e) {
    console.error(`Erreur lors de la tentative ${attempt + 1}: ${e.message}`);
    throw e;
  }
  throw new Error('Les tentatives ont échouées');
}

export default FetchWithRetry;