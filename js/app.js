
//global variables
//create a list that holds all of your cards
let deck =["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa-leaf", "fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
let cardsShown = [];
let storeElement = [];
let counter = 0;
let matchedWords =[];
const stars =["fa fa-star"]
let sec = 0;
let min = 0;
let timer;
let timeRunning = false;
const timerOutput = document.querySelector(".timer-output");
const timeElapsed = document.querySelector(".time-elapsed")
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

makeBoard(deck);

//make da board
function makeBoard(cards){
	let shuffledDeck = shuffle(cards);
	matchedWords =[];
	counter = 0;
	storeElement = [];
	cardsShown = [];
	document.querySelector(".timer-output").innerHTML = "00:00";
	document.getElementsByClassName('moves')[0].innerHTML = 0;
	for (let x=0 ; x < shuffledDeck.length; x++){
	   //create the list item
       const item = document.createElement('li');
       item.className = "card";
       item.id = "card"+x;
       item.addEventListener("click",function() {showCard(item,shuffledDeck[x])});

       //set its contents
       const innerItem = document.createElement('i');
       innerItem.className = shuffledDeck[x];

       item.appendChild(innerItem);

       //add it to the list
       document.getElementsByClassName('deck')[0].appendChild(item);
	}
	starPanel();
}

//shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
}

function starPanel(){
	for (let starCounter = 0; starCounter < 3; starCounter++){
		//creates list item
		const eachStar = document.createElement('li');

		//set its contents
	   	const innerStar = document.createElement('i');
	   	innerStar.className = stars[0];

	    eachStar.appendChild(innerStar);

	    document.getElementsByClassName('stars')[0].appendChild(eachStar);
	}
}

function showCard(element, content){
	startTimer();
	if(!storeElement.includes(element) && !element.classList.contains("match")){
		cardsShown.push(content);
		storeElement.push(element);
		console.log(storeElement[0]);

		if (cardsShown.length < 2){
			element.className = "card open";
		}

		else {
			element.className = "card open";
			incrementMoves();
			setTimeout(function(){

				if (cardsShown[0] == cardsShown[1] && storeElement[0].id != storeElement[1].id){
					storeElement[0].className = "card match";
					storeElement[1].className = "card match";
					matchedWords.push(storeElement[0]);
					matchedWords.push(storeElement[1]);
					if(matchedWords.length==deck.length){
						winnerWinnerChickenDiner();
						cardsShown = [];
						storeElement = [];
						document.getElementsByClassName('deck')[0].innerHTML="";
						document.getElementsByClassName('stars')[0].innerHTML="";
					}
					else{
					cardsShown = [];
					storeElement = [];
					console.log(matchedWords);
					}

				}

				else {
					storeElement[0].className = "card";
					storeElement[1].className = "card";
					cardsShown = [];
					storeElement = [];

				}

			}, 500);
		}

	}
	else{
		return;
	}
		
}


function incrementMoves(){
	counter ++;
	const moves = document.getElementsByClassName('moves')[0];
	moves.innerHTML = counter;
	if (counter == 10 || counter == 20){
		const stars = document.getElementsByClassName('stars')[0];
		stars.removeChild(stars.children[0]);
		}
}

//all cards match
function winnerWinnerChickenDiner(){
	document.getElementsByClassName('winner-stars')[0].innerHTML=""
		for (let starCounter = 0; starCounter < document.getElementsByClassName('stars')[0].children.length; starCounter++){
			//creates list item
			const eachStar = document.createElement('li');

			//set its contents
		   	const innerStar = document.createElement('i');
		   	innerStar.className = stars[0];

		    eachStar.appendChild(innerStar);

		    document.getElementsByClassName('winner-stars')[0].appendChild(eachStar);
		}
	modal.style.display = "block";
	stopTimer();

}
	
//reset deck + stars + make board 
document.getElementsByClassName('restart')[0].onclick = function() {
	document.getElementsByClassName('deck')[0].innerHTML="";
	document.getElementsByClassName('stars')[0].innerHTML="";
	stopTimer();
	makeBoard(deck);
	}

//get the modal
const modal = document.getElementById('myModal');

//get the button that opens the modal
const btn = document.getElementById("myBtn");

//get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//when the user clicks on <span> (x), close the modal
span.onclick = function() {
		modal.style.display = "none";
}

//when click "new game", resets game
btn.onclick = function() {
	makeBoard(deck);
    modal.style.display = "none";
}

//when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

function incrementMoves(){
	counter++;
	const moves = document.getElementsByClassName('moves')[0];
	moves.innerHTML = counter;
	if (counter == 8|| counter == 16){
	const stars = document.getElementsByClassName('stars')[0];
	stars.removeChild(stars.children[0]);
	}
}

//start timer
function startTimer(){
	if (timeRunning == false) {
    	timer = setInterval(insertTime, 1000);
    	timeRunning = true;
	} 

	else {
    	return;
  	}

}

//stop the timer
function stopTimer() {
    clearInterval(timer);
	sec = 0;
	min = 0;
	timeRunning = false; 
}


//insert time
function insertTime() {
	sec++;

	if (sec < 10) {
    	sec = `0${sec}`;
  	}

  	if (sec >= 60) {
    	min++;
    	sec = "00";
  	}
//display time
timerOutput.innerHTML = "0" + min + ":" + sec;
timeElapsed.innerHTML = "0" + min + ":" + sec;

}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
