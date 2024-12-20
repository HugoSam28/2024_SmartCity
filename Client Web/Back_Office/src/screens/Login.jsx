import {useLanguageContext} from "../contexts/LanguageContext.jsx";
import {useState} from "react";
import jwt_decode from "jwt-decode";
import {Navigate, useNavigate} from "react-router-dom";
import {Button, Form, Input} from "antd";

export default function LoginScreen() {

  const {t} = useLanguageContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  if (sessionStorage.getItem('token')) {
    return <Navigate to="/dashboard" replace/>;
  }

  const handleLogin = async (values) => {
    setError("");

    const maxRetries = 5;
    let retryCount = 0;

    const loginWithRetry = async () => {
      try {
        const response = await fetch('http://localhost:3267/v1/person/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.status === 400) {
          throw new Error(t("badRequestError"));
        }
        if (!response.ok) {
          throw new Error(t("connectionApiError"));
        }
        const token = await response.text();
        const decodedToken = jwt_decode(token);

        if (decodedToken.role !== "ROLE_ADMIN") {
          throw new Error(t("wrongPassword"));
        }
        sessionStorage.setItem('token', token);
        navigate("/dashboard");
      } catch (error) {
        if (retryCount < maxRetries && error.message !== t("badRequestError") && error.message !== t("wrongPassword")) {
          retryCount++;
          const waitTime = Math.pow(2, retryCount) * 500;
          setError(`Retrying... (${retryCount})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return loginWithRetry();
        } else {
          throw error;
        }
      }
    };

    try {
      await loginWithRetry();
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div id="loginContainer">
      <div id="formContainer">
        <Form
          name="login"
          onFinish={handleLogin}
          layout={'vertical'}
          id="loginForm"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="email" placeholder="johnsmith@mail.com"/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password type="password" placeholder="Strong.Passw0rd"/>
          </Form.Item>
          {error && <p style={{color: "red"}}>{error}</p>}
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {t("login")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
