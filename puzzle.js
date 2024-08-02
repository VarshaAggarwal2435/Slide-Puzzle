// currtile is the tile clicked on and othertile is the black tile always
var currTile;var otherTile;var turns = 0;var rows;var cols;var Order;var winningOrder;let store;let check = false;
//if the start button is not pressed and if the start button is pressed it changes to true
var playing = false;

let gameBTN = document.querySelector("button");

if(gameBTN.id.includes("1")){
    gameBTN.addEventListener("click", size3);
}
else if(gameBTN.id.includes("2")){
    gameBTN.addEventListener("click", size4);
}
else if(gameBTN.id.includes("3")){
    gameBTN.addEventListener("click", size5);
}

function size3(){
// Initialize number of pieces 3x3
    rows = 3;
    cols = 3;
    Order = ["021", "4", "2", "5", "8", "3", "7", "9", "6"];
    winningOrder = ["021", "2", "3", "4", "5", "6", "7", "8", "9"];
    startGame(1);
}

function size4(){
    // Initialize number of pieces 4x4
        rows = 4;
        cols = 4;
        Order = ["021", "003", "004", "008", "001", "002", "006", "0012", "005", "0014", "0010", "007", "009", 
            "0013", "0011", "0015"];
        winningOrder = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "0010", "0011", "0012", "0013", "0014"
            ,"0015","021"];
        startGame(2);
}

function size5(){
    // Initialize number of pieces 5x5
        rows = 5;
        cols = 5;
        Order = ["021", "03", "06", "01", "04", "02", "08", "05", "09", "011", "013", "017", "014", "07", "022",
            "015", "018", "019", "010", "012", "025", "016", "020", "024", "023"
        ];
        winningOrder = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "010", "011", "012", "013", "014"
            ,"015","016", "017", "018" , "019", "020", "021", "022", "023", "024", "025"
        ];
        startGame(3);
}

function startGame(e){
    gameBTN.innerText = "RESET GAME";
    gameBTN.addEventListener("click", resetGame); 
    
    //rearranging the tiles
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<cols; c++){
    
            let tile = document.querySelector("img");
            tile.src = "pictures\\"+Order.shift() +".jpg";
            tile.id = r.toString()+"-"+c.toString();
            tile.classList = "";
            tile.classList.add(tile.id);
            tile.classList.add(`size${e+2}`);
            tile.addEventListener("click",onClick);
            document.getElementById(`board${e}`).append(tile);
        }
    }

    //adding output image only once at the start and does not need to be added again

    if(!playing){
        // adding output image
        let tile = document.createElement("img");
        tile.id = "outputimg";
        console.log(`pictures\\${10**e}.jpg`);
        tile.src = `pictures\\${10**e}.jpg`;
        let oo = document.getElementById("output");
        oo.prepend(tile);
        oo.style.border = "10px solid hotpink";
        playing = true;
    }
}

function onClick(){

    currTile = this;
    otherTile = document.getElementById("0-0");
    if (!otherTile.src.includes("021.jpg")) {
        return;
    }
    let curr = currTile.className.split("-");
    let r = parseInt(curr[0]);
    let c = parseInt(curr[1][0]);
    console.log(r);
    console.log(c);

    let other = otherTile.className.split("-");
    let r2 = parseInt(other[0]);
    let c2 = parseInt(other[1][0]);

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
    turns = 0;
    document.getElementById("turns").innerText = turns;
    check = false;
    let disp = document.getElementById("Won");
    disp.textContent = "";
    disp.style.backgroundColor = "black";
}       
