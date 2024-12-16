// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(data, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    deleteButton.addEventListener('click', () => {
      deleteCallback(cardElement);
    })
        return cardElement;
}
// @todo: Функция удаления карточки
  function deleteCard(cardElement) {
    cardElement.remove();
}
// @todo: Вывести карточки на страницу 
  function inputCards(cards, del) {
    cards.forEach(item => {
        const createdCard = createCard(item, del);
        placesList.append(createdCard);
    })
  }
  inputCards(initialCards, deleteCard)