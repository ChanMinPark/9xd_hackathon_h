<template>
  <section class="container">
    <h2>채팅방 개설</h2>
    <section>
      <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="e.g Alex Smith">
  </div>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control">
    <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
  </div>
</div>
    <div>닉네임 : <input type="text" id="input-nick"/></div></br>
    <div>제목 : <input type="text" id="input-title"/></div></br>
    <div>링크 : <input type="text" id="input-link"/></div></br>
    <nuxt-link to="/room">개설</nuxt-link>
  </section>
  </section>
</template>

<script>

export default {
  head () {
    return {
      title: 'Users'
    }
  },
  methods: {
    buildRoom () {

    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
