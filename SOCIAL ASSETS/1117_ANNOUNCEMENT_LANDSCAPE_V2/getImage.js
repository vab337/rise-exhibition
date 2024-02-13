const backgroundImageUrls = []; // Array to store URLs

const getImgBtn = document.getElementById('getImage');
getImgBtn.addEventListener('click', getImages);
const downloadImgBtn = document.getElementById('downloadImage');
downloadImgBtn.addEventListener('click', downloadImg);

function getImages() {
  // Collect all elements with background images on the page
  const elementsWithBackground = document.querySelectorAll('[style*="background-image"]');

  // Iterate through each element with a background image and extract the URL
  elementsWithBackground.forEach(element => {
    const style = window.getComputedStyle(element);
    const backgroundImage = style.backgroundImage;

    // Extract the URL from the background image property
    const imageUrl = backgroundImage.replace(/^url\(["']?|["']?\)$/g, '');

    // Check if the URL is not empty and not 'none' and not already in the array
    if (imageUrl && imageUrl !== 'none' && !backgroundImageUrls.includes(imageUrl)) {
      backgroundImageUrls.push(imageUrl); // Add URL to array if not already present
    }
  });

  // Log the collected unique background image URLs to the console
  console.log('Background Image URLs without duplicates:', backgroundImageUrls);
}


function downloadImg() {

  downloadImagesWithDelay(backgroundImageUrls);
}

// function downloadImages(urls) {
//   urls.forEach((imageUrl, index) => {
//     saveAs(imageUrl, imageUrl+ '.png');
// });
// downloadImages(backgroundImageUrls);

// }


function downloadImagesWithDelay(urls) {
  let index = 0;

  function downloadNext() {
    if (index < urls.length) {
      const imageUrl = urls[index];
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          saveAs(blob, imageUrl.split('/').pop() + '.png');
          index++;
          setTimeout(downloadNext, 1000); // Add a delay of 1 second (1000 milliseconds) before starting the next download
        })
        .catch(error => {
          console.error(`Failed to download ${imageUrl}:`, error);
          index++;
          setTimeout(downloadNext, 1000); // Proceed to the next download even if an error occurs
        });
    }
  }

  downloadNext(); // Start the download process
}

