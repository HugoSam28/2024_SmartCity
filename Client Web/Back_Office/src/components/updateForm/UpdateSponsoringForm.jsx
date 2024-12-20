import {useEffect, useState} from 'react';
import {Button, Form, Input, Space, Select, DatePicker, Switch, InputNumber, notification} from 'antd';
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useNavigate} from "react-router-dom";

function UpdateSponsoringForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {data, setData, rowsToUpdate, setSearchValue, page, orderBy} = useDataContext();
    const [api, contextHolder] = notification.useNotification();
    
    useEffect(() => {
        form.resetFields();
      }, [rowsToUpdate]);

    const openNotification = () => {
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
          const items = await fetchWithRetry('http://localhost:3267/v1/sponsoring/update', {
            method: 'PATCH',
            headers: {
              "authorization": `Bearer ${sessionStorage.getItem('token')}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }, toLogout)
          setData({elements:items, nbPages: data.nbPages});
          openNotification();
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
                    referred: rowsToUpdate[0]?.referred,
                  }}
            >
                <Form.Item
                    name='referred'
                    label={t('referredId')}
                    disabled={true}>
                    <InputNumber disabled style={{width:'100%'}} />
                </Form.Item>

                <Form.Item
                    name='sponsor'
                    label={t('sponsorId')}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.sponsor} min={1} style={{width:'100%'}} />
                </Form.Item>
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
export default UpdateSponsoringForm