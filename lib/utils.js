var DATE_REG = /^((?:19|20)((?:\d{2}(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:\d{2}(?:0[13456789]|1[012])(?:0[1-9]|[12]\d|30))|(?:\d{2}02(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[48]|[2468][048]|[13579][26])0229)))$/;

var utils = {

    /**
     * 判断闰年
     * @param {String|Number} year 需校验的年份
     * @return {Boolean} 是否闰年
     */
    isLeapYear: function (year) {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    },

    /**
     * 生成范围内随机数
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @return {Number} 随机数
     */
    randomNum: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /**
     * 生成特定位数随机数字字符串
     * @param {Number} len 字符串长度
     * @return {String} 生成结果
     */
    randomNumString: function (len) {
        var l = len;
        var result = '';
        while (l-- > 0) {
            result += utils.randomNum(0, 9);
        }
        return result;
    },

    /**
     * 随机生成范围内日期
     * @param {Number} duration 过去多少年范围内
     * @return {String} 生成日期字符串 eg: '19890503'
     */
    randomDate: function (duration) {
        var thisYear = new Date().getFullYear();
        var minYear = thisYear - (duration || 200);
        var randomYear = utils.randomNum(minYear, thisYear);
        var randomMonth = utils.randomNum(1, 12);
        var maxDay;

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
                maxDay = 31;
                break;
        }
        var randomDay = utils.randomNum(1, maxDay);
        return randomYear + '' +
            (randomMonth < 10 ? '0' + randomMonth : randomMonth) +
            (randomDay < 10 ? '0' + randomDay : randomDay);
    },

    /**
     * 校验是否是合法日期
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
    },

    /**       
     * 将 Date 转化为指定格式的String       
     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符       
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       
     * eg:       
     * formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2018-03-21 09:35:21.112            
     * formatDate(new Date(), "yyyy-M-d h:m:s.S") ==> 2018-3-21 9:35:21.112       
     */
    formatDate: function (date, format) {
        var o = {
            'M+': date.getMonth() + 1,                                          // 月份           
            'd+': date.getDate(),                                               // 日           
            'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,       // 小时           
            'H+': date.getHours(),                                              // 小时           
            'm+': date.getMinutes(),                                            // 分           
            's+': date.getSeconds(),                                            // 秒           
            'q+': Math.floor((date.getMonth() + 3) / 3),                        // 季度           
            'S': date.getMilliseconds()                                         // 毫秒           
        };
        var fmt = format;
        var k;

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }

        return fmt;
    }

};


module.exports = utils;