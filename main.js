import { getTodos, postTodo } from "./api.js";
import { answerComments, attachLikeHandler } from "./eventListeners.js";
import { renderComments } from "./renderMain.js";

const nameInputElement = document.getElementById("name-input");
const commInputElement = document.getElementById("comm-input");
const buttonElement = document.getElementById("publish-button");


const loaderComment = document.getElementById("loader-comment");
const addLoaderComment = document.getElementById("add-loader-comment");

const addForm = document.getElementById("id-form");


addLoaderComment.style.display = "none";



buttonElement.addEventListener("click", () => {
commInputElement.style.backgroundColor = "";
nameInputElement.style.backgroundColor = "";
if (commInputElement.value === "" || nameInputElement.value === "") {
    commInputElement.style.backgroundColor = "red";
    nameInputElement.style.backgroundColor = "red";

    return;
}
sendCommentToServer()
addForm.style.display = "none";
addLoaderComment.style.display = "block";


})


// function renderComments() {
//     const allCommentsHtml = commentsData.map((comment, index) => {
//         return `<li class="comment">
//         <div class="comment-header">
//            <div>${comment.name}</div>
//             <div id="comment-date-1">${comment.date}</div>
//         </div>
//         <div class="comment-body">
//             <div class="comment-text">
//                 ${comment.text}
//             </div>
//         </div>
//         <div class="comment-footer">
//             <div class="likes">
//                 <span class="likes-counter">${comment.likes}</span>
//                 <button class="like-button"></button>
//             </div>
//         </div>
//     </li>`
//     }).join("")
//     listElement.innerHTML = allCommentsHtml;

//     const likeButtons = document.querySelectorAll(".like-button");
//     const likeCounts = document.querySelectorAll(".likes-counter");
//     likeButtons.forEach((button, index) => {
//     attachLikeHandler(button, likeCounts[index]);
//     answerComments();
// });

// }


export let commentsData = [];


function getCommentsFromServer() {

getTodos().then((responseData) => {
    console.log(responseData)
    let appComments = responseData.comments.map((comment) => {
        return {
            name: comment.author.name,
            text: comment.text,
            date: new Date(comment.date).toLocaleDateString() + " " + (new Date(comment.date).getHours() < 10 ? '0' + new Date(comment.date).getHours() : new Date(comment.date).getHours()) + ":" + (new Date(comment.date).getMinutes() < 10 ? '0' + new Date(comment.date).getMinutes() : new Date(comment.date).getMinutes()) + ":" + (new Date(comment.date).getSeconds() < 10 ? '0' + new Date(comment.date).getSeconds() : new Date(comment.date).getSeconds()),
            likes: comment.likes,
            isLike: comment.isLike,
        };
    }); 

console.log(appComments)
    commentsData = appComments;
    renderComments();
})
    .then((dataResponse) => {
        console.log("data",dataResponse);
        loaderComment.style.display = "none";
    })
.catch((error) => {
    if (error.message === 'Failed to fetch') {
                alert ('У вас неполадки с интернетом');
            }
            else {
                alert(error.message);
            }
    console.error("Fetch error:", error);
});
}

// Вызываем getCommentsFromServer для загрузки комментариев при загрузке страницы
getCommentsFromServer();


function sendCommentToServer(comment) {
    const postData = {
        name: nameInputElement.value,
        text: commInputElement.value,
        forceError: true,

    };

    postTodo({
        name: nameInputElement.value,
        text: commInputElement.value,
        forceError: true,
    }).then(() => {
        // Обработка успешной отправки комментария
        // Очищаем поля ввода
        commInputElement.value = "";
        nameInputElement.value = "";
       getCommentsFromServer()
        console.log("Comment sent successfully:");
    })
        

        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert ('У вас неполадки с интернетом');
            }
            else {
                alert(error.message);
            }
        
        console.error("Fetch error:", error);
        
    }).finally(() => {
        addLoaderComment.style.display = "none";
        addForm.style.display = "flex";


    })
}


console.log("It works!");
