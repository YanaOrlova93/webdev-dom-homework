import { getToken} from "./api.js";
import { answerComments, attachLikeHandler } from "./eventListeners.js";
import { addComment, pressEnter } from "./main.js";
import { renderLogin } from "./renderLogin.js";
import { buttonDisabled } from "./validation.js";

export function renderComments({commentsData}) {
    
    
    const allCommentsHtml = commentsData.map((comment, index) => {
        return `<li class="comment">
        <div class="comment-header">
           <div>${comment.name}</div>
            <div id="comment-date-1">${comment.date}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">
                ${comment.text}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button"></button>
            </div>
        </div>
    </li>`
    }).join("");


    const appElement = document.getElementById("app");


    const appHtml =  `
    <div id="loader-comment">Комментарии загружаются...</div>
     <ul id="list" class="comments">
      ${allCommentsHtml}
    </ul>
    <div id="add-loader-comment">Комментарий добавляется...</div>


    ${getToken() && `<div class="add-form" id="id-form">
        <input
                type="text" id="name-input"
                class="add-form-name"
                placeholder="Введите ваше имя"
        />
        <textarea
                id="comm-input"
                class="add-form-text"
                placeholder="Введите ваш коментарий"
                rows="4"
        ></textarea>
        <div class="add-form-row">
            <button id="publish-button" class="add-form-button">Написать</button>
        </div>
    </div>` }
    ${!getToken() && `<div class="avtorization">
          <p class="avtorization-text">Чтобы добавить комментарий, <a class="avtorization-button" href="#">Авторизуйтесь</a></p>
        </div> `} 
    <div class="input-form"></div>
    `

    appElement.innerHTML = appHtml;

   
    // const listElement = document.getElementById("list");
    // listElement.innerHTML = allCommentsHtml;
    // const likeButtons = document.querySelectorAll(".like-button");
    // const likeCounts = document.querySelectorAll(".likes-counter");
    // likeButtons.forEach((button, index) => {
    // attachLikeHandler(button, likeCounts[index]);
    // answerComments();
    // const buttonLogin = document.querySelector(".avtorization-button");


    

// const likeButtons = document.querySelectorAll(".like-button");
// const likeCounts = document.querySelectorAll(".likes-counter");
// likeButtons.forEach((button, index) => {
//   attachLikeHandler(button, likeCounts[index]);
// });


// const addLoaderComment = document.getElementById("add-loader-comment");
// const blockWithForms = document.querySelector(".add-form");

// const blockAuthorization = document.querySelector(".avtorization");


    // getToken() ? blockAuthorization.classList.add('hidden') : blockWithForms.classList.add('hidden');
    
    if (!getToken() ) {
        const buttonLogin = document.querySelector(".avtorization-button");
        buttonLogin.addEventListener('click', () => renderLogin({ renderComments }));
    }
    else {
        const nameInputElement = document.getElementById("name-input");
        const commInputElement = document.getElementById("comm-input");
        const buttonElement = document.getElementById("publish-button");
        nameInputElement.addEventListener("input", buttonDisabled);
        commInputElement.addEventListener("input", buttonDisabled);
        buttonElement.addEventListener("click", addComment);
        blockWithForms.addEventListener("keyup", pressEnter);
        nameInputElement.value = window.localStorage.getItem("userName");
        nameInputElement.disabled = true;
        buttonDisabled();

    }

    
  
    // const likesBlock = document.querySelector(".likes")
    // token ? attachLikeHandler() : likesBlock;
  
    

    
};



