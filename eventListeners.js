import { toggleLike } from "./api.js";
import { commentsData, getCommentsFromServer } from "./main.js";
import { renderComments } from "./renderMain.js";

export function attachLikeHandler() {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', () => {
            console.log(commentsData[0].id)
            toggleLike(commentsData[index].id)

            .then(() => {
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
    commentsElements.forEach((commentElement, index) => {
        commentElement.addEventListener("click", () => {
            if (index !== null) {
                const comment = commentsData[index];
                commInputElement.value = `> ${comment.text} \n ${comment.name}.,`;
                renderComments();
            }
        });
    })
}

