import {Button, Form, Input, Space, DatePicker, InputNumber, notification} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";

function UpdateTripForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const {data, setData, rowsToUpdate, setSearchValue, page, orderBy, setRowsToUpdate} = useDataContext();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        form.resetFields();
    }, [rowsToUpdate]);

    const openNotification = () => {
        api['success']({
            message: t('success'),
            description:
                t('successMessageUpdate'),
        });
    };

    const onDateChangeStart = (date, string) => {
        setDateStart(string);
    };

    const onDateChangeEnd = (date, string) => {
        setDateEnd(string);
    };

    const onReset = () => {
        form.resetFields();
    };

    const toLogout = () => {
        navigate("/logout", {replace: true});
    }

    const updateData = async (values) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const items = await fetchWithRetry('http://localhost:3267/v1/trip/update', {
                method: 'PATCH',
                headers: {
                    "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }, toLogout)
            if (items.length !== 0) {
                setData({elements: items, nbPages: data.nbPages});
            }
            openNotification();
            callback();
            setRowsToUpdate([]);
        }
        catch (e) {
            setError(e.message);
        }
    }

    const onFinish = async (values) => {
        setError("");
        setSearchValue("");
        values.startingDate = dateStart === "" ? rowsToUpdate[0].date : dateStart;
        values.endingDate = dateEnd === "" ? rowsToUpdate[0].date : dateEnd;
        values.endingLocationLat = values.endingLocationLat === undefined?rowsToUpdate[0]?.ending_location.y:values.endingLocationLat;
        values.endingLocationLon = values.endingLocationLon === undefined?rowsToUpdate[0]?.ending_location.x:values.endingLocationLon;
        values.startingLocationLat = values.startingLocationLat === undefined?rowsToUpdate[0]?.starting_location.y:values.startingLocationLat;
        values.startingLocationLon = values.startingLocationLon === undefined?rowsToUpdate[0]?.starting_location.x:values.startingLocationLon;
        values.iPage = page;
        values.column = orderBy;
        updateData(values).then(() => setLoading(false));
    };

    return (
        <div id="formContainer">
          {contextHolder}
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                form={form}
                requiredMark={false}
                initialValues={{
                    id: rowsToUpdate[0]?.id,
                }}
                style={{ width: '100%' }}
            >
                <Form.Item
                    name ='id'
                    label="Id"
                    disabled={true}>
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name='personId'
                    label={t('personId')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.person_id} min={1} style={{width:'100%'}} />
                </Form.Item>

                <Form.Item
                    name='vehicleId'
                    label={t('vehicleId')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.vehicle_id} min={1} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item
                    name='startingDate'
                    label={t('startingDate')}
                    >
                    <DatePicker
                        showTime
                        defaultValue={rowsToUpdate[0]?.starting_date ? dayjs(rowsToUpdate[0]?.starting_date) : null}
                        onChange={onDateChangeStart}
                        maxDate={dayjs()}
                        style={{width:'100%'}}
                    />
                </Form.Item>

                <Form.Item
                    name='endingDate'
                    label={t('endingDate')}
                    >
                    <DatePicker
                        showTime
                        defaultValue={rowsToUpdate[0]?.ending_date ? dayjs(rowsToUpdate[0]?.ending_date) : null}
                        onChange={onDateChangeEnd}
                        maxDate={dayjs()}
                        style={{width:'100%'}}
                    />
                </Form.Item>

                <Form.Item
                    name='distance'
                    label={t('distance')}
                    >
                    <InputNumber min={0} defaultValue={rowsToUpdate[0]?.distance} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item
                    name='cost'
                    label={t('cost')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.cost} min={0} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item
                    name='startingLocationLat'
                    label={t('startingLocationLat')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.starting_location.y} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item
                    name='startingLocationLon'
                    label={t('startingLocationLon')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.starting_location.x} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item
                    name='endingLocationLat'
                    label={t('endingLocationLat')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.ending_location.y} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item
                    name='endingLocationLon'
                    label={t('endingLocationLon')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.ending_location.x} style={{width:'100%'}}/>
                </Form.Item>

                {error && <p style={{color: "red"}}>{error}</p>}

                <Form.Item>
                    <Space>
                        <Button loading={loading} onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
                        <Button loading={loading} type="primary" htmlType='submit'>{t('update')}</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default UpdateTripForm;