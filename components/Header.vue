<template>
    <div class="header">
        <div class="head-logo">
            <img src="/logo.svg"/>
        </div>
        <div class="head-title title is-3">
            방제 / {{title}}
        </div>
        <div class="menu">
            <a href="http://localhost:8000">채팅방 나가기</a>
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
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

* {
    font-family: 'Noto Sans KR', sans-serif;
}

.header {
    width: 100%;
    height: 70px;
    padding: 0 7%;
    box-shadow: 0 0 10px #8f8f8f;
    /* border-bottom: #555 */
}

.header .head-title {
    width: 60%;
    text-rendering: optimizeSpeed;
    font-weight: 500;
    color: #343434;
}

.title{
  padding:12px;
}

.menu {
  padding:24px;
  text-rendering: optimizeSpeed;
}

.head-logo,
.head-title,
.menu {
    display: flex;
    height: 100%;
    vertical-align: middle;
}

.head-logo {
    float: left;
    padding-right: 20px;
}

.head-title {
    float: left;
    padding-top: 18px;
    padding-left: 20px;
}

.menu {
    float: right;
}
</style>
