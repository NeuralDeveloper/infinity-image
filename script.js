const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesSetLoaded = 0;
let totalSetImage = 0;
let photoArray = [];

//Unsplash API
const count = 3
const apiKey = 'WuQSGUFvBocfUQi1UvrjwQ_xByH25smpYK_3TRmI9WY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    imagesSetLoaded++;
    if (imagesSetLoaded === totalSetImage) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

//Creating function to
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements For Links & Photos, add to DOM
function displayPhotos() {
    
    imagesSetLoaded = 0; //reset the value of 30 to 0
    totalSetImage = photosArray.length;

    //Run function for each object in photosArray
    photosArray.forEach((photo) => {

        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when eact is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> and <a>. then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



//Get photos from unsplash API
async function getPhotosFromAPI() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        //catch error here

    }
}


//Check to see if scrolling near bottom of page then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosFromAPI();
    }
});

//loading API
getPhotosFromAPI();