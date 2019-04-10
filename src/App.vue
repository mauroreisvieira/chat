<template>
	<div>
        <login v-if="!getState"></login>
        <chat v-if="getState"></chat>
	</div>
</template>

<script>
import Login from './pages/Login.vue'
import Chat from './pages/Chat.vue'
export default {
	name: 'app',
	components: { Login, Chat },
    data() {
        return {
            isLogged: false
        }
    },
    methods: {
        init() {
            this.$store.dispatch('validateSession');
        }
    },
    mounted() {
        this.init();
    },
    computed: {
        getState() {
            return this.$store.state.isLogged;
        }
    }
}
</script>

<style lang="scss">
	@import "./styles/components.scss";
</style>
