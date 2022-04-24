//all the questions
let questions = [
    {title: "Commonly used data types do not include what?:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"},
    {title: "An if/ else statement is enclosed within ____.",
    choices: ["quotes", "braces", "parentheses", "brackets"],
        answer: "parentheses"},
    {title: "HTML tag that defines the document, and includes everything?",
    choices: ["<head></head>", "<body></body>", "<title></title>", "<br>"],
    answer: "<body></body>"},
    {title: "What is the tag that is used in order to define a hyperlink, or conect to another page?",
    choices: ["<strong>", "<blockquote>", "<em>", "<a>"],
    answer: "<a>"},
    {title: "FILL IN THE BLANK: CSS stands for ____ Style Sheets.",
    choices: ["Curious", "Concept", "Cascading", "Concave"],
    answer: "Cascading"}];
//All Varables
let time = 59;
let start = document.querySelector("#beginQuiz");
let count = 0;
let points = 0;
let topScoresDiv;
let lastQuestion = false;
const addScoreBtn = document.querySelector("#addScore");
const topScoresBtn = document.querySelector("#topScores");
const scoresDisplay = document.querySelector("#scoresDisplay");
const scoreH1 = document.querySelector("#score");
const startOverScreen = document.querySelector("#startOverDiv");
const restartBtn = document.querySelector("#startOver");
const timerSpan = document.querySelector("#timer");
const begin = document.querySelector("#begin");
const quizSection = document.querySelector("#quizsection");
const yourScoreDiv = document.querySelector("#yourScoreDiv");
start.addEventListener("click", function () {
	begin.style.display = "none";
	quizsection.style.display = "block";
	generateQuestions();
	startOverScreen.style.display = "none";
	let interval = setInterval(function () {
		time--;
		timerSpan.innerHTML = time;
		if (time === 0 || lastQuestion) {
			clearInterval(interval);
			endGame();
		}
	}, 1000);

});
restartBtn.addEventListener("click", function () {
	time = 59;
	count = 0;
	points = 0;
	lastQuestion = true;
	begin.style.display = "block";
	quizSection.style.display = "block";
	startOverScreen.style.display = "none";
	yourScoreDiv.style.display = "none";
});
topScoresBtn.addEventListener("click", function () {
	document.getElementById("topScoresDiv").innerHTML = "";
	let hsList = JSON.parse(localStorage.getItem("Highscore")).highscoreArr || [];
	if (scoresDisplay.style.display === "none") {
		scoresDisplay.style.display = "flex";
		hsList.map(a => {
			let ele = document.createElement("h3");
			let node = document.createTextNode(a);
			ele.appendChild(node);
			document.getElementById("topScoresDiv").appendChild(ele);
		});
	} else {
		scoresDisplay.style.display = "none";
	}
});
function startFunct() {
	yourScoreDiv.style.display = "none";
	scoresDisplay.style.display = "none";
	startOverScreen.style.display = "none";
}
generateQuestions = () => {
	document.getElementById("quizQ").innerHTML = questions[count].title;
	document.getElementById("choiceBt").innerHTML = "";
	questions[count].choices.map((choice, i) => {
		let btn = document.createElement("button");
		let textnode = document.createTextNode(choice);
		document.getElementById("choiceBt").appendChild(btn);
		btn.setAttribute("data", choice);
		btn.setAttribute("answer", questions[count].answer);
		btn.setAttribute("id", `btn${i}`);
		btn.appendChild(textnode);
		document.querySelector(`#btn${i}`).addEventListener("click", function (e) {
			if (e.target.getAttribute("data") === e.target.getAttribute("answer")) {
				answeredRight();
			} else {
				answeredWrong();
			}
		});
	});
};
addScoreBtn.addEventListener("click", function () {
	if (localStorage.getItem("Highscore") === null) {
		localStorage.setItem("Highscore", JSON.stringify({
			highscore: 0,
			highscoreArr: []
		}));
	}
	let input = document.querySelector("#initials").value;
	let score = points + time;
	highscore = JSON.parse(localStorage.getItem("Highscore")).highscore;
	let allscores = JSON.parse(localStorage.getItem("Highscore")).highscoreArr;
	if (score > highscore) {
		highscore = score;
	}
	allscores.push(input + score);
	localStorage.setItem('Highscore', JSON.stringify({
		highscore,
		highscoreArr: allscores
	}));
	startFunct();
});
endGame = () => {
	lastQuestion = true;
	let score = points + time;
	scoreH1.textContent = score;
	quizSection.style.display = "block";
	startOverScreen.style.display = "block";
	yourScoreDiv.style.display = "block";
};
answeredRight = () => {
	alert("Correct! (+15 points)");
	points += 15;
	count++;
	if (count == questions.length) {
		endGame();
	} else {
		generateQuestions();
	}
};
answeredWrong = () => {
	alert("Wrong! (-15 points -10 seconds)");
	points -= 15;
	count++;
	time -= 10;
	if (count == questions.length) {
		endGame();
	} else {
		generateQuestions();
	}
};
