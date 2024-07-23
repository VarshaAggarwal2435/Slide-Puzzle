var rows = 3, cols = 3;

var currTile;
var otherTile;

var turns = 0;
var Order = ["2", "4", "8","5", "1", "6","7", "9", "3"];
    
let tile = document.createElement("img");
tile.id = "outputimg";
tile.src = "10.png";
document.getElementById("output").append(tile);

for(let r = 0; r<rows; r++){
    for(let c = 0; c<cols; c++){
        let tile = document.createElement("img");
        tile.src = Order.shift() +".webp";
        tile.id = r.toString()+"-"+c.toString();
        tile.className += tile.id;
            
        tile.addEventListener("click", onClick);
        document.getElementById("board").append(tile);
    }
}


function onClick(){

    currTile = this;
    otherTile = document.getElementById("2-0");
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

        console.log(otherImgid);
        console.log(currImgid);

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}
