    <template>
        <aside class="rooms">
            <div class="rooms__list">
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item tooltip tooltip--right" :data-tooltip="name" href="">#{{icon}} </a>
                <a class="rooms__item rooms__item--add-new tooltip tooltip--right" data-tooltip="New Channel" href="" @click="addNewChannel">+</a>
            </div>
            <modal v-bind:isVisible="modalState" title="New Chanell">Hi</modal>
        </aside>
    </template>

    <script>
        import Modal from './Modal.vue'
        export default {
            name: 'rooms',
            components: {Modal},
            props: {
                name: {
                    type: String,
                    required: true
                },
                icon: {
                    type: String,
                    required: true
                }
            },
            data() {
                return {
                    modalState: false
                }
            },
            methods: {
                addNewChannel(ev) {
                    ev.preventDefault();
                    this.modalState = true;
                }
            },
            mounted() {
            }
        }
    </script>

