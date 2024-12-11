import React from 'react'
import loginStore from '../states/loginStore';
import { Button, Flex } from 'antd';
import {useNavigate} from 'react-router-dom'

const Logout = () => {

  const { setLoginStatus } = loginStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    //Kayıtlı bilgileri sıfırla
    localStorage.clear();
    setLoginStatus(
      {
        isLogged: false,
        user: {
          userId: 0,
          token: ''
        }
      });
      //Ana sayfaya gönder
      navigate('/');
  }

  return (
    <div>
      <p>Oturumu kapatırsanız giriş bilgileriniz tamamen sıfırlanacaktır.</p>
      <Button style={{marginTop:"20px"}} onClick={handleSignOut} type="primary" danger>
        Oturumu Kapat
      </Button>
    </div>
  )
}

export default Logout