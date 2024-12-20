import {useEffect, useState} from 'react';
import {Button, Form, Input, Space, DatePicker, InputNumber, notification} from 'antd';
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import dayjs from 'dayjs';
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useNavigate} from "react-router-dom";

function UpdatePersonSubscription({callback}) {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const {data, setData, rowsToUpdate, setSearchValue, page, orderBy} = useDataContext();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const items = await fetchWithRetry('http://localhost:3267/v1/personSubscription/update', {
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
    values.starstartingSubscriptionDate = date === "" ? rowsToUpdate[0].date : date;
    console.log(values);
    updateData(values).then(()=> setLoading(false));
  };

  const onDateChange = (date, string) => {
    setDate(string);
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
          name='personId'
          label={t('personId')}
        >
          <InputNumber defaultValue={rowsToUpdate[0]?.person_id} placeholder="21" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name='subscriptionId'
          label={t('subscriptionId')}
        >
          <InputNumber defaultValue={rowsToUpdate[0]?.subscription_id} placeholder="3" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item name='startingSubscriptionDate' label={t('startingSubscriptionDate')}>
          <DatePicker
              format="YYYY-MM-DD"
              maxDate={dayjs()}
              defaultValue={rowsToUpdate[0]?.starting_subscription_date ? dayjs(rowsToUpdate[0]?.starting_subscription_date) : null}
              onChange={onDateChange}
              style={{width: '100%'}}
          />
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
export default UpdatePersonSubscription;