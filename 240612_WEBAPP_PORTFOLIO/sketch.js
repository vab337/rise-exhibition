const cubes = document.getElementsByClassName("cube");
const container = document.getElementById("container");
const tops = document.getElementsByClassName("top");
const bottoms = document.getElementsByClassName("bottom");
const sides = document.getElementsByClassName("side");
var cubeChosen = 0; 


var cols = 3;
var rows = 3;
var layers = 3;
var cubeW = 150;
var cubesNumber = cols*rows*layers;


for (var i=0; i<cubesNumber; i++) {
  const cube = document.createElement("div");
  cube.className = "cube";
  cube.id = "item" + i;
  container.appendChild(cube);
  cube.setAttribute("style", "--j:"+i);

  //create top side
  const top = document.createElement("div");
  top.className = "top";
  top.id = "top" + i;
  cube.appendChild(top);
  top.addEventListener('mouseover', function() {
    changeAllSidesColor(this, '#ADD8E680');
  });
  top.addEventListener('mouseout', function() {
    changeAllSidesColor(this, '');
  });

   //create top side
  const bottom = document.createElement("div");
  bottom.className = "bottom";
  bottom.id = "bottom" + i;
  cube.appendChild(bottom);
  bottom.addEventListener('mouseover', function() {
    changeAllSidesColor(this, '#ADD8E680');
  });
  bottom.addEventListener('mouseout', function() {
    changeAllSidesColor(this, '');
  });


  //create sides
  for(var j=0; j<4;j++) {
    const side = document.createElement("div");
    side.className = "side";

    cube.appendChild(side);
    side.setAttribute("style", "--i:"+j);

     // Add hover effect
     side.addEventListener('mouseover', function() {
      changeAllSidesColor(this, '#ADD8E680');
    });
    side.addEventListener('mouseout', function() {
      changeAllSidesColor(this, '');
    });
  }
}


