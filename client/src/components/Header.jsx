import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
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

const LogoLink = styled(Link)`
  text-decoration: none;
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

const WriteBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 130px;
  width: 100px;
  height: 35px;
  font-size: 15px;
  border: none;
  border-radius: 30px;
  text-align: center;
  background-color: #2e7d32;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`;

const BtnLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 25px;
`;

const LoginBtn = styled.button`
  position: absolute;
  right: 130px;
  bottom: 14px;
  background: none;
  width: 100px;
  height: 35px;
  font-size: 14px;
  border: 1px solid #6666ff;
  border-radius: 30px;
  text-align: center;
  color: #6666ff;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 14px;
  right: 0;
  width: 120px;

  & > .menu {
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 40px;
    width: 120px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  & > .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  & .lists {
    width: auto;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & .list {
    font-size: 15px;
    color: #222;
    text-align: center;

    &:not(:last-of-type) {
      border-bottom: 1px solid #dddddd;
    }
  }
`;

const DropdownMenuBtn = styled.button`
  background-color: #fff;
  border-radius: 90px;
  width: 100px;
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
    font-size: 14px;
    color: #222;
    margin: 0 10px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const UserCircle = styled(FaUserCircle)`
  color: #6666ff;
  font-size: 24px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #222;
  padding: 15px;
  display: block;

  &:hover {
    color: #6666ff;
  }
`;

const Logout = styled.span`
  background: none;
  border: none;
  color: #222;
  padding: 15px;
  display: block;
  cursor: pointer;

  &:hover {
    color: #6666ff;
  }
`;

function Header() {
  const { isAuth, nickname } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  const onMenuActive = () => {
    setIsActive(!isActive);
  };

  const onLogout = () => {
    dispatch(logout());
    setIsActive(!isActive);
  };

  return (
    <Base>
      <MenuList>
        <Menu>
          <LogoLink to="/">
            <TextLogo>
              <span className="primary">Study</span>
              &nbsp;
              <span>maker</span>
            </TextLogo>
          </LogoLink>
        </Menu>
        {isAuth && (
          <BtnLink to="/write">
            <WriteBtn>글쓰기</WriteBtn>
          </BtnLink>
        )}
        <Menu>
          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuBtn onClick={onMenuActive}>
                <UserCircle />
                <span>{nickname}</span>
              </DropdownMenuBtn>
              <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul className="lists">
                  <li className="list">
                    <MenuLink to="/mypage" onClick={onMenuActive}>
                      나의 게시글
                    </MenuLink>
                  </li>
                  <li className="list">
                    <Logout onClick={onLogout}>로그아웃</Logout>
                  </li>
                </ul>
              </nav>
            </DropdownMenu>
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
