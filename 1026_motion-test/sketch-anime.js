var t1 = anime.timeline({
    easing: 'easeOutQuart',
    duration: 5000,
    delay: anime.stagger(100),
    loop: true,
  });
  
  // Add children
//   t1
//   .add({
//     targets: '.cube',
//     keyframes: [
//         {rotateY: 270},
//         {rotateY: 0},
//       ],
//   });


//   rise motion
    t1
  .add({
    targets: '.cube',
    translateY: [1000,0]
  });
  




//   .add({
//     targets: '#container',
//     keyframes: [
//         {translateY: 0},
//         {translateY: -100},
//       ],
//   });


