let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset")
let newMsgBtn = document.querySelector(".newgame")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector(".msg")
let game = document.querySelector(".game")
let turn0 = true;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,5,6],
    [6,7,8],
];

const resetGame=()=>{
    turn0 = true;
    enaableAllBtn()
}

boxes.forEach((box) => {

    box.addEventListener("click", () => {
        if(box.innerText === "" && turn0){
            box.innerText = "X";
            
            turn0 = false;
        } else if(box.innerText === "" &&!turn0){
            box.innerText = "O";
            box.classList.add("new")
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
})


const showWinner =(winner)=>{
    disableAllBtn()
    msg.innerText ="Congratulation" + winner + " has won!";
    msgContainer.classList.remove("hide")
}

const enaableAllBtn=()=>{
    for(let box of boxes) { 
        box.disabled = false;
        msgContainer.classList.add("hide");
        box.innerText=""
    
    }
}
const disableAllBtn=()=>{
    for(let box of boxes) { 
        box.disabled = true;}
}

const checkWinner =() => {

    for(let pattern of winPatterns){
       
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
     if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 === pos2 && pos2 === pos3){
           
            showWinner(pos1);
            return;
        }
     }
    }
    
}

resetBtn.addEventListener("click", resetGame)
newMsgBtn.addEventListener("click", resetGame)