<template>
    <div v-if="isVisible" :class="'modal' + [isVisible ? ' is-visible' : '']" @click="closeModal">
        <div class="modal__content" @click="stopEvent">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            isVisible: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                data: []
            }
        },
        methods: {
            closeModal(ev) {
                console.log(ev);
                console.log('Close');
                console.log(this.$el);
            },
            stopEvent(ev) {
                console.log('stopEvent');
            }
        },
        mounted() {

        }
    }
</script>

