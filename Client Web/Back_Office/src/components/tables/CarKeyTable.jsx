import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {Table, Pagination, Button} from "antd";
import { MdDeleteOutline } from "react-icons/md";

function CarKeyTable() {
  const [carKeys, setCarKeys] = useState([]);
  const [nbPages, setNbPages] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [lookingFor, setLookingFor] = useState(0);
  const [searchValue, setSearchValue] = useState("guan");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {t} = useLanguageContext();

  const fetchUrls= [
    '/getAllKeysAndPagesCount',
    `/getSearchKeys/${searchValue}`,
  ];

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      fixed: 'left',
      sorter: true,
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
  const fetchData = async () => {
    try {
      const data = await fetchWithRetry(`http://localhost:3267/v1/carKey/${fetchUrls[lookingFor]}/${orderBy}/${currentPage}`,{
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

  useEffect(() => {
    setLoading(true);
    fetchData().then(()=> setLoading(false));
  }, [currentPage, searchValue]);
  return (
      <div style={{display: 'flex', flexDirection: 'column', height:'86vh', justifyContent: 'center'}}>
        <Table
            rowKey="id"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={carKeys}
            pagination={false}
            scroll={{
              x: 'max-content',
            }}
            style={{ width: '100%' }}
        />
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px 20px 0 0'}}>
          <Button shape="circle" icon={<MdDeleteOutline />} style={{fontSize:19}} color="danger" variant="filled"/>
          <Pagination align='end' defaulCurrent={1} total={nbPages*10} hideOnSinglePage showSizeChanger={false} showQuickJumper onChange={(page)=> setCurrentPage(page)}/>
        </div>
      </div>
  );
};
export default CarKeyTable;