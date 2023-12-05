export  const addCommentValidation = () => {
    const nameInputElement = document.getElementById("name-input");
    const commInputElement = document.getElementById("comm-input");

    nameInputElement.classList.remove("error");
    commInputElement.classList.remove("error");

    if (nameInputElement.value === "" || nameInputElement.value === " ") {
      nameInputElement.classList.add("error");
    } else if (commInputElement.value === "" || commInputElement.value === " ") {
      commInputElement.classList.add("error");
    }
 }

export const buttonDisabled = () => {
    const nameInputElement = document.getElementById("name-input");
    const commInputElement = document.getElementById("comm-input");
    const buttonElement = document.getElementById("publish-button");

  if (nameInputElement.value === "" || commInputElement.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};