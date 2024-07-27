// Initialize number of pieces 3x3
var rows = 3, cols = 3;

// currtile is the tile clicked on and othertile is the black tile always
var currTile;
var otherTile;

var turns = 0;
var Order = ["7", "3", "6", "1", "4", "2", "8", "5", "9"];
var winningOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

//if the start button is not pressed if the start button is pressed it changes to true
var playing = false;

//checks if start button is pressed to start the game
let gameBTN = document.querySelector("button");
gameBTN.addEventListener("click", startGame);

let store;
let check = false;

function startGame(){
    gameBTN.innerText = "RESET GAME";
    gameBTN.addEventListener("click", resetGame); 

    
    //rearranging the tiles
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<cols; c++){
    
            let tile = document.querySelector("img");
            tile.src = Order.shift() +".webp";
            tile.id = r.toString()+"-"+c.toString();
            tile.className = tile.id;

            tile.addEventListener("click",onClick);
            document.getElementById("board").append(tile);

            if(check){
                console.log(check);
                let f = document.querySelector("img");
                f.removeEventListener("click", onClick);
            }
        }
    }

    //adding output image only once at the start and does not need to be added again

    if(!playing){
        // adding output image
        let tile = document.createElement("img");
        tile.id = "outputimg";
        tile.src = "10.png";
        let oo = document.getElementById("output");
        oo.append(tile);
        oo.style.border = "10px solid hotpink";
        playing = true;
    }
}

function onClick(){

    currTile = this;
    otherTile = document.getElementById("0-0");
    if (!otherTile.src.includes("7.webp")) {
        return;
    }
    let curr = currTile.className.split("-");
    let r = parseInt(curr[0]);
    let c = parseInt(curr[1]);

    let other = otherTile.className.split("-");
    let r2 = parseInt(other[0]);
    let c2 = parseInt(other[1]);

    let left = (r == r2) && (c2 == c-1);
    let right = (r == r2) && (c2 == c+1);
    let up = (r == r2-1) && (c2 == c);
    let down = (r == r2+1) && (c2 == c);

    let isAdj = left || right || up || down;

    if(isAdj){
        let currImg = currTile.src;
        let currImgid = currTile.id;
        let otherImg = otherTile.src;
        let otherImgid = otherTile.id;

        currTile.src = otherImg;
        currTile.id = otherImgid;
        otherTile.src = currImg;
        otherTile.id = currImgid;

        if(!check){
            turns += 1;
            document.getElementById("turns").innerText = turns;
        }
        checkOutput();
    }
}

function checkOutput(){
    let count = 0;
    outputOrder = [];

    for(let r = 0; r<rows; r++){
        for(let c = 0; c<cols; c++){

            let imgPos = document.querySelectorAll("img");
            let temp = imgPos[count].src.split("/").pop().split(".")[0];
            outputOrder[count] = temp;
            count++;
        }
    }
    for(let i = 0; i<rows*cols; i++){
        if(outputOrder[i] != winningOrder[i]){
            return;
        }
    }

    let disp = document.getElementById("Won");
    disp.style.backgroundColor = "hotpink";
    disp.textContent = "You DID it !!";
    check = true;
}

function resetGame(){
    Order = ["7", "3", "6","1", "4", "2","8", "5", "9"];
    turns = 0;
    document.getElementById("turns").innerText = turns;
    check = false;
    let disp = document.getElementById("Won");
    disp.textContent = "";
    disp.style.backgroundColor = "black";
    startGame();
}
