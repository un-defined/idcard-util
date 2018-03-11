
// TODO: 兼容15位
(function () {

    function IdCard(card) {
        if (['string', 'number'].indexOf(typeof card) === -1) return false; 
        // TODO: 类型校验
        this._card = card.toString();
        this._provinceCode = card.substr(0, 2);     // 省份代码
        this._cityCode = card.substr(2, 2);         // 城市代码
        this._districtCode = card.substr(4, 2);     // 区县代码
        this._birthCode = card.substr(6, 8);        // 出生年月日
        this._policeCode = card.substr(14, 2);      // 所在地派出所代码
        this._sexCode = card.substr(16, 1);         // 性别
        this._parityCode = card.charAt(17);         // 校验码
        this._isValid = _isValid(this._card);       // 是否是有效证件
    }

    IdCard.prototype.getLastChar = function() {
        return _getLastChar(this._card);
    }

    IdCard.prototype.idValid = function() {
        return this._isValid;
    }

    var _checkFormat = function (card) {
        // TODO: 参数校验: 17或18位数字字符串，生日校验，地址编码
        
        // 最后一位必须为数字或者 'X'
        var pre17Char = card.substr(0, 17);      // 证件前17位
        var lastChar = card.charAt(17);          // 第十八位的值
        if (!/^(\d|X)$/.test(lastChar)) return false;

        return true;

    }

    /**
     * 根据前17位计算出第18位，公式：∑(ai×Wi)(mod 11)
     * @param {String} num 17或18位数字字符串
     * @return {String | Boolean}
     */
    var _getLastChar = function (num) {
        // TODO: 校验
        
        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];   //加权因子
        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];                     //校验位
        var sum = 0;
        var ai = 0;
        var wi = 0;
        var last = '';

        for (var i = 0; i < 17; i++) {
            ai = num[i];
            wi = factor[i];
            sum += ai * wi;
        }
        return last = parity[sum % 11];
    }

    var _isValid = function(card) {
        if (!_checkFormat(card)) return false;
        if (_getLastChar(card).toString() !== card.charAt(17)) return false;
        return true;
    }

    if (typeof exports !== 'undefined' || (typeof module !== 'undefined' && module.exports)) {
        module.exports = IdCard;
    } else if (typeof define === 'function' && define.amd) {
        define('idCard', [], function () {
            return IdCard;
        });
    } else if (typeof define === 'function' && define.cmd) {
        define(function () {
            return IdCard;
        })
    } else {
        window.idCard = IdCard;
    }

})();