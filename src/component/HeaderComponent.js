import React from "react";
import styled from "styled-components";

import { Layout, Menu } from 'antd';

import { ReactComponent as Brand } from '../GroundUp.svg';
import { ReactComponent as Settings } from '../settings.svg';
import { ReactComponent as Avatar } from '../avatar.svg'
import { ReactComponent as Notification } from '../notification.svg'

const { Header } = Layout;

const Logo = styled.div`
height: 64px;
width: 200px;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
z-index: 9;
`;
const HeaderAction = styled.div`
padding: 0 15px;
flex: 1;
display: flex;
justify-content: space-between;
align-items: center;
`;
const Action = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
span {
    margin-left: 15px;
    height: 100%;
    display: flex;
    align-items: center;
}
`;
const Spacer = styled.span`
border-left: 1px solid rgba(95, 99, 104, 1);
height: 53% !important;
`;
const Dot = styled.span`
position: absolute;
top: 18px;
width: 11px;
height: 11px !important;
right: 187px;
border-radius: 50%;
background: rgba(52, 120, 252, 1);
line-height: 1;
text-align: center;
white-space: nowrap;
vertical-align: baseline;
font-weight: 500;
font-size: 9px;
color: #fff;
padding: 0.25em;
`;
function HeaderComponent() {
  
    return (
        <Header style={{ background: 'rgba(255, 255, 255, 1)', display: 'flex' }}>
            <Logo>
                <Brand />
            </Logo>
            <HeaderAction>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} style={{width: '300px'}}>
                    <Menu.Item key="1">DASHBOARD</Menu.Item>
                    <Menu.Item key="2">ALERT</Menu.Item>
                </Menu>
            </HeaderAction>
            <Action>
                <span><Settings /></span>
                <span><Avatar /></span>
                <span><Dot>3</Dot><Notification /></span>
                <Spacer />
                <span>Welcome Admin!</span>
            </Action>
        </Header>
    )
}

export default HeaderComponent;