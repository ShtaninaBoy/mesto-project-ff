const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '95a36c32-e730-4dfc-8484-26fe22b70bf7',
      'Content-Type': 'application/json'
    }
  };
  
  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
  
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const editProfileApi = (inputNameProfile, inputJobProfile) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: inputNameProfile.value,
          about: inputJobProfile.value,
        }),
      }).then(handleResponse);
  };
  
  export const addNewcardApi = (newCardName, newCardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: newCardName.value,
          link: newCardLink.value,
      }),
    }).then(handleResponse);
  };
  
  export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const likeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const dislikeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(handleResponse);
  };
  
  export const avatarChangeApi = (inputAvatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: inputAvatarUrl.value,
      }),
    }).then(handleResponse);
  };