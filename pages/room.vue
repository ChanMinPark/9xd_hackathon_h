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
            <div class="box-button">
              <button class="button is-primary" v-bind:class="{ 'is-loading' : isLoding }" v-bind:disabled="button_flag" v-on:click="joinChat">접속</button>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="closeModal"></button>
    </div>
    <div class="container">
      <div class="room-top">
        <div class="room-left">
          <div class="video-panel">
            <iframe id="youtube-player" width="100%" height="100%" :src="url" frameborder="0" allowfullscreen></iframe>
          </div>
          <!-- <div class="control-panel">
            <button>버튼1</button>
            <button>버튼2</button>
            <button>버튼3</button>
            <button>버튼4</button>
          </div> -->
        </div>

        <div class="room-right">
          <div class="share-link">
            <button>링크 공유</button>
          </div>
          <div class="msg-list">
            <div class="msg-list-title">
              실시간 채팅
            </div>
            <div class="msg-list-items">

            </div>
          </div>
          <div class="input-panel">
            <img src="speech-bubble.svg" width="25px" height="25px" alt="글">
            <input class="input" type="text">
            <!-- <button>입력</button> -->
          </div>
        </div>
      </div>
      <div class="room-bottom">

      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from '~/plugins/axios'

var player;

export default {
  layout: 'chatroom',
  head() {
    return {
      title: 'Wetube Chat'
    }
  },
  methods: {
    closeModal: function() {
      this.modal_flag = false
    },
    joinChat: function() {
      this.isLoding = true
      this.roomId = this.$route.query.id
      axios.post('http://52.79.159.96:3000/bang/join', {
        roomId: Number(this.$route.query.id),
        nickname: this.nickname
      }).then(response => {
        console.log(response)
        // this.url = `https://www.youtube.com/embed/${response.data.v}?start=${response.data.t}`
        this.url = `https://www.youtube.com/embed/${response.data.v}?autoplay=1&start=1`
        console.log(this.url)
        this.modal_flag = false
      }).catch(e => {
        this.errors.push(e)
      })
    },
        onYouTubeIframeAPIReady() {
      console.log("youtue")
                  player = new YT.Player('youtube-player', {
                        events: {
                              'onReady': self.onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
                        }
                  });
            },
       onPlayerReady(event) {
                  console.log('onPlayerReady 실행');

                  // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
                  event.target.playVideo();
            }
  },
  data() {
    return {
      modal_flag: true,
      button_flag: true,
      isLoding: false,
      nickname: '',
      url: '',
      roomId: ''
    }
  },
  created: function() {
    console.log(this.$route.query.id)
  },
  watch: {
    nickname: function(val, oldVar) {
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
  width: 90%;
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

.room-top {
  width: 100%;
  height: 450px;
}

.room-bottom {
  position: relative;
  width: 100%;
  height: 300px;

  background-color: #9fb765;
}

.room-left {
  float: left;
  width: 70%;
  height: 100%;
  /* padding: 20px 20px; */
  /* background-color: #e5c0c0; */
}

.room-right {
  float: left;
  width: 30%;
  height: 100%;

  /* background-color: #d6ce97; */
}

.video-panel,
.control-panel {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  /* background-color: #d6ce97; */
}

.video-panel {
  height: 90%;
}

.control-panel {
  height: 20%;
}

.control-panel button {
  width: 15%;
  height: 40px;
  margin: 10px 20px;
}

.share-link,
.msg-list,
.input-panel {
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  /* background-color: #e5c0c0; */
}

.share-link {
  margin-top: 20px;
  height: 10%
}

.share-link button {
  width: 100%;
  height: 100%;
  color: white;
  background-color: #e67d7d;
  border: none;
  border-radius: 25px;
  font-size: 16px;
}

.msg-list {
  margin-top: 5px;
  height: 65%;
}

.msg-list-title {
  width: 100%;
  height: 10%;
  background-color: #f8f8f8;
  text-align: left;
  padding-left: 10px;
  padding-top: 4px;
}

.msg-list-items {
  width: 100%;
  height: 90%;
}

.input-panel {
  display: table;
  margin-top: 10px;
  height: 10%;
  background-color: #f8f8f8;
}

.input-panel img {
  display: table-cell;
  vertical-align: middle;
  float: left;
  padding-top: 12px;
  margin-left: 20px;
}

.input-panel input {
  width: 75%;
  height: calc(100% - 10px);
  margin: 5px 10px;
  display: table-cell;
  vertical-align: middle;
  float: left;
}
</style>
