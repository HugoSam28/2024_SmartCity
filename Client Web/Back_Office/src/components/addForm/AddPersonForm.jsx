import { useState } from 'react';
import {Button, Form, Input, Space, Select, DatePicker, Switch, InputNumber, notification} from 'antd';
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import dayjs from 'dayjs';
import {useDataContext} from "../../contexts/DataTransferContext.jsx";
import fetchWithRetry from "../../API/fetchWithRetry.jsx";
import {useNavigate} from "react-router-dom";

function AddPersonForm({callback}) {
    const [form] = Form.useForm();
    const { t } = useLanguageContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
    const [carLicence, setCarLicence] = useState(false);
    const [motorbikeLicence, setMotorbikeLicence] = useState(false);
    const [error, setError] = useState("");
    const {setData, setSearchValue, orderBy, page} = useDataContext();
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
      api['success']({
        message: t('success'),
        description:
          t('successMessageAdd'),
      });
    };
    const onPrefixChange = (value) => {
    setPhonePrefix(value);
  }
    const prefixesSelect = <Select options={prefixes} onChange={onPrefixChange} defaultValue="+32" />
    const onDateChange = (date, string) => {
      setDate(string);
    };
    const onReset = () => {
      setCarLicence(false);
      setMotorbikeLicence(false);
      form.resetFields();
    };
    const toLogout = () => {
      navigate("/logout", {replace: true});
    }
    const addData = async (values) => {
      setLoading(true);
      console.log('YOLO')
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const items = await fetchWithRetry('http://localhost:3267/v1/person/add', {
          method: 'POST',
          headers: {
            "authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }, toLogout)
        setData({elements:items.persons, nbPages: items.nbPagesPersons});
        openNotification();
        callback();
      }
      catch (e) {
        setError(e.message)
      }
    }
    const onFinish = async (values) =>  {
      setError("");
      setSearchValue("");
      values.phoneNumber = phonePrefix + values.phoneNumber;
      values.birthday = date;
      values.hasCarLicence = carLicence;
      values.hasMotorbikeLicence = motorbikeLicence;
      values.iPage = page;
      values.column = orderBy;
      console.log(values);
      addData(values).then(()=> setLoading(false))
    };

    return (
      <div id="formContainer">
        {contextHolder}
        <Form
            onFinish={onFinish}
            layout={"vertical"}
            form={form}
            requiredMark={false}
        >
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
                <InputNumber addonBefore={prefixesSelect} min={1} style={{width: '100%'}}/>
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
                    onChange={onDateChange}
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
                <Switch onChange={() => {setCarLicence((carLicence) => !carLicence)}}/>
            </Form.Item>
            <Form.Item
              name='hasMotorbikeLicence'
              label={t('hasMotorbikeLicence')}
            >
                <Switch onChange={() => {setMotorbikeLicence((motorbikeLicence) => !motorbikeLicence)}}/>
            </Form.Item>
            {error && <p style={{color: "red"}}>{error}</p>}
            <Form.Item>
                <Space>
                    <Button loading={loading} onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
                    <Button type="primary" loading={loading} htmlType='submit'>{t('add')}</Button>
                </Space>
            </Form.Item>
        </Form>
      </div>
    );
}
export default AddPersonForm;