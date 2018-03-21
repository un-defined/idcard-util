import test from 'ava';

var Util = require('../lib/utils');

test('测试闰年 -- 2000', t => {
    t.true(Util.isLeapYear(2000));
});

test('测试闰年 -- 2016', t => {
    t.true(Util.isLeapYear(2016));
});

test('测试闰年 -- 2100', t => {
    t.false(Util.isLeapYear(2100));
});

test('校验日期 -- Date()', t => {
    t.false(Util.checkDate(new Date()));
});

test('校验日期 -- 45678912', t => {
    t.false(Util.checkDate('45678912'));
});

test('校验日期 -- 20181012', t => {
    t.false(Util.checkDate('20181012'));
});

test('校验日期 -- 20181812', t => {
    t.false(Util.checkDate('20181812'));
});

test('校验日期 -- 20901012', t => {
    t.false(Util.checkDate('20901012'));
});

test('校验日期 -- 20000230', t => {
    t.false(Util.checkDate('20000230'));
});

test('校验日期 -- 20000202', t => {
    t.true(Util.checkDate('20000202'));
});

test('计算年龄 -- 1989/5/12', t => {
    t.is(Util.getAge(new Date('1989/5/12')), 28);
});

test('计算年龄 -- 1989/3/12', t => {
    t.is(Util.getAge(new Date('1989/3/12')), 29);
});

test('计算年龄 -- 1989/3/22', t => {
    t.is(Util.getAge(new Date('1989/3/22')), 28);
});

test('格式化日期', t => {
    t.is(Util.formatDate(new Date('2018/03/25 13:12:23'), 'yyyy - MM - dd'), '2018 - 03 - 25');
});

test('格式化日期', t => {
    t.is(Util.formatDate(new Date('2018/03/25 13:12:23'), 'yy - M - d'), '18 - 3 - 25');
});

test('格式化日期', t => {
    t.is(Util.formatDate(new Date('2018/03/25 13:12:23.123'), 'yyyy - M - d hh:mm:ss.S'), '2018 - 3 - 25 01:12:23.123');
});

test('格式化日期', t => {
    t.is(Util.formatDate(new Date('2018/03/25 13:12:23'), 'yyyy - M qq 季度'), '2018 - 3 01 季度');
});