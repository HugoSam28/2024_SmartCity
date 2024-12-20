import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {Button, Form, Input, InputNumber, notification, Select, Space, Switch} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";

function UpdateVehicleForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const {data, setData, rowsToUpdate, setSearchValue, page, orderBy, setRowsToUpdate} = useDataContext();
    console.log(rowsToUpdate[0]?.type);
    const [vehicle, setVehicle] = useState(rowsToUpdate[0]?.type);
    const vehicleOptions = [
      { value: 'Voiture', label: t('car') },
      { value: 'Scooter', label: t('motorbike') },
      { value: 'Velo', label: t('bike') },
      { value: 'Trotinette', label: t('electricScooter') },
    ];
    const additionalFields = {
    Voiture: [
      { name: "brand", label: t("brand"), placeholder: "Volvo", defaultValue : rowsToUpdate[0]?.brand },
      { name: "model", label: t("model"), placeholder: "XC90-2024", defaultValue : rowsToUpdate[0]?.model},
      { name: "chassisNumber", label: t("chassisNumber"), placeholder: "dgge53Gsi9zegh0Z2", defaultValue : rowsToUpdate[0]?.chassis_number},
    ],
    Scooter: [
      { name: "brand", label: t("brand"), placeholder: "Piaggio" },
      { name: "model", label: t("model"), placeholder: "Vespa LX" },
      { name: "chassisNumber", label: t("chassisNumber"), placeholder: "dgge53Gsi9zegh0Z2" },
    ],
  };
    const [loading, setLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
      onReset();
    }, [rowsToUpdate]);

    const openNotificationWithIcon = () => {
      api['success']({
        message: t('success'),
        description:
          t('successMessageUpdate'),
      });
    };
    const onReset = () => {
      setIsAvailable(rowsToUpdate[0]?.is_available);
      setVehicle(rowsToUpdate[0]?.type);
      form.resetFields();
    }
    const toLogout = () => {
      navigate("/logout", {replace: true});
    }
    const updateData = async(values) => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const items = await fetchWithRetry('http://localhost:3267/v1/vehicle/update', {
          method: 'PATCH',
          headers: {
            "authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }, toLogout)
        setData({elements:items, nbPages: data.nbPages});
        openNotificationWithIcon();
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
        values.isAvailable = isAvailable;
        values.iPage = page;
        values.column = orderBy;
        if (vehicle !== 'Voiture' && vehicle !== 'Scooter') {
          values.brand = null;
          values.model = null;
          values.chassisNumber = null;
        }
        updateData(values).then(()=> setLoading(false));
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
                  brand: rowsToUpdate[0]?.brand,
                  model: rowsToUpdate[0]?.model,
                  chassisNumber: rowsToUpdate[0]?.chassisNumber,
                }}
            >
                <Form.Item
                    name ='id'
                    label="Id"
                    disabled={true}>
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="lat"
                    label={'Latitude'}
                >
                    <InputNumber defaultValue={rowsToUpdate[0]?.location.y} placeholder={50.35468} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name="lon"
                    label={'Longitude'}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.location.x} placeholder={4.45793}  style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name="batteryLevel"
                    label={t("batteryLevel")}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.battery_level} placeholder={70} min={0} max={100} style={{width:'100%'}} />
                </Form.Item>
                <Form.Item
                    name="type"
                    label={t("vehicleType")}
                    >
                    <Select
                        options={vehicleOptions}
                        defaultValue={vehicle}
                        onChange={(selected) => setVehicle(selected)}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label={t("price")}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.price} placeholder="20" min={0} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name="fees"
                    label={t("fees")}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.fees} placeholder="1.5" min={0} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name='isAvailable'
                    label={t('isAvailable')}
                >
                    <Switch
                      defaultChecked={rowsToUpdate[0]?.is_available}
                      onChange={ () => {setIsAvailable((isAvailable) => !isAvailable)}} />
                </Form.Item>
                {additionalFields[vehicle] &&
                  additionalFields[vehicle].map((field) => (
                    <Form.Item
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      defaultValue={field.defaultValue}
                      rules={[{
                        required: true,
                      }]}
                    >
                      <Input placeholder={field.placeholder} />
                    </Form.Item>
                  ))
                }
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
export default UpdateVehicleForm;