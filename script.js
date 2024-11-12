document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const playerChoiceDisplay = document.querySelector("#player-choice span");
    const computerChoiceDisplay = document.querySelector("#computer-choice span");
    const winnerDisplay = document.querySelector("#winner span");

    const playerVideoContainer = document.querySelector("#player-video-container");
    const computerVideoContainer = document.querySelector("#computer-video-container");

    const playerScoreDisplay = document.querySelector("#player-score");
    const computerScoreDisplay = document.querySelector("#computer-score");

    const winVideoOverlay = document.querySelector("#win-video-overlay");
    const winVideo = document.querySelector("#win-video");
    const winnerText = document.querySelector("#winner-text");

    const options = ["Piedra", "Papel", "Tijera"];
    let playerScore = 0;
    let computerScore = 0;

    // Videos
    let playerLoseVideos = [
        "loseplayer/lose1.mp4", "loseplayer/lose2.mp4", "loseplayer/lose3.mp4", "loseplayer/lose4.mp4", 
        "loseplayer/lose5.mp4", "loseplayer/lose6.mp4", "loseplayer/lose7.mp4", "loseplayer/lose8.mp4", 
        "loseplayer/lose9.mp4", "loseplayer/lose10.mp4"
    ];

    let computerLoseVideos = [
        "losecomputer/computer_lose1.mp4", "losecomputer/computer_lose2.mp4", "losecomputer/computer_lose3.mp4", 
        "losecomputer/computer_lose4.mp4", "losecomputer/computer_lose5.mp4", "losecomputer/computer_lose6.mp4", 
        "losecomputer/computer_lose7.mp4", "losecomputer/computer_lose8.mp4", "losecomputer/computer_lose9.mp4", 
        "losecomputer/computer_lose10.mp4"
    ];

    let playerWinVideos = [
        "winplayer/win1.mp4", "winplayer/win2.mp4", "winplayer/win3.mp4", "winplayer/win4.mp4", 
        "winplayer/win5.mp4", "winplayer/win6.mp4", "winplayer/win7.mp4", "winplayer/win8.mp4", 
        "winplayer/win9.mp4", "winplayer/win10.mp4"
    ];

    let computerWinVideos = [
        "wincomputer/computer_win1.mp4", "wincomputer/computer_win2.mp4", "wincomputer/computer_win3.mp4", 
        "wincomputer/computer_win4.mp4", "wincomputer/computer_win5.mp4", "wincomputer/computer_win6.mp4", 
        "wincomputer/computer_win7.mp4", "wincomputer/computer_win8.mp4", "wincomputer/computer_win9.mp4", 
        "wincomputer/computer_win10.mp4"
    ];

    let drawVideos = [
        "draw/draw.mp4", "draw/draw.mp4"
    ];

    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            const playerChoice = choice.getAttribute("data-choice");
            const computerChoice = options[Math.floor(Math.random() * options.length)];
            const result = getWinner(playerChoice, computerChoice);

            playerChoiceDisplay.textContent = playerChoice;
            computerChoiceDisplay.textContent = computerChoice;
            winnerDisplay.textContent = result;

            updateResult(result);

            if (playerScore === 10 || computerScore === 10) {
                showWinOverlay(result);
            }
        });
    });

    function getWinner(player, computer) {
        if (player === computer) {
            return "¡Empate!";
        }
        if (
            (player === "Piedra" && computer === "Tijera") ||
            (player === "Papel" && computer === "Piedra") ||
            (player === "Tijera" && computer === "Papel")
        ) {
            playerScore++;
            playerScoreDisplay.textContent = `Jugador: ${playerScore}`;
            return "¡Ganaste!";
        }
        computerScore++;
        computerScoreDisplay.textContent = `Computador: ${computerScore}`;
        return "¡Perdiste!";
    }

    function updateResult(result) {
        // Limpiar los contenedores de video
        playerVideoContainer.innerHTML = "";
        computerVideoContainer.innerHTML = "";

        if (result === "¡Ganaste!") {
            playerVideoContainer.innerHTML = `<video autoplay loop><source src="${getRandomFromArray(playerWinVideos)}" type="video/mp4">Tu navegador no soporta el video.</video>`;
            computerVideoContainer.innerHTML = `<video autoplay loop><source src="${getRandomFromArray(computerLoseVideos)}" type="video/mp4">Tu navegador no soporta el video.</video>`;
        } else if (result === "¡Perdiste!") {
            playerVideoContainer.innerHTML = `<video autoplay loop><source src="${getRandomFromArray(playerLoseVideos)}" type="video/mp4">Tu navegador no soporta el video.</video>`;
            computerVideoContainer.innerHTML = `<video autoplay loop><source src="${getRandomFromArray(computerWinVideos)}" type="video/mp4">Tu navegador no soporta el video.</video>`;
        } else if (result === "¡Empate!") {
            playerVideoContainer.innerHTML = `<video autoplay loop><source src="${getRandomFromArray(drawVideos)}" type="video/mp4">Tu navegador no soporta el video.</video>`;
            computerVideoContainer.innerHTML = `<video autoplay loop><source src="${getRandomFromArray(drawVideos)}" type="video/mp4">Tu navegador no soporta el video.</video>`;
        }
    }

    function getRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function showWinOverlay(result) {
        winVideoOverlay.style.display = "flex";
        if (result === "¡Ganaste!") {
            winnerText.textContent = "¡Tú Ganaste!";
            winVideo.src = "winplayer/win1.mp4";
        } else {
            winnerText.textContent = "¡El Computador Ganó!";
            winVideo.src = "wincomputer/computer_win1.mp4";
        }

        setTimeout(() => {
            // Detener el video y audio cuando desaparezca el overlay
            pauseWinVideo();
            // Reiniciar el juego
            playerScore = 0;
            computerScore = 0;
            playerScoreDisplay.textContent = `Jugador: ${playerScore}`;
            computerScoreDisplay.textContent = `Computador: ${computerScore}`;
            winVideoOverlay.style.display = "none";
        }, 5000);
    }

    function pauseWinVideo() {
        winVideo.pause(); // Pausar el video
        winVideo.currentTime = 0; // Reiniciar el tiempo del video
    }
});
