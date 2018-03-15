var IdCard = require('./lib/index');
var card = '42110219910512018X';
var cardInfo = new IdCard(card);

console.log(cardInfo.genRandom());
console.log(cardInfo.repair());