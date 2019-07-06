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
  var wizards = [];

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

  var renderWizards = function () {
    similarListElement.innerHTML = '';
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
    return newColor;
  };


  var updateWizards = function () {
    renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var updateWizardsDebounced = window.debounce(updateWizards);

  var coatColor = 'rgb(101, 137, 164)';
  wizardCoatElement.addEventListener('click', function () {
    coatColor = setColor(COAT_COLORS, wizardCoatElement, coatColorInputElement);
    updateWizardsDebounced();
  });

  var eyesColor = 'black';
  wizardEyesElement.addEventListener('click', function () {
    eyesColor = setColor(EYES_COLORS, wizardEyesElement, eyesColorInputElement);
    updateWizardsDebounced();
  });

  fireballElement.addEventListener('click', function () {
    setColor(FIREBALL_COLORS, fireballElement, fireballInputElement);
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSubmitHandler, onLoadError);
    evt.preventDefault();
  });

  var onSubmitHandler = function () {
    setupElement.classList.add('hidden');
  };

  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
    showElement('.setup-similar');
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return left - right;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.backend.load(onLoadSuccess, onLoadError);

})();
