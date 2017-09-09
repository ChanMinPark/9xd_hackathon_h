<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      GAMGI
    </h1>
    <section class="find-room">
    <input type="text" id="input-link"/>
    <button id="route-room">go</button>
  </section>
  <section class="make-room">
    <nuxt-link to="/build-room">개설</nuxt-link>
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
