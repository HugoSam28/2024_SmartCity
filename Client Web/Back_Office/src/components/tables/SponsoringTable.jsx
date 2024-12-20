import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {Table, Pagination, Button} from "antd";
import { MdDeleteOutline } from "react-icons/md";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function SponsoringTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sponsoring, setSponsoring] = useState([]);
  const [nbPages, setNbPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {data, setData, setRowsToUpdate, searchValue, setSearchValue, page, setPage, orderBy, setOrderBy} = useDataContext();
  const {t} = useLanguageContext();

  const columns = [
    {
      title: t('referredId'),
      dataIndex: 'referred',
      fixed: 'left',
      sorter: true,
      defaultSortOrder:'ascend',
      sortDirections: ['ascend'],
    },
    {
      title: t('referredEmail'),
      dataIndex: 'referred_email',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('sponsorId'),
      dataIndex: 'sponsor',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('sponsorEmail'),
      dataIndex: 'sponsor_email',
      sorter: true,
      sortDirections: ['ascend']
    },
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
    setSearchValue("");
    setOrderBy("referred");
    setPage(1);
  },[]);

  useEffect(() => {
    if(data?.elements[0]) {
      setSponsoring(data?.elements);
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
    `getAllSponsoringAndPagesCount`,
    `getSearchSponsoring/${searchValue}`,
  ];

  const rowSelection = {
    onChange: (selectedRowSponsoring, selectedRows) => {
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
      const items = await fetchWithRetry(`http://localhost:3267/v1/sponsoring/${fetchUrls[lookingFor]}/${orderBy}/${page}`,{
        method: 'GET',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      });
      setData({elements: items.sponsoring, nbPages: items.nbPagesSponsoring});
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    try {
      const values = [];
      selectedRows.forEach((row) => {
        values.push(row.referred);
      })
      const items = await fetchWithRetry(`http://localhost:3267/v1/sponsoring/delete`,{
        method: 'DELETE',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idList : values, iPage: page, column: orderBy}),
      });
      setData({elements:items.sponsoring, nbPages: items.nbPagesSponsoring});
      setSelectedRows([]);
    } catch (e) {
      setError(e.message);
    }
  }
  const onDelete = async() => {
    if(selectedRows.length > 0) {
      deleteData().then(() => setLoading(false));
    }
  }
  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.field) {
      setOrderBy(sorter.field);
    } else {
      setOrderBy('referred');
    }
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', paddingTop: 40}}>
      <Table
        rowKey="referred"
        rowSelection={{ ...rowSelection,
        }}
        columns={columns}
        dataSource={sponsoring}
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
export default SponsoringTable;