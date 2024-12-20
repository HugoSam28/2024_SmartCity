import {Button, Form, Space, DatePicker, InputNumber, notification} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function AddTripForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const [loading, setLoading] = useState(false);
    const {setData, setSearchValue, orderBy, page} = useDataContext();
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api['success']({
            message: t('success'),
            description:
                t('successMessageAdd'),
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
    }
    const toLogout = () => {
        navigate("/logout", {replace: true});
    }
        const addData = async (values) => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            try {
                console.log(values);
                const items = await fetchWithRetry('http://localhost:3267/v1/trip/add', {
                    method: 'POST',
                    headers: {
                        "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }, toLogout)
                setData({elements: items.trips, nbPages: items.nbPagesTrips});
                openNotification();
                callback();
            } catch (e) {
                setError(e.message)
            }
        }

        const onFinish = async (values) => {
            setError("");
            setSearchValue("");
            values.iPage = page;
            values.column = orderBy;
            values.startingDate = dateStart;
            values.endingDate = dateEnd;
            addData(values).then(() => setLoading(false));
        }
        return (
            <div id="formContainer">
                {contextHolder}
                <Form
                    onFinish={onFinish}
                    layout={"vertical"}
                    form={form}
                    requiredMark={'optional'}
                >
                    <Form.Item
                        name='personId'
                        label={t('personId')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="21" style={{width: '100%'}} min={1}/>
                    </Form.Item>

                    <Form.Item
                        name='vehicleId'
                        label={t('vehicleId')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="8" style={{width: '100%'}} min={1}/>
                    </Form.Item>

                    <Form.Item
                        name='startingDate'
                        label={t('startingDate')}
                        rules={[
                            {required: true,},
                        ]}>
                        <DatePicker
                            showTime
                            onChange={onDateChangeStart}
                            maxDate={dayjs()}
                            style={{width: '100%'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name='endingDate'
                        label={t('endingDate')}
                        rules={[
                            {required: true,},
                        ]}>
                        <DatePicker
                            showTime
                            onChange={onDateChangeEnd}
                            maxDate={dayjs()}
                            style={{width: '100%'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name='distance'
                        label={t('Distance')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="346 (in meters)" style={{width: '100%'}} min={1}/>
                    </Form.Item>

                    <Form.Item
                        name='cost'
                        label={t('cost')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="4.5" style={{width: '100%'}} min={0}/>
                    </Form.Item>

                    <Form.Item
                        name='startingLocationLat'
                        label={t('startingLocationLat')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="50.342326" style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        name='startingLocationLon'
                        label={t('startingLocationLon')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="20.389483" style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        name='endingLocationLat'
                        label={t('endingLocationLat')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="50.342326" style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        name='endingLocationLon'
                        label={t('endingLocationLon')}
                        rules={[
                            {required: true,},
                        ]}>
                        <InputNumber placeholder="20.389483" style={{width: '100%'}}/>
                    </Form.Item>

                    {error && <p style={{color: "red"}}>{error}</p>}

                    <Form.Item>
                        <Space>
                            <Button loading={loading} onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
                            <Button loading={loading} type="primary" htmlType='submit'>{t('add')}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        )
}
export default AddTripForm;