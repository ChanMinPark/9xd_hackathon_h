<template>
<div>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div id="logo">
        <img src="/logoModal.svg"/>
        </div>
        <div class="input-container field is-grouped">
          <p class="control is-expanded">
            <input class="input custom-input" type="text" v-model="title" placeholder="Enter Room Title">
          </p>
        </div>
        <div class="input-container field is-grouped">
          <p class="control is-expanded">
            <input class="input custom-input" type="text" v-model="link" placeholder="Enter Youtube Link">
          </p>
        </div>
        <div class="input-container field is-grouped">
          <p class="control is-expanded">
            <input class="input custom-input" type="text" v-model="nickname" placeholder="Enter Nickname">
          </p>
        </div>
        <p class="control">
          <a v-on:click="makeRoom" class="button">
            방 만들고 시작하기
          </a>
        </p>
      </div>
    </article>
  </div>
</div>
</template>

<script>
/*eslint-disable*/
import axios from '~/plugins/axios'
export default {
  data () {
    return {
      nickname: '',
      title: '',
      link: ''
    }
  },
  methods: {
    makeRoom() {
      axios.post('http://52.79.159.96:3000/bang/create', {
        roomName: this.title,
        v: this.link,
        nickname: this.nickname
      }).then(res => {
        console.log(res)
        location.href = "http://localhost:8000/room?id="+res.data.roomId
      })
    }
  }
}
</script>

<style>
.modal {
  color: #fff;
}

.modal-content {
  width: 700px;
}

.box {
  overflow: hidden;
  width: 700px;
  height: 450px;
  border-radius: 10px;
  padding: 0;
}

#logo {
  padding-top: 42px;
  padding-left: 62px;
}

#logo img {
  float: left;
}

#logo:after {
  display: block;
  content: "";
  clear: both;
}

.input-container {
  margin-top: 35px;
  margin-bottom: 0px !important;
  padding: 0 60px;
}

.button {
  padding: 0;
  text-align: center;
  border: transparent;
  width: 260px;
  height: 64px;
  border-radius: 32px;
  background-color: #E67D7D;
  line-height: 64px;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 0 11px rgba(230, 125, 125, 1);
  margin: 45px 0 0 220px;
}

.button:hover {
  background-color: #E67D7D;
}

.media-footer {}

.field-label {
  text-align: center;
}

.logo {

  width: 151px;
  height: 34px;
  object-fit: contain;
}
</style>
