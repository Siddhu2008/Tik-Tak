console.log("Welcome to Tic Tac Toe");

let music = new Audio("backg.mp3");
music.loop = true; // Makes background music loop continuously
let audioTurn = new Audio("music.mp3");
let gameover = new Audio("game over.mp3");

let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let boxes = document.getElementsByClassName('box');
    let wins = [
        [0, 1, 2, 5, 15, 0],
        [3, 4, 5, 5, 50, 0],
        [6, 7, 8, 5, 85, 0],
        [0, 3, 6, -35, 50, 90],
        [1, 4, 7, 5, 50, 90],
        [2, 5, 8, 45, 50, 90],
        [0, 4, 8, 5, 50, 45],
        [2, 4, 6, 5, 50, -45],
    ];

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && 
            (boxtext[e[0]].innerText !== "")) {
            
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Wins!";
            isgameover = true;
            
            // Highlight winning combination
            boxes[e[0]].classList.add('winning-box');
            boxes[e[1]].classList.add('winning-box');
            boxes[e[2]].classList.add('winning-box');

            let imgBox = document.querySelector('.imgbox');
            let img = imgBox.getElementsByTagName('img')[0];
            img.style.display = "block";
            img.style.width = "120px";
            
            gameover.play();
            music.pause();
        }
    });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            boxtext.classList.add(turn === 'X' ? 'animate-x' : 'animate-o');
            
            audioTurn.play();
            music.play().catch(() => {}); // Prevents browser auto-play block errors
            
            checkWin();
            
            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add OnClick Listener to Reset Button
let resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
        element.classList.remove('animate-x', 'animate-o');
    });

    Array.from(boxes).forEach(element => {
        element.classList.remove('winning-box');
    });

    turn = "X";
    isgameover = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    
    let img = document.querySelector('.imgbox').getElementsByTagName('img')[0];
    img.style.display = "none";
    img.style.width = "0px";
    
    music.currentTime = 0;
    music.play().catch(() => {});
});
