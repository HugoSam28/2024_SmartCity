import {Button, Form, InputNumber, Select, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";

function AddSponsoringForm({callback}) {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const [loading, setLoading] = useState(false);
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
      const items = await fetchWithRetry('http://localhost:3267/v1/sponsoring/add', {
        method: 'POST',
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }, toLogout)
      setData({elements:items.sponsoring, nbPages: items.nbPagesSponsoring});
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
          name='sponsor'
          label={t('sponsorId')}
          rules={[
            {required: true,},
          ]}>
          <InputNumber placeholder="21" min={1} style={{width:'100%'}} />
        </Form.Item>
        <Form.Item
          name='referred'
          label={t('referredId')}
          rules={[
            {required: true,},
          ]}>
          <InputNumber placeholder="21" min={1} style={{width:'100%'}} />
        </Form.Item>
        {error && <p style={{color: "red"}}>{error}</p>}
        <Form.Item>
          <Space>
            <Button loading={loading} onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
            <Button loading={loading} type="primary" htmlType='submit'>{t('add')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddSponsoringForm