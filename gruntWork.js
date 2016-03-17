// this is a game about moving weight
// quickly in teams

var people = 8

var weights = [
  {'name':'pink-kb','qty':13,'lbs':15},
  {'name':'blue-kb','qty':12,'lbs':25},
  {'name':'yellow-kb','qty':6,'lbs':35},
  {'name':'plate10','qty':17,'lbs':10},
  {'name':'plate15','qty':19,'lbs':15},
  {'name':'plate25','qty':16,'lbs':25},
  {'name':'plate35','qty':8,'lbs':35},
  {'name':'plate45','qty':6,'lbs':45},
  {'name':'bag1','qty':1,'lbs':90}
];

function getTotalWeight(arr){
  var total = 0;
  arr.forEach(function(w){
    total = total + (w['qty'] * w['lbs'])
  });
  return total;
}

weights.forEach(function(w){
  console.log(w['name']);
});

console.log(getTotalWeight(weights));
