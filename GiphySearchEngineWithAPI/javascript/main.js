//Section 1: Taking the Input
function searchBarReset(){
	var emptyString = "";
	document.querySelector("input").value = emptyString;
} //with this function, when the user click on search box the text inside gets deleted instantly

document.querySelector(".js-userinput").addEventListener('click',function(){
	searchBarReset();
}); 

document.querySelector(".js-go").addEventListener('click',function(e){
	console.log(e); //there are so much info that we can observe by printing e to console
	var input = document.querySelector("input").value;
	console.log(input);
    inputChanger(input);
});


document.querySelector(".js-userinput").addEventListener('keyup',function(e){
	var input = document.querySelector("input").value;
	console.log(input);
	console.log(e); //there are so much info that we can observe by printing e to console
	if(e.which === 13) { //looking for "enter" button
    	inputChanger(input);
  	}

});


//Section 2: Setting the API
function inputChanger(input){
input = input.replaceAll(" ","+");
var url = "http://api.giphy.com/v1/gifs/search?q="+input+"&api_key=dc6zaTOxFJmzC";
console.log(url);
// AJAX helps to refresh some part of website so we don't need to refresh all page
// AJAX Request
var GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

GiphyAJAXCall.addEventListener('load',function(e){ //when the call is loaded execute the function
	console.log(e); //by analyzing this, we can see that our data is stored at target --> response: ...

	var data = e.target.response;
	pushToDOM(data);
});
}

//Section 3: Showing the GIF's
function pushToDOM(input) {
	var response = JSON.parse(input); //json parsing allow us to reach spesific data easier
	console.log(response); //we can reach data id, url, type and many more things with this
	var imageUrls = response.data;
	imageUrls.forEach(function(image){  //for every index of data function will execute

    var src = image.images.fixed_height.url; //setting up the path of url as a variable
    console.log(src);

    var container = document.querySelector(".js-container");
    container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">"; //we used += because gifs should not replace eact other, they should be added next to each other
  	});

}


