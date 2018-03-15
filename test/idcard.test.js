import test from 'ava';

var IdCard = require('../lib');
var card = '42110219910512018X';
var card2 = '421102910512018';

test(t => {
    t.deepEqual(new IdCard(card), new IdCard(card2));
});