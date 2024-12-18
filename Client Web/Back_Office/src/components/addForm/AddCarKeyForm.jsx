import {Button, Form, InputNumber, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function AddCarKeyForm({callback}) {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const {setData} = useDataContext();
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
    form.resetFields();
  }
  const toLogout = () => {
    navigate("/logout", {replace: true});
  }
  const addData = async (values) => {
    setLoading(true);
    try {
      const data = await fetchWithRetry('http://localhost:3267/v1/carKey/add', {
        method: 'POST',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }, toLogout)
      setData(data)
      openNotificationWithIcon();
      callback();
    }
    catch (e) {
      setError(e.message)
    }
  }

  const onFinish = async (values) => {
    setError("");
    values.iPage = 1;
    values.column = "id";
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
          name='carId'
          label={t('carId')}
          rules={[
            {required: true,},
          ]}>
          <InputNumber placeholder="21" min={1} style={{width:'100%'}} />
        </Form.Item>
        {error && <p style={{color: "red"}}>{error}</p>}
        <Form.Item>
          <Space>
            <Button onClick={onReset} loading={loading} color="default" variant="filled">{t('reset')}</Button>
            <Button type="primary" htmlType='submit'>{t('add')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddCarKeyForm;