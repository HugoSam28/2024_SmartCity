import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {Button, Form, Input, InputNumber, notification, Select, Space, Switch} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

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
  const [loading, setLoading] = useState(false);
  const {setData, setSearchValue, orderBy, page} = useDataContext();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
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
  const toLogout = () => {
    navigate("/logout", {replace: true});
  }

  const addData = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const items = await fetchWithRetry('http://localhost:3267/v1/vehicle/add', {
        method: 'POST',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }, toLogout)
      setData({elements:items.vehicles, nbPages: items.nbPagesVehicles});
      openNotification();
      callback();
    }
    catch (e) {
      setError(e.message)
    }
  }
  const onFinish = async (values) => {
    setError("");
    setSearchValue("");
    values.isAvailable = isAvailable;
    values.type = vehicle;
    values.iPage = page;
    values.column = orderBy;
    addData(values).then(()=> setLoading(false));

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