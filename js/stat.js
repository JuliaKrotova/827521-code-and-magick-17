'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 20;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_GAP = 10;
var TEXT_Y = CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT;

var BAR_HEIGHT = 150 - TEXT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderMessage = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);
};

var printName = function (ctx, name, i) {
  ctx.fillStyle = '#000';
  ctx.fillText(name, CLOUD_X + BAR_GAP + i * (BAR_WIDTH + BAR_GAP), TEXT_Y + TEXT_GAP);
};

var getCurrentColor = function (name){
  return (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (Math.random() + 0.1) + ')';
};

var drawCurrentBar = function (ctx, name, time, maxTime, playerBarHeight, i){
  var color = getCurrentColor(name);
  ctx.fillStyle = color;
  ctx.fillRect(CLOUD_X + BAR_GAP + i * (BAR_WIDTH + BAR_GAP), TEXT_Y - playerBarHeight, BAR_WIDTH, playerBarHeight);
};

var printTime = function (ctx, time, playerBarHeight, i){
  ctx.fillStyle = '#000';
  ctx.fillText(Math.round(time), CLOUD_X + BAR_GAP + i * (BAR_WIDTH + BAR_GAP), TEXT_Y - playerBarHeight - TEXT_HEIGHT);
};

var renderBarChart = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  var color;
  var playerBarHeight;
  for (var i = 0; i < names.length; i++) {
    printName(ctx, names[i], i);
    playerBarHeight = BAR_HEIGHT * times[i] / maxTime;
    drawCurrentBar(ctx, names[i], times[i], maxTime, playerBarHeight, i);
    printTime(ctx, times[i], playerBarHeight, i);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderMessage(ctx);
  renderBarChart(ctx, names, times);
};
