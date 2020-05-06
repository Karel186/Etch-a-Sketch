// Class for created dataype color
class choosingColor{
    constructor(isBlack,isColor,isShader,isEraser){
        this.isBlack =  isBlack;
        this.isColor = isColor;
        this.isShader = isShader;
        this.isEraser = isEraser;
    }
    get getIsBlack(){
        return this.isBlack;
    }
    set setIsBlack(answer){
        this.isBlack=answer;
    }
    get getIsColor(){
        return this.isColor;
    }
    set setIsColor(answer){
        this.isColor=answer;
    }
    get getIsEraser(){
        return this.isEraser;
    }
    set setIsEraser(answer){
        this.isEraser=answer;
    }
    get getIsShader(){
        return this.isShader;
    }
    set setIsShader(answer){
        this.isShader=answer;
    }
}

var btnSize = document.querySelector("#btnSize");
var btnClearAll = document.querySelector('#btnClearAll');
var btnBlack = document.querySelector('#btnBlack');
var btnColor = document.querySelector('#btnColor');
var btnEraser = document.querySelector('#btnEraser');
var btnShader = document.querySelector('#btnShader');
var gridBox;
var initialSizel;

isColor = new choosingColor(true,false,false);


// Initialisation
initialSize = 10;
initialiseGrid(initialSize);



// #################*****Buttons*****#################

// Button listening for changing Grid dimensions
btnSize.addEventListener('click', (e) => {
    numOfGrid = 0;
    while (numOfGrid < 1 || numOfGrid > 100){
        numOfGrid = prompt('Enter the number of grids you want (between 1 and 100)'); 
    }
    initialiseGrid(numOfGrid);
});

// Button to clear all and reset to clean screen
btnClearAll.addEventListener('click', (e) => {
    initialiseGrid(Math.sqrt(gridBox.length));
});

// Button to set highlight color to black
btnBlack.addEventListener('click', (e) => {
    isColor.setIsBlack = true;
    isColor.setIsColor = false;
    isColor.setIsEraser = false;
    isColor.setIsShader = false;
});

// Button to set highlight color to a random color
btnColor.addEventListener('click', (e) => {
    isColor.setIsBlack = false;
    isColor.setIsColor = true;
    isColor.setIsEraser = false;
    isColor.setIsShader = false;
});

// Button to set highlight color to initial color to erase
btnEraser.addEventListener('click', (e) => {
    isColor.setIsBlack = false;
    isColor.setIsColor = false;
    isColor.setIsEraser = true;
    isColor.setIsShader = false;
});

//Button to set highlight color to 10% darker each time
btnShader.addEventListener('click', (e) =>{
    isColor.setIsBlack = false;
    isColor.setIsColor = false;
    isColor.setIsEraser = false;
    isColor.setIsShader = true;
});

//#################**********#################


// Function to listen to each div tag in the Grid
function listenToGrid(){
    gridBox = document.querySelectorAll('.grid_item');
    for (let i = 0; i < gridBox.length; i++){
        gridBox[i].addEventListener("mouseover", function() {
            let highlightColor = 'background-color: ' + randomizeColor(isColor,i);
            gridBox[i].style.cssText = highlightColor;
        });
    }
}

// Function to choose the color based on user input
function randomizeColor(isColor,i){
    let color;
    if (isColor.isColor==true){
         color = randomColor();
    } else if(isColor.isBlack==true){
        color = 'black';
    } else if(isColor.isEraser==true){
        color = 'wheat';
    } else {
        getColor = getComputedStyle(gridBox[i]);
        let backColor = getColor.backgroundColor;
        console.log(backColor);
        let subractColor = backColor.split(",")
        let colorNum = parseInt(subractColor[1]);
        console.log(colorNum);
        colorNum = colorNum - 25.5;
        color = 'rgb(' + colorNum + ',' + colorNum + ',' + colorNum +')';
        console.log(color);
    }
    return color
}

// Function to get random color
function randomColor(){
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor
}

// Creating Grids by adding new 'grid_item' div tags
function ChangingGrid(numOfGrid){
    size = numOfGrid**2
    for (let i=1; i<=size; i++){
        const container = document.querySelector('#grid_container');
        let content = document.createElement('div');
        content.classList.add('grid_item');
        //content.textContent=i;
        container.appendChild(content);
    }
    console.log("Number of Grids created:" + size)
    listenToGrid();
    
}

// Changing dimensions of Main grid and removes all child div tags. Then call 'ChangingGrig' function
function initialiseGrid(num){
    let containerGrid = document.querySelector('#grid_container');
    let styling = 'grid-template-rows: repeat('+ num + ', auto); grid-template-columns: repeat('+ num + ', auto);';
    containerGrid.removeAttribute('style');
    containerGrid.setAttribute('style', styling);
    while (containerGrid.hasChildNodes()){
        containerGrid.removeChild(containerGrid.lastChild);
    }
    ChangingGrid(num);
}

