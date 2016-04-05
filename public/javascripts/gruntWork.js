'use strict';

// Global Variable Definitions

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
var Player = {
  pickLoad: function pickLoad() {
    var pLoad = Math.floor(Math.random() * weights.length);
    if (weights[pLoad].qty > 0) {
      return pLoad;
    } else {
      return Math.floor(Math.random() * weights.length);
    }
  }
};
// add players
var player1 = Object.create(Player, { name: { value: 'Bob' }, agility: { value: 5 } });
var player2 = Object.create(Player, { name: { value: 'Sally' }, agility: { value: 3 } });
var player3 = Object.create(Player, { name: { value: 'Tim' }, agility: { value: 6 } });

// amount of weight to move
// load - how many units of weight type
// can be moved at a time per person
var weights = [{ 'name': 'pink', 'color': 'pink', 'type': 'kettlebell', 'qty': 13, 'lbs': 15, 'pts': 1, 'load': 2, 'offset': 30 }, { 'name': 'blue', 'color': 'blue', 'type': 'kettlebell', 'qty': 12, 'lbs': 25, 'pts': 2, 'load': 2, 'offset': 75 }, { 'name': 'yellow', 'color': 'yellow', 'type': 'kettlebell', 'qty': 6, 'lbs': 35, 'pts': 3, 'load': 2, 'offset': 120 }, { 'name': 'ten', 'color': 'black', 'type': 'plate', 'qty': 17, 'lbs': 10, 'pts': 1, 'load': 5, 'offset': 165 }, { 'name': 'fifteen', 'color': 'black', 'type': 'plate', 'qty': 19, 'lbs': 15, 'pts': 2, 'load': 3, 'offset': 210 }, { 'name': 'twentyfive', 'color': 'black', 'type': 'plate', 'qty': 16, 'lbs': 25, 'pts': 3, 'load': 3, 'offset': 255 }, { 'name': 'thirtyfive', 'color': 'black', 'type': 'plate', 'qty': 8, 'lbs': 35, 'pts': 4, 'load': 2, 'offset': 300 }, { 'name': 'fortyfive', 'color': 'black', 'type': 'plate', 'qty': 6, 'lbs': 45, 'pts': 5, 'load': 2, 'offset': 345 }, { 'name': 'bag', 'color': 'green', 'type': 'sandbag', 'qty': 1, 'lbs': 90, 'pts': 8, 'load': 1, 'offset': 400 }];

function getTotalQty(arr) {
  var total = 0;
  arr.forEach(function (w) {
    total = total + w['qty'];
  });
  return total;
}

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

// Define moving load animation
var Load = {
  movecircle: function movecircle(delay) {
    var circle = paper.circle(30, this.offset, 20).attr({
      fill: this.color,
      "stroke-width": 2,
      stroke: "black"
    }).animate({
      cx: 450
    }, delay);
  }
};

function gruntGame(player) {
  var p1 = player;
  var L1 = Object.create(Load);
  var selectLoad = 0;
  var tripTotal = 0;
  var startQty = getTotalQty(weights);
  var finishQty = 0;
  var startAreaWeight = getTotalLbs(weights);
  var finishAreaWeight = 0;
  var frames = 500;
  (function loop() {
    setTimeout(function () {
      selectLoad = p1.pickLoad();
      console.log("----pickLoad returns: " + selectLoad);
      if (weights[selectLoad].qty > 0) {
        tripTotal = weights[selectLoad].lbs * weights[selectLoad].load;
        weights[selectLoad].qty -= weights[selectLoad].load;
        console.log("Weight at start area " + startAreaWeight);
        console.log("Weight at finish area " + finishAreaWeight);
        console.log("player1 selects " + weights[selectLoad].name);
        if (startAreaWeight > 0) {
          L1.offset = weights[selectLoad].offset;
          L1.color = weights[selectLoad].color;
          L1.movecircle(frames * 1.3);
          loop();
        }
        startAreaWeight -= tripTotal;
        finishAreaWeight += tripTotal;
        // console.log(weights);
      } else {
          console.log("Selectin new load");
          loop();
        }
    }, frames);
  })();
}

// start game
gruntGame(player1);