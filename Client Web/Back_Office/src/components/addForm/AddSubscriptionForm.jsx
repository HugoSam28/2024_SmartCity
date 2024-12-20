import {Button, Form, InputNumber, Select, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function AddSubscriptionForm({callback}) {
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
  const [loading, setLoading] = useState(false);
  const {setData, setSearchValue, orderBy, page} = useDataContext();
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
      const items = await fetchWithRetry('http://localhost:3267/v1/subscription/add', {
        method: 'POST',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }, toLogout)
      setData({elements:items.subscriptions, nbPages: items.nbPagesSubscriptions});
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
        requiredMark={'optional'}
      >
        <Form.Item
          name="label"
          label={t("label")}
          rules={[
            {required:true}
          ]}>
          <Select
            defaultValue=""
            options={labelOptions}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label={t("price")}
          rules={[
            {required:true}
          ]}>
          <InputNumber placeholder="21" min={1} style={{width:'100%'}} />
        </Form.Item>
        <Form.Item
          name="discount"
          label={t("discount")}
          rules={[
            {required:true}
          ]}>
          <InputNumber placeholder={`0 < ${t("discount")} <= 1`} style={{width: '100%'}} min={0} max={1} />
        </Form.Item>
        <Form.Item
          name="paymentRecurrence"
          label={t("paymentRecurrence")}
          rules={[
            {required:true}
          ]}>
          <Select
            defaultValue=""
            options={recurrenceOptions}/>
        </Form.Item>
        <Form.Item
          name="vehicleType"
          label={t("vehicleType")}
          rules={[
            {required:true}
          ]}>
          <Select
            defaultValue=""
            options={vehicleOptions}/>
        </Form.Item>
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
export default AddSubscriptionForm;