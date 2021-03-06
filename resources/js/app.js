/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import VueChatScroll from 'vue-chat-scroll';
import Vue from 'vue'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

window.Vue = require('vue').default;
Vue.use(VueChatScroll);
Vue.use(Toaster, {timeout: 5000})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('message', require('./components/Message.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: [],
            time: []
        },
        typing: '',
        numberOfUser: 0
    },
    methods: {
        send() {
            if (this.message.length != 0) {
                // console.log(this.message)
                this.chat.message.push(this.message)
                this.chat.user.push('you')
                this.chat.color.push('success')
                this.chat.time.push(this.getTime())

                axios.post('/send', {
                    message: this.message
                })
                    .then((response) => {
                        // console.log(response, 'response')
                        this.message = '';
                    })
                    .catch((error) => {
                        // console.log(error, 'error')
                    });
            }
        },
        getTime() {
            let time = new Date();
            return time.getHours() + ':' + time.getMinutes()
        }
    },
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    mounted() {
        // console.log('test')
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message)
                this.chat.user.push(e.user)
                this.chat.color.push('warning')
                this.chat.time.push(this.getTime())
                // console.log(e);
            })
            .listenForWhisper('typing', (e) => {
                if (e.name != '') {
                    this.typing = 'typing...'
                } else {
                    this.typing = ''
                }
                console.log(e.name);
            });

        Echo.join(`chat`)
            .here((users) => {
                // console.log(users);
                this.numberOfUser = users.length
                //
            })
            .joining((user) => {
                this.numberOfUser += 1;
                this.$toaster.success(user.name+' is joined')
                // console.log(user.name);
            })
            .leaving((user) => {
                this.numberOfUser -= 1;
                this.$toaster.warning(user.name+' is leaved')
                // console.log(user.name);
            })
            .error((error) => {
                // console.error(error);
            });
    }
});
