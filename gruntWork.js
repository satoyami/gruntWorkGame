// this is a game about moving weight
// quickly in teams

/*
 * Definitions
*/
var people = 3; // number of people per team
var timecap = 180; // seconds in 3 minutes
var distance = 60; // distance in feet
var meter = 3.28084; // conversion of 1 foot to meters
var kg = 2.20462; // conversion of kg to 1 pound

var Player = function(name,agility){
  this.name = name;
  this.agility = agility;
}

/*
 * amount of weight to move
 * load - how many units of weight type
 * can be moved at a time per person
 */
var weights = [
  {'name':'pink','type':'kettlebell','qty':13,'lbs':15,'pts':1,'load':2},
  {'name':'blue','type':'kettlebell','qty':12,'lbs':25,'pts':2,'load':2},
  {'name':'yellow','type':'kettlebell','qty':6,'lbs':35,'pts':3,'load':2},
  {'name':'ten','type':'plate','qty':17,'lbs':10,'pts':1,'load':5},
  {'name':'fifteen','type':'plate','qty':19,'lbs':15,'pts':2,'load':3},
  {'name':'twentyfive','type':'plate','qty':16,'lbs':25,'pts':3,'load':3},
  {'name':'thirtyfive','type':'plate','qty':8,'lbs':35,'pts':4,'load':2},
  {'name':'fortyfive','type':'plate','qty':6,'lbs':45,'pts':5,'load':2},
  {'name':'bag','type':'sandbag','qty':1,'lbs':90,'pts':8,'load':1}
];

/*
 * Game Constants
*/
function getTotalLbs(arr){
  var total = 0;
  arr.forEach(function(w){
    total = total + (w['qty'] * w['lbs'])
  });
  return total;
}

function getTotalKgs(arr){
  var total = 0;
  arr.forEach(function(w){
    total = total + (w['qty'] * (w['lbs'] / kg))
  });
  return total;
}

function gruntWork(weight,dist,time){
  var mass = getTotalKgs(weight);
  var acceleration = (dist/meter) / Math.pow(time,2);
  var force = (mass * (acceleration));
  return force;
}

function gruntGame(grunt1,grunt2,grunt3){
  console.log(grunt1.name+' '+grunt2.name+' '+grunt3.name);
}

var player1 = Object.create(Player,{'name':{value:'Bob'},'agility':{value:5}});
var player2 = Object.create(Player,{'name':{value:'Sally'},'agility':{value:3}});
var player3 = Object.create(Player,{'name':{value:'Tim'},'agility':{value:6}});

gruntGame(player1,player2,player3)


console.log("Total weight moved per round " + getTotalLbs(weights) + ' lbs');
console.log("Total weight moved per round " + getTotalKgs(weights) + ' kgs');
console.log("Power output per round " + gruntWork(weights,distance,timecap) + ' newtons');
console.log(Player.isPrototypeOf(player1));
console.log(player1.name + " " + player1.agility);
