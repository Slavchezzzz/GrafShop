import { useState } from "react";
import "../styles/Login.css";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../config/axios";

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
        <Login key="login" onRegisterClick={clickRegister} />
      ) : (
        <RegisterPage key="register" onLoginClick={clickLogin} />
      )}

      <Footer />
    </div>
  );
}

function RegisterPage({ onLoginClick }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.login) newErrors.login = "Логин не может быть пустым";
    if (!formData.email) {
      newErrors.email = "Email не может быть пустым";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    if (!formData.password) {
      newErrors.password = "Пароль не может быть пустым";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль должен быть не менее 8 символов";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Важно! Предотвращаем стандартное поведение формы
    
    console.log('Начало отправки формы');
    console.log('Текущие данные формы:', formData);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log('Ошибки валидации:', validationErrors);
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        login: formData.login,
        email: formData.email,
        password: formData.password
      };

      console.log('Отправляемые данные:', requestData);

      const response = await api.post("/auth/register", requestData);

      console.log('Ответ сервера:', response.data);

      if (response.data.success) {
        setShowSuccessModal(true);
        // Сохраняем данные пользователя
        const userData = {
          login: formData.login,
          email: formData.email
        };
        localStorage.setItem('user', JSON.stringify(userData));
        // Вызываем событие изменения localStorage
        window.dispatchEvent(new Event('storage'));
        // Автоматически переключаем на форму входа через 2 секунды
        setTimeout(() => {
          setShowSuccessModal(false);
          onLoginClick();
        }, 2000);
      } else {
        setErrors({ submit: response.data.message });
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error.response?.data || error);
      setErrors({ submit: error.response?.data?.message || "Ошибка при регистрации" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-container">
      <div className="main-reg">
        <div className="container-reg">
          <span className="title">Регистрация</span>
          <form onSubmit={handleSubmit} method="POST">
            <div className="input-faild">
              <input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                className={`name-log ${errors.login ? 'error-input' : ''}`}
                placeholder="Логин"
                required
              />
              <FaUser className="input-icon" />
            </div>
            {errors.login && <div className="login-error">{errors.login}</div>}

            <div className="input-faild">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-email ${errors.email ? 'error-input' : ''}`}
                placeholder="Email"
                required
              />
              <IoMdMail className="input-icon" />
            </div>
            {errors.email && <div className="login-error">{errors.email}</div>}

            <div className="input-faild">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input-password ${errors.password ? 'error-input' : ''}`}
                placeholder="Пароль"
                required
              />
              <FaLock className="input-icon" />
            </div>
            {errors.password && <div className="login-error">{errors.password}</div>}

            <div className="input-faild">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input-password ${errors.confirmPassword ? 'error-input' : ''}`}
                placeholder="Подтвердите пароль"
                required
              />
              <FaLock className="input-icon" />
            </div>
            {errors.confirmPassword && <div className="login-error">{errors.confirmPassword}</div>}

            {errors.submit && <div className="login-error">{errors.submit}</div>}

            <div className="log-button">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Регистрация..." : "Создать"}
              </button>
            </div>
          </form>

          <div className="login-signup">
            <span>Уже есть аккаунт?</span>
            <button type="button" onClick={onLoginClick}>Войти</button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <h2>Регистрация успешна!</h2>
            <p>Сейчас вы будете перенаправлены на страницу входа.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Login({ onRegisterClick }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку поля при изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.login) {
      newErrors.login = "Логин не может быть пустым";
    }
    if (!formData.password) {
      newErrors.password = "Пароль не может быть пустым";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Начало входа');
    console.log('Данные формы:', formData);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log('Ошибки валидации:', validationErrors);
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Отправка запроса на вход');
      const response = await api.post("/auth/login", {
        login: formData.login,
        password: formData.password
      });

      console.log('Ответ сервера:', response.data);

      if (response.data.success) {
        // Сохраняем токен и данные пользователя
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Вызываем событие изменения localStorage
        window.dispatchEvent(new Event('storage'));
        
        // Показываем модальное окно успешного входа
        setShowSuccessModal(true);
        
        // Перенаправляем на главную страницу через 1 секунду
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/');
        }, 1000);
      } else {
        setErrors({ submit: response.data.message });
      }
    } catch (error) {
      console.error('Ошибка при входе:', error.response?.data || error);
      setErrors({ 
        submit: error.response?.data?.message || "Ошибка при входе. Проверьте логин и пароль." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-container">
      <div className="main-log">
        <div className="container-reg">
          <span className="title">Войти</span>
          <form onSubmit={handleSubmit} method="POST">
            <div className="input-faild">
              <input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                className={`input-email ${errors.login ? 'error-input' : ''}`}
                placeholder="Логин"
                required
              />
              <FaUser className="input-icon" />
            </div>
            {errors.login && <div className="login-error">{errors.login}</div>}

            <div className="input-faild">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input-password ${errors.password ? 'error-input' : ''}`}
                placeholder="Пароль"
                required
              />
              <FaLock className="input-icon" />
            </div>
            {errors.password && <div className="login-error">{errors.password}</div>}

            {errors.submit && <div className="login-error">{errors.submit}</div>}

            <div className="checkbox-text">
              <div className="checkbox-content">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-span">Запомнить меня</span>
              </div>
              <a href="#" className="text">
                Забыли пароль?
              </a>
            </div>

            <div className="log-button">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Вход..." : "Войти"}
              </button>
            </div>
          </form>

          <div className="login-signup">
            <span>Нету аккаунта?</span>
            <button type="button" onClick={onRegisterClick}>Регистрация</button>
          </div>
        </div>
      </div>

      {/* Модальное окно успешного входа */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <h2>Вход выполнен успешно!</h2>
            <p>Сейчас вы будете перенаправлены на главную страницу.</p>
          </div>
        </div>
      )}
    </div>
  );
}

