export function openModal(mod) {
    mod.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleKeydown);
};

export function closeModal(mod) {
    mod.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleKeydown);
};

function handleKeydown(event) {
    if (event.key === 'Escape') {
        const openPopupElement = document.querySelector('.popup_is-opened');
        if (openPopupElement) {
            closeModal(openPopupElement);
        }
    }
}