import {useEffect, useState} from 'react';
import {Button, Form, Input, Space, Select, DatePicker, Switch, InputNumber, notification} from 'antd';
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import dayjs from 'dayjs';
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useNavigate} from "react-router-dom";

function UpdatePersonForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const {data, setData, rowsToUpdate, setSearchValue, page, orderBy, setRowsToUpdate} = useDataContext();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const yearsAgo = dayjs().add(-16, 'year');
    const [date, setDate] = useState("");
    const [carLicence, setCarLicence] = useState(rowsToUpdate[0]?.has_car_licence);
    const [motorbikeLicence, setMotorbikeLicence] = useState(rowsToUpdate[0]?.has_motorbike_licence);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

    const onDateChange = (date, string) => {
        setDate(string);
    };
    const onReset = () => {
        setCarLicence(rowsToUpdate[0].has_car_licence);
        setMotorbikeLicence(rowsToUpdate[0].has_motorbike_licence);
        form.resetFields();
    };

    const toLogout = () => {
        navigate("/logout", {replace: true});
    }

    const updateData = async (values) => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const items = await fetchWithRetry('http://localhost:3267/v1/person/update', {
          method: 'PATCH',
          headers: {
            "authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }, toLogout)
        if (items.length !== 0) {
          setData({elements: items, nbPages: data.nbPages});
        }
        openNotification();
        callback();
        setRowsToUpdate([]);
      }
      catch (e) {
        setError(e.message);
      }
    }

    const onFinish = async (values) => {
        setError("");
        setSearchValue("");
        values.birthday = date === "" ? rowsToUpdate[0].date : date;
        values.hasCarLicence = carLicence;
        values.hasMotorbikeLicence = motorbikeLicence;
        values.iPage = page;
        values.column = orderBy;
        updateData(values).then(() => setLoading(false));
    };

    return (
        <div id="formContainer">
            {contextHolder}
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                form={form}
                initialValues={{
                    id: rowsToUpdate[0]?.id,
                }}
                requiredMark={false}
                style={{ width: '100%' }}
            >
                <Form.Item
                    name ='id'
                    label="Id"
                    disabled={true}>
                    <InputNumber disabled style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item
                    name='firstName'
                    label={t('firstName')}
                >
                    <Input defaultValue={rowsToUpdate[0]?.first_name}/>
                </Form.Item>
                <Form.Item
                    name='lastName'
                    label={t('lastName')}
                >
                    <Input defaultValue={rowsToUpdate[0]?.last_name}/>
                </Form.Item>
                <Form.Item
                    name='email'
                    label="Email"
                >
                    <Input defaultValue={rowsToUpdate[0]?.email} />
                </Form.Item>
                <Form.Item
                    name='password'
                    label={t('password')}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='phoneNumber'
                    label={t('number')}
                >
                    <Input defaultValue={rowsToUpdate[0]?.phone_number} />
                </Form.Item>

                <Form.Item name='birthday' label={t('birthday')}>
                    <DatePicker
                        format="YYYY-MM-DD"
                        maxDate={yearsAgo}
                        defaultValue={rowsToUpdate[0]?.birthday ? dayjs(rowsToUpdate[0]?.birthday) : null}
                        onChange={onDateChange}
                        style={{width: '100%'}}
                    />
                </Form.Item>

                <Form.Item
                    name='role'
                    label='Role'>
                    <Select defaultValue={rowsToUpdate[0]?.role} options={[{value:"ROLE_ADMIN", label:"Admin"}, {value:"ROLE_USER", label:"User"}]} />
                </Form.Item>

                <Form.Item
                    name='referralCode'
                    label={t('referralCode')}
                >
                    <Input defaultValue={rowsToUpdate[0]?.referral_code}/>
                </Form.Item>

                <Form.Item
                    name='hasCarLicence'
                    label={t('hasCarLicence')}
                    valuePropName="checked">
                    <Switch
                      defaultChecked={rowsToUpdate[0]?.has_car_licence}
                      onChange={() => {setCarLicence((carLicence) => !carLicence)}}/>
                </Form.Item>

                <Form.Item
                    name='hasMotorbikeLicence'
                    label={t('hasMotorbikeLicence')}
                    valuePropName="checked">
                    <Switch
                      defaultChecked={rowsToUpdate[0]?.has_motorbike_licence}
                      onChange={() => {setMotorbikeLicence((motorbikeLicence) => !motorbikeLicence)}}/>
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
    );
}
export default UpdatePersonForm;