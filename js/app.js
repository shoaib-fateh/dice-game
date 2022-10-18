var scores, roundScore, activePlayer, gamePlaying;

init();

function nextPlayer ()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-roll").addEventListener("click", function ()
{
    if (gamePlaying)
    {
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "img/dice-" + dice1 + ".bmp";
        document.getElementById("dice-2").src = "img/dice-" + dice2 + ".bmp";

        if (dice1 !== 1 && dice2 !== 21)
        {
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else
        {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function ()
{
    if (gamePlaying)
    {
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector(".finale-score").value;
        var winningScore;

        if (input)
        {
            winningScore = input;
        } else
        {
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore)
        {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!"
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else
        {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init ()
{
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}