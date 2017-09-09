<template>
    <div class="header">
        <div class="logo">
            <img src="/logo.svg"/><h1 class="title">/{{title}}</h1>
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
.header {
    width: 80%;
    height: 70px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: #555
}

.title{
  padding:12px;
}

.menu {
  padding:24px;
}

.logo,
.menu {
    display: flex;
    height: 100%;
    vertical-align: middle;
}

.logo {
    float: left;
}

.menu {
    float: right;
}
</style>
