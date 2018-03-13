// Doc: https://jingyan.baidu.com/article/7f41ececff944a593d095c8c.html
// http://blog.csdn.net/yingms/article/details/53340532

// TODO: 兼容15位
(function () {

    var utils = require('./lib/utils');

    var CARD_REG = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // var CARD_REG_STRICT = /^\d{6}((?:19|20)((?:\d{2}(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:\d{2}(?:0[13456789]|1[012])(?:0[1-9]|[12]\d|30))|(?:\d{2}02(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[48]|[2468][048]|[13579][26])0229)))\d{2}(\d)[xX\d]$/;
    var CARD_SPLITE_REG = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    var CITY_CODE = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ' };

    function IdCard(card) {

        this._card = card;
        this._isValid = this.isValid();
        if (!this._isValid.result) return false;

        this._card = String(card).toUpperCase();
        var cardSplit = this._card.match(CARD_SPLITE_REG);

        this._areaCode = cardSplit[1];              // 地址码
        this._yearCode = cardSplit[2];              // 出生年
        this._monthCode = cardSplit[3];             // 出身月
        this._dayCode = cardSplit[4];               // 出生日
        this._sequenceCode = cardSplit[5];          // 顺序码
        this._parityCode = cardSplit[6];            // 校验码
    }

    IdCard.prototype.getLastChar = function() {
        return utils.getLastChar(this._card);
    };

    /**
     * 获取性别
     * @returns {Object} 性别信息
     * @prop {Number} sex 性别代码  1: 男  0: 女
     * @prop {String} desc 性别描述
     * @prop {String} desc_cn 性别中文描述
     */
    IdCard.prototype.getSex = function() {
        var code = this._sequenceCode.charAt(2) % 2;
        return {
            sex: code,
            desc: ['female', 'male'][code],
            desc_cn: ['女', '男'][code]
        };
    };

    /**
     * 获取生日 TODO: 日期格式化功能
     * @param {String} format 日期格式化的格式
     * @returns {Date} Date 类型时间
     */
    IdCard.prototype.getBirthDay = function(format) {
        return new Date(this._yearCode, this._monthCode - 1, this._dayCode);
    };

    /**
     * 获取年龄
     * @returns {Number} 年龄
     */
    IdCard.prototype.getAge = function() {
        var birthDate = this.getBirthDay();
        var nowDate = new Date();
        var age = nowDate.getFullYear() - birthDate.getFullYear();

        if (nowDate.getMonth() < birthDate.getMonth() || (nowDate.getMonth() === birthDate.getMonth() && nowDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    
    IdCard.prototype.genRandom = function(opts) {
        var area = opts.area;
        var date = opts.date;

        
    };

    // 15 to 18
    IdCard.prototype.upgrade = function() {
        
    };

    // 修复最后一位
    IdCard.prototype.repair = function() {

    };

    IdCard.prototype.isValid = function() {

        var card = this._card;
        
        // 数据类型校验
        if (['string', 'number'].indexOf(typeof card) === -1) {
            return {
                result: false,
                reason: '数据类型错误'
            };
        }

        // 正则校验格式
        if (!CARD_REG.test(card)) {
            return {
                result: false,
                reason: '正则校验失败'
            };
        }

        var cardSplit = String(card).match(CARD_SPLITE_REG);
        var birthDate = String(card).substr(6, 8);

        // 校验省份码
        if (!CITY_CODE[cardSplit[0].substr(0, 2)]) {
            return {
                result: false,
                reason: '地址编码错误'
            };
        }

        // 生日合法性校验
        if (!utils.checkDate(birthDate)) {
            return {
                result: false,
                reason: '生日校验失败'
            };
        }

        // 校验传入的第18位与计算出来的校验码是否一致
        if (String(utils.getLastChar(card + '')) !== cardSplit[6].toUpperCase()) {
            return {
                result: false,
                reason: '校验码错误'
            };
        }
        
        return {
            result: true,
            reason: ''
        };
    };

    if (typeof exports !== 'undefined' || (typeof module !== 'undefined' && module.exports)) {
        module.exports = IdCard;
    } else if (typeof define === 'function' && define.amd) {
        define('idCard', [], function () {
            return IdCard;
        });
    } else if (typeof define === 'function' && define.cmd) {
        define(function () {
            return IdCard;
        });
    } else {
        window.idCard = IdCard;
    }

})();