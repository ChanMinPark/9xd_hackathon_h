<template>
<section class="container">
  <JoinRoomModal/>
  <div id="thumbnail-container">
    <div v-for="item in parentDiv" class="thumbnail-image">
      <img :src="item" />
    </div>
  </div>
</section>
</template>

<script>
/*eslint-disable*/
import axios from '~/plugins/axios'
import JoinRoomModal from '~/components/JoinRoomModal.vue'
//There is no 'use strict'

//get 50 videos by searchQuery
var searchQuery = '온스테이지';
var youtubeRequestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + searchQuery + '&maxResults=50&key=';
var apiKey = 'AIzaSyBPZUrXXkG4Hl2kaD5kyCreNhVduDdiCDQ';
var videos = [];
var videoThumbnails = [];

export default {
  components: {
    JoinRoomModal
  },
  data() {
    axios.get(youtubeRequestUrl + apiKey).then(data => {
      console.log(data)
      this.extractVideoURLS(data.data);
    })
    return {
      parentDiv: []
    }
  },
  head() {
    return {
      title: 'Gam-gi'
    }
  },
  methods: {
    extractVideoURLS(data) {
      for (let index = 0; index < data.items.length; index++) {
        if (data.items[index].id.kind === 'youtube#video') {
          videos.push((data.items[index].snippet.thumbnails.default.url).split('/')[4]);
        }
      }
      this.createThumbnailImageList(videos);
    },
    createThumbnailImageList(videoList) {
      var tempURL = '';
      for (let index = 0; index < videoList.length; index++) {
        tempURL = 'https://img.youtube.com/vi/' + videoList[index] + '/mqdefault.jpg';
        videoThumbnails.push(tempURL);
      }
      console.log(videoThumbnails)
      this.addImageElements(videoThumbnails);
    },
    addImageElements(thumbnailList) {
      console.log("addImage")
      for (let index = 0; index < thumbnailList.length; index++) {
        this.parentDiv.push(thumbnailList[index])
      }
    }
  }
}
</script>

<style scoped>
.title {
  margin: 30px 0;
  color: #fff;
}

.users {
  list-style: none;
  margin: 0;
  padding: 0;
}

.user {
  margin: 10px 0;
}

.container {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#thumbnail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

#thumbnail-container:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #505050;
  opacity: 0.4;
}

.thumbnail-image {
  width: 20%;
  min-width: 250px;
  display: inline-block;
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
  background-color: #ccc;
}

.thumbnail-image img {
  width: 100%;
  height: 100%;
}

.main {
  color:#fff;
  position: relative;
  z-index:100;
  width:100%;
  height:100%;
}
</style>
