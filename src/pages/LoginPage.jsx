import { useState } from "react";
import "../styles/Login.css";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  function clickLogin() {
    setIsLogin(true);
  }

  function clickRegister() {
    setIsLogin(false);
  }

  return (
    <div className="LogPage">
      <Header />

      {isLogin ? (
        <Login onRegisterClick={clickRegister} />
      ) : (
        <RegisterPage onLoginClick={clickLogin} />
      )}

      <Footer />
    </div>
  );
}

function RegisterPage({ onLoginClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Емейл не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный емейл");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Пароль должен быть не менее 8 символов");
      if (!e.target.value) {
        setPasswordError("Пароль не можеть быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  return (
    <div className="main-container">
      <div className="main-reg">
        <div className="container-reg">
          <span className="title">Регистрация</span>
          <div className="input-faild">
            <input type="text" className="name-log" placeholder="Name"></input>
            <FaUser className="input-icon"></FaUser>
          </div>
          <div className="input-faild">
            <input
              onChange={(e) => emailHandler(e)}
              value={email}
              onBlur={(e) => blurHandler(e)}
              name="email"
              type="email"
              className="input-email"
              placeholder="Email"
            ></input>
            <IoMdMail className="input-icon" />
          </div>
          {emailDirty && emailError && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <div className="input-faild">
            <input
              onChange={(e) => passwordHandler(e)}
              value={password}
              onBlur={(e) => blurHandler(e)}
              name="password"
              type="password"
              placeholder="Password"
              className="input-password"
            ></input>
            <FaLock className="input-icon" />
          </div>
          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <div className="input-faild">
            <input
              onChange={(e) => passwordHandler(e)}
              value={password}
              onBlur={(e) => blurHandler(e)}
              name="password"
              type="password"
              placeholder="Password"
              className="input-password"
            ></input>
            <FaLock className="input-icon" />
          </div>
          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <div className="checkbox-text">
            <div className="checkbox-content">
              <input type="checkbox" className="checkbox-input"></input>
              <span className="checkbox-span">Запомнить меня</span>
            </div>
          </div>
          <div className="log-button">
            <Link to={"/"}>
              <input type="button" value="Создать" required />
            </Link>
          </div>
          <div className="login-signup">
            <span>Уже есть аккаунт?</span>
            <button onClick={onLoginClick}>Войти</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Login({ onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Емейл не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный емейл");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Пароль должен быть не менее 8 символов");
      if (!e.target.value) {
        setPasswordError("Пароль не можеть быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  return (
    <div className="main-container">
      <div className="main-log">
        <div className="container-reg">
          <span className="title">Войти</span>
          <div className="input-faild">
            <input
              type="text"
              placeholder="Name"
              className="input-user"
            ></input>
            <FaUser className="input-icon"></FaUser>
          </div>
          <div className="input-faild">
            <input
              onChange={(e) => emailHandler(e)}
              value={email}
              onBlur={(e) => blurHandler(e)}
              name="email"
              type="email"
              className="input-email"
              placeholder="Email"
            ></input>
            <IoMdMail className="input-icon" />
          </div>
          {emailDirty && emailError && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <div className="input-faild">
            <input
              onChange={(e) => passwordHandler(e)}
              value={password}
              onBlur={(e) => blurHandler(e)}
              name="password"
              type="password"
              placeholder="Password"
              className="input-password"
            ></input>
            <FaLock className="input-icon" />
          </div>
          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <div className="checkbox-text">
            <div className="checkbox-content">
              <input type="checkbox" className="checkbox-input"></input>
              <span className="checkbox-span">Запомнить меня</span>
            </div>
            <a href="#" class="text">
              Забыли пароль?
            </a>
          </div>
          <div className="log-button">
            <Link to={"/"}>
              <input type="button" value="Войти" required />
            </Link>
          </div>
          <div className="login-signup">
            <span>Нету аккаунта?</span>
            <button onClick={onRegisterClick}>Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  );
}
