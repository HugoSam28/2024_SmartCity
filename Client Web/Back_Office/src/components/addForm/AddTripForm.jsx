import {Button, Form, Input, Space, DatePicker, InputNumber} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

function AddTripForm() {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [startingDate, setStartingDate] = useState("");
    const [endingDate, setEndingDate] = useState("");

    const onReset = () => {
        form.resetFields();
    }
    const onChangeStart = (date, string) => {
        setStartingDate(string);
    };

    const onChangeEnd = (date, string) => {
        setEndingDate(string);
    };

    const onFinish = async (values) => {
        setError("");
        values.iPage = 1;
        values.column = "id";
        values.startingDate = startingDate;
        values.endingDate = endingDate;
        values.startingLocation = [values.startingLocationLat, values.startingLocationLon]
        values.endingLocation = [values.endingLocationLat, values.endingLocationLon]

        await fetch('http://localhost:3267/v1/trip/add', {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),

        })
            .then(response => {
                if (!response?.ok) {
                    if(response.status === 401) {
                        navigate("/logout", {replace:true});
                    }
                    throw new Error(`${t('httpError')} : ${response.status}, ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch (e => setError(e.message))
    };
    return (
        <div id="formContainer">
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
                    <InputNumber placeholder="21" style={{width: '100%'}} min={1} />
                </Form.Item>

                <Form.Item
                    name='vehicleId'
                    label={t('vehicleId')}
                    rules={[
                        {required: true,},
                    ]}>
                  <InputNumber placeholder="8" style={{width: '100%'}} min={1} />
                </Form.Item>

                <Form.Item
                    name='startingDate'
                    label={t('startingDate')}
                    rules={[
                        {required: true,},
                    ]}>
                    <DatePicker
                        showTime
                        onChange={onChangeStart}
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
                        onChange={onChangeEnd}
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
                  <InputNumber placeholder="346 (in meters)" style={{width: '100%'}} min={1} />
                </Form.Item>

                <Form.Item
                    name='cost'
                    label={t('cost')}
                    rules={[
                        {required: true,},
                    ]}>
                  <InputNumber placeholder="4.5" style={{width: '100%'}} min={0} />
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
                        <Button onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
                        <Button type="primary" htmlType='submit'>{t('add')}</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AddTripForm;