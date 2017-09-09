<template>
    <div>
        <div class="modal" v-bind:class="{ 'is-active' : modal_flag }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <!-- Any other Bulma elements you want -->
                <div class="box">
                    <div class="content center">
                        <div class="box-title title is-2">닉네임을 입력해주세요 :)</div>
                        <div class="box-input"><input class="input" type="text" v-model="nickname"></div>
                        <div class="box-button"><button class="button is-primary" v-bind:class="{ 'is-loading' : isLoding }" v-bind:disabled="button_flag" v-on:click="joinChat">접속</button></div>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" v-on:click="closeModal"></button>
        </div>
        <div class="container">
            <div class="room-left">
                <div class="video-panel">
                <iframe width="100%" height="100%" :src="url" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="control-panel">
                    <button>버튼1</button>
                    <button>버튼2</button>
                    <button>버튼3</button>
                    <button>버튼4</button>
                </div>
            </div>

            <div class="room-right">
                <div class="msg-list">

                </div>
                <div class="input-panel">
                    <input type="text">
                    <button>입력</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'chatroom',
  head () {
    return {
      title: 'Wetube Chat'
    }
  },
  methods: {
    closeModal: function () {
      this.modal_flag = false
    },
    joinChat: function () {
      this.isLoding = true
      this.roomId = this.$route.query.id
      axios.post('http://52.79.159.96:3000/bang/join', {
        roomId: Number(this.$route.query.id),
        nickname: this.nickname
      }).then(response => {
        console.log(response)
        this.url = `https://www.youtube.com/embed/${response.v}?t=${response.t}`
      }).catch(e => {
        this.errors.push(e)
      })
    }
  },
  data () {
    return {
      modal_flag: true,
      button_flag: true,
      isLoding: false,
      nickname: '',
      url: '',
      roomId: ''
    }
  },
  created: function () {
    console.log(this.$route.query.id)
  },
  watch: {
    nickname: function (val, oldVar) {
      if (val.length !== 0) {
        this.button_flag = false
      } else {
        this.button_flag = true
      }
    }
  }
}
</script>

<style scoped>
.center {
    text-align: center;
}

.box-title,
.box-input,
.box-button {
    padding: 10px;
}

.box-button button {
    padding-top: 5px;
    padding-bottom: 5px;
}

.container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 0;
    padding-bottom: 0;
}
.container:after {
    content: '';
    display: block;
    clear: both;
}

.room-left {
    float: left;
    width: 60%;
    height: 100vh;
    /* padding: 20px 20px; */

    background-color: #e5c0c0;
}

.room-right {
    float: left;
    width: 40%;
    height: 100vh;

    background-color: #d6ce97;
}

.video-panel,
.control-panel {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;

    background-color: #d6ce97;
}

.video-panel {
    height: 50%;
}

.control-panel {
    height: 20%;
}

.control-panel button {
    width: 15%;
    height: 40px;
    margin: 10px 20px;
}

.msg-list,
.input-panel {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;

    background-color: #e5c0c0;
}

.msg-list {
    height: 70%;
}

.input-panel {
    height: 10%;
}
</style>
