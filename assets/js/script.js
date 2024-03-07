var currentQuestionIndex= 0;
var timeLeft= questions.length * 15;
var timerId;

var questionsEl = document.getElementById('questionnaire');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var userNameEl = document.getElementById('user-name');
var feedbackEl = document.getElementById('feedback');

var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/wrong.wav');


 function startQuiz(){
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = timeLeft;

    getQuestion();
}

function getQuestion(){
    var currentQuestion =questions[currentQuestionIndex];
    var titleEl = document.getElementById('questions-title');
     titleEl.textContent=currentQuestion.question;
    
     choicesEl.innerHTML='';

     for(var i=0; i<currentQuestion.choices.length; i++){
    var choice = currentQuestion.choices[i];
    var choiceSelection= document.createElement('button');
    choiceSelection.setAttribute('class', 'choice');
    choiceSelection.setAttribute('value' , choice);

    choiceSelection.textContent = i + 1 + '.' + choice;

    choicesEl.appendChild(choiceSelection);


}
}

function questionClick(event){
    var buttonEl = event.target;
    var respond = feedbackEl.textContent;

    if(!buttonEl.matches('.choice')){
        return;
    }

    if(buttonEl.value !==questions[currentQuestionIndex].answer){

        timeLeft -= 15;

        if(timeLeft<0){
            timeLeft=0;
        }

        timerEl.textContent = timeLeft;
        sfxWrong.play();

       respond = 'Nah, Wrong!';
    }else{
        sfxRight.play();

        Respond = 'Right!';
    }

    feedbackEl.setAttribute('class' , 'feedback');
    setTimeout(function (){
        feedbackEl.setAttribute('class' , 'feedback hide');
     }, 1000);

     currentQuestionIndex++;

     if(timeLeft<=0 || currentQuestionIndex === questions.length){
        quizEnd();
     }else {
        getQuestion();
     }


}

function quizEnd(){
    clearInterval(timerId);
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = timeLeft;


    questionsEl.style.display = 'none'
}

function clockTick(){
    timeLeft--;
    timerEl.textContent = timeLeft;

    if(timeLeft<= 0) {
        quizEnd();
    }
}

function saveHighscore(){
    var name = userNameEl.value.trim();

    if(name!== ''){
        var highscores=
        JSON.parse(window.localStorage.getItem('highscores')) || [];

        var newScore= {
            score: timeLeft,
            name: name,
        };

        highscores.push(newScore);
        window.localStorage.setItem('highschores' ,JSON.stringify(highscores));

        window.location.href = 'highscores.html';
    }
}

function checkForEnter(event){
    if(event.key === 'Enter'){
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

choicesEl.onclick = questionClick;

userNameEl.onkeyup = checkForEnter;