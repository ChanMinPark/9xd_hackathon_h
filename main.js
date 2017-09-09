//There is no 'use strict'

//get 50 videos by searchQuery
var searchQuery = '온스테이지';
var youtubeRequestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+ searchQuery +'&maxResults=50&key=';
var apiKey = 'AIzaSyBPZUrXXkG4Hl2kaD5kyCreNhVduDdiCDQ';
var videos = [];
var videoThumbnails = [];

(function() {
	$.ajax({
		type: 'GET',
		url:  youtubeRequestUrl + apiKey,
		success: function(data) {
		    extractVideoURLS(data);
		}
    });
})();

function extractVideoURLS(data) {
	for(index in data.items) {
		if(data.items[index].id.kind === 'youtube#video') {
			videos.push((data.items[index].snippet.thumbnails.default.url).split('/')[4]);
		}
	}
	createThumbnailImageList(videos);
};

function createThumbnailImageList(videoList) {
	var tempURL = '';
	for(index in videoList) {
		tempURL = 'https://img.youtube.com/vi/'+ videoList[index] +'/mqdefault.jpg';
		videoThumbnails.push(tempURL);
	}
	addImageElements(videoThumbnails);
};

function addImageElements(thumbnailList) {
	var parentDiv = $('#thumbnail-container');
	var htmlChunkPrefix = '<div class="thumbnail-image"><img src=';
	var htmlChunkPostFix = '><div>'
	for(index in thumbnailList) {
		parentDiv.append(htmlChunkPrefix + thumbnailList[index] + htmlChunkPostFix);
		//force insert <br> tag to breaking thumbnail (each 6 items)
		if(index != 0 && index % 5 === 0) {
			parentDiv.append('<br/>');
		}
	}
}