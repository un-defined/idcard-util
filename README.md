## idcard-util

[![Build Status](https://travis-ci.org/un-defined/idcard-util.svg?branch=master)](https://travis-ci.org/un-defined/idcard-util)
[![Coverage Status](https://coveralls.io/repos/github/un-defined/idcard-util/badge.svg?branch=master)](https://coveralls.io/github/un-defined/idcard-util?branch=master)

中国公民身份证工具类

## Installation

```javascript
npm i idcard-util
```

## Usage

```javascript
var IdCard = require('idcard');
var cardInfo = IdCard('42110219910512018X');

console.log(cardInfo);
```

If this is a valid card, it will show the information about this card.
```javascript
IdCard {
  _card: '42110219910512018X',
  _isValid: { result: true, reason: '' },
  _areaCode: '421102',
  _yearCode: '1991',
  _monthCode: '05',
  _dayCode: '12',
  _sequenceCode: '018',
  _parityCode: 'X' }
```

Otherwise the error message will be displayed

```javascript
IdCard {
  _card: '421102199155120188',
  _isValid: { result: false, reason: '生日校验失败' } }
```

## Methods

**getParityCode()** {Number|String}  
Calculate the parity code according to the first 17 digits

```javascript
console.log(cardInfo.getParityCode());

> X
```

**getSex()** {Object}  
Return the sex of the card owner

```javascript
console.log(cardInfo.getSex());

> { sex: 0, desc: 'female', desc_cn: '女' }
```

**getBirthDay()** {Date}  
Return the birthday of the card owner

```javascript
console.log(cardInfo.getBirthDay());

> 1991-05-11T16:00:00.000Z
```

**getAge()** {Number}  
Return the age of the card owner

```javascript
console.log(cardInfo.getAge());

> 26
```

**genRandom()** {String}  
Generate a random idcard number

```javascript
console.log(cardInfo.getAge());

> 440300197505035517
```

**repair()** {String}  

1. Update the card number form first generation to the second generation.
2. Fill the 18th digit if it is missing.
3. Fix the 18th digit if it is wrong.

```javascript
console.log(cardInfo.repair());

> {
>   result: 'success',
>   reason: '修复成功',
>   value: '42110219910512018X'
> }
```

