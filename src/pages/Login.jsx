import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import loginStore from '../states/loginStore';
import SeasonService from '../services/SeasonService';

const Login = () => {
  //states
  const [seasons, setSeasons] = useState([]);
  const [formSubmittable, setFormSubmittable] = useState(false);

  //hooks
  const navigate = useNavigate();
  const { setLoginStatus } = loginStore();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({validateOnly:true})
      .then(() => {setFormSubmittable(true)})
      .catch(() => {setFormSubmittable(false)});
  }, [form, values]);

  useEffect(() => {
    const getSeasons = async () => {
      await handleGetSeasons();
    }
    getSeasons();
  }, []);


  //functions
  const handleGetSeasons = async () => {
    const result = await SeasonService.GetAllAsyc();
    if (result.isSuccess) {
      setSeasons(result.data.map((season) => {
        return {
          value: season.seasonId,
          label: season.name
        }
      }))
    }
  }

  const handleLogin = async (values) => {
    const response = await UserService.LoginAsync(values);
    if (response.isSuccess) {
      setLoginStatus({ isLogged: true, ...response.data });
      navigate('/');
    }
  };

  return (
    <Form
      form={form}
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

      <Form.Item
        label="Sezon"
        name="seasonId"
        rules={[
          {
            required: true,
            message: 'Sezon seçilmelidir.',
          },
        ]}>
        <Select
          showSearch
          placeholder="İşlem yapılacak sezon"
          options={seasons}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" disabled={!formSubmittable}>
          Oturum Aç
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login