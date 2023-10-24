//COLOR OPTIONS ADDED

var zindex = 10;
const cubes = document.getElementsByClassName("cube");
const container = document.getElementById("container");
const tops = document.getElementsByClassName("top");
const sides = document.getElementsByClassName("side");
var cubeChosen = 0; 

const artistArr = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16",
"17", "18","19","20","21","22","23","24","25","26","27"];


for (var i=0; i<27; i++) {
  const cube = document.createElement("div");
  cube.className = "cube";
  cube.id = "item" + i;
  container.appendChild(cube);
  cube.setAttribute("style", "--j:"+i);


  //create div that hold the sides 
  const sidescontainer = document.createElement("div");
  cube.appendChild(sidescontainer);

  //create top side
  const top = document.createElement("div");
  top.className = "top";
  top.addEventListener("click", itemClicked);
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

for (var a = 0; a < cubes.length; a++) {
  const itemsides = cubes[a].querySelectorAll("div>span");
  for (var b = 0; b <4; b++)
  itemsides[3].classList.add("h1text");
  itemsides[1].classList.add("h2text");
  itemsides[2].classList.add("h3text");
  itemsides[0].classList.add("h4text");
  // itemsides[3].innerText = artistArr[a];
  // itemsides[1].innerText = artistArr[a];
  // itemsides[2].innerText = artistArr[a];
  // itemsides[0].innerText = artistArr[a];

}




//ROTATE
// document.getElementById("rotatebtn").addEventListener("click", rotateScene);
// var isRotating = false;

// function rotateScene() {
//   if(isRotating == false) {
//   container.classList.add("animator");
//   isRotating = true;
// } else {
//   container.classList.remove("animator");
//   isRotating = false;
// }
// }



//CREATE GRID 
var cols = 3;
var rows = 3;
var gridArr = []

var w = 300;
var h = 300;
for (var i=0; i<cols; i++) {
  for(var j=0; j<rows; j++) {
    for (var k=0; k<3; k++) {
      var xpos = i*w;
      var ypos = j*h;
      var zpos = k*(-300);
      var index = i + j*cols + k*3*rows; 
      gridArr[index] = new Array(xpos,ypos,zpos);
    }
  }
}

  for (var j=0; j<cubes.length; j++) {
    var randomWidth = 300;
    var x = Math.floor(gridArr[j][0]);
    var y = Math.floor(gridArr[j][1]);
    var z = Math.floor(gridArr[j][2]);

    cubes[j].style.width = randomWidth + "px";
    cubes[j].style.height = randomWidth + "px";
    cubes[j].style.left = x  + "px";
    cubes[j].style.top = y  + "px";
    cubes[j].animate(
      [
        { transform:"translateZ(" + z + "px)" + "rotateY(0deg)" },
        { transform: "translateZ(" + z + "px)" + "rotateY(0deg)"  },
      ],
      {
        // timing options
        duration: 5000,
        iterations: Infinity,
      },
    );

    tops[j].style.width = randomWidth + "px";
    tops[j].style.height = randomWidth + "px";
    tops[j].style.transform = "rotateX(90deg) translateZ(calc(" + randomWidth + "px" + "/2*(-1)))";

    const item = tops[j].parentElement;
    item.style.height = randomWidth+ "px";
    const itemsides = item.querySelectorAll("div>span");
    for (var i=0; i<itemsides.length; i++) {
      itemsides[i].style.transform = "rotateY(calc(90deg*var(--i))) translateZ(calc(" + (randomWidth) +"px" + "/2))";
    }
  }


  //END OF CREATING GRID 


  for (var j=0; j<cubes.length; j+=2) {
    const sides = cubes[j].querySelectorAll("div>span");
    for (var i=0; i<sides.length; i++) {
      // sides[i].style.background = "var(--green)";

    }
  }



container.addEventListener("click", itemClicked);



function itemClicked() {
  for(var i=0; i<tops.length; i++) {
          const item = tops[i].parentElement;
          const itemsides = item.querySelectorAll("div>span");
          item.style.zIndex = zindex;
          zindex++;
          for (var j=0; j<itemsides.length; j++) {
            itemsides[j].style.height="100%";
            }
            var itemHeight = item.offsetHeight;
            tops[i].style.transform = "rotateX(90deg) translateZ(calc(" + itemHeight + "px" + "/2))";
          } 
  }




//orbit control

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

for (var b = 0; b < 27 ; b++) {
const gridButton = document.createElement("button");
gridButton.className = "gridButton";
gridButton.id = "button" + b;
gridButton.innerText = b;
gridButton.addEventListener("click", gridChosen);
gridButton.addEventListener("mouseover", gridHover);
gridButton.addEventListener("mouseout", gridHoverEnd);

document.getElementById("gridbuttoncontainer").appendChild(gridButton);
}

const gridButtons = document.getElementsByClassName("gridButton");
var gridNum = 0;

//BUTTONS EVENT
function gridChosen() {
  gridNum = parseInt(this.id.substr(6));
  cubeChosen = gridNum;

    for (var g = 0; g <gridButtons.length; g++) {
    gridButtons[g].classList.remove('active-button');
    gridButtons[gridNum].classList.add('active-button');
  }

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
  document.getElementById("sidecontainer").appendChild(sideButton);
  }
const sideButtons = document.getElementsByClassName("sideButton");

var sideNumber = 0;

function sideChosen() {
   sideNumber = parseInt(this.id.substr(10));
   
   for (var g = 0; g <sideButtons.length; g++) {
    sideButtons[g].classList.remove('active-button');
    sideButtons[sideNumber].classList.add('active-button');
  }}



  // for (var s = 0; s<sideButtons.length; s++) {
  //   const itemsides = cubes[gridNum].querySelectorAll("div>span");  
  //   sideButtons[s].addEventListener('mouseover', () => {
  //     itemsides[s].style.backgroundColor = 'lightblue';
  //     });
    
  //     sideButtons[s].addEventListener('mouseout', () => {
  //       itemsides[0].style.backgroundColor = 'lightgray';
  //     });
  //   }
  
  


//text input
const textinput = document.getElementById("textinput");
textinput.addEventListener("change",replaceText);
const textsubmit = document.getElementById("textsubmit");
textsubmit.addEventListener("click", replaceText);



function replaceText() {
  for (var a = 0; a < cubes.length; a++) {
    const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
    for (var b = 0; b < 4; b++) {
    itemsides[sideNumber].classList.add("h4text");
    itemsides[sideNumber].innerText = textinput.value;
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
      console.log(this.files);
      const itemsides = cubes[cubeChosen].querySelectorAll("div>span");
      for (var b = 0; b<4; b++) {
      itemsides[sideNumber].style.backgroundImage="url("+ URL.createObjectURL(this.files[0]); + ")";
      this.value = '';
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


// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     const computedStyle = window.getComputedStyle(button);
//     const backgroundColor = computedStyle.backgroundColor;
//     alert(`Background color: ${backgroundColor}`);
//   });
// });
