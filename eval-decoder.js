
const evalHolder = window.eval;
window.eval = function (jsCode) {
    return jsCode;
}

/**
 * 对eval加密过的JS代码进行解密
 * @param evalJsCode {String}
 */
function evalDecode(evalJsCode) {
    return evalHolder.apply(this, evalJsCode)
}

