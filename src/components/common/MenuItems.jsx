import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import loginStore from '../../states/loginStore';
import MenuType from '../../utils/types/MenuType';
import { useNavigate } from 'react-router-dom';

export const MenuItems = () => {

  const { loginStatus } = loginStore();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      icon: <DesktopOutlined />,
      label: "Ana Sayfa",
      menuType: MenuType.SHOW_ALWAYS,
      path: "/"
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: "Araç İşlemleri",
      menuType: MenuType.SHOW_LOGGED,
      children: [
        {
          key: '3',
          icon: <DesktopOutlined />,
          label: "Marka İşlemleri",
          menuType: MenuType.SHOW_LOGGED,
          path: "Vehicle/Brand"
        },
        {
          key: '4',
          icon: <DesktopOutlined />,
          label: "Model İşlemleri",
          menuType: MenuType.SHOW_LOGGED,
          path: "Vehicle/Model"
        },
      ]
    },
    {
      key: '10',
      icon: <UserOutlined />,
      label: "Giriş Yap",
      menuType: MenuType.SHOW_GUEST,
      path: "Login"
    },
    {
      key: '11',
      icon: <UserOutlined />,
      label: "İletişim",
      menuType: MenuType.SHOW_ALWAYS,
      path: "Contact"
    },
    {
      key: '12',
      icon: <UserOutlined />,
      label: "Çıkış Yap",
      menuType: MenuType.SHOW_LOGGED,
      path: "Logout"
    }
  ];

  //states
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  const handleMenuItemClick = (item) => {
    let key = item.key;
    let menuItem = menuItems.find(x => x.key == key);
    if (!menuItem) {
      menuItems.forEach(parent => {
        const childItem = parent.children?.find(child => child.key === key);
        if (childItem) {
          menuItem = childItem;
        }
      });
    }

    if (menuItem?.path) {
      navigate(menuItem.path);
    }
  }

  useEffect(() => {
    const filteredMenu = menuItems.filter((item) => {
      if (loginStatus.isLogged) {
        return item.menuType === MenuType.SHOW_ALWAYS || item.menuType === MenuType.SHOW_LOGGED;
      } else {
        return item.menuType === MenuType.SHOW_GUEST || item.menuType === MenuType.SHOW_ALWAYS;
      }
    });

    
    const cleanedMenu = filteredMenu.map(({ menuType, path, ...rest }) => ({
      ...rest,
      children: rest.children?.map(({ menuType, path, ...childRest }) => childRest)
    }));

    setFilteredMenuItems(cleanedMenu);
  }, [loginStatus.isLogged]);

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={filteredMenuItems} onClick={item => handleMenuItemClick(item)} />
  )
}
