import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

import { logout } from '../redux-modules/auth';

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

// const MenuLink = styled(NavLink)`
//   text-decoration: none;
//   font-size: 15px;
//   font-weight: 550;
// `;

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

// const MyPageLink = styled(NavLink)`
//   text-decoration: none;
//   font-size: 15px;
//   font-weight: 550;
//   position: absolute;
//   right: 220px;
// `;

const WriteBtn = styled.button`
  position: absolute;
  right: 110px;
  width: 100px;
  height: 35px;
  font-size: 15px;
  border: none;
  border-radius: 30px;
  text-align: center;
  background-color: #2e7d32;
  color: #fff;
  cursor: pointer;
  margin-top: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`;

const BtnLink = styled(NavLink)`
  text-decoration: none;
  margin-bottom: 25px;
`;

const LoginBtn = styled.button`
  position: absolute;
  right: 0;
  background: none;
  width: 100px;
  height: 35px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #6666ff;
  border-radius: 30px;
  text-align: center;
  color: #6666ff;
  cursor: pointer;
`;

const DropdownMenuContainer = styled.div`
  position: absolute;
  right: 0;
`;
const DropdownMenu = styled.div`
  position: relative;
  top: 25px;

  & > .menu .active {
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    top: 60px;
    right: 0;
    width: 500px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: visible;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  /* & > .menu .active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  } */

  & ul {
    background-color: #fff;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    border-bottom: 1px solid #dddddd;
  }
`;

const DropdownMenuBtn = styled.button`
  height: 40px;
  background-color: #fff;
  border-radius: 90px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.4s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  & > span {
    font-weight: 700;
    vertical-align: middle;
    font-size: 14px;
    margin: 0 10px;
  }
`;

const UserCircle = styled(FaUserCircle)`
  color: #6666ff;
  font-size: 24px;
`;

function Header() {
  const { isAuth, nickname } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsactive] = useState(true);

  const onLogout = () => {
    dispatch(logout());
  };

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
        {isAuth && (
          <BtnLink to="/write">
            <WriteBtn>글쓰기</WriteBtn>
          </BtnLink>
        )}
        <Menu>
          {isAuth ? (
            <DropdownMenuContainer>
              <DropdownMenu>
                <DropdownMenuBtn>
                  <UserCircle />
                  <span>{nickname}</span>
                </DropdownMenuBtn>
                <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
                  <ul>
                    <li>마이페이지</li>
                    <li>마이페이지</li>
                    <li>마이페이지</li>
                  </ul>
                </nav>
              </DropdownMenu>
            </DropdownMenuContainer>
          ) : (
            <BtnLink to="/login">
              <LoginBtn>로그인&nbsp;/&nbsp;가입</LoginBtn>
            </BtnLink>
          )}
        </Menu>
      </MenuList>
    </Base>
  );
}

export default Header;
