import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {Button, Form, Input, InputNumber, notification, Select, Space, Switch} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddVehicleForm({callback}) {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const vehicleOptions = [
    { value: 'Voiture', label: t('car') },
    { value: 'Scooter', label: t('motorbike') },
    { value: 'Velo', label: t('bike') },
    { value: 'Trotinette', label: t('electricScooter') },
  ];
  const additionalFields = {
    Voiture: [
      { name: "brand", label: t("brand"), placeholder: "Volvo" },
      { name: "model", label: t("model"), placeholder: "XC90-2024" },
      { name: "chassisNumber", label: t("chassisNumber"), placeholder: "dgge53Gsi9zegh0Z2" },
    ],
    Scooter: [
      { name: "brand", label: t("brand"), placeholder: "Piaggio" },
      { name: "model", label: t("model"), placeholder: "Vespa LX" },
      { name: "chassisNumber", label: t("chassisNumber"), placeholder: "dgge53Gsi9zegh0Z2" },
    ],
  };
  const [vehicle, setVehicle] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = () => {
    api['success']({
      message: t('success'),
      description:
        t('successMessageAdd'),
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
    values.type = vehicle;
    values.iPage = 1;
    values.column = "id";
    console.log(values);
    await fetch('http://localhost:3267/v1/vehicle/add', {
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
        openNotificationWithIcon();
        callback();
      })
      .catch (e => setError(e.message))
  };


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
          name="lat"
          label={'Latitude'}
          rules={[
            {required:true}
          ]}
        >
          <InputNumber placeholder={50.35468} style={{width: '100%'}} />
        </Form.Item>
        <Form.Item
          name="lon"
          label={'Longitude'}
          rules={[
            {required:true}
          ]}>
          <InputNumber placeholder={4.45793} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          name="batteryLevel"
          label={t("batteryLevel")}
          rules={[
            {required:true}
          ]}>
          <InputNumber placeholder={70} style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name="type"
          label={t("vehicleType")}
          rules={[
            {required:true}
          ]}>
          <Select
            defaultValue=""
            options={vehicleOptions}
            onChange={(selected) => setVehicle(selected)}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label={t("price")}
          rules={[
            {required:true}
          ]}>
          <InputNumber  placeholder="20" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name="fees"
          label={t("fees")}
          rules={[
            {required:true}
          ]}>
          <InputNumber placeholder="1.5" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name='isAvailable'
          label={t('isAvailable')}
        >
          <Switch defaultChecked onChange={ () => {setIsAvailable((isAvailable) => !isAvailable)}} />
        </Form.Item>
        {additionalFields[vehicle] &&
          additionalFields[vehicle].map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={[{ required: true }]}
            >
              <Input placeholder={field.placeholder} />
            </Form.Item>
          ))
        }
        {error && <p style={{color: "red"}}>{error}</p>}
        <Form.Item>
          <Space>
            <Button loading={loading} onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
            <Button type="primary" loading={loading} htmlType='submit'>{t('add')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddVehicleForm;