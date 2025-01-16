let translateButton = null;
let resultPopup = null;

// 界面文本配置
const i18n = {
    zh: {
        translate: '翻译帖子',
        hide: '收起翻译',
        error: '翻译失败',
        networkError: '翻译失败，请检查网络连接',
        unknownError: '未知错误'
    },
    en: {
        translate: 'Translate',
        hide: 'Hide Translation',
        error: 'Translation failed',
        networkError: 'Translation failed, please check your network connection',
        unknownError: 'Unknown error'
    }
};

// 获取用户界面语言
function getUserLanguage() {
    // 优先使用网页的语言设置
    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang.toLowerCase().startsWith('zh')) {
        return 'zh';
    }
    
    // 其次使用浏览器的语言设置
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang && browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

// 获取当前语言的文本
function getText(key) {
    const lang = getUserLanguage();
    return i18n[lang][key];
}

// 创建翻译按钮
function createTranslateButton() {
    const button = document.createElement('div');
    button.className = 'xhs-translate-button';
    button.textContent = getText('translate');
    button.style.cssText = `
        display: inline-block;
        padding: 2px 6px;
        margin-top: 4px;
        margin-bottom: 4px;
        background: transparent;
        color: #4B9EFF;
        border: none;
        cursor: pointer;
        font-size: 13px;
        position: relative;
        text-decoration: none;
    `;
    return button;
}

// 创建翻译结果元素
function createTranslateResult() {
    const result = document.createElement('div');
    result.className = 'xhs-translate-result';
    result.style.cssText = `
        margin-top: 2px;
        font-size: 13px;
        color: #666;
        display: none;
        line-height: 1.4;
    `;
    return result;
}

// 查找所有评论
function findComments() {
    console.log('Finding comments...');
    const comments = document.querySelectorAll('div[id^="comment-"]');
    console.log('Found comments:', comments.length);
    return Array.from(comments);
}

// 检查元素是否在视图中
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 使用 Intersection Observer 监听评论可见性
function createCommentObserver() {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const commentElement = entry.target;
                // 检查是否已经添加了翻译功能
                if (!commentElement.querySelector('.xhs-translate-button')) {
                    addTranslationToComment(commentElement);
                }
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });
}

// 处理评论
function processComments() {
    console.log('Processing comments...');
    const comments = findComments();
    console.log('Found comments:', comments.length);
    
    // 创建 Intersection Observer
    const observer = createCommentObserver();
    
    // 观察每个评论
    comments.forEach(comment => {
        if (!comment.querySelector('.xhs-translate-button')) {
            observer.observe(comment);
        }
    });
}

// 添加翻译功能到评论
function addTranslationToComment(commentElement) {
    // 检查是否已经添加过翻译按钮
    if (commentElement.querySelector('.xhs-translate-button')) {
        return;
    }

    console.log('Processing comment:', commentElement.id);

    // 获取评论文本内容的 span 元素
    const textSpan = commentElement.querySelector('.content > .note-text > span');
    if (!textSpan) {
        console.log('Text span not found in comment:', commentElement.id);
        return;
    }

    // 获取评论文本内容
    const commentText = textSpan.textContent.trim();
    if (!commentText) {
        console.log('No text content found in comment:', commentElement.id);
        return;
    }

    console.log('Found comment text:', commentText);

    // 创建翻译按钮和结果显示区
    const translateButton = createTranslateButton();
    const translateResult = createTranslateResult();
    let isTranslated = false;
    let translatedText = '';

    // 获取评论内容区域
    const contentDiv = commentElement.querySelector('.content');
    if (!contentDiv) {
        console.log('Content div not found');
        return;
    }

    // 创建一个容器来包装翻译按钮和结果
    const translationContainer = document.createElement('div');
    translationContainer.style.cssText = `
        margin-top: 4px;
    `;

    // 将翻译按钮和结果添加到容器中
    translationContainer.appendChild(translateButton);
    translationContainer.appendChild(translateResult);

    // 将容器插入到评论内容的后面
    contentDiv.appendChild(translationContainer);

    // 执行翻译
    const doTranslate = () => {
        if (isTranslated) return;

        const sourceLang = detectLanguage(commentText);
        const targetLang = sourceLang === 'zh' ? 'en' : 'zh';

        try {
            chrome.runtime.sendMessage({
                action: 'translate',
                text: commentText,
                sourceLang: sourceLang,
                targetLang: targetLang
            }, response => {
                if (response && response.success) {
                    translatedText = response.result;
                    translateResult.textContent = translatedText;
                    translateResult.style.display = 'block';
                    translateButton.textContent = getText('hide');
                    isTranslated = true;
                } else {
                    console.error('Translation failed:', response?.error);
                }
            });
        } catch (error) {
            console.error('Translation failed:', error);
        }
    };

    // 添加点击事件
    translateButton.onclick = () => {
        if (isTranslated) {
            // 如果已经翻译，则切换显示/隐藏
            translateResult.style.display = translateResult.style.display === 'none' ? 'block' : 'none';
            translateButton.textContent = translateResult.style.display === 'none' ? getText('translate') : getText('hide');
        } else {
            // 如果还没翻译，执行翻译
            doTranslate();
        }
    };

    // 自动执行翻译
    doTranslate();
}

// 检测语言类型
function detectLanguage(text) {
    const chineseRegex = /[\u4e00-\u9fa5]/;
    return chineseRegex.test(text) ? 'zh' : 'en';
}

// 监听页面变化
function observePageChanges() {
    console.log('Starting to observe page changes...');
    const observer = new MutationObserver((mutations) => {
        let shouldProcess = false;
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && // 元素节点
                    (node.id?.startsWith('comment-') || // 评论容器
                     node.querySelector?.('[id^="comment-"]'))) { // 包含评论的容器
                    shouldProcess = true;
                }
            });
        });

        if (shouldProcess) {
            console.log('Detected new comments, processing...');
            processComments();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 初始化
function initialize() {
    console.log('Initializing...');
    processComments();
    observePageChanges();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// 定期检查新评论
setInterval(processComments, 2000); 