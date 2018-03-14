var IdCard = require('./index');
var card = '421102910512018';
var cardInfo = new IdCard(card);

console.log(cardInfo);
console.log(cardInfo.repair());