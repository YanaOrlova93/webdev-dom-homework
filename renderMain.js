import { getToken} from "./api.js";
import { answerComments, attachLikeHandler } from "./eventListeners.js";

import { addComment, commentsData, pressEnter } from "./main.js";
import { renderLogin } from "./renderLogin.js";
import { buttonDisabled } from "./validation.js";

export function renderComments() {
    
    
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
                <button class="like-button ${comment.isLike ? '-active-like' : ''}"></button>
            </div>
        </div>
    </li>`
    }).join("");


    const appElement = document.getElementById("app");


    const appHtml =  `
    
     <ul id="list" class="comments">
      ${allCommentsHtml}
    </ul>
    <div id="add-loader-comment">Комментарий добавляется...</div>
    ${getToken() ? `<div class="add-form" id="id-form">
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
    </div>` : '' }
    ${!getToken() ? `<div class="avtorization">
          <p class="avtorization-text">Чтобы добавить комментарий, <a class="avtorization-button" href="#">Авторизуйтесь</a></p>
        </div> ` : '' } 
     
    `

    appElement.innerHTML = appHtml;


        document.getElementById('add-loader-comment').style.display='none'
       

   
  


    
    if (!getToken() ) {
        const buttonLogin = document.querySelector(".avtorization-button");
        buttonLogin.addEventListener('click', () => renderLogin({ renderComments }));
    }
    else {
        const blockWithForms = document.querySelector(".add-form");
        const nameInputElement = document.getElementById("name-input");
        const commInputElement = document.getElementById("comm-input");
        const buttonElement = document.getElementById("publish-button");
        nameInputElement.addEventListener("input", buttonDisabled);
        commInputElement.addEventListener("input", buttonDisabled);
        buttonElement.addEventListener("click", addComment);
        blockWithForms.addEventListener("keyup", pressEnter);
        nameInputElement.value = localStorage.getItem("userName");
        nameInputElement.disabled = true;
        buttonDisabled();
        attachLikeHandler()
        answerComments()

    }

    
    
};



