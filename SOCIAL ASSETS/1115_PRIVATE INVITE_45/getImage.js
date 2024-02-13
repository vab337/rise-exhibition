const elementsWithBackground = document.querySelectorAll('[style*="background-image"]');
const backgroundImageUrls = Array.from(elementsWithBackground).map(element => {
  const style = window.getComputedStyle(element);
  const backgroundImage = style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, '').trim();

  // Check if the background image is not 'none' before returning
  return backgroundImage !== 'none' ? backgroundImage : null;
}).filter(url => url !== null);  // Filter out 'none' values

console.log('Background Image URLs:', backgroundImageUrls);



function downloadImg() {
// Save all background images
// backgroundImageUrls.forEach((imageUrl, index) => {
//     saveAs(imageUrl, imageUrl+ '.png');
//   });

downloadImages(backgroundImageUrls);
      
}





// You can now use the collected URLs to download the images using a script or a download manager.
async function downloadImages(imageUrls) {
    for (const imageUrl of imageUrls) {
      try {
        // Fetch the image
        const response = await fetch(imageUrl);
  
        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Convert the image data to a Blob
          const imageBlob = await response.blob();
  
          // Create a link element
          const link = document.createElement('a');
  
          // Create an object URL from the Blob
          const objectUrl = URL.createObjectURL(imageBlob);
  
          // Set the link's attributes
          link.href = objectUrl;
          link.download = imageUrl.split('/').pop(); // Set the filename
  
          // Append the link to the document
          document.body.appendChild(link);
  
          // Trigger a click on the link to start the download
          link.click();
  
          // Remove the link from the document
          document.body.removeChild(link);
  
          // Revoke the object URL to free up resources
          URL.revokeObjectURL(objectUrl);
        } else {
          console.error(`Failed to fetch image: ${imageUrl}. Status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching image: ${imageUrl}`, error);
      }
    }
  }
  
  // Example: Run the previous script to collect image URLs
  // const elementsWithBackground = document.querySelectorAll('[style*="background-image"]');
  // const backgroundImageUrls = Array.from(elementsWithBackground).map(element => {
  //   const style = window.getComputedStyle(element);
  //   return style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, '');
  // });
  
  // Example: Run the downloadImages function with the collected URLs
  // downloadImages(backgroundImageUrls);