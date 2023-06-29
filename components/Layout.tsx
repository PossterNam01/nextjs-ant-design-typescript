'use client';
import React, { useState, FunctionComponent, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import {
  DesktopOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  CaretRightOutlined,
  PoweroffOutlined,
  LoginOutlined,
  ContainerOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { LogoutUser } from '../pages/utils/PostData';
import jwtDecode from 'jwt-decode';

const { SubMenu, Item } = Menu;
const { Sider, Content, Header } = Layout;

interface Router extends NextRouter {
  path: string;
  breadcrumbName: string;
}

interface Props extends WithRouterProps {
  router: Router;
}

function itemRender(route: Router) {
  return route.path === 'index' ? (
    <Link href={'/'}>
      <a>{route.breadcrumbName}</a>
    </Link>
  ) : (
    <span>{route.breadcrumbName}</span>
  );
}

function routesMaker(pathsplit: string[]) {
  let routes = [
    {
      path: 'index',
      breadcrumbName: 'home',
    },
  ];
  for (let v of pathsplit) {
    const pathInfo = {
      path: v,
      breadcrumbName: v,
    };
    if (v !== '') routes.push(pathInfo);
  }
  return routes;
}

function AppLayout(props: React.PropsWithChildren<Props>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userToken, setUserToken] = useState<ITokenObject>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const convertToObject: ITokenObject = jwtDecode(token);
      setUserToken(convertToObject);
    }
  }, []);

  const onChangeIsCollapsed = (isCollapsed: boolean) => {
    setIsCollapsed(isCollapsed);
  };

  const pathname = props.router.pathname;
  const path_split: string[] = pathname.split('/');
  const routes = routesMaker(path_split);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={onChangeIsCollapsed}
        theme="light"
      >
        <Link href="/menu1">
          <a>
            <img src="/favicon.ico" className="App-logo" alt="" />
          </a>
        </Link>
        <Menu
          theme="light"
          defaultSelectedKeys={['/menu1']}
          selectedKeys={[path_split.pop()]}
          defaultOpenKeys={[path_split[1]]}
          mode="inline"
        >
          <Item icon={<DesktopOutlined />}>
            <Link href="/menu1">
              <a>Dashboard</a>
            </Link>
          </Item>
          <Item icon={<BookOutlined />}>
            <Link href="/book">
              <a>Book</a>
            </Link>
          </Item>
          {/* <Item icon={<UserOutlined />}>
            <Link href="/director">
              <a>Director</a>
            </Link>
          </Item>
          <Item icon={<CaretRightOutlined />}>
            <Link href="/movies">
              <a>Movie</a>
            </Link>
          </Item> */}
          <Item icon={<DesktopOutlined />}>
            <Link href="/cart">
              <a>Book self</a>
            </Link>
          </Item>
          <Item icon={<ShoppingCartOutlined />}>
            <Link href="/order">
              <a>Book Order</a>
            </Link>
          </Item>
          <Item icon={<ProfileOutlined />}>
            <Link href="/order/user_history_order">
              <a>your Order</a>
            </Link>
          </Item>
          <Item icon={<ProfileOutlined />}>
            <Link href="/order/user_history_order">
              <a>Order Manager</a>
            </Link>
          </Item>
          {/* <SubMenu icon={<SettingOutlined />} title="Menu 3">
            <Item>
              <Link href="/menu3/submenu1">
                <a>Submenu 1</a>
              </Link>
            </Item>
            <Item>
              <Link href="/menu3/submenu2">
                <a>Submenu 2</a>
              </Link>
            </Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 16px 16px' }}>
        <Header style={{ marginTop: '10px', background: '#ffffff' }}>
          <div className="flex flex-row-reverse pt-2">
            <Menu>
              {userToken ? (
                <SubMenu
                  icon={<UserOutlined style={{ fontSize: '1.2rem' }} />}
                  title={userToken.sub}
                >
                  <Item icon={<ContainerOutlined />}>
                    <Link href="/menu3/submenu1">
                      <a className="ml-4">Profile</a>
                    </Link>
                  </Item>
                  <Item icon={<PoweroffOutlined />}>
                    <Button
                      onClick={async () => await LogoutUser()}
                      style={{ border: 'none' }}
                    >
                      Logout
                    </Button>
                  </Item>
                </SubMenu>
              ) : (
                <Item icon={<LoginOutlined />}>Login</Item>
              )}
            </Menu>
          </div>
        </Header>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          itemRender={itemRender}
          routes={routes}
        />
        <Content
          className="site-layout-background"
          style={{
            padding: 16,
            minHeight: 280,
            backgroundColor: '#ffffff',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(AppLayout);
