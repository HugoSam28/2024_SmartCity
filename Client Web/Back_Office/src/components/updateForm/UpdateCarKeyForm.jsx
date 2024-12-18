import {Button, Form, Input, InputNumber, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function UpdateCarKeyForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const {setData, rowsToUpdate} = useDataContext();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
      api['success']({
        message: t('success'),
        description:
          t('successMessageUpdate'),
      });
    };

    const onReset = () => {
        form.resetFields();
    }
    const onFinish = async (values) => {
        setError("");
        values.iPage = 1;
        values.column = "id";
        values.id = rowsToUpdate[0]?.id;

        console.log(values);
        await fetch('http://localhost:3267/v1/carKey/update', {
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
                setData(data);
                openNotificationWithIcon();
                callback();
            })
            .catch (e => setError(e.message))
    };
    useEffect(() => {
      form.resetFields();
    }, [rowsToUpdate])

    return (
        <div id="formContainer">
          {contextHolder}
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                form={form}
                requiredMark={false}
            >
                <Form.Item
                    name ='id'
                    label="Id"
                    disabled={true}>
                    <Input defaultValue={rowsToUpdate[0]?.id} disabled />
                </Form.Item>

                <Form.Item
                    name='carId'
                    label={t('carId')}
                    rules={[
                        {required: true,},
                    ]}>
                    <InputNumber defaultValue={rowsToUpdate[0]?.car_id} min={1} style={{width:'100%'}} />
                </Form.Item>
                {error && <p style={{color: "red"}}>{error}</p>}
                <Form.Item>
                    <Space>
                        <Button onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
                        <Button type="primary" htmlType='submit'>{t('update')}</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default UpdateCarKeyForm;