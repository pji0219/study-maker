import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Base = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 62px;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 1px 5px 0px #bdbdbd;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 1200px;
  display: flex;
  background-color: #fff;
  position: relative;
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  height: 62px;

  &:not(:first-of-type) {
    margin-left: 24px;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  font-size: 15px;
  font-weight: 550;
`;

const TextLogo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;

  > span[class='primary'] {
    color: #6666ff;
  }

  > span:not(.primary) {
    color: #222;
  }
`;

const LogoutBtn = styled.button`
  position: absolute;
  right: 0;
  background: none;
  width: 100px;
  height: 35px;
  font-size: 15px;
  border: 1px solid #6666ff;
  border-radius: 30px;
  text-align: center;
  color: #6666ff;
  cursor: pointer;
`;

function Header() {
  return (
    <Base>
      <MenuList>
        <Menu>
          <Link to="/">
            <TextLogo>
              <span className="primary">Study</span>
              &nbsp;
              <span>maker</span>
            </TextLogo>
          </Link>
        </Menu>
        <Menu>
          <MenuLink
            to={`/mypage/${1}`}
            style={({ isActive }) => ({
              color: isActive ? '#6666ff' : '#7e7e7e',
            })}
          >
            마이페이지
          </MenuLink>
        </Menu>
        <Menu>
          <LogoutBtn>로그아웃</LogoutBtn>
        </Menu>
      </MenuList>
    </Base>
  );
}

export default Header;
