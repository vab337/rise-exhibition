var zindex = 10;
const cubes = document.getElementsByClassName("cube");
const container = document.getElementById("container");
const tops = document.getElementsByClassName("top");
const sides = document.getElementsByClassName("side");
var cubeChosen = 0; 



var cols = 3;
var rows = 3;
var layers = 3;
var cubeW = 300;
var cubesNumber = cols*rows*layers;


for (var i=0; i<27; i++) {
  const cube = document.createElement("div");
  cube.className = "cube";
  cube.id = "item" + i;
  container.appendChild(cube);
  cube.setAttribute("style", "--j:"+i);


  //create div that hold the sides 
  const sidescontainer = document.createElement("div");
  sidescontainer.className = "sidescontainer";

  cube.appendChild(sidescontainer);

  //create top side
  const top = document.createElement("div");
  top.className = "top";
  top.id = "top" + i;
  cube.appendChild(top);

  //create sides
  for(var j=0; j<4;j++) {
    const side = document.createElement("span");
    side.className = "side";

    sidescontainer.appendChild(side);
    side.setAttribute("style", "--i:"+j);
  }
}


//CREATE GRID & POSITION CUBES
var gridArr = []

for (var i=0; i<cols; i++) {
  for(var j=0; j<rows; j++) {
    for (var k=0; k<layers; k++) {
      var xpos = i*cubeW;
      var ypos = j*cubeW;
      var zpos = k*(cubeW);
      var index = i + j*cols + k*cols*rows; 
      gridArr[index] = new Array(xpos,zpos,ypos);
    }
  }
}

for (var j=0; j<cubes.length; j++) {
    
    var x = Math.floor(gridArr[j][0]);
    var y = Math.floor(gridArr[j][1]);
    var z = Math.floor(gridArr[j][2]);

    cubes[j].style.width = cubeW + "px";
    cubes[j].style.height = cubeW + "px";
    cubes[j].style.left = x  + "px";
    cubes[j].style.top = y  + "px";
    cubes[j].style.transform = "translateZ(" + z + "px)";

    tops[j].style.width = cubeW + "px";
    tops[j].style.height = cubeW + "px";
    tops[j].style.transform = "rotateX(90deg) translateZ(calc(" + cubeW + "px" + "/2))";

    const item = tops[j].parentElement;
    item.style.height = cubeW + "px";
    const itemsides = item.querySelectorAll("div>span");
    for (var i=0; i<itemsides.length; i++) {
      itemsides[i].style.transform = "rotateY(calc(90deg*var(--i))) translateZ(calc(" + (cubeW) +"px" + "/2))";
    }
  }
//END OF CREATING GRID 

// ROTATE
document.getElementById("rotate").addEventListener("click", rotateScene);
var isRotating = false;

function rotateScene() {
  if(isRotating == false) {
  container.classList.add("animator");
  isRotating = true;
} else {
  container.classList.remove("animator");
  isRotating = false;
}
}





//ORBIT CONTROL

var lastMouseX = 0,
	lastMouseY = 0;
var rotX = 0,
	rotY = 0;

$(document).on("mousedown", function(ev) {
	lastMouseX = ev.clientX;
	lastMouseY = ev.clientY;
	$(document).on("mousemove", mouseMoved);
});
$(document).on("mouseup", function() {
	$(document).off("mousemove", mouseMoved);
});

function mouseMoved(ev) {
	var deltaX = ev.pageX - lastMouseX;
	var deltaY = ev.pageY - lastMouseY;

	lastMouseX = ev.pageX;
	lastMouseY = ev.pageY;

	rotY -= deltaX * -0.1;
	rotX += deltaY * -0.1;

	$("#container").css("transform", "rotateX( " + rotX + "deg) rotateY(" + rotY + "deg)");
  console.log(rotX, rotY);
}

//HIDE CONTROLS
document.getElementById("hidecontrols").addEventListener("click", hideControls);
var controlsHidden = false;

function hideControls() {
  if(controlsHidden == false) {
    document.getElementById("inputscontainer").classList.add("controlshidden");
    controlsHidden = true;
  } else {
    document.getElementById("inputscontainer").classList.remove("controlshidden");
    controlsHidden = false;

  }
}

//HIDE GRID
document.getElementById("showgrid").addEventListener("click", showGrid);
var gridHidden = false;

function showGrid() {

  if(gridHidden == false) {
    for(var s =0; s<sides.length; s++) {
    sides[s].classList.add("gridShown");
  }
    gridHidden = true;
  } else {
    for(var x =0; x<sides.length; x++) {
      sides[x].classList.remove("gridShown");
    }
    gridHidden = false;

  }
}


//create NUMBER BUTTONS 

//create buttons container
for (var b = 0; b < layers ; b++) {
  const buttonGridContainer = document.createElement("div");
  buttonGridContainer.classList.add('button-grid-container');
  buttonGridContainer.id = "buttonGridContainer" + b;
  // buttonGridContainer.textContent = "Layer "+ (b+1);
  const allButtonsContainer = document.getElementById('allButtons');
  allButtonsContainer.appendChild(buttonGridContainer);
}

// Function to create a button element with a given text
function createButton(text) {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
}

// Create 80 buttons and distribute them into 4 divs
const buttonCount = cubesNumber;
const divCount = layers;
const buttonsPerDiv = buttonCount / divCount;

for (let i = 0; i < buttonCount; i++) {
  const button = createButton(i.toString());
  const divIndex = Math.floor(i / buttonsPerDiv); // Distribute buttons equally to 4 divs
  const div = document.getElementById('buttonGridContainer'+divIndex);
  div.appendChild(button);

  button.id = "button" + i;
  button.classList.add("gridButton");
}

