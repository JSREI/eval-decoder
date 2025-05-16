/**
 * eval-decoder.js
 * 对eval加密过的JS代码进行解密的工具函数
 * 
 * GitHub: https://github.com/JSREI/eval-decoder
 */

// 保存原始的eval函数
const evalHolder = window.eval;

// 重写eval函数以返回代码而不是执行它
window.eval = function (jsCode) {
    return jsCode;
};

/**
 * 获取当前语言设置
 * @returns {string} 当前语言代码 'zh' 或 'en'
 */
function getCurrentLanguage() {
    // 从window对象获取currentLang（在main.js中设置）
    // 如果未设置，则默认为中文
    return window.currentLang || 'zh';
}

/**
 * 对eval加密过的JS代码进行解密
 * @param {String} evalJsCode - 要解密的eval加密代码
 * @returns {String} - 解密后的代码
 */
function evalDecode(evalJsCode) {
    // 移除开头的eval以避免重复执行
    evalJsCode = evalJsCode.replace(/^eval/, "");
    
    try {
        return evalHolder.call(window, evalJsCode);
    } catch (e) {
        const lang = getCurrentLanguage();
        console.error(lang === 'zh' ? "解密失败:" : "Decryption failed:", e);
        // 使用当前语言对应的错误信息
        const errorPrefix = lang === 'zh' ? "解密失败: " : "Decryption failed: ";
        return errorPrefix + e.message;
    }
}

/**
 * 加载示例代码
 */
function loadExampleCode() {
    return `eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('0.1("2");',3,3,'console|log|CC11001100'.split('|'),0,{}))`;
} 