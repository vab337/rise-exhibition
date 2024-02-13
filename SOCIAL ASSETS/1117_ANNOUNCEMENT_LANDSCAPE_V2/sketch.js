const cubes = document.getElementsByClassName("cube");
const container = document.getElementById("container");
const tops = document.getElementsByClassName("top");
const sides = document.getElementsByClassName("side");
var cubeChosen = 0; 



var cols = 10;
var rows = 5;
var layers = 4;
var cubeW = 200;
var cubesNumber = cols*rows*layers;




for (var i=0; i<cubesNumber; i++) {
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
  addColortoSides();
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
  topChoose = false;
  topButton.classList.remove('active-button');
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
  for (var g = 0; g <sideButtons.length; g++) {
    sideButtons[g].classList.remove('active-button');
  }
}


//IMG Input

window.addEventListener('load', function () {
  document.querySelector('input[type="file"]').addEventListener('change', function () {
    if (this.files) {
      if (topChoose) {
        tops[cubeChosen].classList.remove('glass-effect');
        tops[cubeChosen].style.backgroundImage="url("+ URL.createObjectURL(this.files[0]); + ")";
        this.value = '';
        // topChoose=false;
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


//Add and clear colors

function addColortoSides() {
    const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    tops[cubeChosen].classList.add('glass-effect');
    for (var b = 0; b < 4; b++) {
        itemsides[b].classList.add('glass-effect');
  };
}

document.getElementById('clear').addEventListener('click',clearCube);
function clearCube() {
  tops[cubeChosen].style.backgroundImage = 'none';
  tops[cubeChosen].classList.remove('glass-effect');

  const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    for (var b = 0; b < 4; b++) {
        itemsides[b].classList.remove('glass-effect');
        itemsides[b].style.backgroundImage = 'none';
  };
}




//CAMERA VIEWS
document.getElementById('view1').addEventListener('click', () => {
  container.classList = [];
  container.style.transform = '';
  container.classList.add('topdownview');
})

document.getElementById('view2').addEventListener('click', () => {
  container.classList = [];
  container.style.transform = '';
  container.classList.add('isoview');
})



//SCALING 
const scale1 = document.getElementById('scale1');
scale1.addEventListener('click', () => {
  injectScale1();
});


function injectScale1() {
  const itemsides = cubes[cubeChosen].querySelectorAll("div>span");

  if (topChoose) {
  tops[cubeChosen].style.width = (parseFloat(getComputedStyle(tops[cubeChosen]).width) * 2) + 'px'; // Double the width
  tops[cubeChosen].style.height = getComputedStyle(tops[cubeChosen]).height; // Keep the height the same
  tops[cubeChosen].style.zIndex = "9999";
  tops[cubeChosen].classList.add('scaled-face');
  tops[cubeChosen].style.backgroundSize = "cover";
  tops[cubeChosen].style.transform = "rotateX(90deg)  translateZ(calc(" + (cubeW) + "px" + "/2))";
  itemsides[1].classList.remove('glass-effect');
  const nextitemsides = cubes[cubeChosen+1].querySelectorAll("div>span");
  nextitemsides[3].classList.remove('glass-effect');
  }

  else {
  itemsides[sideNumber].style.width = (parseFloat(getComputedStyle(itemsides[sideNumber]).width) * 2) + 'px'; // Double the width
  itemsides[sideNumber].style.height = getComputedStyle(itemsides[sideNumber]).height; // Keep the height the same
  itemsides[sideNumber].style.zIndex = "9999";
  itemsides[sideNumber].classList.add('scaled-face');
  var halfCubeW = cubeW/2 + "px";

  if (sideNumber === 0) {
    itemsides[sideNumber].style.transform = "rotateY(calc(90deg*var(--i))) translateZ(calc(" + (cubeW) +"px" + "/2))";
    const nextitemsides = cubes[cubeChosen+1].querySelectorAll("div>span");
    nextitemsides[sideNumber].classList.remove('glass-effect');
    itemsides[1].classList.remove('glass-effect');
    nextitemsides[3].classList.remove('glass-effect');

  } else if (sideNumber === 1) {
    itemsides[sideNumber].style.transform = "rotateY(calc(90deg*var(--i))) translateX("+ (halfCubeW) + ") translateZ(0)";
    const nextitemsides = cubes[cubeChosen-rows].querySelectorAll("div>span");
    nextitemsides[sideNumber].classList.remove('glass-effect');
    itemsides[2].classList.remove('glass-effect');
    nextitemsides[0].classList.remove('glass-effect');

  } else if (sideNumber === 2) {
    itemsides[sideNumber].style.transform = "rotateY(calc(90deg*var(--i))) translateX("+ cubeW + "px"+ ") translateZ(calc(" + (cubeW+3) +"px" + "/2))";
    const nextitemsides = cubes[cubeChosen-1].querySelectorAll("div>span");
    nextitemsides[sideNumber].classList.remove('glass-effect');
    itemsides[3].classList.remove('glass-effect');
    nextitemsides[1].classList.remove('glass-effect');

  } else if (sideNumber === 3) {
    itemsides[sideNumber].style.transform = "rotateY(calc(90deg*var(--i))) translateX("+ halfCubeW + ") translateZ("+ (cubeW+1) +"px)";
    const nextitemsides = cubes[cubeChosen+rows].querySelectorAll("div>span");
    nextitemsides[sideNumber].classList.remove('glass-effect');
    itemsides[0].classList.remove('glass-effect');
    nextitemsides[2].classList.remove('glass-effect');
  }
}
}

