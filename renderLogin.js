
import { loginAvtorization, setToken } from "./api.js";
import { commentsData} from "./main.js";
import { renderRegistration } from "./registrationForm.js";


export const renderLogin = ({renderComments}) => {
    let appElement = document.getElementById('app');
    let loginHtml = `<div class="container">
    <div class="add-form">
        <h1>Форма входа</h1>
        <input type="text" id="login-name-input" class="add-form-text" placeholder="Введите ваше имя" />
        <input type="text" id="password-input" class="add-form-text" placeholder="Введите пароль" />
        <div class="add-form-row">
            <button type="submit" id="authorization-form" class="add-form-button button_login-page">Войти</button>
        </div>
        <a class="line_login-page" href="#">Зарегистрироваться</a>
    </div>`
    appElement.innerHTML = loginHtml;

const buttonRegister = document.querySelector(".line_login-page");
buttonRegister.addEventListener('click', () => renderRegistration());

const buttonElementLogin = document.getElementById('authorization-form');
const loginInputElement = document.getElementById('login-name-input');
const passwordInputElement = document.getElementById('password-input');

buttonElementLogin.addEventListener("click", () => {
    loginAvtorization({
        login: loginInputElement.value,
        password: passwordInputElement.value
    })
        .then((responseData) => {
            setToken(responseData.user.token);
            window.localStorage.setItem("userName",responseData.user.login);
        })
        .then (() => {
            renderComments({commentsData});
        })
        .catch((error) => {
            console.warn(error);
        })
}); 
}
