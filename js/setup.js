'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_COUNT = 4;
  var setupWizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
  var fireballElement = document.querySelector('.setup-fireball-wrap');
  var fireballInputElement = fireballElement.querySelector('input');
  var coatColorInputElement = document.querySelector('input[name="coat-color"]');
  var eyesColorInputElement = document.querySelector('input[name="eyes-color"]');
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  var showElement = function (selector) {
    var element = document.querySelector(selector);
    element.classList.remove('hidden');
  };

  var getName = function () {
    var name = window.util.getRandomValueFrom(NAMES) + ' ' + window.util.getRandomValueFrom(SURNAMES);
    return name;
  };

  var getWizard = function () {
    var wizard = {
      name: getName(),
      coatColor: window.util.getRandomValueFrom(COAT_COLORS),
      eyesColor: window.util.getRandomValueFrom(EYES_COLORS)
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

  var setColor = function (array, element, inputElement) {
    var newColor = window.util.getRandomValueFrom(array);
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = newColor;
    } else {
      element.style.fill = newColor;
    }
    inputElement.value = newColor;
  };

  wizardCoatElement.addEventListener('click', function () {
    setColor(COAT_COLORS, wizardCoatElement, coatColorInputElement);
  });

  wizardEyesElement.addEventListener('click', function () {
    setColor(EYES_COLORS, wizardEyesElement, eyesColorInputElement);
  });

  fireballElement.addEventListener('click', function () {
    setColor(FIREBALL_COLORS, fireballElement, fireballInputElement);
  });

  var wizards = getWizards(WIZARDS_COUNT);
  renderWizards(wizards);
  showElement('.setup-similar');
})();
