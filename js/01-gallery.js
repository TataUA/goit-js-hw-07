import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const GalleryContainer = document.querySelector('.gallery');
const itemsForGallery = createGallery(galleryItems);

GalleryContainer.insertAdjacentHTML('beforeend', itemsForGallery);

GalleryContainer.addEventListener('click', onImageClick);

function createGallery (items) {
    return items.map(({preview, original, description}) => {
        return `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
      `;        
    }).join("");    
}

function onImageClick(event) {
    event.preventDefault();

    fullSizeImgOpen (event);
}

function fullSizeImgOpen (event) {
    if(!event.target.classList.contains('gallery__image')) {
        return;
    }

    const instance = basicLightbox.create(`
        <div class="modal">
            <img src="${event.target.dataset.source}" width="800" height="600"/>
        </div>
    `, {
        onShow: (instance) => {
            GalleryContainer.addEventListener('keydown', fullSizeImgClose);
        },
        onClose: (instance) => {
            GalleryContainer.removeEventListener('keydown', fullSizeImgClose);
        }
    });
    instance.show()

    function fullSizeImgClose (event) {
        if(event.code === 'Escape') {
            instance.close();
        }
    }
}
    








