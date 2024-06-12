const cubes = document.getElementsByClassName("cube");
const container = document.getElementById("container");
const tops = document.getElementsByClassName("top");
const sides = document.getElementsByClassName("side");
var cubeChosen = 0; 


var cols = 3;
var rows = 3;
var layers = 3;
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
  sidescontainer.appendChild(top);
  top.addEventListener('mouseover', function() {
    changeAllSidesColor(this, '#ADD8E680');
  });
  top.addEventListener('mouseout', function() {
    changeAllSidesColor(this, '');
  });


  //create sides
  for(var j=0; j<4;j++) {
    const side = document.createElement("span");
    side.className = "side";

    sidescontainer.appendChild(side);
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

//CHOOSE CUBE TO EDIT

const sidesContainers = document.getElementsByClassName('sidescontainer');

for (let i = 0; i < sidesContainers.length; i++) {
  const sides = sidesContainers[i].children;
  for( let s = 0; s < sides.length; s++){ 
    sides[s].addEventListener('click', function() {
    const sidesContainerArray =  Array.from(sidesContainers);
    const order = sidesContainerArray.indexOf(this.parentNode);
    cubeChosen = order;
    addColortoSides();
  });
}
}



//SIDE input options
for (var t = 0; t < 4; t++) {
  const sideButton = document.createElement("button");
  sideButton.className = "sideButton";
  sideButton.id = "sideButton" + t;
  sideButton.innerText = "Side " + (t+1) ;
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
      itemsides[sideNumber].classList.toggle('grid-hover');
    }
  }
}


function sideHoverEnd() {
  sideNumber = parseInt(this.id.substr(10));
  for (var a = 0; a < cubes.length; a++) {
  const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    for (var b = 0; b <4; b++) {
      itemsides[sideNumber].classList.toggle('grid-hover');
    }
  }
}

const topButton = document.createElement("button");
document.getElementById("sidecontainer").appendChild(topButton);
topButton.className = "topButton";
topButton.id = "topButton";
topButton.innerText = "Top";
topButton.addEventListener("click", topChosen);
topButton.addEventListener("mouseover", function() {
  tops[cubeChosen].classList.toggle('grid-hover');
});
topButton.addEventListener("mouseout", function() {
  tops[cubeChosen].classList.toggle('grid-hover');
});


var topChoose = false;
function topChosen() {
  topButton.classList.add('active-button');
  topChoose = true;
  for (var g = 0; g <sideButtons.length; g++) {
    sideButtons[g].classList.remove('active-button');
  }
}



//ADD and CLEAR COLORS

function addColortoSides() {
    const itemsides = sidesContainers[cubeChosen].children;
    for (var b = 0; b < 5; b++) {
        itemsides[b].classList.add('glass-effect');
    };
}

document.getElementById('clear').addEventListener('click',clearCube);
function clearCube() {
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


