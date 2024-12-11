import React from 'react'
import {Form, Input, Button} from 'antd'
import UserService from '../services/UserService';
import {useNavigate} from 'react-router-dom';
import loginStore from '../states/loginStore'

const Login = () => {
const navigate = useNavigate();
const {setLoginStatus} = loginStore();
  const handleLogin = async (values) => {
    const response = await UserService.LoginAsync(values);
    if(response.isSuccess){
      setLoginStatus({isLogged:true, ...response.data});
      navigate('/');
    }
  };

  return (
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={handleLogin}
    autoComplete="off"
  >
    <Form.Item
      label="Kullanıcı adı"
      name="userName"
      rules={[
        {
          required: true,
          message: 'Kullanıcı adı boş olamaz.',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Parola boş olamaz.',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Oturum Aç
      </Button>
    </Form.Item>
  </Form>
  )
}

export default Login