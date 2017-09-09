<template>
<div>
  <div class="modal" v-bind:class="{ 'is-active' : modal_flag }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
      <div class="box">
        <div class="content center">
          <div id="logo">
            <img src="/logoModal.svg" />
          </div>
          <div class="box-title title is-2">방제 / {{ roomTitle }}</div>
          <div class="input-container"><input class="input custom-input" placeholder="Enter Nickname" type="text" v-model="nickname"></div>
        </div>
        <button class="button" v-bind:class="{ 'is-loading' : isLoding }" v-bind:disabled="button_flag" v-on:click="joinChat">접속</button>
      </div>
    </div>
    <!-- <button class="modal-close is-large" aria-label="close" v-on:click="closeModal"></button> -->
  </div>
  <div class="container">
    <div class="room-top">
      <div class="room-left">
        <div class="video-panel">
          <!-- <iframe id="youtube-player" width="100%" height="100%" :src="url" frameborder="0" allowfullscreen></iframe> -->
          <youtube id="youtube-player" :video-id="videoId" @ready="ready" @playing="playing" @paused="pause" @buffering="buffering" @qued="qued" :player-vars="playerVars"></youtube>
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
          <button v-on:click="copyLink">링크 공유</button>
        </div>
        <div class="msg-list">
          <div class="msg-list-title">
            실시간 채팅
          </div>
          <div class="msg-list-items" ref="messages">
            <ul class="messages">
              <li class="message" v-for="message in messages"><i :title="message.date">{{ message.nickname }}</i>: {{ message.text }}</li>
            </ul>
          </div>
        </div>
        <div class="input-panel">
          <img src="speech-bubble.svg" width="25px" height="25px" alt="글">
          <input class="inputMessage" type="text" v-model="message" @ready="onPlayerReady" @keyup.enter="sendMessage">
          <!-- <button>입력</button> -->
        </div>
      </div>
    </div>
    <div class="room-bottom">
      <div class="bottom-title">
        추천 동영상
      </div>
      <div class="bottom-video-list">
        <div class="video-card" v-for="vl in videoIdList">
          <a :href="vl.link" target="_blank">
            <img :src="vl.id" alt="썸네일">
          </a>
          <div>{{ vl.title }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/*eslint-disable*/
import axios from '~/plugins/axios'
import socket from '~/plugins/socketio';
var player;
var videoThumbnails = [];

export default {
  layout: 'chatroom',
  head() {
    return {
      title: 'Gam-Gi'
    }
  },
  beforeMount() {
    socket.on('chat message', (message, nickname) => {
      console.log("message")
      this.messages.push({
        nickname,
        ...message
      })
    })

    socket.on('sync time', (time) => {
      console.log("Agagag",time)
      this.player.seekTo(time)
    })

    axios.get(process.env.serverUrl+'/bang/'+this.$route.query.id, {
      }).then(response => {
        console.log(response)
        this.room = response.data;
        this.roomTitle = response.data.roomName
      }).catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    closeModal: function() {
      this.modal_flag = false
    },
    copyLink: function() {
      var inp =document.createElement('input')
      document.body.appendChild(inp)
      inp.value = window.location.href
      inp.select()
      document.execCommand('copy',false)
      inp.remove()
      alert('Link copied on your clipboard!')
    },
    joinChat: function() {
      this.isLoding = true
      this.roomId = this.$route.query.id
      axios.post(process.env.serverUrl+'/bang/join', {
        roomId: Number(this.$route.query.id),
        nickname: this.nickname
      }).then(response => {
        console.log(response)
        // this.url = `https://www.youtube.com/embed/${response.data.v}?start=${response.data.t}`
        this.url = `https://www.youtube.com/embed/${response.data.v}?autoplay=1&start=${Number(response.data.t)}`
        // this.url = response.data.v;
        this.playerVars.time = this.$youtube.getTimeFromURL(this.url)
        this.videoId = this.$youtube.getIdFromURL(this.url)
        console.log(this.url)
        this.modal_flag = false
        socket.emit('join', this.$route.query.id, this.nickname)

        this.relatedVideosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${this.videoId}&type=video&maxResults=5&key=`
        axios.get(this.relatedVideosUrl + this.apiKey).then(data => {
          console.log(data)
          this.extractVideoURLS(data.data);
        })
      }).catch(e => {
        this.errors.push(e)
      })
    },
    extractVideoURLS: function (data) {
      console.log('>>> ', data);
      for(let index in data.items) {
        console.log(index)
        if(data.items[index].id.kind === 'youtube#video') {
          var tempObj = {
            id : 'https://img.youtube.com/vi/' + (data.items[index].snippet.thumbnails.default.url).split('/')[4] + '/mqdefault.jpg',
            title : data.items[index].snippet.title,
            link : 'https://www.youtube.com/watch?v=' + (data.items[index].snippet.thumbnails.default.url).split('/')[4]
          }
          this.videoIdList.push(tempObj);
        }
      }
    },
    // createThumbnailImageList(videoList) {
    //   var tempURL = '';
    //   for (let index = 0; index < videoList.length; index++) {
    //     tempURL = 'https://img.youtube.com/vi/' + videoList[index].id + '/mqdefault.jpg';
    //     videoThumbnails.push(tempURL);
    //   }
    //   console.log(videoThumbnails)
    //   this.addImageElements(videoThumbnails);
    // },
    // addImageElements(thumbnailList) {
    //   console.log("addImage")
    //   for (let index = 0; index < thumbnailList.length; index++) {
    //     this.parentDiv.push(thumbnailList[index])
    //   }
    // },
       onPlayerReady(event) {            
      console.log('onPlayerReady 실행');

                   // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
                  
      event.target.playVideo();        
    },

    sendMessage() {
      if (!this.message.trim()) return
      let message = {
        date: new Date().toJSON(),
        text: this.message.trim()
      }
      this.message = ''
      socket.emit('chat message', message)
    },
    scrollToBottom() {
      console.log('scrilltoottom')
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },
    ready (player) {
      console.log("agag")
      this.player = player
    },
    playing (player) {
      console.log("playing")
      // The player is playing a video.
    },
    pause () {
      console.log("pause")
      if(this.nickname == this.room.bangjang){
        socket.emit("sync time",parseInt(this.player.getCurrentTime()))
        this.player.playVideo()
      }else{
        axios.get(process.env.serverUrl+'/bang/'+this.$route.query.id, {
          }).then(response => {
            console.log(response)
            this.player.seekTo(response.data.t)
            this.player.playVideo()
          }).catch(e => {
            this.errors.push(e)
          })
      }
    },
    buffering (){
      console.log("buffering")
      console.log(this.player)
      console.log(this.room.bangjang)
    },
    qued () {
      console.log("qued")
    }
  },
  data() {
    return {
      modal_flag: true,
      button_flag: true,
      isLoding: false,
      nickname: '',
      url: '',
      roomId: '',
      messages: [],
      message: '',
      videoId: '',
      player:{},
      room:{},
      playerVars: { autoplay: 1, time: 1},
      playerOptions: {
          // videojs options
          sources: [{
            src: ''
          }],
        },
      roomTitle: '',
      apiKey: 'AIzaSyBPZUrXXkG4Hl2kaD5kyCreNhVduDdiCDQ',
      relatedVideosUrl: '',
      videoIdList: []
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
    },
    messages: 'scrollToBottom'
  }
}
</script>

<style scoped>
.modal {
  color: #fff;
}

.modal-content {
  width: 700px;
  box-shadow: 0 0 24px rgba(72, 72, 72, 0.5);
}

.box {
  overflow: hidden;
  width: 700px;
  height: 340px;
  border-radius: 10px;
  padding: 0;
}

.input-container {
  margin-top: 20px;
  margin-bottom: 0px !important;
}

.button {
  padding: 0;
  text-align: center;
  border: transparent;
  width: 140px;
  height: 50px;
  border-radius: 32px;
  background-color: #E67D7D;
  line-height: 50px;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 0 11px rgba(230, 125, 125, 1);
  margin: 38px 0 0 280px;
}

.button:hover {
  background-color: #E67D7D;
}

#logo {
  height: 40px;
}

#logo img {
  float: left;
}

.center {
  text-align: center;
  padding-top: 42px;
  padding-left: 62px;
  padding-right: 62px;
  margin-bottom: 0px;
}

.box-title,
.box-input,
.box-button {
  padding: 10px;
}

.box-title {
  font-size: 30px;
  color: #404040;
  padding: 0;
  text-align: left;
  margin-top: 38px;
  margin-bottom: 0;
  font-weight: 700;
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

  /* background-color: #9fb765; */
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
  padding-left: 10px;
  /* background-color: #d6ce97; */
}

.video-panel,
.control-panel {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  /* background-color: #d6ce97; */
}

.video-panel {
  height: 90%;
  background-color: #000000;
}

.video-panel div {
  height: 100%;
}

.video-panel div iframe {
  height: 100%;
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
  cursor: pointer;
}

.share-link button {
  width: 100%;
  height: 45px;
  color: white;
  background-color: #e67d7d;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  box-shadow: 0 0 11px rgba(230, 125, 125, 1);
  line-height: 42px;
  font-weight: 700;
}

.msg-list {
  margin-top: 20px;
  height: 300px;
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
  overflow-y: scroll;
  text-align: left;
}

.msg-list-itme ul li {
  text-align: left;
}

.message {
  margin-top: 10px;
  margin-bottom: 2px;
}

.input-panel {
  display: table;
  margin-top: 0;
  height: 40px;
  background-color: #f8f8f8;
}

.input-panel img {
  display: table-cell;
  vertical-align: middle;
  float: left;
  padding-top: 9px;
  margin-left: 13px;
}

.input-panel input {
  width: calc(100% - 62px);
  height: 30px;
  margin: 5px 10px;
  display: table-cell;
  vertical-align: middle;
  float: left;
}

.bottom-title {
  text-align: left;
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #8f8f8f;
}

.video-card {
  margin-top: 20px;
  margin-right: 20px;
  width: 17%;
  float: left;
}

.video-card img {
  width: 100%;
  height: auto;
}

#youtube-player {
  width:100%;
  height:100%;
}
</style>
