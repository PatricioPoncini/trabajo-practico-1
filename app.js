const app = Vue.createApp({
    data() {
        return {
            username: "",
            loggedIn: false,
            following: false,
            likes: 200,
            liked: false,
            comments: [
                { id: 1, username: "Juan Perez", text: "¡Wow, esta foto de Tokyo es impresionante!🌆🌟" },
                { id: 2, username: "Kathleen J Rennie", text: "¡Esta foto de Tokyo es simplemente espectacular! Me trae tantos recuerdos." },
                { id: 3, username: "Diana Bell", text: "¡Espero que algún día puedan ver Tokyo en persona!" }
            ],
            newComment: ""
        };
    },
    computed: {
        loginButtonText() {
            return this.loggedIn ? "Sign Out" : "Sign In";
        },
        followButtonText() {
            return this.following ? "Dejar de seguir" : "Seguir";
        },
        likeButtonText() {
            return this.liked ? "Ya no me gusta" : "Me gusta";
        }
    },
    methods: {
        toggleLogin() {
            if (this.loggedIn) {
                this.logout();
            } else {
                this.login();
            }
        },
        login() {
            if (this.username !== "") {
                this.loggedIn = true;
                this.username = usernameInput.value; // se podria usar para mostrar el nombre del User
            }
        },
        logout() {
            this.username = "";
            this.loggedIn = false;
            this.following = false;
        },
        toggleFollow() {
            if (this.loggedIn) {
                this.following = !this.following;
            }
        },
        toggleLike() {
            if (this.loggedIn) {
                this.liked = !this.liked;
                if (this.liked) {
                    this.likes++;
                } else {
                    this.likes--;
                }
            }
        },
        addComment() {
            if (this.loggedIn && this.newComment.trim() !== "") {
                const comment = {
                    id: this.comments.length + 1,
                    username: this.username,
                    text: this.newComment,
                    isOwner: true
                };
                this.comments.push(comment);
                this.newComment = "";
            }
        },
        deleteComment(comment) {
            if (this.isCommentOwner(comment)) {
                const index = this.comments.findIndex(c => c.id === comment.id);
                if (index !== -1) {
                    this.comments.splice(index, 1);
                }
            }
        },
        isCommentOwner(comment) {
            return this.loggedIn && comment.isOwner && comment.username === this.username;
        }
    }
});

app.mount("#app");