let button = document.getElementById("follow-btn");
let likeBtn = document.getElementById("like-btn");
let usernameInput = document.getElementById("login-input");
let usernameDisplay = document.getElementById("username-display");
let addCommentBtn = document.getElementById("comment-btn");
let commentInput = document.getElementById("comment-input");
let comments = document.getElementById("comments");
let loginBtn = document.getElementById("login-btn");

// INPUT FORM
loginBtn.addEventListener("click", function () {
    let username = usernameInput.value;
    if (username === "") {
        return;
    } else {
        usernameDisplay.textContent = "¡Hola " + username + "!";
        usernameInput.style.display = "none";
        usernameDisplay.style.display = "block";
        loginBtn.style.color = "white"
        loginBtn.style.backgroundColor = "#530091"
    }
    if (loginBtn.textContent === "Sign In") {
        addCommentBtn.style.backgroundColor = "blue";
        addCommentBtn.style.color = "white";
        loginBtn.textContent = "Sign Out";
    } else {
        loginBtn.textContent = "Sign In";
        usernameInput.value = "";
        usernameInput.style.display = "block";
        usernameDisplay.style.display = "none";
        loginBtn.style.color = "blue"
        loginBtn.style.backgroundColor = "white";
    }
});

// FOLLOW AND UNFOLLOW BUTTON
button.addEventListener("click", function () {
    if (usernameInput.value === "") {
        return;
    } else {
        if (button.textContent === "Seguir") {
            button.textContent = "Dejar de seguir";
            button.style.backgroundColor = "white";
            button.style.border = "solid lightgray";
            button.style.color = "red"
        } else {
            button.textContent = "Seguir";
            button.style.backgroundColor = "blue";
            button.style.border = "none";
            button.style.color = "white"
        }
    }
});

// LIKE BUTTON
let likes = 200;
let liked = false;
likeBtn.addEventListener("click", function () {
    let username = usernameInput.value;
    if (username === "") {
        return;
    } else {
        if (!liked) {
            likes++;
            document.getElementById("likes").textContent = likes;
            liked = true;
            likeBtn.textContent = "Ya no me gusta";
            likeBtn.style.color = "red";
        } else {
            likes--;
            document.getElementById("likes").textContent = likes;
            liked = false;
            likeBtn.textContent = "Me gusta";
            likeBtn.style.color = "blue";
        }
    }
});


// WRITE COMMENTS
addCommentBtn.addEventListener("click", function () {
    let username = usernameInput.value;
    let comment = commentInput.value;
    let addComment = document.createElement("p");
    let addUsername = document.createElement("strong");
    let deleteCommentBtn = document.createElement("button");
    let spanBtn = document.createElement("span");
    if (username === "") {
        return;
    } else {
        if (comment === "") {
            return;
        } else {
            deleteCommentBtn.textContent = "Eliminar";
            deleteCommentBtn.style.backgroundColor = "white";
            deleteCommentBtn.style.color = "red";
            deleteCommentBtn.style.fontWeight = "bold";
            deleteCommentBtn.style.border = "1px solid gray";
            deleteCommentBtn.style.borderRadius = "3px";
            spanBtn.style.float = "right";
            deleteCommentBtn.addEventListener("click", function () {
                addComment.remove();
            });
            spanBtn.appendChild(deleteCommentBtn);
            addUsername.appendChild(document.createTextNode(username));
            addComment.appendChild(addUsername);
            addComment.appendChild(document.createTextNode(" "));
            addComment.appendChild(document.createTextNode(comment));
            addComment.appendChild(document.createTextNode(" "));
            addComment.appendChild(spanBtn);
            comments.appendChild(addComment);
            commentInput.value = "";
        }
    }
});

