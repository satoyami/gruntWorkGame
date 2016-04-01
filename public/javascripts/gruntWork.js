'use strict';

/*
 * Global Variable Definitions
*/
var paper = Raphael("paper", 600, 450);
var people = 3; // number of people per team
var timecap = 180; // seconds in 3 minutes
var distance = 60; // distance in feet
var meter = 3.28084; // conversion of 1 foot to meters
var kg = 2.20462; // conversion of kg to 1 pound
var gametime = 30000; // time in milliseconds

var distm = function distm(dist) {
  return dist / meter;
};

console.log(distm(distance));

// Player constructor object
var Player = {};
// add players
var player1 = Object.create(Player, { name: { value: 'Bob' }, agility: { value: 5 } });
var player2 = Object.create(Player, { name: { value: 'Sally' }, agility: { value: 3 } });
var player3 = Object.create(Player, { name: { value: 'Tim' }, agility: { value: 6 } });

/*
 * amount of weight to move
 * load - how many units of weight type
 * can be moved at a time per person
 */
var weights = [{ 'name': 'pink', 'type': 'kettlebell', 'qty': 13, 'lbs': 15, 'pts': 1, 'load': 2 }, { 'name': 'blue', 'type': 'kettlebell', 'qty': 12, 'lbs': 25, 'pts': 2, 'load': 2 }, { 'name': 'yellow', 'type': 'kettlebell', 'qty': 6, 'lbs': 35, 'pts': 3, 'load': 2 }, { 'name': 'ten', 'type': 'plate', 'qty': 17, 'lbs': 10, 'pts': 1, 'load': 5 }, { 'name': 'fifteen', 'type': 'plate', 'qty': 19, 'lbs': 15, 'pts': 2, 'load': 3 }, { 'name': 'twentyfive', 'type': 'plate', 'qty': 16, 'lbs': 25, 'pts': 3, 'load': 3 }, { 'name': 'thirtyfive', 'type': 'plate', 'qty': 8, 'lbs': 35, 'pts': 4, 'load': 2 }, { 'name': 'fortyfive', 'type': 'plate', 'qty': 6, 'lbs': 45, 'pts': 5, 'load': 2 }, { 'name': 'bag', 'type': 'sandbag', 'qty': 1, 'lbs': 90, 'pts': 8, 'load': 1 }];

function getTotalLbs(arr) {
  var total = 0;
  arr.forEach(function (w) {
    total = total + w['qty'] * w['lbs'];
  });
  return total;
}

function getTotalKgs(arr) {
  var total = 0;
  arr.forEach(function (w) {
    total = total + w['qty'] * (w['lbs'] / kg);
  });
  return total;
}

function force(weight, dist, time) {
  var mass = getTotalKgs(weight);
  var acceleration = dist / meter / Math.pow(time, 2);
  var force = mass * acceleration;
  return force;
}

var Load = {
  radius: 20,
  movecircle: function movecircle(delay) {
    var circle = paper.circle(30, this.offset, this.radius).attr({
      fill: this.color,
      "stroke-width": 2,
      stroke: "black"
    }).animate({
      cx: 450
    }, delay);
  }
};

var Pink = Object.create(Load, { color: { value: "pink" }, offset: { value: 30 } });
var Blue = Object.create(Load, { color: { value: "blue" }, offset: { value: 75 } });
var Yellow = Object.create(Load, { color: { value: "yellow" }, offset: { value: 120 } });
var Tens = Object.create(Load, { color: { value: "black" }, offset: { value: 165 } });
var Fifteens = Object.create(Load, { color: { value: "black" }, offset: { value: 210 } });
var Twentyfives = Object.create(Load, { color: { value: "black" }, offset: { value: 255 } });
var Thirtyfives = Object.create(Load, { color: { value: "black" }, offset: { value: 300 } });
var Fortyfives = Object.create(Load, { color: { value: "black" }, offset: { value: 345 } });
var Bags = Object.create(Load, { color: { value: "green" }, offset: { value: 400 }, radius: { value: 25 } });

function gruntGame() {
  var weightMoved = getTotalLbs(weights);
  var frames = 500;
  (function loop() {
    setTimeout(function () {
      console.log(weightMoved);
      if (weightMoved > 0) {
        Pink.movecircle(frames);
        Blue.movecircle(frames * 1.2);
        Yellow.movecircle(frames * 1.4);
        Tens.movecircle(frames * 1.3);
        Fifteens.movecircle(frames * 1.4);
        Twentyfives.movecircle(frames * 1.5);
        Thirtyfives.movecircle(frames * 1.6);
        Fortyfives.movecircle(frames * 1.7);
        Bags.movecircle(frames * 2);
        loop();
      }
      weightMoved -= 100;
    }, frames);
  })();
}

// start game
gruntGame();