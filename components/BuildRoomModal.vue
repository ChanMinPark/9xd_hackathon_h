<template>
<div>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div id="logo">
        <img src="/logo.svg"/>
      </div>
      <br/>
        <div class="field is-grouped">
          <div class="field-label is-normal">
            <label class="label">NickName</label>
          </div>
          <p class="control is-expanded">
            <input class="input" type="text" v-model="nickname" placeholder="Find a repository">
          </p>
        </div>

        <div class="field is-grouped">
          <div class="field-label is-normal">
            <label class="label">Title</label>
          </div>
          <p class="control is-expanded">
            <input class="input" type="text" v-model="title" placeholder="Find a repository">
          </p>
        </div>

        <div class="field is-grouped">
          <div class="field-label is-normal">
            <label class="label">Link</label>
          </div>
          <p class="control is-expanded">
            <input class="input" type="text" v-model="link" placeholder="Find a repository">
          </p>
        </div>

      </div>
    </article>
    <br/>
  </div>
  <div v-on:click="makeRoom" class="media-footer">
    함께보기
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

.button {
  padding: 5px;
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
