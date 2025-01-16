document.addEventListener('DOMContentLoaded', () => {
    const appidInput = document.getElementById('appid');
    const keyInput = document.getElementById('key');
    const saveButton = document.getElementById('saveButton');

    // 加载保存的 API 信息
    chrome.storage.sync.get(['appid', 'key'], (result) => {
        if (result.appid) {
            appidInput.value = result.appid;
        }
        if (result.key) {
            keyInput.value = result.key;
        }
    });

    // 保存 API 信息
    saveButton.addEventListener('click', () => {
        const appid = appidInput.value.trim();
        const key = keyInput.value.trim();
        
        if (appid && key) {
            chrome.storage.sync.set({ appid, key }, () => {
                alert('API 配置已保存！');
            });
        } else {
            alert('请输入有效的 APP ID 和密钥！');
        }
    });
}); 