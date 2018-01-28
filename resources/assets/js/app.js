
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data:{
      message:'',
      chat:{
        message:[],
        user:[],
        color:[],
        time:[]
      },
      typing:''
    },
    watch:{
      message(){
        Echo.private('chat')
          .whisper('typing', {
            name: this.message
        });
      }
    },
    methods:{
      send(){
        if(this.message.length!=0)
        {
          this.chat.message.push(this.message)
          this.chat.user.push('you')
          this.chat.color.push('success')
          this.chat.time.push(this.getTime())
          axios.post('/send', {
            message: this.message
          })
          .then(response => {
            // console.log(response);
          })
          .catch(error => {
            // console.log(error);
          });

          this.message=''
        }
      },
      getTime(){
        let time=new Date();
        return time.getHours()+' : '+time.getMinutes()
      }
    },
    mounted(){
      Echo.private('chat')
        .listen('ChatEvent', (e) => {
            console.log(e);
            this.chat.message.push(e.message)
            this.chat.user.push(e.user)
            this.chat.color.push('warning')
            this.chat.time.push(this.getTime())

        })
        .listenForWhisper('typing', (e) => {
            if(e.name!='')
            {
              this.typing='typing....'
            }
            else {
              this.typing=''
            }
        });
    }
});
