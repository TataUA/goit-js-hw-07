import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const itemsForGallery = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', itemsForGallery);

galleryContainer.addEventListener('click', onImageClick);

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
            window.addEventListener('keydown', fullSizeImgClose);
        },
        onClose: (instance) => {
            window.removeEventListener('keydown', fullSizeImgClose);
        }
    });
    instance.show()

    const modalWindow = document.querySelector('.modal');
    modalWindow.addEventListener('click', () => {
        instance.close();
    });

    function fullSizeImgClose (event) {
        if(event.code === 'Escape') {
            instance.close();
    }
    }
}
    








