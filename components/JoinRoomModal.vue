<template>
<div class="modal is-active" >
  <div class="modal-content">
    <div v-if="!seen">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div id="logo">
          <img src="/logo.svg"/>
        </div>
        <br/>
            <div class="field is-grouped">
              <div class="field-label is-normal">
                <label class="label">Link</label>
              </div>
              <p class="control is-expanded">
                <input class="input" type="text" id="input-link" placeholder="Find a repository">
              </p>
              <p class="control">
                <a v-on:click="joinRoom" class="button is-success">
              입장
            </a>
              </p>

          </div>
        </div>

      </article>
    </div>
    <div v-on:click="makeRoom" class="media-footer">
      방만들기
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
    seen: false
  }
},
    components: {
      BuildRoomModal
    },
  methods: {
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
  #logo{
    text-align: center;
  }
</style>
