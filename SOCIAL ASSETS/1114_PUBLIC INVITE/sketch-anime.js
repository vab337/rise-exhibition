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

