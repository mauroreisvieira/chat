<template>
	<div class="wrapper">
		<topbar :room="room" :profilePhoto="userPhoto" :profileName="userName"></topbar>
		<main class="main">
			<rooms @click="joinRoom('general')" icon="G"  name="General"></rooms>
			<div class="chat">
				<div class="chat__header">
					<div class="users">
						<div class="tooltip users__item is-online" v-for="user in users" :data-tooltip="user.userName">
							<img class="users__picture" :src="user.userPhoto" :alt="user.userName" :title="user.userName">
						</div>
					</div>
				</div>
				<div class="chat__messages">
					<div class="chat__user" v-for="message in messages" :class="userEmail === message.userEmail ? 'chat__user--myself' : ''">
						<div class="chat__photo">
							<img class="chat__picture" :src="message.userPhoto" :alt="message.userName" :title="message.userName">
						</div>
						<div class="chat__content">
							<div class="chat__name">
								{{ message.userName }}
							</div>
							<div class="chat__time">
								{{ message.timestamp | formatDate }}
							</div>
							<div class="chat__text">
								{{ message.message }}
							</div>
						</div>
					</div>
				</div>
				<div class="chat__actions">
					<form class="form" @submit.prevent="sendMessage()">
						<div class="form__field">
							<input v-model="messageText" class="form__message" placeholder="Type Message...">
						</div>
						<button :disabled="messageText === ''" class="btn btn--send" type="submit">Send</button>
					</form>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import io from 'socket.io-client';
	import Topbar from './../layout/Topbar.vue'
	import Rooms from './../components/Rooms.vue'
	export default {
		name: 'chat',
		components: {Topbar, Rooms},
		props: {},
		data() {
			return {
				data: [],
				userName: localStorage.getItem('userName'),
				userEmail: localStorage.getItem('userEmail'),
				userPhoto: localStorage.getItem('userPhoto'),
				timestamp: '',
				messageText: '',
				messages: [],
				users: [],
				room: '',
				socket : io('localhost:3001')
			}
		},
		methods: {
			init () {
				this.joinRoom('general');
				this.socket.on('clientMessage' , function(data) {
					this.messages.push({
						userName: data.userName,
						userEmail: data.userEmail,
						userPhoto: data.userPhoto,
						timestamp: data.timestamp,
						message: data.message,
						room: data.room
					});
				}.bind(this));

				this.joinUser();
				this.socket.on('userJoin' , function(data) {
					this.users.push({
						userName: data.userName,
						userPhoto: data.userPhoto,
						room: data.room
					});
				}.bind(this));
			},
			sendMessage () {
				this.data = {
					userName: this.userName,
					userEmail: this.userEmail,
					userPhoto: this.userPhoto,
					timestamp: new Date().getTime(),
					message: this.messageText,
					room: this.room
				};

				this.socket.emit('newMessage', this.data);
				this.messages.push(this.data);
				this.messageText = '';
			},
			joinRoom (roomName) {
				this.room = roomName;
				this.messages  = [];
				this.data = {
					userName: this.userName,
					userEmail: this.userEmail,
					userPhoto: this.userPhoto,
					timestamp: new Date().getTime(),
					message: this.messageText,
					room: this.room
				};
				this.socket.emit('joinRoom', this.data);
				if(!this.room) {
					this.socket.emit('leaveRoom', this.data);
				}
			},
			joinUser() {
				this.users.push({
					userName: this.userName,
					userPhoto: this.userPhoto,
					room: this.room
				});
			}
		},
		filters: {
			formatDate: function (value) {
				let time = new Date(value);
				return time.toLocaleString('en-US', {
					hour: 'numeric',
					minute: 'numeric',
					hour12: true
				});
			}
		},
		mounted() {
			this.init();
		},
	}
</script>

