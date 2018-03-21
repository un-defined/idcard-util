import test from 'ava';

var IdCard = require('../lib');
var card1 = '42110219910512018X';
var card2 = '421102910512018';
var cardInfo1 = new IdCard(card1);
var cardInfo2 = new IdCard(card2);

test('修复身份证', t => {
    t.deepEqual(cardInfo1, cardInfo2);
});

test('获取年龄', t => {
    t.is(cardInfo1.getAge(), 26);
});

test('获取生日', t => {
    t.deepEqual(cardInfo1.getBirthDay(), new Date('1991/05/12'));
});

test('获取生日（格式化）', t => {
    t.is(cardInfo1.getBirthDay('yyyy - MM - dd'), '1991 - 05 - 12');
});

test('生成随机身份证', t => {
    t.regex(cardInfo1.genRandom(), /^440300\d{11}(\d|X)$/);
});

test('生成随机身份证（带参数）', t => {
    t.notRegex(cardInfo1.genRandom({
        area: '110111',
        date: '19890228'
    }), /^440300\d{11}(\d|X)$/);
});

test('获取校验码', t => {
    t.is(cardInfo1.getParityCode(), 'X');
});

test('获取性别', t => {
    t.deepEqual(cardInfo1.getSex(), {
        sex: 0,
        desc: 'female',
        desc_cn: '女'
    });
});