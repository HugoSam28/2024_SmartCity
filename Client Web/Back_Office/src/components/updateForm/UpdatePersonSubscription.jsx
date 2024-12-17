import {Button, DatePicker, Form, Input, InputNumber, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

function AddPersonSubscriptionForm({callback}) {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const [date, setDate] = useState("");
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
  const onChange = (date, string) => {
    setDate(string);
  };
  const onReset = () => {
    form.resetFields();
  }
  const onFinish = async (values) => {
    setError("");
    values.startingSubscriptionDate = date;
    values.iPage = 1;
    values.column = "id";
    await fetch('http://localhost:3267/v1/personSubscription/update', {
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
  const valeur = {id: 3}
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
          name='id'
          label={t('id')}
          disabled={true}
        >
          <Input defaultValue={valeur.id} disabled />
        </Form.Item>
        <Form.Item
          name='persoId'
          label={t('personId')}
        >
          <InputNumber placeholder="21" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name='vehicleId'
          label={t('vehicleId')}
        >
          <InputNumber placeholder="3" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name='startingSubscriptionDate'
          label={t('startingSubscriptionDate')}
        >
          <DatePicker
            format="YYYY-MM-DD"
            maxDate={dayjs()}
            onChange={onChange}
            style={{
              width: '100%',
            }}
          />
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
export default AddPersonSubscriptionForm;