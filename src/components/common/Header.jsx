import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'

const Header = () => {

const headers=[
{
    path:'/',
    title:'Schoolbus V 1.0'
},
{
    path:'/Vehicle/Brand',
    title:'Marka İşlemleri'
},
{
    path:'/Vehicle/Model',
    title:'Model İşlemleri'
},
{
    path:'/Contact',
    title:'Bize Ulaşın'
},
{
    path:'/Login',
    title:'Giriş Yap'
},
{
    path:'/Logout',
    title:'Çıkış Yap'
},
];

const location = useLocation();

const [title, setTitle] =useState('');

useEffect(()=>{
    let currentHeader = headers.find(x => x.path == location.pathname);
    if(currentHeader){
        setTitle(currentHeader.title);
    }    
},[location]);

  return (
    <h3>{title}</h3>
  )
}

export default Header