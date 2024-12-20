import {useEffect, useState} from "react";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {Table, Pagination, Button, Tag} from "antd";
import { MdDeleteOutline } from "react-icons/md";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function TripTable() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [trip, setTrip] = useState([]);
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
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('personId'),
      dataIndex: 'person_id',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('vehicleId'),
      dataIndex: 'vehicle_id',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('startingDate'),
      dataIndex: 'starting_date',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('endingDate'),
      dataIndex: 'ending_date',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('cost'),
      dataIndex: 'cost',
      sorter: true,
      sortDirections: ['ascend']
    },
    {
      title: t('startingLocation'),
      dataIndex: 'starting_location',
      sorter: true,
      sortDirections: ['ascend'],
      render:(value) => (<p>{value?.y}; {value?.x}</p>)
    },
    {
      title: t('endingLocation'),
      dataIndex: 'ending_location',
      sorter: true,
      sortDirections: ['ascend'],
      render:(value) => (<p>{value?.y}; {value?.x}</p>)
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
            setTrip(data?.elements);
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
        `getAllTripsAndPagesCount`,
        `getSearchTrips/${searchValue}`,
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
        }
    };

    const fetchData = async () => {
        setError("");
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        let lookingFor = 0;
        if(searchValue !== ""){
            lookingFor = 1;
        }
        try {
            const items = await fetchWithRetry(`http://localhost:3267/v1/trip/${fetchUrls[lookingFor]}/${orderBy}/${page}`,{
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
            });
            setData({elements: items.trips, nbPages: items.nbPagesTrips});
        } catch (e) {
            setError(e.message);
        }
    };

    const onDelete = async() => {
        if(selectedRows.length > 0) {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            try {
                const values = [];
                selectedRows.forEach((row) => {
                    values.push(row.id);
                })
                const items = await fetchWithRetry(`http://localhost:3267/v1/trip/delete`,{
                    method: 'DELETE',
                    headers: {
                        "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({idList : values, iPage: page, column: orderBy}),
                });
                setData({elements:items.trips, nbPages: items.nbPagesTrips});
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
                dataSource={trip}
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
export default TripTable;