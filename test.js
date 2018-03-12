var IdCard = require('./index');
var card = '42110219910512018X';
var cardInfo = new IdCard(card);

console.log(cardInfo.getAge());