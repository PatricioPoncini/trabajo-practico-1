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
            newComment: "",
            showError: false,
            showLikeError: false,
            showLoginError: false,
            showCommentError: false,
            showUsernameError: false
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
            return this.liked ? "No me gusta" : "Me Gusta";
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
                this.username = usernameInput.value;
                this.showLoginError = false;
                this.showUsernameError = false;
            } else {
                this.showUsernameError = true;
                this.showLoginError = true;
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
            } else {
                this.showError = true;
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
                this.showLikeError = false;
            } else {
                this.showLikeError = true;
            }
        },
        addComment() {
            if (!this.loggedIn) {
                this.showLoginError = true;
                this.showCommentError = false;
                return;
            }
            if (this.newComment.trim() === "") {
                this.showLoginError = false;
                this.showCommentError = true;
                return;
            }
            const comment = {
                id: this.comments.length + 1,
                username: this.username,
                text: this.newComment,
                isOwner: true,
            };
            this.comments.push(comment);
            this.newComment = "";
            this.showLoginError = false;
            this.showCommentError = false;
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

// Componente Profile
// Nota: $root hace referencia al componente principal de Vue
app.component("profile", {
    template: `
      <button class="btn-seguir" v-if="!loggedIn && !following" @click="toggleFollow">Seguir</button>
      <button class="btn-seguir" v-if="loggedIn && !following" @click="toggleFollow">{{ followButtonText }}</button>
      <button class="btn-seguir" v-if="loggedIn && following" @click="toggleFollow">{{ followButtonText }}</button>
      <p class="follow-error-message" v-if="showError && !loggedIn">Inicie sesión para seguir</p>
    `,
    computed: {
        loggedIn() {
            return this.$root.loggedIn;
        },
        following() {
            return this.$root.following;
        },
        followButtonText() {
            return this.$root.followButtonText;
        },
        showError() {
            return this.$root.showError;
        }
    },
    methods: {
        toggleFollow() {
            this.$root.toggleFollow();
        }
    }
});

// Componente About Me
app.component("about-me", {
    template: `
      <h3 class="h3-sobre-mi">
        Sobre mí
      </h3>
      <p class="p-sobre-mi"> 
        Hola a todos soy Jane, y actualmente vivo en la vibrante y emocionante ciudad
        de Tokyo, Japon. Me encanta capturar la esencia de la vida urbana a través de mi lente, explorando el contraste entre la arquitectura moderna y las tradiciones centenaras que conviven en esta metrópolis unica. Desde rascacielos deslumbrantes y calles bulliciosas hasta templos serenos y jardines tranquilos, encuentro inspiracion en cada rincón de esta increible ciudad
      </p>
    `
});

app.mount("#app");
