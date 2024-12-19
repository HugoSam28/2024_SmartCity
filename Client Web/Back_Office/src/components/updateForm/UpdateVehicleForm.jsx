import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {Button, Form, Input, InputNumber, notification, Select, Space, Switch} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function UpdateVehicleForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const vehicleOptions = [
      { value: 'Voiture', label: t('car') },
      { value: 'Scooter', label: t('motorbike') },
      { value: 'Velo', label: t('bike') },
      { value: 'Trotinette', label: t('electricScooter') },
    ];
    const [isAvailable, setIsAvailable] = useState(true);
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
        setIsAvailable(true);
        form.resetFields();
    }
    const onFinish = async (values) => {
        setError("");
        values.isAvailable = isAvailable;
        values.batteryLevel = parseFloat(values.batteryLevel);
        values.fees = parseInt(values.fees);
        values.lat = parseFloat(values.lat);
        values.lon = parseFloat(values.lon);
        values.price = parseFloat(values.price);
        values.iPage = 1;
        values.column = "id";
        console.log(values);
        await fetch('http://localhost:3267/v1/vehicle/update', {
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
                    name="lat"
                    label={'Latitude'}
                >
                    <InputNumber placeholder={50.35468} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name="lon"
                    label={'Longitude'}
                    >
                    <InputNumber placeholder={4.45793}  style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name="batteryLevel"
                    label={t("batteryLevel")}
                    >
                    <InputNumber placeholder={70} min={0} max={100} style={{width:'100%'}} />
                </Form.Item>
                <Form.Item
                    name="type"
                    label={t("vehicleType")}
                    >
                    <Select
                        defaultValue=""
                        options={vehicleOptions}/>
                </Form.Item>
                <Form.Item
                    name="price"
                    label={t("price")}
                    >
                    <InputNumber placeholder="20" min={0} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name="fees"
                    label={t("fees")}
                    >
                    <InputNumber placeholder="1.5" min={0} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name='isAvailable'
                    label={t('isAvailable')}
                >
                    <Switch defaultChecked onChange={ () => {setIsAvailable((isAvailable) => !isAvailable)}} />
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
export default UpdateVehicleForm;