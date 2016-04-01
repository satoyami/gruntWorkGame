// this is a game about moving weight
// quickly in teams
let paper = Raphael("paper",600,400)

/*
 * Global Variable Definitions
*/
const people = 3; // number of people per team
const timecap = 180; // seconds in 3 minutes
const distance = 60; // distance in feet
const meter = 3.28084; // conversion of 1 foot to meters
const kg = 2.20462; // conversion of kg to 1 pound
const gametime = 30000; // time in milliseconds

var distm = (dist) => dist / meter;

console.log(distm(distance));

// Player constructor object
var Player = function Player(name, agility) {
  this.name = name;
  this.agility = agility;
};

/*
 * amount of weight to move
 * load - how many units of weight type
 * can be moved at a time per person
 */
var weights = [
  { 'name': 'pink', 'type': 'kettlebell', 'qty': 13, 'lbs': 15, 'pts': 1, 'load': 2 },
  { 'name': 'blue', 'type': 'kettlebell', 'qty': 12, 'lbs': 25, 'pts': 2, 'load': 2 },
  { 'name': 'yellow', 'type': 'kettlebell', 'qty': 6, 'lbs': 35, 'pts': 3, 'load': 2 },
  { 'name': 'ten', 'type': 'plate', 'qty': 17, 'lbs': 10, 'pts': 1, 'load': 5 },
  { 'name': 'fifteen', 'type': 'plate', 'qty': 19, 'lbs': 15, 'pts': 2, 'load': 3 },
  { 'name': 'twentyfive', 'type': 'plate', 'qty': 16, 'lbs': 25, 'pts': 3, 'load': 3 },
  { 'name': 'thirtyfive', 'type': 'plate', 'qty': 8, 'lbs': 35, 'pts': 4, 'load': 2 },
  { 'name': 'fortyfive', 'type': 'plate', 'qty': 6, 'lbs': 45, 'pts': 5, 'load': 2 },
  { 'name': 'bag', 'type': 'sandbag', 'qty': 1, 'lbs': 90, 'pts': 8, 'load': 1 }
];

/*
 * Game Constants
*/
function getTotalLbs(arr) {
  let total = 0;
  arr.forEach(function (w) {
    total = total + w['qty'] * w['lbs'];
  });
  return total;
}

function getTotalKgs(arr) {
  let total = 0;
  arr.forEach(function (w) {
    total = total + w['qty'] * (w['lbs'] / kg);
  });
  return total;
}

function gruntWork(weight, dist, time) {
  let mass = getTotalKgs(weight);
  let acceleration = dist / meter / Math.pow(time, 2);
  let force = mass * acceleration;
  return force;
}

function move(delay){
  let rect = paper.rect(10, 10, 50, 50)
    .attr({
      fill: "45-#f00-#000",
      "stroke-width": 2,
      stroke: "yellow"
    })
    .animate({
      x: 400
    },delay,function(){
      console.log("rect")
    });
};

function gruntGame(){
  let weightMoved = getTotalLbs(weights);
  let frames = 1000;
  (function loop(){
    setTimeout(function(){
      console.log(weightMoved);
      if(weightMoved > 0){
        move(frames);
        loop();
      }
      weightMoved -= 100;
    },frames);
  })();
}

// add players
const player1 = Object.create(Player, { 'name': { value: 'Bob' }, 'agility': { value: 5 } });
const player2 = Object.create(Player, { 'name': { value: 'Sally' }, 'agility': { value: 3 } });
const player3 = Object.create(Player, { 'name': { value: 'Tim' }, 'agility': { value: 6 } });

// start game
gruntGame();

/*
console.log("Total weight moved per round " + getTotalLbs(weights) + ' lbs');
console.log("Total weight moved per round " + getTotalKgs(weights) + ' kgs');
console.log("Power output per round " + gruntWork(weights,distance,timecap) + ' newtons');
console.log(Player.isPrototypeOf(player1));
console.log(player1.name + " " + player1.agility);
*/
