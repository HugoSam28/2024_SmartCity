import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";

function CarKeyTable() {
  const [carKeys, setCarKeys] = useState([]);
  const [nbPages, setNbPages] = useState(0);
  const [error, setError] = useState(null);
  const {t} = useLanguageContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithRetry('http://localhost:3267/v1/carKey/getAllKeysAndPagesCount/id/1',{
          method: 'GET',
          headers: {
            "authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });
        setCarKeys(data.keys);
        setNbPages(data.nbPagesKeys)
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [])
  console.log(carKeys, nbPages, error);
  return (
    <p>oui</p>
  )
}
export default CarKeyTable;