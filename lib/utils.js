var DATE_REG = /^((?:19|20)((?:\d{2}(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:\d{2}(?:0[13456789]|1[012])(?:0[1-9]|[12]\d|30))|(?:\d{2}02(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[48]|[2468][048]|[13579][26])0229)))$/;

var utils = {

    isLeapYear: function (year) {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    },

    randomNum: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    randomNumString: function (len) {
        var l = len;
        var result = '';
        while (l-- > 0) {
            result += utils.randomNum(0, 9);
        }
        return result;
    },

    randomDate: function (duration) {
        var thisYear = new Date().getFullYear();
        var minYear = thisYear - (duration || 200);
        var randomYear = utils.randomNum(minYear, thisYear);
        var randomMonth = utils.randomNum(1, 12);
        var maxDay = 31;

        switch (randomMonth) {
            case 2:
                maxDay = utils.isLeapYear(randomYear) ? 29 : 28;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                maxDay = 30;
                break;
            default:
                break;
        }
        var randomDay = utils.randomNum(1, maxDay);
        return randomYear + '' +
            (randomMonth < 10 ? '0' + randomMonth : randomMonth) + 
            (randomDay < 10 ? '0' + randomDay : randomDay);
    },

    /**
     * 校验是否是合法日期
     * TODO: 正则判断不够健全，闰年判断
     * @param {String|Number} date 日期： 19890125 | '19890125'
     */
    checkDate: function (date) {
        if (['string', 'number'].indexOf(typeof date) === -1 || !DATE_REG.test(date)) {
            return false;
        }

        var dateStr = String(date);
        var dateDate = new Date(dateStr.substr(0, 4), dateStr.substr(4, 2) - 1, dateStr.substr(6));

        if (dateDate > new Date()) return false;

        return true;
    },

    /**
     * 根据前17位计算出第18位，公式：∑(ai×Wi)(mod 11)
     * @param {String} num 17或18位数字字符串
     * @returns {String | Boolean}
     */
    getParityCode: function (num) {

        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验位
        var sum = 0;
        var ai = 0;
        var wi = 0;
        var i = 0;

        for (; i < 17; i++) {
            ai = num[i];
            wi = factor[i];
            sum += ai * wi;
        }
        return parity[sum % 11];
    },

    /**
     * 计算年龄
     * @returns {Date} 生日
     */
    getAge: function (date) {
        var nowDate = new Date();
        var age = nowDate.getFullYear() - date.getFullYear();

        if (nowDate.getMonth() < date.getMonth() || (nowDate.getMonth() === date.getMonth() && nowDate.getDate() < date.getDate())) {
            age--;
        }
        return age;
    }

};

module.exports = utils;