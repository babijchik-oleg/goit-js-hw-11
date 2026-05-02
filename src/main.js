import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from './img/error-icon.svg';
import closeIcon from './img/close-icon.svg';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const input = document.querySelector('.search-text');
searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const searchQuery = input.value.trim();
  if (searchQuery === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search query!',
    });
    return;
  }
  clearGallery();
  showLoader();
  getImagesByQuery(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please, try again.',
          position: 'topRight',
          backgroundColor: '#ff4d4d',
          messageColor: '#fff',
          iconUrl: iconError,
          iconColor: '#fff',
          displayMode: 0,
          close: true,
          closeColor: 'transparent',
          maxWidth: '432px',
        });
        return;
      } else {
        createGallery(data.hits);
      }
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images!',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
