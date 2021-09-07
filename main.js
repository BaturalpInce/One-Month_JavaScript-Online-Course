// 1.Search Section

var UI = {};

UI.clearTracks = function() {
    document.querySelector('.js-search-results').innerHTML = "";
}

UI.enterPress = function(){
document.querySelector(".js-search").addEventListener('keyup',function(e){
    UI.clearTracks();
	var inputValue = document.querySelector("input").value;
	if(e.which === 13) { //looking for "enter" button
		SoundCloudAPI.getTrack(inputValue);
  	}
});
}
UI.enterPress();

UI.clickPress = function(){
document.querySelector(".js-submit").addEventListener('click',function(e){
	UI.clearTracks();
	var inputValue = document.querySelector("input").value;
		SoundCloudAPI.getTrack(inputValue);

});
}
UI.clickPress();

UI.reset = function(){
 var button = document.querySelector(".main");
 var resetBtn = document.createElement('i');
 resetBtn.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
 resetBtn.type = "submit";
 resetBtn.textContent = "Reset the Playlist";
 button.insertBefore(resetBtn, button.firstChild);
 resetBtn.addEventListener("click",function(){
 localStorage.clear();
 sideBar.innerHTML = "";
  });
}
UI.reset(); 

// 2.Query Soundcloud API Section
var SoundCloudAPI = {};

SoundCloudAPI.init = function(){
	SC.initialize({
		client_id: 'add_your_client_id'
	});
}
SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){
// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
  		q: inputValue
	}).then(function(tracks) {
  		console.log(tracks);
  		SoundCloudAPI.renderTracks(tracks)
	});
	}
//SoundCloudAPI.getTrack("Rilo Kiley");

// 3.Display the cards Section
SoundCloudAPI.renderTracks = function(tracks){
	tracks.forEach(function(track){
		
	//card 
	var card = document.createElement('div');
    card.classList.add('card');

	//image
	var imageDiv = document.createElement('div');
	imageDiv.classList.add('image');

	var image_img = document.createElement('img');
	image_img.classList.add('image_img');
	image_img.src = track.artwork_url || 'http://www.placekitten.com/290/290';

	imageDiv.appendChild(image_img);

	//content 
	var content = document.createElement('div');
	content.classList.add('content');

	var header = document.createElement('div');
	header.classList.add('header');
	header.innerHTML = '<a href="'+ track.permalink_url +'" target="_blank">'+ track.title +'</a>';

	//button
	var button = document.createElement('div');
	button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

	var icon = document.createElement('i');
	icon.classList.add('add', 'icon');

	var buttonText = document.createElement('span');
	buttonText.innerHTML = 'Add to playlist';

	button.addEventListener("click", function(){
		SoundCloudAPI.getEmbed(track.permalink_url);
	});


	//appendChild
	content.appendChild(header);

	button.appendChild(icon);
	button.appendChild(buttonText);

	card.appendChild(imageDiv);
	card.appendChild(content);
	card.appendChild(button);

	var searchResults = document.querySelector('.js-search-results');
	searchResults.appendChild(card);

	});
}

// 4. Add to playlist and play Section
SoundCloudAPI.getEmbed = function(trackURL){
SC.oEmbed(trackURL, {
	auto_play: true
}).then(function(embed){
	console.log('oEmbed response: ', embed);
 
	var sideBar = document.querySelector('.js-playlist');

	var box = document.createElement('div');
	box.innerHTML = embed.html;

	sideBar.insertBefore(box, sideBar.firstChild);
	localStorage.setItem("key", sideBar.innerHTML); //this will save the playlist so even if we refresh the website playlist won't be lost

});

}
var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");
