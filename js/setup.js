'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getName = function () {
  var name = getRandomElement(names) + ' ' + getRandomElement(surnames);
  return name;
};

var getWizard = function () {
  var wizard = {
    name: getName(),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColor)
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
