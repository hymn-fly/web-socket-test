<template>
  <div class="page-container">
      <md-app>
          <md-app-toolbar class="md-primary">
              <div class="md-toolbar-row">
                  <span class="md-title">My Chat App</span>
              </div>
          </md-app-toolbar>
          <md-app-content>
              <md-field>
                  <label>Message</label>
                  <md-textarea v-model="textarea" disabled v-auto-scroll-bottom></md-textarea>
              </md-field>
              <md-field>
                  <label>Your Message</label>
                  <md-input v-model="message"></md-input>
                  <md-button class="md-primary md-raised" @click="sendMessage()">Submit</md-button>
              </md-field>
          </md-app-content>
      </md-app>
  </div>
</template>


<script>


  export default {
      name: 'ChatPage',
      created() {
          this.$socket.on('chat', (data)=> {
              this.textarea += data.message + "\n"
          })
      },
      data() {
          return {
              textarea: "",
              message: '',
          }

      },
      methods: {
          sendMessage () {

              this.$socket.emit('chat',{
                  message: this.message
              });

              this.textarea += this.message + "\n"
              this.message = ''
          }
      }
  }
</script>

<style>
  .md-app {
      height: 800px;
      border: 1px solid rgba(#000, .12);
  }

  .md-textarea {
      height: 300px;
  }
</style>