var currentQuestionIndex= 0;
var timeLeft= questions.length * 15;
var timerId;

var questionsEl = document.getElementById('questionnaire');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var userNameEl = document.getElementById('usern-name');
var feedbackEl = document.getElementById('feedback');

var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/wrong.wav');


 function startQuiz(){
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
}

function getQuestion(){
    var currentQuestion =questions[currentQuestionIndex.title];
    var titleEl = document.getElementById('questions');
     titleEl.textContent=currentQuestion.title;
    
     choicesEl.innerHTML='';

     for(var i=0; i<currentQuestion.choices.length; i++){
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

        time -= 15;

        if(time<0){
            time=0;
        }

        timerEl.textContent = time;
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

     if(time<=0 || currentQuestionIndex === questions.length){
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
    finalScoreEl.textContent = time;

    questionsEl.setAttribute('class' , 'hide');
}

