// JavaScript Document
// Author: James Taylor
// NewburyNewMedia.co.uk
//
// Project - RPSLS 
//








/*set gameLength global variable
var gameLength = 1;

var p = 1;

//playAgain function - reset scores and reload page 
function playAgain() {
	window.location.reload();
	w = 0;
	l = 0;
};


// --------------------- GO TO GAME PAGE ---------------------

// write game page with weapon options to page
function gamePage() {
	document.getElementById('game').innerHTML = "<h2>Choose your weapon!</h2><ul><li><label for=\"weapon0\">Rock<img src=\"http://newburynewmedia.co.uk/testing/RPSLS/images/rock/rock-"+p+".jpg\" /><input type=\"radio\" name=\"weapon\" value=\"weapon0\" id=\"weapon0\" /></label></li><li><label for=\"weapon1\">Paper<img src=\"http://newburynewmedia.co.uk/testing/RPSLS/images/paper/paper-"+p+".jpg\" /><input type=\"radio\" name=\"weapon\" value=\"weapon1\" id=\"weapon1\" /></label></li><li><label for=\"weapon2\">Scissors<img src=\"http://newburynewmedia.co.uk/testing/RPSLS/images/scissors/scissors-1.jpg\" /><input type=\"radio\" name=\"weapon\" value=\"weapon2\" id=\"weapon2\" /></label></li><li><label for=\"weapon3\">Lizard<img src=\"http://newburynewmedia.co.uk/testing/RPSLS/images/lizard/lizard-1.jpg\" /><input type=\"radio\" name=\"weapon\" value=\"weapon3\" id=\"weapon3\" /></label></li><li><label for=\"weapon4\">Spock<img src=\"http://newburynewmedia.co.uk/testing/RPSLS/images/spock/spock-1.jpg\" /><input type=\"radio\" name=\"weapon\" value=\"weapon4\" id=\"weapon4\" /></label></li></ul><input type=\"button\" value=\"Play now!\" onclick=\"game();\"/><div id=\"result\"></div><div id=\"score\"><div>Your Score: <span>" + w + "</span></div><div>Sheldon: <span>" + l +"</span></div></div>";
	document.getElementById('shelly').innerHTML = "<img src=\"http://newburynewmedia.co.uk/testing/RPSLS/images/sheldon2-200.jpg\" width=\"200\" height=\"267\" />"
};

// start a best of 3 game. Set gameLength to 3, open game page
function start3() {
	gameLength = 3;
	gamePage();
}

// start a best of 5 game. Set gameLength to 5, open game page
function start5() {
	gameLength = 5;
	gamePage();
}

// --------------------- WIN AND LOSE PAGES ---------------------

// if lose best of x, write following losing information
function losePage() {
	document.getElementById('game').innerHTML = "<h2>You Lost!</h2><p><input type=\"button\" value=\"Play again?\" onclick=\"playAgain();\"/></p><div id=\"result\"></div><div id=\"score\"><div>Your Score: <span>" + w + "</span></div><div>Sheldon: <span>" + l +"</span></div></div>";
	document.getElementById('shelly').innerHTML = "<img src=\"../testing/RPSLS/images/sheldonL-200.jpg\" width=\"200\" height=\"267\" />"
};

// if win best of x, write following winning information
function winPage() {
	document.getElementById('game').innerHTML = "<h2>You Won!</h2><p><input type=\"button\" value=\"Play again?\" onclick=\"playAgain();\"/></p><div id=\"result\"></div><div id=\"score\"><div>Your Score: <span>" + w + "</span></div><div>Sheldon: <span>" + l +"</span></div></div>";
	document.getElementById('shelly').innerHTML = "<img src=\"../testing/RPSLS/images/sheldonW-200.jpg\" width=\"200\" height=\"267\" />"
};




// ------------------------ GAME STARTS --------------------------

//set global win and lose variables to count user score (w) and comp score (l)
var w = 0;
var l = 0;


// game function - define user choice, comp choice selected by random number, compare and return result
function game() {
		
	
	var userChoice;
	
	//check which radio button value is checked. Assign to userChoice
	var checkChoice = function() {
		if (document.getElementById('weapon0').checked) {
			userChoice = "rock" }
		if (document.getElementById('weapon1').checked) {
			userChoice = "paper" }
		if (document.getElementById('weapon2').checked) {
			userChoice = "scissors" }
		if (document.getElementById('weapon3').checked) {
			userChoice = "lizard" }
		if (document.getElementById('weapon4').checked) {
			userChoice = "spock"
		} else { document.getElementById("result").innerHTML = "You forgot to choose. Sheldon wins by default"
		}
	}
	
	checkChoice();
	

	//computer chooses - using random number generator
	var computerChoice = Math.random();
	
	if (computerChoice <0.21){
		computerChoice = "rock";
	}else if(computerChoice <=0.41){
		computerChoice = "paper";
	}else if(computerChoice <=0.61){
		computerChoice = "scissors";
	}else if(computerChoice <=0.81){
		computerChoice = "lizard";
	}else{
		computerChoice = "spock";
	}
	

	var win = "<span>You win!</span>";				
	var lose = "<span>Sheldon wins!</span>";

	//comparison function
	var compare = function (choice1, choice2) {
		
		//IF both choices the same
		if (choice1 == choice2) { 
			return ("The result is a tie!");
		}
		
		
		//IF user chooses ROCK
		if (choice1 == "rock") {
			if (choice2 == "scissors") {
				w++;
				return (win + "Rock crushes scissors");
			}
			if (choice2 == "lizard") {
				w++;
				return (win + "Rock crushes lizard");
			} 
			if (choice2 == "spock") {
				l++;
				return (lose + "Spock vaporises rock");
				
			}
			if (choice2 == "paper") {
				l++;
				return (lose + "Paper covers rock");
			}
		}
		
		//IF user chooses PAPER
		if (choice1 == "paper") {
			if (choice2 == "rock") {
				w++;
				return (win+"Paper covers rock");
			}
			if (choice2 == "spock") {
				w++;
				return (win+"Paper disproves Spock");
			} 
			if (choice2 == "scissors") {
				l++;
				return (lose+"Scissors cuts paper");
			}
			if (choice2 == "lizard") {
				l++;
				return (lose+"Lizard eats paper");
			}
		}
		
		//IF user chooses SCISSORS
		if (choice1 == "scissors") {
			if (choice2 == "paper") {
				w++;
				return (win+"Scissors cuts paper");
			}
			if (choice2 == "lizard") {
				w++;
				return (win+"Scissors decapitates lizard");
			} 
			if (choice2 == "rock") {
				l++;
				return (lose+"Rock crushes scissors");
			}
			if (choice2 == "spock") {
				l++;
				return (lose+"Spock smashes scissors");
			}
		}
	
		//IF user chooses LIZARD
		if (choice1 == "lizard") {
			if (choice2 == "spock") {
				w++;
				return (win+"Lizard poisons Spock");
			}
			if (choice2 == "paper") {
				w++;
				return (win+"Lizard eats paper");
			} 
			if (choice2 == "rock") {
				l++;
				return (lose+"Rock crushes lizard");
			}
			if (choice2 == "scissors") {
				l++;
				return (lose+"Scissors decapitates lizard");
			}
		}
		
		//IF user chooses SPOCK
		if (choice1 == "spock") {
			if (choice2 == "rock") {
				w++;
				return (win+"Spock vaporises rock");
			}
			if (choice2 == "scissors") {
				w++;
				return (win+"Spock smashes scissors");
			} 
			if (choice2 == "paper") {
				l++;
				return (lose+"Paper disproves Spock");
			}
			if (choice2 == "lizard") {
				l++;
				return (lose+"Lizard poisons Spock");
			}
		}
	
	};
	
	// Loop through images
	var changePics = function()
	{
		if (p < 6) {
			p++;
		}
		else {
			p = 1;
		}
	}
	
	
	// compare results, print result to page, if best of x equals w or l then direct to page
	var result = function() 
	{
		document.getElementById('result').innerHTML = compare(userChoice, computerChoice);
		document.getElementById('score').innerHTML = "<div>Your Score: <span>" + w + "</span></div><div>Sheldon: <span>" + l +"</span></div>";
		if (w == gameLength) {
			winPage();
		}
		if (l == gameLength) {
			losePage();
		}
	}
	
	result();
	changePics();
	

};

*/

