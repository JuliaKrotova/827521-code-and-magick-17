'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setupOpenElement = document.querySelector('.setup-open');
var setupElement = document.querySelector('.setup');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupOpenIconElement = document.querySelector('.setup-open-icon');
var setupWizardElement = document.querySelector('.setup-wizard');
var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var fireballElement = document.querySelector('.setup-fireball-wrap');
var fireballInputElement = fireballElement.querySelector('input');

var showElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.remove('hidden');
};

var getRandomValueFrom = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getName = function () {
  var name = getRandomValueFrom(NAMES) + ' ' + getRandomValueFrom(SURNAMES);
  return name;
};

var getWizard = function () {
  var wizard = {
    name: getName(),
    coatColor: getRandomValueFrom(COAT_COLORS),
    eyesColor: getRandomValueFrom(EYES_COLORS)
  };
  return wizard;
};

var getWizards = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizards.push(getWizard());
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var onPopupEscPress = function (evt) {
  var nameFocus = setupElement.querySelector('input:focus');
  var isKeyEnterPressed = evt.keyCode === ESC_KEYCODE;
  if (isKeyEnterPressed && !nameFocus) {
    closePopup();
  }
};

var openPopup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpenElement.addEventListener('click', function () {
  openPopup();
});


setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var changeСoatColor = function () {
  wizardCoatElement.style.fill = getRandomValueFrom(COAT_COLORS);
};

wizardCoatElement.addEventListener('click', function () {
  changeСoatColor();
});

var changeEyesColor = function () {
  wizardEyesElement.style.fill = getRandomValueFrom(EYES_COLORS);
};

wizardEyesElement.addEventListener('click', function () {
  changeEyesColor();
});

var changeFireballColor = function () {
  var newFireballColor = getRandomValueFrom(FIREBALL_COLORS);
  fireballElement.style.background = newFireballColor;
  fireballInputElement.value = newFireballColor;
};

fireballElement.addEventListener('click', function () {
  changeFireballColor();
});


var wizards = getWizards(WIZARDS_COUNT);
renderWizards(wizards);
showElement('.setup-similar');
