/**
 * 示例eval加密的代码
 *
 * @type {string}
 */
const EXAMPLE_EVAL_CODE = `eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('0.1("2");',3,3,'console|log|CC11001100'.split('|'),0,{}))`;

/**
 * 本地存储的Key
 */
const STORAGE_KEYS = {
    EVAL_CODE: 'JSREI-eval-decoder-eval_code-local-storage-key',
    LANGUAGE: 'JSREI-eval-decoder-language-key'
};

// 支持的语言
const SUPPORTED_LANGUAGES = ['zh', 'en'];

// 语言设置
const LANG = {
    zh: {
        title: "解密eval加密的代码",
        placeholder: "粘贴eval代码，比如：",
        decrypt: "eval解密",
        clear: "清空",
        loadExample: "加载示例加密代码",
        references: "参考链接:",
        groupTitle: "逆向技术交流群",
        scanToJoinGroup: "扫码加入逆向技术交流群：",
        wechatAlt: "加入微信群", 
        qrExpired: "如群二维码过期，可以加我个人微信，发送【逆向群】拉你进群：",
        personalWechatAlt: "个人微信",
        joinTelegram: "点此或扫码加入TG交流群：",
        telegramAlt: "Telegram群",
        githubLink: "GitHub - JSREI/eval-decoder",
        jsPackerLink: "JS Packer 压缩原理分析",
        projectDocLink: "项目文档",
        alertEmpty: "请在文本框内粘贴被Eval加密的JavaScript代码！",
        alertError: "执行报错了：",
        forkMe: "Star me on GitHub",
        bookmarkTitle: "收藏本页",
        bookmarkMessage: "请使用键盘快捷键 Ctrl+D (Windows/Linux) 或 Cmd+D (Mac) 将本页添加到收藏夹！"
    },
    en: {
        title: "Decrypt Eval Encoded JavaScript",
        placeholder: "Paste eval code, for example:",
        decrypt: "Decrypt",
        clear: "Clear",
        loadExample: "Load Example",
        references: "References:",
        groupTitle: "Reverse Engineering Technology Group",
        scanToJoinGroup: "Scan to join the reverse engineering group:",
        wechatAlt: "Join WeChat Group",
        qrExpired: "If the group QR code expires, add my WeChat and send [Reverse Group]:",
        personalWechatAlt: "Personal WeChat",
        joinTelegram: "Click here or scan to join Telegram group:",
        telegramAlt: "Telegram Group",
        githubLink: "GitHub - JSREI/eval-decoder",
        jsPackerLink: "JS Packer Compression Analysis",
        projectDocLink: "Project Documentation",
        alertEmpty: "Please paste the Eval encrypted JavaScript code in the text box!",
        alertError: "An error occurred: ",
        forkMe: "Star me on GitHub",
        bookmarkTitle: "Bookmark This Page",
        bookmarkMessage: "Please use keyboard shortcut Ctrl+D (Windows/Linux) or Cmd+D (Mac) to bookmark this page!"
    }
};

// 当前语言
let currentLang = 'zh';

// 将currentLang暴露给全局作用域
window.currentLang = currentLang;

/**
 * 检测用户浏览器语言
 * 返回检测到的语言代码，如果不支持则返回默认的'zh'
 */
function detectBrowserLanguage() {
    // 获取浏览器语言设置
    const browserLang = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
    
    // 判断是否为英文环境
    if (browserLang.startsWith('en')) {
        return 'en';
    }
    
    // 默认返回中文
    return 'zh';
}

/**
 * 从本地存储加载语言设置
 */
function loadLanguagePreference() {
    // 先尝试从本地存储获取
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        return savedLang;
    }
    
    // 如果没有保存过语言设置，则检测浏览器语言
    return detectBrowserLanguage();
}

/**
 * 保存语言设置到本地存储
 */
function saveLanguagePreference(lang) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
}

/**
 * 加载默认的eval加密示例代码
 */
function loadExampleEvalCode() {
    document.getElementById('eval_code').value = EXAMPLE_EVAL_CODE;
    saveEvalCode();
}

/**
 * 清空输入框
 */
function clearEvalCode() {
    document.getElementById('eval_code').value = '';
    saveEvalCode();
}

/**
 * 为文本输入框设置默认的示例代码
 */
function setPlaceholder() {
    const text = LANG[currentLang].placeholder + "\n" + EXAMPLE_EVAL_CODE;
    document.getElementById('eval_code').setAttribute("placeholder", text);
}

/**
 * 更新页面上所有文本元素的语言
 */
