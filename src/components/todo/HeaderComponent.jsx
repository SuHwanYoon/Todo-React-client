import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const username = authContext.username;

  // useTranslation 훅 사용
  const { t, i18n } = useTranslation();

  function logout() {
    authContext.logout();
  }

  // 언어 변경 함수
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <Container>
        <Navbar expand="lg">
          <Navbar.Brand 
            href="https://suhwanyoon.github.io/Web-Dev-Complete/" 
            className="ms-2 fs-6 fw-bold text-black"
            target="_blank"
            rel="noopener noreferrer"  // 보안을 위한 필수 속성
          >
            Yoon's FrontEnd Page Link
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to={`/welcome/${username}`}>{t('home')}</Nav.Link>
                  <Nav.Link as={Link} to="/todos">{t('todos')}</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <NavDropdown title={t('Language')} id="language-nav-dropdown" className="bg-primary rounded fw-bold ">
                <NavDropdown.Item onClick={() => changeLanguage("en")} active={i18n.language === 'en'}>
                  English
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage("ko")} active={i18n.language === 'ko'}>
                  한국어
                </NavDropdown.Item>
              </NavDropdown>
              {!isAuthenticated && (
                <Nav.Link as={Link} to="/login">{t('login')}</Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link as={Link} to="/logout" onClick={logout}>{t('logout')}</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
}

export default HeaderComponent;