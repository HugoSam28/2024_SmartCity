import {useEffect, useState} from 'react';
import {Button, Form, Input, Space, Select, DatePicker, Switch, InputNumber, notification} from 'antd';
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import dayjs from 'dayjs';
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";

function UpdatePersonForm({callback}) {
    const [form] = Form.useForm();
    const {t} = useLanguageContext();
    const [phonePrefix, setPhonePrefix] = useState('+32');
    const {data, setData, rowsToUpdate, setSearchValue, page, orderBy} = useDataContext();
    const [loading, setLoading] = useState(false);

    const prefixes = [
        {value: "+30", label: "+30"},
        {value: "+31", label: "+31"},
        {value: "+32", label: "+32"},
        {value: "+33", label: "+33"},
        {value: "+34", label: "+34"},
        {value: "+61", label: "+61"},
        {value: "+91", label: "+91"}
    ];
    const yearsAgo = dayjs().add(-16, 'year');
    const [date, setDate] = useState("");
    const [carDisabled, setCarDisabled] = useState(false);
    const [motorbikeDisabled, setMotorbikeDisabled] = useState(false);
    const [error, setError] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = () => {
        api['success']({
            message: t('success'),
            description:
                t('successMessageUpdate'),
        });
    };
    const onPrefixChange = (value) => {
        setPhonePrefix(value);
    }
    const prefixesSelect = <Select options={prefixes} onChange={onPrefixChange} defaultValue="+32"></Select>
    const onChange = (date, string) => {
        setDate(string);
    };
    const onReset = () => {
        setCarDisabled(false);
        setMotorbikeDisabled(false);
        form.resetFields();
    };

    useEffect(() => {
        form.resetFields();
    }, [rowsToUpdate])

    const toLogout = () => {
        navigate("/logout", {replace: true});
    }
    const onFinish = async (values) => {
        setError("");
        setLoading(true);
        setSearchValue("");
        await new Promise(resolve => setTimeout(resolve, 700));
        values.phoneNumber = phonePrefix + values.phoneNumber;
        values.birthday = date;
        values.hasCarLicence = carDisabled
        values.hasMotorbikeLicence = motorbikeDisabled
        values.iPage = 1;
        values.column = "id";
        try {
            const items = await fetchWithRetry('http://localhost:3267/v1/person/update', {
                method: 'PATCH',
                headers: {
                    "authorization": `Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }, toLogout)
            setData({elements: items, nbPages: data.nbPages});
            openNotificationWithIcon();
            callback();
        } catch (e) {
            setError(e);
        }
    };

    return (
        <div id="formContainer">
          {contextHolder}
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                form={form}
                requiredMark={false}
                style={{ width: '100%' }}
            >
                <Form.Item
                    name ='id'
                    label="Id"
                    disabled={true}>
                    <InputNumber defaultValue = {rowsToUpdate[0]?.id} disabled style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name='firstName'
                    label={t('firstName')}
                >
                    <Input defaultValue={rowsToUpdate[0]?.firstName} />
                </Form.Item>
                <Form.Item
                    name='lastName'
                    label={t('lastName')}
                >
                    <Input defaultValue={rowsToUpdate[0]?.lastName} />
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
                    <Input defaultValue={rowsToUpdate[0]?.password} />
                </Form.Item>
                <Form.Item
                    name='phoneNumber'
                    label={t('number')}
                >
                    <InputNumber defaultValue={rowsToUpdate[0]?.phone_number} addonBefore={prefixesSelect} min={1} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    name='birthday'
                    label={t('birthday')}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        maxDate={yearsAgo}
                        onChange={onChange}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
              <Form.Item
                name='role'
                label='Role'
              >
                <Select options={[{value:"ROLE_ADMIN", label:"Admin"}, {value:"ROLE_USER", label:"User"}]} />
              </Form.Item>
                <Form.Item name='referralCode' label={t('referralCode')}>
                    <Input placeholder="8404B98D" />
                </Form.Item>
                <Form.Item
                    name='hasCarLicence'
                    label={t('hasCarLicence')}
                >
                    <Switch onChange={() => {setCarDisabled((carDisabled) => !carDisabled)}}/>
                </Form.Item>
                <Form.Item
                    name='hasMotorbikeLicence'
                    label={t('hasMotorbikeLicence')}
                >
                    <Switch onChange={() => {setMotorbikeDisabled((motorbikeDisabled) => !motorbikeDisabled)}}/>
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
    );
};
export default UpdatePersonForm;