import React, { useState } from 'react';
import { Tabs, Alert } from 'antd';
import { sendChatExtensionMessage } from '../chrome-extension/chrome-extension-message-helper';
import { selectedTypeModules } from '../store/popupModules';
import Copy from './Copy';
import TextSplit from './TextSplit';
function Popup() {
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  const [curIndex, setCurIndex] = useState(0);

  const copyResponse = res => {
    const { code, msg } = res;
    if (code === 0) {
      setMessage("发送弹幕成功");
      setMsgType('success');
    } else {
      setMsgType('info');
      setMessage(msg);
    }
  }

  const handleCopyChange = (msg) => {
    sendChatExtensionMessage(msg, copyResponse);
  };


  // 请求成功后，段落的开始索引增加
  const textResponse = res => {
    const { code, msg } = res;
    if (code === 0) {
      setMessage("发送弹幕成功");
      setMsgType('success');
    } else {
      setMsgType('info');
      setMessage(msg);
    }
  }
  const handleTextChange = (msg) => {
    sendChatExtensionMessage(msg, textResponse);
  };


  const options = [
    { ...selectedTypeModules.copy, children: <Copy onMsgChange={handleCopyChange} /> },
    { ...selectedTypeModules.text, children: <TextSplit index={curIndex} setCurIndex={setCurIndex} onMsgChange={handleTextChange} /> }
  ];

  return (
    <>
      <Tabs
        type="card"
        items={options}
      />
      {msgType !== '' && <Alert message={message} type={msgType} />}
    </>
  );
}

export default Popup;