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
    const [phonePrefix, setPhonePrefix] = useState('+32');
    const {data, setData, rowsToUpdate, setSearchValue, page, orderBy} = useDataContext();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const yearsAgo = dayjs().add(-16, 'year');
    const [date, setDate] = useState("");
    const [carDisabled, setCarDisabled] = useState(rowsToUpdate[0]?.hasCarLicence || false);
    const [motorbikeDisabled, setMotorbikeDisabled] = useState(rowsToUpdate[0]?.hasMotorbikeLicence || false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const openNotificationWithIcon = () => {
        api['success']({
            message: t('success'),
            description:
                t('successMessageUpdate'),
        });
    };

    const prefixes = [
        {value: "+30", label: "+30"},
        {value: "+31", label: "+31"},
        {value: "+32", label: "+32"},
        {value: "+33", label: "+33"},
        {value: "+34", label: "+34"},
        {value: "+61", label: "+61"},
        {value: "+91", label: "+91"}
    ];

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
        values.iPage = page;
        values.column = orderBy;

        try {
            console.log(values)
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
            setError(e instanceof Error ? e.message : "Une erreur est survenue");
        }
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
                    firstName: rowsToUpdate[0]?.first_name,
                    lastName: rowsToUpdate[0]?.last_name,
                    email: rowsToUpdate[0]?.email,
                    phoneNumber: rowsToUpdate[0]?.phone_number,
                    birthday: rowsToUpdate[0]?.birthday ? dayjs(rowsToUpdate[0]?.birthday) : null, // Assure que birthday est un objet dayjs
                    role: rowsToUpdate[0]?.role,
                    hasCarLicence: rowsToUpdate[0]?.has_car_licence,
                    hasMotorbikeLicence: rowsToUpdate[0]?.has_motorbike_licence,
                    referralCode: rowsToUpdate[0]?.referral_code,
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
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='lastName'
                    label={t('lastName')}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='email'
                    label="Email"
                >
                    <Input/>
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
                    <InputNumber addonBefore={prefixesSelect} min={1} style={{width:'100%'}}/>
                </Form.Item>

                <Form.Item name='birthday' label={t('birthday')}>
                    <DatePicker
                        format="YYYY-MM-DD"
                        maxDate={yearsAgo}
                        defaultValue={rowsToUpdate[0]?.birthday ? dayjs(rowsToUpdate[0]?.birthday) : null}  // Conversion à dayjs
                        onChange={onChange}
                        style={{width: '100%'}}
                    />
                </Form.Item>

                <Form.Item
                    name='role'
                    label='Role'>
                    <Select options={[{value:"ROLE_ADMIN", label:"Admin"}, {value:"ROLE_USER", label:"User"}]} />
                </Form.Item>

                <Form.Item
                    name='referralCode'
                    label={t('referralCode')}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name='hasCarLicence'
                    label={t('hasCarLicence')}
                    valuePropName="checked">
                    <Switch defaultChecked={rowsToUpdate[0]?.hasCarLicence} />
                </Form.Item>

                <Form.Item
                    name='hasMotorbikeLicence'
                    label={t('hasMotorbikeLicence')}
                    valuePropName="checked">
                    <Switch defaultChecked={rowsToUpdate[0]?.hasMotorbikeLicence} />
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
    );
};
export default UpdatePersonForm;