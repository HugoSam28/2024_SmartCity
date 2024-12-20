import {Button, DatePicker, Form, InputNumber, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function AddPersonSubscriptionForm({callback}) {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const {setData, setSearchValue, orderBy, page} = useDataContext();
  const [date, setDate] = useState("");
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
  const onChange = (date, string) => {
    setDate(string);
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
      const items = await fetchWithRetry('http://localhost:3267/v1/personSubscription/add', {
        method: 'POST',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }, toLogout)
      setData({elements:items.personSubscriptions, nbPages: items.nbPagesPersonSubscriptions});
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
    values.startingSubscriptionDate = date;
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
          name='personId'
          label={t('personId')}
          rules={[
            {required: true,},
          ]}>
          <InputNumber placeholder="21" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
            name='subscriptionId'
            label={t('subscriptionId')}
            rules={[
              {required: true,},
            ]}>
          <InputNumber placeholder="3" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name='startingSubscriptionDate'
          label={t('startingSubscriptionDate')}
          rules={[
            {required: true,},
          ]}
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
            <Button loading={loading} onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
            <Button type="primary" loading={loading} htmlType='submit'>{t('add')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddPersonSubscriptionForm;