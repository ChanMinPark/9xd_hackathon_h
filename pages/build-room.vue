<template>
<section class="container">
  <h2>채팅방 개설</h2>
  <div class="field">
    <label class="label">닉네임</label>
    <div class="control">
      <input class="input" type="text" id="input-nick" placeholder="e.g 뿌잉뿌잉">
    </div>
    <label class="label">제목</label>
    <div class="control">
      <input class="input" type="text" id="input-title" placeholder="e.g. 꿀잼동영상 같이보실분">
    </div>
    <label class="label">링크</label>
    <div class="control">
      <input class="input" type="text" id="input-link" placeholder="e.g. https://www.youtube.com/embed/Dza-lHdf6GU">
    </div>
  </div>
  <nuxt-link to="/room">개설</nuxt-link>
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
.title {
  margin: 30px 0;
}

.users {
  list-style: none;
  margin: 0;
  padding: 0;
}

.user {
  margin: 10px 0;
}
</style>
