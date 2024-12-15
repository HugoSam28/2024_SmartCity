import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {Button, Form, Input, Select, Space} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddSubscriptionForm() {
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

  const onReset = () => {
    form.resetFields();
  }
  const onFinish = async (values) => {
    setError("");
    values.iPage = 1;
    values.column = "id";
    await fetch('http://localhost:3267/v1/subscription/add', {
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
          name="label"
          label={t("label")}
          rules={[
            {required:true}
          ]}>
          <Select
            defaultValue="Gold"
            options={labelOptions}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label={t("price")}
          rules={[
            {required:true}
          ]}>
          <Input type="number" placeholder="20" />
        </Form.Item>
        <Form.Item
          name="discount"
          label={t("discount")}
          rules={[
            {required:true}
          ]}>
          <Input type="number" placeholder={`0 < ${t("discount")} <= 1`} />
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
            <Button onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
            <Button type="primary" htmlType='submit'>{t('submit')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>

  )
}
export default AddSubscriptionForm;