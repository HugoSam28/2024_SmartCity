import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {Table, Pagination, Button, Tag} from "antd";
import { MdDeleteOutline } from "react-icons/md";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function PersonTable() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [persons, setPersons] = useState([]);
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
      title: t('firstName'),
      dataIndex: 'first_name',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('lastName'),
      dataIndex: 'last_name',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('number'),
      dataIndex: 'phone_number',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('birthday'),
      dataIndex: 'birthday',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('balance'),
      dataIndex: 'balance',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('hasCarLicence'),
      dataIndex: 'has_car_licence',
      sorter: true,
      sortDirections: ['ascend'],
      render:(value) => (<Tag color={value ? 'green' : 'volcano' }>{value ? 'True' : 'False'}</Tag>)
    },
    {
      title: t('hasMotorbikeLicence'),
      dataIndex: 'has_motorbike_licence',
      sorter: true,
      sortDirections: ['ascend'],
      render:(value) => (<Tag color={value ? 'green' : 'volcano' }>{value ? 'True' : 'False'}</Tag>)

    },
    {
      title: t('referralCode'),
      dataIndex: 'referral_code',
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
            setPersons(data?.elements);
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
        `getAllPersonsAndPagesCount`,
        `getSearchPersons/${searchValue}`,
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
            const items = await fetchWithRetry(`http://localhost:3267/v1/person/${fetchUrls[lookingFor]}/${orderBy}/${page}`,{
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
            });
            setData({elements: items.persons, nbPages: items.nbPagesPersons});
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
                const items = await fetchWithRetry(`http://localhost:3267/v1/person/delete`,{
                    method: 'DELETE',
                    headers: {
                        "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({idList : values, iPage: page, column: orderBy}),
                });
                setData({elements:items.persons, nbPages: items.nbPagesPersons});
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
                dataSource={persons}
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
export default PersonTable;