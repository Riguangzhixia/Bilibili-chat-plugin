/* eslint-disable no-undef */
const container = document.createElement('div');
container.id = "chatSenderContainer";
document.getElementsByTagName("body")[0].appendChild(container);

let timerId;

const toFormData = (values) => {
    const formData = new FormData();
    if (values instanceof Object) {
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
    }
    return formData;
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.type) {
        case "sendChat": {
            const { text, delay, cookies, roomId } = msg;
            let postBody = {
                color: 16777215,
                fontsize: 25,
                mode: 1,
                msg: text,
                rnd: Date.now(),
                roomid: roomId,
                bubble: 0,
                csrf: cookies,
                room_type: 0,
                jumpfrom: 85001,
                csrf_token: cookies
            }
            let options = {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: toFormData(postBody)
            }
            fetch("https://api.live.bilibili.com/msg/send", options).then(response => response.json()).then(res => {
                setTimeout(() => {
                    clearInterval(timerId);
                    timerId = undefined;
                    timerId = setInterval(() => {
                        fetch("https://api.live.bilibili.com/msg/send", options);
                    }, parseInt(delay * 1000, 10));
                    return true;
                }, parseInt(delay * 1000, 10));
                sendResponse(res);
            });
            return true;
        }
        case "stopSendChat": {
            clearInterval(timerId);
            timerId = undefined;
            sendResponse({ code: -1, msg: "已停止发送弹幕" })
            return true;
        }
        default:
            sendResponse({ code: -1, msg: "NO MESSAGE" })
            return true;
    }
});

console.log("注入完成");
