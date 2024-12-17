import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {Table, Pagination, Button} from "antd";
import { MdDeleteOutline } from "react-icons/md";

function CarKeyTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [carKeys, setCarKeys] = useState([]);
  const [nbPages, setNbPages] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [lookingFor, setLookingFor] = useState(0);
  const [searchValue, setSearchValue] = useState("");
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
      sortDirections: ['ascend'],
    },
    {
      title: t('carId'),
      dataIndex: 'car_id',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('model'),
      dataIndex: 'model',
      sorter: true,
      sortDirections: ['ascend']
    }
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchWithRetry(`http://localhost:3267/v1/carKey/${fetchUrls[lookingFor]}/${orderBy}/${currentPage}`,{
        method: 'GET',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      });
      //await new Promise((resolve) => setTimeout(resolve,2000));
      setCarKeys(data.keys);
      setNbPages(data.nbPagesKeys)
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchData().then(()=> setLoading(false));
  }, [searchValue, orderBy, currentPage]);
  return (
      <div style={{display: 'flex', flexDirection: 'column', height:'86vh', justifyContent: 'center'}}>
        <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={carKeys}
            pagination={false}
            scroll={{
              x: 'max-content',
            }}
            loading={loading}
        />
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px 20px 0 0'}}>
          <Button id='deleteButton' shape="circle" icon={<MdDeleteOutline />} style={{fontSize:19}} color="danger" variant="filled"/>
          <Pagination
            align='end'
            defaulCurrent={1}
            total={nbPages*10}
            hideOnSinglePage
            showSizeChanger={false}
            showQuickJumper
            onChange={(page)=> setCurrentPage(page)}/>
        </div>
        <span style={{
          textAlign: 'center',
          color: 'red'}}
        >{error && <p>{error}</p>}</span>
      </div>
  );
};
export default CarKeyTable;