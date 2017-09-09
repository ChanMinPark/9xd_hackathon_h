<template>
    <div class="container">
        <div class="room-left">
            <div class="video-panel">
              <iframe width="100%" height="100%" :src="url" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="control-panel">
                <button>버튼1</button>
                <button>버튼2</button>
                <button>버튼3</button>
                <button>버튼4</button>
            </div>
        </div>

        <div class="room-right">
            <div class="msg-list">

            </div>
            <div class="input-panel">
                <input type="text">
                <button>입력</button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://www.youtube.com/embed/Dza-lHdf6GU'
    }
  }
}
</script>

<style scoped>
.container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 0;
    padding-bottom: 0;
}
.container:after {
    content: '';
    display: block;
    clear: both;
}

.room-left {
    float: left;
    width: 60%;
    height: 100vh;
    /* padding: 20px 20px; */

    background-color: #e5c0c0;
}

.room-right {
    float: left;
    width: 40%;
    height: 100vh;

    background-color: #d6ce97;
}

.video-panel,
.control-panel {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;

    background-color: #d6ce97;
}

.video-panel {
    height: 50%;
}

.control-panel {
    height: 20%;
}

.control-panel button {
    width: 15%;
    height: 40px;
    margin: 10px 20px;
}

.msg-list,
.input-panel {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;

    background-color: #e5c0c0;
}

.msg-list {
    height: 70%;
}

.input-panel {
    height: 10%;
}
</style>
