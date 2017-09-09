<template>
    <div class="header">
        <div class="head-logo">
            <img src="/logo.svg"/><h3 class="title">방제 / {{ title }}</h3>
        </div>
        <!-- <div class="head-title title is-3">
            방제 / {{title}}
        </div> -->
        <div class="menu">
            <a href="/">채팅방 나가기</a>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import axios from '~/plugins/axios'

export default {
  data() {

  return {
    title: ''
  }
},
async created () {
  let data = await axios.get('http://52.79.159.96:3000/bang/'+this.$route.query.id);
  console.log(data)
  this.title = data.data.roomName
}
}
</script>

<style scoped>
    .header {
        width: 100%;
        height: 70px;
        margin-left: auto;
        margin-right: auto;
        border-bottom: #555;
        box-shadow: 0 2px 4px rgba(188, 188, 188, 0.5);
        padding: 0 45px;
    }

    .title{
        padding:12px 30px;
        width: 650px;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 45px;
        font-size: 30px;
        font-weight: 700;
        color: #404040;
    }

    .head-logo,
    .menu {
        display: flex;
        height: 100%;
        vertical-align: middle;
    }

    .menu a {
        line-height: 70px;
        color: #808080;
        font-size: 20px;
        font-weight: 700;
        margin-left: auto;
    }

    .head-logo {
        float: left;
    }
</style>
