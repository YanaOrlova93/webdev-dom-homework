import { toggleLike } from "./api.js";
import { commentsData, getCommentsFromServer } from "./main.js";
import { renderComments } from "./renderMain.js";

export function attachLikeHandler() {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', () => {
            toggleLike(commentsData[index].id).then(() => {
                if (commentsData[index].isLike) {
                    likeButton.classList.remove('-active-like');
                } else {
                    likeButton.classList.add('-active-like');
                }
                getCommentsFromServer();
            })
        });
    })
}

export function answerComments() {
    const commentsElements = document.querySelectorAll(".comment-text");
    const commInputElement = document.getElementById("comm-input");
    commentsElements.forEach((commentElement, index) => {
        commentElement.addEventListener("click", () => {
            const comment = commentsData[index];
            commInputElement.value = `> ${comment.text} \n ${comment.name}.,`;
        });
    })
}