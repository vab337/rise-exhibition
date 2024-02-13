const rotateBtn = document.getElementById("rotate");

// ROTATE
rotateBtn.addEventListener("click", rotateScene);
var isRotating = false;

function rotateScene() {
  if(isRotating == false) {
  container.classList.add("animator");
  rotateBtn.textContent = "Stop animation";
  isRotating = true;
} else {
  container.classList.remove("animator");
  rotateBtn.textContent = "Animation";
  isRotating = false;
}
}

// const rotateBtn2 = document.getElementById("rotate2");

// // ROTATE
// rotateBtn2.addEventListener("click", rotateScene2);

// function rotateScene2() {
//   container.classList=[];
//   container.classList.add("animator2");
//   isRotating = false;
// }

