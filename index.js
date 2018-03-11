
(function () {

    var _idCard = {};

    if (typeof exports !== 'undefined' || (typeof module !== 'undefined' && module.exports)) {
        module.exports = outPut;
    } else if (typeof define === 'function' && define.amd) {
        define('idCard', [], function () {
            return outPut;
        });
    } else if (typeof define === 'function' && define.cmd) {
        define(function () {
            return outPut;
        })
    } else {
        root.idCard = outPut;
    }

})();