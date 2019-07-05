'use strict';
(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
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
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  wizard.onEyesChange = function (color) {
    eyesColor = color;
    updateWizards();
  };

  wizard.onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
  };

  var onLoadHandler = function (data) {
    wizards = data;
    updateWizards();
    window.showElement('.setup-similar');
  };

  window.onErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoadHandler, window.onErrorHandler);
})();
