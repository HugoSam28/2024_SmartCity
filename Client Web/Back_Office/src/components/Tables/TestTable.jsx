 import {Table} from "antd";
 import { useState } from "react";
 function TestTable() {
  const [loading, setLoading] = useState({
    loaded: false,
    loading: false,
    error: false,
    errorMessage: ''
  })
  const [carKeys, setCarKeys] = useState({
    id: 0,
    carId: 0,
    model:""
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  /*
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  */
  const [values, setValues] = useState([]);

  const fetchData = async ()=>{
      await fetch('http://localhost:3267/v1/carKey/getAllKeysAndPagesCount/id/1', {
          method: 'GET',
          headers: {
              "authorization": `Bearer ${sessionStorage.getItem('token')}`,
              "Content-Type": "application/json",
            },
      })
          .then(response => {
              if (!response?.ok) {
                  if(response.status === 401) {
                      navigate("/logout", {replace:true});
                  }
                  throw new Error(`${t('httpError')} : ${response.status}, ${response.statusText}`);
              }
              return setValues(response.json());
          })
          .catch (e => console.error(e));
  };
  fetchData();
  function fetchGngn() {
    values.then(result =>{
      setCarKeys({
        id: result.keys[0].id,
        carId: result.keys[0].carId,
        model: result.keys[0].model
      })
    }) 
  }
  fetchGngn();
  console.log(carKeys);
  return (
    <p>i</p>
  );
 }
 export default TestTable;