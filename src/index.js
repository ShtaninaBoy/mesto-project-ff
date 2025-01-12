import './pages/index.css';
import { createCard, deleteCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {
  getUserInfo,
  getCards,
  editProfileApi,
  addNewcardApi,
  deleteCardApi,
  likeCardApi,
  dislikeCardApi,
  avatarChangeApi
} from './scripts/api.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const profileFormEdit = document.querySelector('.popup__form[name="edit-profile"]');
const inputNameprofile = document.querySelector('.popup__input_type_name');
const inputJobProfile = document.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardButton = document.querySelector('.profile__add-button');
const formCreateNewCard = document.querySelector('.popup__form[name="new-place"]');
const newCardName = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const imagePopupContent = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');
const profileImage = document.querySelector('.profile__image');
const profileImagePopup = document.querySelector('.popup_type_avatar');
const profileImageForm = document.querySelector('.popup__form[name="avatar"]');
const profileImageInput = document.querySelector('.popup__input_avatar_url');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: '.popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

let currentId;

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    currentId = userInfo._id;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    nameProfile.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    inputCards(cards, deleteCard, currentId, deleteCardApi);
    popupNewCardButton.addEventListener('click', () => {
      openModal(popupNewCard);
      clearValidation(validationConfig, formCreateNewCard);
      formCreateNewCard.reset();
    });

    profileImage.addEventListener('click', () => {
      openModal(profileImagePopup);
      clearValidation(validationConfig, profileImageForm);
      profileImageForm.reset();
    })

    editButton.addEventListener('click', () => {
      openModal(editPopup);
      inputNameprofile.value = nameProfile.textContent;
      inputJobProfile.value = profileDescription.textContent;
      clearValidation(validationConfig, profileFormEdit);
    });

    profileImageForm.addEventListener('submit', submitProfileImageForm);
    formCreateNewCard.addEventListener('submit', submitNewCardForm);
    profileFormEdit.addEventListener('submit', editProfile);

  })
    .catch((err) => {
      console.log(err);
});

async function submitNewCardForm(evt) {
  evt.preventDefault();
  const submitButton = popupNewCard.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  try {
    const newCard = await addNewcardApi(newCardName ,newCardLink);
    const cardRendered = createCard(newCard, deleteCard, likeCardApi, openImage, currentId, deleteCardApi, dislikeCardApi, openModal, closeModal );
    placesList.prepend(cardRendered);
    formCreateNewCard.reset();
    closeModal(popupNewCard);
  } catch (err) {
    console.log(err)
  } finally { submitButton.textContent = initialText; };
};

async function submitProfileImageForm(evt) {
  evt.preventDefault();
  const submitButton = profileImagePopup.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  try {
    const updatedUser = await avatarChangeApi(profileImageInput);
    profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
    closeModal(profileImagePopup);
    profileImageForm.reset();
  } catch (err) {
    console.log(err)
  } finally { submitButton.textContent = initialText; };  
};

async function editProfile(evt) {
  evt.preventDefault();
  const submitButton = editPopup.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  try {
    const updatedUser = await editProfileApi(inputNameprofile, inputJobProfile);
    nameProfile.textContent = updatedUser.name;
    profileDescription.textContent = updatedUser.about;
    closeModal(editPopup);
  } catch (err) {
    console.log(err)
  } finally { submitButton.textContent = initialText };
};

function inputCards(cards, deleteFunc, currentId, deleteCardApi) {
    placesList.innerHTML = '';
    cards.forEach(element => {
        const cardRendered = createCard(element, deleteFunc, likeCardApi, openImage, currentId, deleteCardApi, dislikeCardApi, openModal, closeModal );
        placesList.append(cardRendered);
    });
};

function openImage(item) {
  imagePopupContent.src = item.link;
  imagePopupContent.alt = item.name;
  imagePopupCaption.textContent = item.name;
  openModal(popupTypeImage);
}

popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__close') || event.target === event.currentTarget) {
            closeModal(popup);
        }
    });
});

enableValidation(validationConfig);