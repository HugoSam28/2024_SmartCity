import { useState } from 'react';
import { Button, Form, Input, Space , Select, DatePicker, Switch} from 'antd';
import {useLanguageContext} from "../contexts/languageContext.jsx";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


const FormPopUp = () => {
    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');
    const { t } = useLanguageContext();
    const { Option } = Select;
    const [date, setDate] = useState(dayjs());

    const onFinish = (values) => {
        values.user.birthday = date.format('YYYY-MM-DD');
        console.log('Form values:', values);
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const selectBefore = (
        <Select defaultValue="+32">
            <Option value="+32">+32</Option>
            <Option value="+33">+33</Option>
        </Select>
    );

    const onChange = (date) => {
        setDate(date);
        console.log(date.toString("YYYY-MM-DD"));
    };

    const yearsAgo = dayjs().add(-16, 'year');

    return (

        <Form
            onFinish={onFinish}
            layout={formLayout}
            form={form}
            initialValues={{
                layout: formLayout,
            }}
            style={{
                maxWidth: formLayout === 'inline' ? 'none' : 600,
            }}
            validateMessages={validateMessages}
        >
            <Form.Item name={['user', 'firstName']} label={t('firstName')}>
                <Input placeholder="Hugo" />
            </Form.Item>

            <Form.Item name={['user', 'lastName']} label={t('lastName')}>
                <Input placeholder="Guebs" />
            </Form.Item>

            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {type: 'email',},
                ]}
            >
                <Input placeholder="huo@gmail.com" />
            </Form.Item>

            <Form.Item name={['user', 'number']} label={t('number')}>
                <Input addonBefore={selectBefore}/>
            </Form.Item>

            <Form.Item name={['user', 'birthday']} label={t('birthday')}>
                <DatePicker
                    onChange={onChange}
                    format="YYYY-MM-DD"
                    maxDate={yearsAgo}
                />
            </Form.Item>

            <Form.Item name={['user', 'hasCarLicence']} label={t('hasCarLicence')} valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name={['user', 'hasMotorbikeLicence']} label={t('hasMotorbikeLicence')} valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button>{t('reset')}</Button>
                    <Button type="primary" htmlType="submit">{t('submit')}</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
export default FormPopUp;