import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {Button, Form, Input, InputNumber, notification, Select, Space} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function UpdateSubscriptionForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const labelOptions = [
        { value: 'Gold', label: 'Gold' },
        { value: 'Diamond', label: 'Diamond' },
        { value: 'Premium', label: 'Premium' },
        { value: 'Platinum', label: 'Platinum' },
    ];
    const recurrenceOptions = [
        { value: 'weekly', label: 'weekly' },
        { value: 'monthly', label: 'monthly' },
        { value: 'yearly', label: 'yearly' },
    ];
    const vehicleOptions = [
        { value: 'Voiture', label: 'Voiture' },
        { value: 'Scooter', label: 'Scooter' },
        { value: 'Velo', label: 'Velo' },
        { value: 'Trotinette', label: 'Trotinette' },
    ];
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
        await fetch('http://localhost:3267/v1/subscription/update', {
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
                openNotificationWithIcon();
                callback();
            })
            .catch (e => setError(e.message))
    };
    const valeur = {id : 2}

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
                    <Input defaultValue = {valeur.id} disabled />
                </Form.Item>
                <Form.Item
                    name="label"
                    label={t("label")}
                    >
                    <Select
                        defaultValue="Gold"
                        options={labelOptions}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label={t("price")}
                    >
                    <InputNumber placeholder="20" min={0} style={{width:'100%'}} />
                </Form.Item>
                <Form.Item
                    name="discount"
                    label={t("discount")}
                    >
                    <InputNumber placeholder={`0 < ${t("discount")} <= 1`} style={{width:'100%'}} />
                </Form.Item>
                <Form.Item
                    name="paymentRecurrence"
                    label={t("paymentRecurrence")}
                    >
                    <Select
                        defaultValue=""
                        options={recurrenceOptions}/>
                </Form.Item>
                <Form.Item
                    name="vehicleType"
                    label={t("vehicleType")}
                    >
                    <Select
                        defaultValue=""
                        options={vehicleOptions}/>
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
export default UpdateSubscriptionForm;