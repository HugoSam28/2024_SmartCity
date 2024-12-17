import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {Table, Divider, Pagination } from "antd";

function CarKeyTable() {
  const [carKeys, setCarKeys] = useState([]);
  const [nbPages, setNbPages] = useState(0);
  const [error, setError] = useState(null);
  const {t} = useLanguageContext();

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: t('carId'),
      dataIndex: 'car_id',
    },
    {
      title: t('model'),
      dataIndex: 'model',
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

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
  console.log(nbPages);
  return (
      <div>
        <Divider />
        <Table
            rowKey="id"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={carKeys}
        />

        <Pagination align="end" defaultCurrent={1} total={nbPages*10} />
      </div>

  );
};
export default CarKeyTable;