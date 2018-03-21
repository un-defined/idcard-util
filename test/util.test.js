import test from 'ava';

var Util = require('../lib/utils');

test('测试闰年 -- 2000', t => {
    t.true(Util.isLeapYear(2000));
});

test('测试闰年 -- 2014', t => {
    t.false(Util.isLeapYear(2014));
});