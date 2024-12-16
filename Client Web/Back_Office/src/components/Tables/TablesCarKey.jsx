import {useState, useEffect} from "react";
import { Table } from 'antd';
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";

function TablesCarKey() {

    const { t } = useLanguageContext();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'Id',
        },
        {
            title: 'car Id',
            dataIndex: 'carId',
        },
    ];
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData =async ()=>{
        await fetch('http://localhost:3267/v1/getAllKeysAndPagesCount/id/1', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response?.ok) {
                    throw new Error(`${t('httpError')} : ${response.status}, ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setValues(data);
                setLoading(false);
            })
            .catch (e => console.error(e));
    };

    useEffect(() => {
        fetchData();
    }, []);


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    return(
        <Table rowSelection={rowSelection} columns={columns} dataSource={values} loading={loading}/>
    );

};
export default TablesCarKey;