jQuery(document).ready(function($){
	$('.rpsls-buttons button').click(function(){
		var data = {
			action: 'rpsls_start',
			game: $(this).attr("id").substr(5),
			chk: rpsls.ajaxnonce,

		};
		$.post(rpsls.ajaxurl, data, function(r){
			console.log(r);
			$('#rpsls-init').fadeOut();
			$('#game h2').html(r.data.msg);
			$('#weapons').html(r.data.weapons);
			$('#game #response #choices').html("");
			$('#game #response #result').html("");
			$('#response').after(r.data.scoreboard);
		});
	});

	$('#weapons').on("click","img", function(){
		var data = {
			action: 'rpsls_turn',
			choice: $(this).attr("id"),
			chk: rpsls.ajaxnonce,
		};
		$.post(rpsls.ajaxurl, data, function(r){
			$('#game #response #choices').html('You chose: <strong>' + r.data.player + '</strong> & Sheldon chose: <strong>' + r.data.sheldon + '</strong>');
			$('#game #response #result').html(r.data.msg);
			if(r.data.reset) {
				$('#game h2').html(r.data.reset);
				$('#weapons').children('li').each(function(){
					$(this).fadeOut(function(){
						$(this).remove();
					})
				});
				$('#rpsls-init').fadeIn();
				$('.scoreboard #player-score').html(r.data.player_score);
				$('.scoreboard #comp-score').html(r.data.computer_score);
				$('.scoreboard #turns').html(r.data.info.go);
				$('.scoreboard').delay(2500).fadeOut(5000,function(){
					$(this).remove();
				});
			} else {
				$('#weapons').html(r.data.weapons);
				$('.scoreboard #player-score').html(r.data.player_score);
				$('.scoreboard #comp-score').html(r.data.computer_score);
				$('.scoreboard #turns').html(r.data.info.go);
			}
			
		});
		
	});
});

