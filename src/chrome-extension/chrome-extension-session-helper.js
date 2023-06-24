/* eslint-disable no-undef */
export const sendChatExtensionMessage = (message, response) => {
    chrome.sessions.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;
        const roomId = parseInt(url.match(/\d+/)[0]);
        chrome.cookies.get({ url, name: "bili_jct" }, (cookies) => {
            chrome.tabs.sendMessage(tabs[0].id, { cookies: cookies.value, ...message, roomId }, response);
        });
    });
}