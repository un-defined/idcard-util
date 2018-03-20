import test from 'ava';

var IdCard = require('../lib');
var card1 = '42110219910512018X';
var card2 = '421102910512018';
var cardInfo1 = new IdCard(card1);
var cardInfo2 = new IdCard(card2);

test(t => {
    t.deepEqual(cardInfo1, cardInfo2);
});

test(t => {
    t.is(cardInfo1.getAge(), cardInfo2.getAge());
});

test(t => {
    t.is(cardInfo1.getAge(), 26);
});

test(t => {
    t.deepEqual(cardInfo1.getBirthDay(), new Date('1991/05/12'));
});

test(t => {
    t.regex(cardInfo1.genRandom(), /^440300\d{11}(\d|X)$/);
});

test(t => {
    t.is(cardInfo1.getParityCode(), 'X');
});

test(t => {
    t.deepEqual(cardInfo1.getSex(), {
        sex: 0,
        desc: 'female',
        desc_cn: '女'
    });
});