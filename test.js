var IdCard = require('./index');
var card = '42110219910512018X';
var cardInfo = new IdCard(card);

console.log(cardInfo);
console.log(cardInfo.getParityCode());
console.log(cardInfo.getSex());
console.log(cardInfo.getAge());
console.log(cardInfo.isValid());
console.log(cardInfo.genRandom());