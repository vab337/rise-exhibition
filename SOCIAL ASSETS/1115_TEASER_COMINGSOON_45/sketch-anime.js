var controlsProgressEl = document.querySelector('.animecontrols .progress');

var tl = anime.timeline({
  easing: 'easeOutQuart',
  duration: 2000,
  loop: true,
  delay: anime.stagger(100),
  update: function(anim) {
    controlsProgressEl.value = tl.progress;
  }
});

tl
.add({
  targets: '.cube',
  keyframes: [
      {rotateY: 0},
      {rotateY: 270},
    ],
})
.add({
  targets: '.cube',
  keyframes: [
      {rotateY: 270},
      {rotateY: 0},
    ],
});





document.querySelector('.animecontrols .play').onclick = tl.play;
document.querySelector('.animecontrols .pause').onclick = tl.pause;
document.querySelector('.animecontrols .restart').onclick = tl.restart;

controlsProgressEl.addEventListener('input', function() {
  tl.seek(tl.duration * (controlsProgressEl.value / 100));
});
