import { answerComments, attachLikeHandler } from "./eventListeners.js";
import { commentsData } from "./main.js";


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
                <button class="like-button"></button>
            </div>
        </div>
    </li>`
    }).join("")
    const listElement = document.getElementById("list");
    listElement.innerHTML = allCommentsHtml;

    const likeButtons = document.querySelectorAll(".like-button");
    const likeCounts = document.querySelectorAll(".likes-counter");
    likeButtons.forEach((button, index) => {
    attachLikeHandler(button, likeCounts[index]);
    answerComments();
});

}