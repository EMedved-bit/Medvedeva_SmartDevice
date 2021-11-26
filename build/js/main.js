const iMask = window.IMask;
const openPopupButton = document.querySelector('.page-header__button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');
const closeOverlay = popup.querySelector('.popup__overlay');

const formPopup = document.querySelector('.popup .form');
const userNamePopup = formPopup.querySelector('#name-popup');
const userPhonePopup = formPopup.querySelector('#phone-popup');
const userMessagePopup = formPopup.querySelector('#user-question-popup');

const form = document.querySelector('.form form');
const userName = form.querySelector('#name');
const userPhone = form.querySelector('#phone');
const userMessage = form.querySelector('#user-question');

const tabs = document.querySelectorAll('.js-tab');
const tabsButtons = document.querySelectorAll('.js-tab-button');

iMask(userPhonePopup, {
  mask: '+{7}(000)000-00-00'
});

iMask(userPhone, {
  mask: '+{7}(000)000-00-00'
});

let isStorageSupport = true;
let storageName = '';
let storagePhone = '';
let storageMessage = '';

try {
  storageName = localStorage.getItem('userName');
  storagePhone = localStorage.getItem('userPhone');
  storageMessage = localStorage.getItem('userMessage');
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  userNamePopup.value = storageName;
  userName.value = storageName;
}

if (storagePhone) {
  userPhonePopup.value = storagePhone;
  userPhone.value = storagePhone;
}

if (storageMessage) {
  userMessagePopup.value = storageMessage;
  userMessage.value = storageMessage;
}


openPopupButton.addEventListener('click', function () {
  popup.classList.add('opened');
  userNamePopup.focus();
});

closePopupButton.addEventListener('click', function () {
  popup.classList.remove('opened');
});

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    popup.classList.remove('opened');
  }
});

closeOverlay.addEventListener('click', function () {
  popup.classList.remove('opened');
});

formPopup.addEventListener('submit', function () {
  if (isStorageSupport) {
    localStorage.setItem('userName', userNamePopup.value);
    localStorage.setItem('userPhone', userPhonePopup.value);
    localStorage.setItem('userMessage', userMessagePopup.value);
  }
});

form.addEventListener('submit', function () {
  if (isStorageSupport) {
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('userPhone', userPhone.value);
    localStorage.setItem('userMessage', userMessage.value);
  }
});

if (window.innerWidth <= 767) {
  tabs.forEach(function (tab) {
    tab.classList.add('js-tab-closed');
  });

  tabsButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      if (tabs[index].classList.contains('js-tab-closed')) {
        tabs.forEach(function (tab) {
          tab.classList.add('js-tab-closed');
        });
        tabs[index].classList.remove('js-tab-closed');
      } else {
        tabs[index].classList.add('js-tab-closed');
      }
    });
  });
}
