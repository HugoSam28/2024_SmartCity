import { useState } from 'react';
import { Button, Form, Input, Space , Select, DatePicker, Switch} from 'antd';
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import dayjs from 'dayjs';

function UpdatePersonForm() {
    const [form] = Form.useForm();
    const { t } = useLanguageContext();
    const [phonePrefix, setPhonePrefix] = useState('+32');
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
    const onFinish = async (values) =>  {
        setError("");
        values.phoneNumber = phonePrefix + values.phoneNumber;
        values.birthday = date;
        values.hasCarLicence = carDisabled
        values.hasMotorbikeLicence = motorbikeDisabled
        values.iPage = 1;
        values.column = "id";
        await fetch('http://localhost:3267/v1/person/update', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),

        })
            .then(response => {
                if (!response?.ok) {
                    throw new Error(`${t('httpError')} : ${response.status}, ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch (e => setError(e.message))
    };

    const valeur = {id : 2}
    return (
        <div id="formContainer">
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
                    <Input defaultValue = {valeur.id} disabled />
                </Form.Item>

                <Form.Item
                    name='firstName'
                    label={t('firstName')}
                    rules={[
                        {required: true,},
                    ]}>
                    <Input placeholder="John" />
                </Form.Item>

                <Form.Item
                    name='lastName'
                    label={t('lastName')}
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input placeholder="Smith" />
                </Form.Item>

                <Form.Item
                    name='email'
                    label="Email"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input placeholder="johnsmith@mail.com" />
                </Form.Item>

                <Form.Item
                    name='password'
                    label={t('password')}
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input placeholder="Strong.Passw0rd" />
                </Form.Item>

                <Form.Item
                    name='phoneNumber'
                    label={t('number')}
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input addonBefore={prefixesSelect}/>
                </Form.Item>

                <Form.Item
                    name='birthday'
                    label={t('birthday')}
                    rules={[
                        {required: true,},
                    ]}
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
                        <Button type="primary" htmlType='submit'>{t('submit')}</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};
export default UpdatePersonForm;