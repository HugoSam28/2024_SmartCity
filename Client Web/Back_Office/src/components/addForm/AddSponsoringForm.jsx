import {Button, Form, InputNumber, Space} from "antd";
import {useLanguageContext} from "../../contexts/LanguageContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddSponsoringForm() {
  const [form] = Form.useForm();
  const {t} = useLanguageContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onReset = () => {
    form.resetFields();
  }
  const onFinish = async (values) => {
    setError("");
    values.iPage = 1;
    values.column = "id";
    await fetch('http://localhost:3267/v1/sponsoring/add', {
      method: 'POST',
      headers: {
        "authorization": `Bearer ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),

    })
      .then(response => {
        if (!response?.ok) {
          if(response.status === 401) {
            navigate("/logout", {replace:true});
          }
          throw new Error(`${t('httpError')} : ${response.status}, ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch (e => setError(e.message))
  };
  return (
    <div id="formContainer">
      <Form
        onFinish={onFinish}
        layout={"vertical"}
        form={form}
        requiredMark={'optional'}
      >
        <Form.Item
          name='sponsor'
          label={t('sponsor')}
          rules={[
            {required: true,},
          ]}>
          <InputNumber placeholder="21" style={{width: '100%'}} min={1} />
        </Form.Item>
        <Form.Item
          name='referred'
          label={t('referred')}
          rules={[
            {required: true,},
          ]}>
          <InputNumber placeholder="37" style={{width: '100%'}} min={1} />
        </Form.Item>
        {error && <p style={{color: "red"}}>{error}</p>}
        <Form.Item>
          <Space>
            <Button onClick={onReset} color="default" variant="filled">{t('reset')}</Button>
            <Button type="primary" htmlType='submit'>{t('add')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddSponsoringForm