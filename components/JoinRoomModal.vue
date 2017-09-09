<template>
<div class="modal is-active" >
  <div class="modal-content">
    <div v-if="!seen">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div id="logo">
            <img src="/logoModal.svg"/>
          </div>
          <div class="input-container field is-grouped">
            <p class="control is-expanded">
              <input class="input custom-input" type="text" v-model="link" placeholder="Enter Room link">
            </p>
          </div>
          <p class="control">
            <a v-on:click="joinRoom" class="button">
              입장
            </a>
            <a v-on:click="makeRoom" class="button">
              방만들기
            </a>
          </p>
        </div>
      </article>
    </div>
  </div>
    <BuildRoomModal v-if="seen"/>
  </div>
</div>
</template>

<script>
/*eslint-disable*/
import axios from '~/plugins/axios'
import BuildRoomModal from './BuildRoomModal.vue'
export default {
data() {
  return {
    seen: false,
    link: ''
  }
},
    components: {
      BuildRoomModal
    },
  methods: {
    joinRoom () {
      location.href = process.env.baseUrl + "/room?id="+this.link
    },
    makeRoom () {
      this.seen = !this.seen
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
  box-shadow: 0 0 24px rgba(72, 72, 72, 0.5);
}

.box {
  overflow: hidden;
  width: 700px;
  height: 340px;
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
  margin-top: 45px;
  margin-bottom: 0px !important;
  padding: 0 60px;
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
  margin: 26px 0 0 280px;
}

.button:hover {
  background-color: #E67D7D;
}

.media-footer {
  cursor: pointer;
  width: 140px !important;
  height: 40px;
  margin: 38px 0 0 280px;
  background-color: #E67D7D;
  line-height: 40px;
  border-radius: 20px;
  font-weight: 700;
}

.field-label {
  text-align: center;
}

.logo {
  width: 151px;
  height: 34px;
  object-fit: contain;
}

#logo{
  text-align: center;
}
</style>
