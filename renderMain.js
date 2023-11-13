import { answerComments, attachLikeHandler } from "./eventListeners.js";
import { commentsData } from "./main.js";
import { renderLogin } from "./renderLogin.js";


export function renderComments() {
    const appHtml = document.getElementById('app');
    
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
    }).join("")

    appHtml.innerHTML = `
    <div id="loader-comment">Комментарии загружаются...</div>
     <ul id="list" class="comments">
      ${allCommentsHtml}
    </ul>
    <div id="add-loader-comment">Комментарий добавляется...</div>

    <div class="add-form" id="id-form">
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
    </div> 
    <div class="avtorization">
          <p class="avtorization-text">Чтобы добавить комментарий, <a class="avtorization-button" href="#">Авторизуйтесь</a></p>
        </div>
    <div class="input-form"></div>
    `

   
   const buttonLogin = document.querySelector(".avtorization-button");
   buttonLogin.addEventListener('click', () => renderLogin({ renderLogin }));
    
    const listElement = document.getElementById("list");
    listElement.innerHTML = allCommentsHtml;

    const likeButtons = document.querySelectorAll(".like-button");
    const likeCounts = document.querySelectorAll(".likes-counter");
    likeButtons.forEach((button, index) => {
    attachLikeHandler(button, likeCounts[index]);
    answerComments();
});

}
