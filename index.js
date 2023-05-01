let button = document.getElementById("follow-btn");
let likeBtn = document.getElementById("like-btn");
let usernameInput = document.getElementById("login-input");
let loginBtn = document.getElementById("login-btn");
let usernameDisplay = document.getElementById("username-display");
let addCommentBtn = document.getElementById("comment-btn");
let commentInput = document.getElementById("comment-input");
let comments = document.getElementById("comments");

// FOLLOW AND UNFOLLOW BUTTON
button.addEventListener("click", function () {
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
});

// LIKE BUTTON (hacer boton para sacar me gusta)
let likes = 200;
likeBtn.addEventListener("click", function () {
    if (!likeBtn.disabled) {
        likes++;
        document.getElementById("likes").textContent = likes;
        likeBtn.disabled = true;
    }
});

// INPUT FORM
loginBtn.addEventListener("click", function () {
    let username = usernameInput.value;
    if (username === "") {
        return;
    } else {
        usernameDisplay.textContent = "Bienvenido/a " + username;
        usernameInput.style.display = "none";
        usernameDisplay.style.display = "block";
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
    }
});

// WRITE COMMENTS
addCommentBtn.addEventListener("click", function () {
    let username = usernameInput.value;
    let comment = commentInput.value;
    let p = document.createElement("p");
    let strong = document.createElement("strong");
    if (username === "") {
        return alert("Por favor, ingresa un usuario antes de continuar");
    } else {
        if (comment === "") {
            return alert("Debe escribir algo antes de comentar");
        } else {
            strong.appendChild(document.createTextNode(username));
            p.appendChild(strong);
            p.appendChild(document.createTextNode(comment));
            comments.appendChild(p);
            commentInput.value = "";
        }
    }
});
