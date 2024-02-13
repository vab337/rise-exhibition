var controlsProgressEl = document.querySelector('.animecontrols .progress');

var tl = anime.timeline({
  easing: 'easeOutQuart',
  duration: 1000,
  loop: true,
  update: function(anim) {
    controlsProgressEl.value = tl.progress;
  }
});

//  


// .add({
//   targets: '.cube',
//   translateY: [1000,0],
//   delay: anime.stagger(100),
// })
// .add({
//   targets: '.cube',
//   rotateY: [0,180],
//   delay: anime.stagger(100),
// }, '+=1000');





document.querySelector('.animecontrols .play').onclick = tl.play;
document.querySelector('.animecontrols .pause').onclick = tl.pause;
document.querySelector('.animecontrols .restart').onclick = tl.restart;

controlsProgressEl.addEventListener('input', function() {
  tl.seek(tl.duration * (controlsProgressEl.value / 100));
});

