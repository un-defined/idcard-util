var IdCard = require('./index');
var card = '42110219910512018X';
// var card = function() {};
// console.log(idCard.lastNum(card));
var cardInfo = new IdCard(card);

console.log(cardInfo); 
console.log(cardInfo.getLastChar()); 
console.log(cardInfo.idValid());