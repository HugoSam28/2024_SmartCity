import {Button, Form, Input, Space, DatePicker} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

function UpdateTripForm() {
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
        values.startingLocation = [values.startingLocationLat, values.startingLocationLong]
        values.endingLocation = [values.endingLocationLat, values.endingLocationLong]

        await fetch('http://localhost:3267/v1/trip/update', {
            method: 'PATCH',
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
    const valeur = {id : 2}
    return (
        <div id="formContainer">
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                form={form}
                requiredMark={'optional'}
            >
                <Form.Item
                    name ='id'
                    label="Id"
                    disabled={true}>
                    <Input defaultValue = {valeur.id} disabled />
                </Form.Item>

                <Form.Item
                    name='personId'
                    label={t('personId')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="21"/>
                </Form.Item>

                <Form.Item
                    name='vehicleId'
                    label={t('vehicleId')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="21"/>
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
                    />
                </Form.Item>

                <Form.Item
                    name='distance'
                    label={t('Distance')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="2000"/>
                </Form.Item>

                <Form.Item
                    name='cost'
                    label={t('cost')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="2.2"/>
                </Form.Item>

                <Form.Item
                    name='startingLocationLat'
                    label={t('startingLocationLat')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="50.342326"/>
                </Form.Item>

                <Form.Item
                    name='startingLocationLong'
                    label={t('startingLocationLong')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="20.389483"/>
                </Form.Item>

                <Form.Item
                    name='endingLocationLat'
                    label={t('endingLocationLat')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="50.342326"/>
                </Form.Item>

                <Form.Item
                    name='endingLocationLong'
                    label={t('endingLocationLong')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="20.389483"/>
                </Form.Item>

                {error && <p style={{color: "red"}}>{error}</p>}

                <Form.Item>
                    <Space>
                        <Button onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
                        <Button type="primary" htmlType='submit'>{t('submit')}</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default UpdateTripForm;