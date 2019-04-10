<template>
    <div class="login">
        <div class="login__header">
            <h1 class="login__heading">Welcome Back,</h1>
            <p class="login__info">Sign in to continue</p>
        </div>
        <div class="login__body" v-if="userPhoto !== ''">
            <img :src="userPhoto" title="{userName}" alt="{userName}">
        </div>
        <div class="login__body">
            <form class="form form--login" @submit.prevent="login()">
                <div class="form__field">
                    <label class="form__label" for="userName">Name</label>
                    <input v-on:keydown="validateName" id="userName" type="text" v-model="userName":class="'form__input ' + [nameValid ? '' : 'is-invalid']">
                </div>
                <div class="form__field">
                    <label class="form__label" for="userEmail">Email</label>
                    <input v-on:keydown="validateEmail" id="userEmail" type="text" v-model="userEmail" :class="'form__input ' + [emailValid ? '' : 'is-invalid']">
                </div>
                <button class="btn btn--login" type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import Md5 from './../utils/md5.js'
import Firebase from './../services/Firebase';
export default {
    name: 'login',
    data() {
        return {
            isLogged : false,
            userName: '',
            userEmail: '',
            userPhoto: '',
            nameValid: true,
            emailValid: true,
            hash: new Md5(),
            Firebase: new Firebase()
        }
    },
    methods: {
        login () {
            this.validateName();
            this.validateEmail();
            if (this.nameValid && this.emailValid) {
                this.userPhoto = this.getPhoto();
                this.isLogged = true;
                this.emailValid = true;
                this.nameValid = true;
                this.dispatchLoginState();
                this.setStorage();
            }
        },
        validateName() {
            this.nameValid = true;
            if (this.userName === '') {
                this.nameValid = false;
            }
            return this.nameValid;
        },
        validateEmail() {
            this.emailValid = true;
            if (!this.checkEmail()) {
                this.emailValid = false;
            }
            return this.emailValid;
        },
        checkEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userEmail)) && (this.userName !== '');
        },
        getPhoto(size = 200) {
            return 'http://www.gravatar.com/avatar/' + this.hash.md5(this.userEmail, false, false) + '.jpg?s=' + size;
        },
        dispatchLoginState() {
            this.$store.dispatch('login', this.isLogged);
        },
        setStorage() {
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('userEmail', this.userEmail);
            localStorage.setItem('userPhoto', this.userPhoto);
            localStorage.setItem('isLogged', this.isLogged);
        }
    },
    mounted() {}
}
</script>

