/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let submit = document.getElementById('submit');  //reading DOM getting element w/ id of submit assigning it to submit
let baseURL = 'https://itunes.apple.com/search?'; //assigning base url to var baseURL

submit.addEventListener('click', function() {
 	let search = document.getElementById('newSearch').value;
 	let requestURL = baseURL + 'term=' + search;

 	console.log(requestURL);

	fetch(requestURL)
	.then(
		function(response) {
		    if (response.status !== 200) {
		     	console.log('Fetch Failed. Error Message:' + response.status);
		     	return;
		    }

		    response.json().then(function(data) {
		      	let searchResults = document.getElementById('songResults');
		        searchResults.innerHTML = "";
		      	for (let i = 0; i < 15; i++) {
					let artist = data.results[i].artistName;
					let songTitle = data.results[i].songTitle;
					let imageArt = data.results[i].artworkUrl100;
					let results =
					`
					<img src="${imageArt}">
					<h4>${songTitle}</h4>
					<h6>${artist}</h6>
					`
					let content = document.createElement('div');
					content.innerHTML = results;
					content.setAttribute('class', 'content');
					searchResults.appendChild(content);
		      	}
		   });
	  	}
	)
	.catch(
	 	function(error) {
	 		console.log(error);
	 	}
	);
});