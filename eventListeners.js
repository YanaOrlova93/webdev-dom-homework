export function attachLikeHandler(button, counter) {
    let liked = false;
    button.addEventListener('click', () => {
        if (liked) {
            liked = false;
            button.classList.remove('-active-like');
            counter.textContent = parseInt(counter.textContent) - 1;

        } else {
            liked = true;
            button.classList.add('-active-like');
            counter.textContent = parseInt(counter.textContent) + 1;

        }
    });
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
