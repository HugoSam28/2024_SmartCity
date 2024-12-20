import {Button, Form, Input, InputNumber, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";

function UpdateCarKeyForm({callback}) {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const {data, setData, rowsToUpdate, setSearchValue, page, orderBy} = useDataContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    form.resetFields();
  }, [rowsToUpdate]);

  const openNotificationWithIcon = () => {
    api['success']({
      message: t('success'),
      description:
        t('successMessageUpdate'),
    });
  };
  const onReset = () => {
    form.resetFields();
  }
  const toLogout = () => {
    navigate("/logout", {replace: true});
  }
  const updateData = async(values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const items = await fetchWithRetry('http://localhost:3267/v1/carKey/update', {
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
    }
    catch (e) {
      setError(e.message);
    }
  }

  const onFinish = async (values) => {
    setError("");
    setSearchValue("");
    values.iPage = page;
    values.column = orderBy;
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
        }}
      >
        <Form.Item
          name ='id'
          label="Id"
          disabled={true}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name='carId'
          label={t('carId')}
          rules={[
            {required: true,}, //Ne pas mettre dans les autres tables a part sponsoring
          ]}>
          <InputNumber defaultValue={rowsToUpdate[0]?.car_id} min={1} style={{width:'100%'}} />
        </Form.Item>

        {error && <p style={{color: "red"}}>{error}</p>}

        <Form.Item>
          <Space>
            <Button onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
            <Button loading={loading} type="primary" htmlType='submit'>{t('update')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default UpdateCarKeyForm;