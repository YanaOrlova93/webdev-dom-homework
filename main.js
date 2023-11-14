import { getTodos, postTodo } from "./api.js";
import { answerComments, attachLikeHandler } from "./eventListeners.js";
import { renderComments } from "./renderMain.js";

export let commentsData = [];
function setComments(newComments) {
commentsData = newComments;
}
export let token = "";
function setToken(newToken) {
token = newToken;
}
function getToken() {
    return `Bearer ${token}`
   
    }
    
    
const nameInputElement = document.getElementById("name-input");
const commInputElement = document.getElementById("comm-input");
const buttonElement = document.getElementById("publish-button");



const addLoaderComment = document.getElementById("add-loader-comment");

const addForm = document.getElementById("id-form");


// addLoaderComment.style.display = "none";



// buttonElement.addEventListener("click", () => {
// commInputElement.style.backgroundColor = "";
// nameInputElement.style.backgroundColor = "";
// if (commInputElement.value === "" || nameInputElement.value === "") {
//     commInputElement.style.backgroundColor = "red";
//     nameInputElement.style.backgroundColor = "red";

//     return;
// }
// sendCommentToServer()
// addForm.style.display = "none";
// addLoaderComment.style.display = "block";


// })



export function getCommentsFromServer() {

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
    renderComments({commentsData});
})
    .then((dataResponse) => {
        const loaderComment = document.getElementById("loader-comment");
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
