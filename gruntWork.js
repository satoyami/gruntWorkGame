// this is a game about moving weight
// quickly in teams

var people = 3;
var timecap = 3;
var distance = 60;

var weights = [
  {'name':'pink-kb','qty':13,'lbs':15,'pts':1},
  {'name':'blue-kb','qty':12,'lbs':25,'pts':2},
  {'name':'yellow-kb','qty':6,'lbs':35,'pts':3},
  {'name':'plate10','qty':17,'lbs':10,'pts':1},
  {'name':'plate15','qty':19,'lbs':15,'pts':2},
  {'name':'plate25','qty':16,'lbs':25,'pts':3},
  {'name':'plate35','qty':8,'lbs':35,'pts':4},
  {'name':'plate45','qty':6,'lbs':45,'pts':5},
  {'name':'bag1','qty':1,'lbs':90,'pts':8}
];

function getTotalWeight(arr){
  var total = 0;
  arr.forEach(function(w){
    total = total + (w['qty'] * w['lbs'])
  });
  return total;
}

function gruntWork(pplnum,weight,dist,time){
  var watts = 0;
  var tweight = getTotalWeight(weight);
  var force = (tweight * dist)/time;
  return force/time;
}

weights.forEach(function(w){
  console.log(w);
});

console.log("Total weight moved per round " + getTotalWeight(weights) + 'lbs');
console.log("Power output per round " + gruntWork(people,weights,distance,timecap) + 'watts');
//console.log("Total watts per round " + getTotalWeight(weights));
