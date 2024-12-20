import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {Table, Pagination, Button, Tag} from "antd";
import { MdDeleteOutline } from "react-icons/md";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function VehicleTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [carKeys, setCarKeys] = useState([]);
  const [nbPages, setNbPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {data, setData, setRowsToUpdate, searchValue, page, setPage, orderBy, setOrderBy} = useDataContext();
  const {t} = useLanguageContext();

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      fixed: 'left',
      sorter: true,
      defaultSortOrder:'ascend',
      sortDirections: ['ascend'],
    },
    {
      title: 'Latitude',
      dataIndex: 'location',
      sorter: true,
      sortDirections: ['ascend'],
      render:(value) => (<p>{value?.y}</p>)
    },
    {
      title: 'Longitude',
      dataIndex: 'location',
      sorter: true,
      sortDirections: ['ascend'],
      render:(value) => (<p>{value?.x}</p>)
    },
    {
      title: t('batteryLevel'),
      dataIndex: 'battery_level',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('price'),
      dataIndex: 'price',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('isAvailable'),
      dataIndex: 'is_available',
      sorter: true,
      sortDirections: ['ascend'],
      render:(value) => (<Tag color={value ? 'green' : 'volcano' }>{value ? 'True' : 'False'}</Tag>)
    },
    {
      title: t('fees'),
      dataIndex: 'fees',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('brand'),
      dataIndex: 'brand',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('model'),
      dataIndex: 'location[0]',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('chassisNumber'),
      dataIndex: 'chassis_number',
      sorter: true,
      sortDirections: ['ascend']
    }
  ];

  let validOrderBy = false;
  let iDataIndex = 0;
  while (iDataIndex < columns.length && !validOrderBy) {
    if(orderBy === columns[iDataIndex].dataIndex) {
      validOrderBy = true;
    }
    iDataIndex++;
  }

  useEffect(() => {
    setPage(1);
    setOrderBy("id");
  },[]);

  useEffect(() => {
    if(data?.elements[0]) {
      setCarKeys(data?.elements);
      setNbPages(data?.nbPages);
    }
  }, [data]);

  useEffect(() => {
    setRowsToUpdate(selectedRows);
  }, [selectedRows])

  useEffect( () => {
    if (validOrderBy) {
      setPage(1);
      fetchData().then(() => setLoading(false));
    }
  }, [searchValue]);

  useEffect(() => {
    if (validOrderBy) {
      fetchData().then(() => setLoading(false));
    }
  }, [orderBy, page]);

  const fetchUrls= [
    `getAllVehiclesAndPagesCount`,
    `getSearchVehicles/${searchValue}`,
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    }
  };

  const fetchData = async () => {
    setError("");
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));

    let lookingFor = 0;
    if(searchValue !== ""){
      lookingFor = 1;
    }
    try {
      const items = await fetchWithRetry(`http://localhost:3267/v1/vehicle/${fetchUrls[lookingFor]}/${orderBy}/${page}`,{
        method: 'GET',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      });
      setData({elements: items.vehicles, nbPages: items.nbPagesVehicles});
    } catch (e) {
      setError(e.message);
    }
  };

  const onDelete = async() => {
    if(selectedRows.length > 0) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 700));
      try {
        const values = [];
        selectedRows.forEach((row) => {
          values.push(row.id);
        })
        const items = await fetchWithRetry(`http://localhost:3267/v1/carKey/delete`,{
          method: 'DELETE',
          headers: {
            "authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({idList : values, iPage: page, column: orderBy}),
        });
        setData({elements:items.vehicles, nbPages: items.nbPagesVehicles});
        setSelectedRows([]);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    }
  }
  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.field) {
      setOrderBy(sorter.field);
    } else {
      setOrderBy('id');
    }
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', paddingTop: 40}}>
      <Table
        rowKey="id"
        rowSelection={{ ...rowSelection,
        }}
        columns={columns}
        dataSource={carKeys}
        pagination={false}
        scroll={{
          x: 'max-content',
        }}
        loading={loading}
        onChange={handleTableChange}
      />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px 20px 0 0'}}>
        <Button
          id='deleteButton'
          loading={loading}
          onClick={onDelete}
          shape="circle"
          icon={<MdDeleteOutline />}
          style={{fontSize:19, marginLeft:'-5px', marginTop:'-5px'}}
          color="danger"
          variant="filled"
          size="large"
        />
        <Pagination
          align='end'
          defaulCurrent={page}
          total={nbPages*10}
          hideOnSinglePage
          showSizeChanger={false}
          showQuickJumper
          onChange={(page)=> setPage(page)}/>
      </div>
      <span style={{textAlign: 'center', color: 'red'}} >{error && <p>{error}</p>}</span>
    </div>
  );
}
export default VehicleTable;