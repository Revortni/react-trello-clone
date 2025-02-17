import { Dropdown, Menu } from 'antd';
import { UserOutlined, HomeOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { ACCOUNT, BOARDS } from '../../routes';
import { Button } from '../../shared/components/Button';
import { signOut } from '../../auth/services/auth';

const Nav = () => {
    return (
        <StyledNav>
            <NavItems>
                <Link to={BOARDS}>
                    <StyledButton>
                        <HomeOutlined />
                    </StyledButton>
                </Link>
            </NavItems>
            <NavUser>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="0">
                                <UserOutlined />
                                <StyledLink to={ACCOUNT}>Settings</StyledLink>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="1" onClick={() => signOut()}>
                                <LogoutOutlined /> Sign Out
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <StyledButton>
                        <SettingOutlined />
                    </StyledButton>
                </Dropdown>
            </NavUser>
        </StyledNav>
    );
};

const StyledLink = styled(Link)`
    display: inline-block !important;
`;

const StyledButton = styled(Button)`
    background: hsla(0, 0%, 100%, 0.3);
    &:hover {
        background: hsla(0, 0%, 100%, 0.2);
    }
    &:active {
        background: hsla(0, 0%, 100%, 0.1);
    }
`;

const StyledNav = styled.nav`
    background: #0079bf;
    padding: 4px;
    margin-bottom: 20px;
`;

const NavItems = styled.div`
    display: inline-block;
    margin-right: 10px;
    a {
        display: inline-block;
    }
`;

const NavUser = styled.div`
    position: absolute;
    right: 0;
    top: 4px;
    div {
        display: inline-block;
    }
`;

export default withRouter(Nav);
