'use strict';

(function () {
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
  var setupElement = document.querySelector('.setup');
  var form = setupElement.querySelector('.setup-wizard-form');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  var showElement = function (selector) {
    var element = document.querySelector(selector);
    element.classList.remove('hidden');
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSubmitHandler, onErrorHandler);
    evt.preventDefault();
  });

  var onSubmitHandler = function () {
    setupElement.classList.add('hidden');
  };

  var onErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onLoadHandler = function (wizards) {
    renderWizards(wizards);
    showElement('.setup-similar');
  };

  window.backend.load(onLoadHandler, onErrorHandler);
})();
