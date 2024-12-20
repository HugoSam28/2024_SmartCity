import {Button, Form, Input, InputNumber, Select, notification, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";

function UpdateSubscriptionForm({callback}) {
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
          const items = await fetchWithRetry('http://localhost:3267/v1/subscription/update', {
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
                style={{ width: '100%' }}
            >
                <Form.Item
                    name ='id'
                    label="Id"
                    disabled={true}>
                    <Input disabled style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name="label"
                    label={t("label")}
                    >
                    <Select defaultValue={rowsToUpdate[0]?.label} options={labelOptions} />
                </Form.Item>
                <Form.Item
                    name="price"
                    label={t("price")}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.price} min={0} style={{width:'100%'}} />
                </Form.Item>
                <Form.Item
                    name="discount"
                    label={t("discount")}
                    >
                    <InputNumber defaultValue={rowsToUpdate[0]?.discount} style={{width:'100%'}} />
                </Form.Item>
                <Form.Item
                    name="paymentRecurrence"
                    label={t("paymentRecurrence")}
                    >
                    <Select defaultValue={rowsToUpdate[0]?.payment_recurrence} options={recurrenceOptions} />
                </Form.Item>
                <Form.Item
                    name="vehicleType"
                    label={t("vehicleType")}
                    >
                    <Select defaultValue={rowsToUpdate[0]?.vehicle_type} options={vehicleOptions} />
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
export default UpdateSubscriptionForm;