function updatePageTexts(lang) {
    // 更新页面标题
    document.title = lang === 'zh' ? 
        "JavaScript eval解密工具 - JSREI" : 
        "JavaScript Eval Decoder - JSREI";
    
    // 更新HTML文档的语言属性
    document.documentElement.setAttribute('lang', lang);
    
    // 更新标题
    document.querySelector('h1').innerText = LANG[lang].title;
    
    // 更新按钮文字，使用ID选择器更可靠
    document.getElementById('decrypt-btn').innerText = LANG[lang].decrypt;
    document.getElementById('clear-btn').innerText = LANG[lang].clear;
    document.getElementById('example-btn').innerText = LANG[lang].loadExample;
    
    // 更新收藏按钮title
    const bookmarkBtn = document.getElementById('add-favorite-btn');
    if (bookmarkBtn) {
        bookmarkBtn.title = LANG[lang].bookmarkTitle;
    }
    
    // 切换所有带语言标记的元素
    document.querySelectorAll('.lang-zh, .lang-en').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = 'block';
    });
    
    // 设置图片的alt文本
    const imgElements = document.querySelectorAll('.group-container img');
    if (imgElements.length >= 3) {
        imgElements[0].setAttribute('alt', LANG[lang].wechatAlt);
        imgElements[1].setAttribute('alt', LANG[lang].personalWechatAlt);
        imgElements[2].setAttribute('alt', LANG[lang].telegramAlt);
    }
    
    // 更新链接文本
    document.querySelector('.github-link').innerText = LANG[lang].githubLink;
    document.querySelector('.jspacker-link').innerText = LANG[lang].jsPackerLink;
    
    // 更新GitHub Ribbon
    const ribbon = document.getElementById('github-ribbon');
    if (ribbon) {
        ribbon.setAttribute('data-ribbon', LANG[lang].forkMe);
        ribbon.setAttribute('title', LANG[lang].forkMe);
        ribbon.innerText = LANG[lang].forkMe;
    }
    
    // 更新文本框placeholder
    setPlaceholder();
}

/**
 * 切换语言
 */
function switchLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    
    currentLang = lang;
    // 同步更新全局变量
    window.currentLang = lang;
    updatePageTexts(lang);
    saveLanguagePreference(lang);
}

/**
 * 执行解密
 */
function executeEval() {
    let evalCodeElt = document.getElementById('eval_code');
    let evalCode = evalCodeElt.value;
    
    if (!evalCode) {
        alert(LANG[currentLang].alertEmpty);
        return;
    }
    
    try {
        evalCodeElt.value = evalDecode(evalCode);
        saveEvalCode();
    } catch (e) {
        alert(LANG[currentLang].alertError + e);
    }
}

/**
 * 保存eval code到本地
 */
function saveEvalCode() {
    const evalCode = document.getElementById('eval_code').value || '';
    localStorage.setItem(STORAGE_KEYS.EVAL_CODE, evalCode);
}

/**
 * 从本地存储中恢复出来上次的输入
 */
function recoveryEvalCode() {
    const evalContent = localStorage.getItem(STORAGE_KEYS.EVAL_CODE);
    if (!evalContent) {
        return;
    }
    document.getElementById('eval_code').value = evalContent;
}

/**
 * 初始化页面
 */
function initializePage() {
    // 加载用户首选语言
    const previousLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    currentLang = loadLanguagePreference();
    
    // 更新页面文本
    updatePageTexts(currentLang);
    
    // 恢复上次输入的代码
    recoveryEvalCode();
    
    // 如果是首次访问或语言与上次不同，显示通知
    if (!previousLang) {
        const message = currentLang === 'zh'
            ? '根据您的浏览器设置，页面已显示为中文'
            : 'Based on your browser settings, the page is displayed in English';
        showNotification(message);
    }
}

/**
 * 显示简短的通知消息
 * @param {string} message - 要显示的消息
 * @param {number} duration - 显示时长(毫秒)
 */
function showNotification(message, duration = 3000) {
    // 检查是否已经存在通知元素
    let notification = document.querySelector('.notification');
    if (notification) {
        document.body.removeChild(notification);
    }
    
    // 创建通知元素
    notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    notification.style.color = '#fff';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

/**
 * 添加到收藏夹
 */
function addToFavorites() {
    const message = LANG[currentLang].bookmarkMessage;
    
    // 更新收藏按钮的title属性
    const bookmarkBtn = document.getElementById('add-favorite-btn');
    if (bookmarkBtn) {
        bookmarkBtn.title = LANG[currentLang].bookmarkTitle;
    }
    
    // 显示收藏提示
    showNotification(message, 5000);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', initializePage); 