const gridButtons = document.getElementsByClassName("gridButton");
var gridNum = 0;

for (let i = 0; i < gridButtons.length; i++) {
  gridButtons[i].addEventListener("click", gridChosen);
  gridButtons[i].addEventListener("mouseover", gridHover);
  gridButtons[i].addEventListener("mouseout", gridHoverEnd);
} 


//BUTTONS EVENT
function gridChosen() {
  gridNum = parseInt(this.id.substr(6));
  cubeChosen = gridNum;

    for (var g = 0; g <gridButtons.length; g++) {
    gridButtons[g].classList.remove('active-button');
    gridButtons[gridNum].classList.add('active-button');
  }
  randomReplaceColor();
};

function gridHover() {
  gridNum = parseInt(this.id.substr(6));
  for (var g = 0; g <gridButtons.length; g++) {
    const itemsides = cubes[gridNum].querySelectorAll("div>span");  
    for (var b = 0; b <4; b++) {
      itemsides[b].classList.add('grid-hover');
    }
  }
}


function gridHoverEnd() {
   gridNum = parseInt(this.id.substr(6));
  for (var g = 0; g <gridButtons.length; g++) {
    const itemsides = cubes[gridNum].querySelectorAll("div>span");    
    for (var b = 0; b <4; b++) {
    itemsides[b].classList.remove('grid-hover');
    }
  }
}


//SIDE input options
for (var t = 0; t < 4 ; t++) {
  const sideButton = document.createElement("button");
  sideButton.className = "sideButton";
  sideButton.id = "sideButton" + t;
  sideButton.innerText = "side" + t ;
  sideButton.addEventListener("click", sideChosen);
  sideButton.addEventListener("mouseover", sideHover);
  sideButton.addEventListener("mouseout", sideHoverEnd);
  document.getElementById("sidecontainer").appendChild(sideButton);
  }
const sideButtons = document.getElementsByClassName("sideButton");

var sideNumber = 0;

function sideChosen() {
   sideNumber = parseInt(this.id.substr(10));
   for (var g = 0; g <sideButtons.length; g++) {
    sideButtons[g].classList.remove('active-button');
    sideButtons[sideNumber].classList.add('active-button');
  }
}

function sideHover() {
  sideNumber = parseInt(this.id.substr(10));
  for (var a = 0; a < cubes.length; a++) {
  const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    for (var b = 0; b <4; b++) {
      itemsides[sideNumber].classList.add('grid-hover');
    }
  }
}



function sideHoverEnd() {
  sideNumber = parseInt(this.id.substr(10));
  for (var a = 0; a < cubes.length; a++) {
  const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    for (var b = 0; b <4; b++) {
      itemsides[sideNumber].classList.remove('grid-hover');
    }
  }
}

const topButton = document.createElement("button");
topButton.className = "topButton";
topButton.id = "topButton";
topButton.innerText = "top";
topButton.addEventListener("click", topChosen);
document.getElementById("sidecontainer").appendChild(topButton);


var topChoose = false;
function topChosen() {
  topButton.classList.add('active-button');
  topChoose = true;
}


//text input
const textinput1 = document.getElementById("textinput1");
const textinput2 = document.getElementById("textinput2");
const textinput3 = document.getElementById("textinput3");
var textInputs = document.getElementsByClassName("textInput");
textinput1.addEventListener("change",replaceText);
const textsubmit = document.getElementById("textsubmit");



function replaceText() {
  for (var a = 0; a < cubes.length; a++) {
    const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    for (var b = 0; b < 4; b++) {
    itemsides[sideNumber].classList.add("header");
    itemsides[sideNumber].innerText = textinput1.value;
  };
}
}



//IMG Input
const photoOps = ["Closed box","Open box"];
for (var p = 0; p < 2 ; p++) {
  const photoOption = document.createElement("button");
  photoOption.className = "photoOption";
  photoOption.id = "photoOption" + p;
  photoOption.innerText = photoOps[p];
  photoOption.addEventListener("click", photoOpChosen);
  document.getElementById("photoinputcontainer").appendChild(photoOption);
  }

var photoOpNumber = 0;
function photoOpChosen() {
  photoOpNumber = parseInt(this.id.substr(11));
}

window.addEventListener('load', function () {
  document.querySelector('input[type="file"]').addEventListener('change', function () {
    if (this.files) {
      if (topChoose) {
        tops[cubeChosen].style.backgroundImage="url("+ URL.createObjectURL(this.files[0]); + ")";
        this.value = '';
        topChoose=false;
      } else {
      const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
      for (var b = 0; b<4; b++) {
      itemsides[sideNumber].style.backgroundImage="url("+ URL.createObjectURL(this.files[0]); + ")";
      this.value = '';
      }
    }
  }
  });
});


//COLOR Input
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const color4 = document.getElementById("color4");
const color5 = document.getElementById("color5");
const colorinputcontainer = document.getElementById("colorinputcontainer");

var colorButtons = colorinputcontainer.querySelectorAll("button");
colorButtons.forEach(colorBtnfunction)



function colorBtnfunction(item) {
  item.addEventListener("click", () => {
    const computedStyle = window.getComputedStyle(item);
    const background = computedStyle.background;
    replaceColor(background);
  });
}

function replaceColor(background) {
  for (var a = 0; a < cubes.length; a++) {
    const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    for (var b = 0; b < 4; b++) {
    itemsides[sideNumber].style.background = background;

  };
}
}

function randomReplaceColor() {
  for (var a = 0; a < cubes.length; a++) {
    const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    tops[cubeChosen].classList.add('glass-effect');

    for (var b = 0; b < 4; b++) {
        itemsides[b].classList.add('glass-effect');
  };
}
}