var IdCard = require('./index');
var card = '421102199105120518';
var cardInfo = new IdCard(card);

console.log(cardInfo);
console.log(cardInfo.getLastChar());
console.log(cardInfo.getSex());
console.log(cardInfo.isValid());