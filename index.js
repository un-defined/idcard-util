// Doc: https://jingyan.baidu.com/article/7f41ececff944a593d095c8c.html
// http://blog.csdn.net/yingms/article/details/53340532

(function () {

    var utils = require('./lib/utils');

    var CARD_REG = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // var CARD_REG_STRICT = /^\d{6}((?:19|20)((?:\d{2}(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:\d{2}(?:0[13456789]|1[012])(?:0[1-9]|[12]\d|30))|(?:\d{2}02(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[48]|[2468][048]|[13579][26])0229)))\d{2}(\d)[xX\d]$/;
    var CARD_SPLITE_REG = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    var CITY_CODE = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ' };

    function IdCard(card) {

        this._card = card;
        if (/^\d{15}$/.test(card)) {
            this._card = this.repair().value;
        }
        
        this._isValid = _validateCard(this._card);
        if (!this._isValid.result) return false;

        this._card = String(this._card).toUpperCase();
        var cardSplit = this._card.match(CARD_SPLITE_REG);

        this._areaCode = cardSplit[1];              // 地址码
        this._yearCode = cardSplit[2];              // 出生年
        this._monthCode = cardSplit[3];             // 出身月
        this._dayCode = cardSplit[4];               // 出生日
        this._sequenceCode = cardSplit[5];          // 顺序码
        this._parityCode = cardSplit[6];            // 校验码
    }

    /**
     * 根据前17位计算出第18位
     */
    IdCard.prototype.getParityCode = function() {
        return utils.getParityCode(this._card);
    };

    /**
     * 获取性别
     * @return {Object} 性别信息
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
     * @return {Date} Date 类型时间
     */
    IdCard.prototype.getBirthDay = function(format) {
        return new Date(this._yearCode, this._monthCode - 1, this._dayCode);
    };

    /**
     * 获取年龄
     * @return {Number} 年龄
     */
    IdCard.prototype.getAge = function() {
        return utils.getAge(this.getBirthDay());
    };
    
    /**
     * 生产随机身份证号
     * TODO: 生成随机区域码
     * @param {Object} options 可配参数
     * @prop {String} area 行政区划代码
     * @prop {String} date 八位生日字符串
     */
    IdCard.prototype.genRandom = function(options) {
        var opts = options || {};
        var area = opts.area || '440300';               // 行政区划代码
        var date = opts.date || utils.randomDate();     // 生日
        var sequenceCode = utils.randomNumString(3);    // 顺序码

        var pre17chars = area + date + sequenceCode;
        var parityCode = utils.getParityCode(pre17chars);
        return pre17chars + parityCode;
    };

    /**
     * 修复卡号，15位到18位转换、17位补最后一位、校正第18位
     * @return {Object}
     * @prop {String} result 修复结果 'success' | 'fail'
     * @prop {String} reason 描述
     * @prop {String} value 修复后的值
     */
    IdCard.prototype.repair = function() {
        var card = this._card;
        var newCard = '';

        if (!/(^\d{15}$)|(^\d{17}$)|(^\d{17}(\d|X|x)$)|(^\d{18}$)/.test(card)) {
            return {
                result: 'fail',
                reason: '正则校验失败',
                value: card
            };
        }

        if (card.length === 15) {
            card = card.substr(0, 6) + '19' + card.substr(6);
        }
        
        newCard = card.substr(0, 17) + utils.getParityCode(card);

        if (!_validateCard(newCard)) {
            return {
                result: 'fail',
                reason: '新证件号未通过合法校验',
                value: newCard
            };
        }

        return {
            result: 'success',
            reason: '修复成功',
            value: newCard
        };
    };

    /**
     * 校验卡号是否合法
     * @param {Any} card 证件号
     * @return {Object} 校验结果
     * @prop {Boolean} result 是否通过
     * @prop {String} reason 校验描述
     */
    var _validateCard = function(card) {

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

        var cardString = String(card).toUpperCase();
        var provinceCode = cardString.substr(0, 2);
        var birthDate = cardString.substr(6, 8);
        
        // 校验省份码
        if (!CITY_CODE[provinceCode]) {
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
        if (String(utils.getParityCode(card + '')) !== cardString.charAt(17)) {
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