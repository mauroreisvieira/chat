<template>
    <div class="topbar">
        <div class="topbar__logo">
            #{{room}}
        </div>
        <div class="topbar__user">
            <div class="topbar__user__name">
                {{profileName}}
            </div>
            <div class="topbar__user__photo" @click="logout">
                <img class="topbar__user__picture" :src="profilePhoto" :alt="profileName" :title="profileName">
            </div>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    export default {
        name: 'topbar',
        props: {
            room: {
              type: String,
              required: true
            },
            profilePhoto: {
              type: String,
              required: true
            },
            profileName: {
              type: String,
              required: true
            },
      },
      data() {
        return {}
    },
    methods: {
        logout() {
            this.$store.dispatch('login', false);
            localStorage.removeItem('isLogged');
        }
    },
    mounted() {

    }
}
</script>

