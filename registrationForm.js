export const renderRegistration = () => {
    const appElement = document.getElementById("app");
    const loginHtmlRegistr = `<div class="container">
    <div class="add-form">
        <h1>Регистрация</h1>
        <input type="text" id="login-name-input-registration" class="add-form-text" placeholder="Введите ваше имя" />
        <input type="text" id="login-input-registration" class="add-form-text" placeholder="Введите логин" />
        <input type="text" id="password-input-registration" class="add-form-text" placeholder="Введите пароль" />
        <div class="add-form-row">
            <button type="submit" id="authorization-form-registration"
                class="add-form-button button_login-page">Зарегистрироваться</button>
        </div>
        <a class="line_login-page" href="#">Войти</a>
    </div>`
    appElement.innerHTML = loginHtmlRegistr;
    
    const buttonRegister = document.querySelector(".line_login-page")
    buttonRegister.addEventListener('click', () => renderLogin({ renderList }));

    const buttonElementLogin = document.getElementById('authorization-form-registration');
    const loginInputElement = document.getElementById('login-name-input-registration');
    const loginElement = document.getElementById('login-input-registration')
    const passwordInputElement = document.getElementById('password-input-registration');

    buttonElementLogin.addEventListener("click", () => {
        userRegistration({
            name: loginInputElement.value,
            login: loginElement.value,
            password: passwordInputElement.value
        })
            .then((responseData) => {
                setToken(responseData.user.token);
                window.localStorage.setItem("userName",responseData.user.name);
            })
            
            .then(() => {
                renderList({ commentsArr });
            })  
            .catch((error) => {
                console.warn(error);
              });  
    });
}