function changeAllSidesColor(element, color) {
  const sides = element.parentElement.children;
  for (let k = 0; k < sides.length; k++) {
    sides[k].style.backgroundColor = color;
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

    bottoms[j].style.width = cubeW + "px";
    bottoms[j].style.height = cubeW + "px";
    bottoms[j].style.transform = "rotateX(90deg) translateZ(calc(" + cubeW + "px" + "/(-2))";

    

    const item = tops[j].parentElement;
    item.style.height = cubeW + "px";
    const itemsides = item.querySelectorAll("div.side");
    for (var i=0; i<itemsides.length; i++) {
      itemsides[i].style.transform = "rotateY(calc(90deg*var(--i))) translateZ(calc(" + (cubeW) +"px" + "/2))";
    }
  }

  for(var s =0; s<sides.length; s++) {
    sides[s].classList.add("gridShown");
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


//HIDE GRID
const showGridBtn = document.getElementById("showGrid");
showGridBtn.addEventListener("click", showGrid);


function showGrid() {
    for(var s =0; s<sides.length; s++) {
    sides[s].classList.toggle("gridShown");
    
  }
  if (showGridBtn.innerText === 'Show Grid') {
    showGridBtn.innerText = 'Hide Grid';
  } else {
    showGridBtn.innerText = 'Show Grid';
  }
}

//CHOOSE CUBE TO EDIT

const cubeChosenState = document.getElementById('cubeChosenState');

for (let i = 0; i < cubes.length; i++) {
  const sides = cubes[i].children;
  
  for( let s = 0; s < sides.length; s++){ 
    sides[s].addEventListener('click', function() {
    cubeChosen = parseInt(this.parentNode.id.substr(4));
    cubeChosenState.innerText = "Cube " + cubeChosen + " selected";
    addColortoSides();
    for (var g = 0; g <sideButtons.length; g++) {
      sideButtons[g].classList.remove('active-button');  }
  });
}
}




//SIDE input options
for (var t = 0; t < 6; t++) {
  const sideButton = document.createElement("button");
  sideButton.className = "sideButton";
  sideButton.id = "sideButton" + t ;
  sideButton.innerText = "Side " + (t+1);
  sideButton.addEventListener("click", sideChosen);
  sideButton.addEventListener("mouseover", sideHover);
  sideButton.addEventListener("mouseout", sideHoverEnd);
  document.getElementById("sideButtonContainer").appendChild(sideButton);
  }


const sideButtons = document.getElementsByClassName("sideButton");

var sideNumber = 0;

function sideChosen() {
   sideNumber = parseInt(this.id.substr(10));
   console.log(this.id + "..." + sideNumber);

    for (var g = 0; g <sideButtons.length; g++) {
      sideButtons[g].classList.remove('active-button');
      sideButtons[sideNumber].classList.add('active-button');
  }
  const itemsides = cubes[cubeChosen].children;
  for (var b = 0; b <6; b++) {
    itemsides[sideNumber].classList.add('grid-hover');
  }

}

function sideHover() {
  sideNumber = parseInt(this.id.substr(10));
  for (var a = 0; a < cubes.length; a++) {
  const itemsides = cubes[cubeChosen].querySelectorAll("div");
    for (var b = 0; b <6; b++) {
      itemsides[sideNumber].classList.add('grid-hover');
    }
  }
}


function sideHoverEnd() {
  sideNumber = parseInt(this.id.substr(10));
  for (var a = 0; a < cubes.length; a++) {
  const itemsides = cubes[cubeChosen].querySelectorAll("div");
    for (var b = 0; b <4; b++) {
      itemsides[sideNumber].classList.remove('grid-hover');
    }
  }
}


function insertText() {
  const itemsides = cubes[cubeChosen].children;
  const text = document.createElement('div');
  text.classList.add('gradient-text');
  text.innerText = textInput.toString();
    // Remove all existing children of the target side
    while (itemsides[sideNumber].firstChild) {
      itemsides[sideNumber].removeChild(itemsides[sideNumber].firstChild);
    }
  
  console.log(itemsides[sideNumber]);
  itemsides[sideNumber].appendChild(text);
  sideNumber = 0;
}




//ADD and CLEAR COLORS

function addColortoSides() {
  const itemfaces = cubes[cubeChosen].children;
  for (var b = 0; b < itemfaces.length; b++) {
    itemfaces[b].classList.add('glass-effect');
  };
}


document.getElementById('clear').addEventListener('click',clearCube);


function clearCube() {
  const itemfaces = cubes[cubeChosen].children;
  for (var b = 0; b < itemfaces.length; b++) {
    itemfaces[b].classList.remove('glass-effect');
    console.log(itemfaces[b].children);
    for (let c = 0; c < itemfaces[b].children.length; c++) {
      itemfaces[b].children[c].innerText = '';
    }  };
}



//KEYBOARD 
const keysLayout = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

const keyboard = document.getElementById('keyboard');
var textInput = '0';

keysLayout.forEach(key => {
  const keyElement = document.createElement('div');
  keyElement.classList.add('key');
  keyElement.textContent = key;
  keyElement.addEventListener('click', () => {
    textInput = key;
    insertText();
  });
  keyboard.appendChild(keyElement);
});



//COLOR Input
document.addEventListener('DOMContentLoaded', () => {
  const colorButtons = document.querySelectorAll("#bgcolorinputcontainer button");
  const uibackground = document.getElementById('uibackground');

  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const background = window.getComputedStyle(button).background;
      uibackground.style.background = background;
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const colorButtons = document.querySelectorAll("#textcolorinputcontainer button");
  const allTexts = document.getElementsByClassName('gradient-text');

  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newbackgroundImage = window.getComputedStyle(button).backgroundImage;
      for (var j=0; j<allTexts.length; j++) {
        allTexts.style.backgroundImage = newbackgroundImage;
      }
    });
  });
});


//ROTATE MODES
const rotate0 = document.getElementById("rotate0");
const rotate1 = document.getElementById("rotate1");
const rotate2 = document.getElementById("rotate2");
var rotateModes = document.getElementsByClassName('rotateMode');

for (var r = 0; r<rotateModes.length; r++) {
  rotateModes[r].addEventListener('click', chooseRotateMode(r));
}

function chooseRotateMode(index) {
  return function() {
  container.classList = [];
  container.classList.add('animator' + index);
  }
}
//CAMERA VIEWS
// document.getElementById('view1').addEventListener('click', () => {
//   container.classList = [];
//   container.style.transform = '';
//   container.classList.add('topdownview');
// })

// document.getElementById('view2').addEventListener('click', () => {
//   container.classList = [];
//   container.style.transform = '';
//   container.classList.add('isoview');
// })


