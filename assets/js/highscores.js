function getHighScores(){
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    highscores.sort(function(a,b){
        return b.score - a.score;
    });

    for(var i = 0; i<highscores.length; i += 1){

        var list = document.createElement('li');
         list.textContent = highscores[i].initials + ' - ' + highscores[i].score;

        var orderList = document.getElementById('highscores');
        orderList.appendChild(list);

    }
}

function clearHighscore(){
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearHighscore;

getHighScores();