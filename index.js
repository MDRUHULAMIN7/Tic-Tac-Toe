let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newMsgBtn = document.querySelector(".newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let turnIndicator = document.querySelector(".turn-indicator");
let turn0 = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  
    [0, 4, 8], [2, 4, 6]              
];


const updateTurn = () => {
    turnIndicator.innerText = `Now Turn: ${turn0 ? "X" : "O"}`;
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const pos1 = boxes[a].innerText;
        const pos2 = boxes[b].innerText;
        const pos3 = boxes[c].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return pos1;
        }
    }
    return null;
};


const showWinner = (winner) => {
    disableAllBtn();
    msg.innerText = `Congratulations, ${winner} has won!`;
    msgContainer.classList.remove("hide");
};


const disableAllBtn = () => {
    boxes.forEach(box => box.disabled = true);
};


const enaableAllBtn = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    msgContainer.classList.add("hide");
};


const computerMove = () => {

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const positions = [a, b, c];

   
        if (checkTwoSame(positions, "O")) return;

     
        if (checkTwoSame(positions, "X")) return;
    }

  
    if (boxes[4].innerText === "") {
        boxes[4].innerText = "O";
        boxes[4].classList.add("new");
        turn0 = true;
        updateTurn();
        checkWinner();
        return;
    }

    const emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    if (randomBox) {
        randomBox.innerText = "O";
        randomBox.classList.add("new");
        turn0 = true;
        updateTurn();
        checkWinner();
    }
};


const checkTwoSame = (positions, symbol) => {
    let count = 0;
    let emptyIndex = null;

    for (let i of positions) {
        if (boxes[i].innerText === symbol) count++;
        if (boxes[i].innerText === "") emptyIndex = i;
    }

    if (count === 2 && emptyIndex !== null) {
        boxes[emptyIndex].innerText = "O";
        boxes[emptyIndex].classList.add("new");
        turn0 = true;
        updateTurn();
        checkWinner();
        return true;
    }
    return false;
};


boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && turn0) {
            box.innerText = "X";
            box.classList.add("new1");
            turn0 = false;
            updateTurn();
            checkWinner();
            setTimeout(computerMove, 500); // Let computer play after a short delay
        }
    });
});


const resetGame = () => {
    enaableAllBtn();
    turn0 = true;
    updateTurn();
};


resetBtn.addEventListener("click", resetGame);
newMsgBtn.addEventListener("click", resetGame);


updateTurn();
