import React, { useState } from 'react';
import { Space, Input, InputNumber, Button } from 'antd';
const { TextArea } = Input;
function TextSplit(props) {
  const { onMsgChange, index } = props;
  const [text, setText] = useState('');
  const [delay, setDelay] = useState(10);
  const handleStart = () => {
    onMsgChange({ type: 'sendChat', text: text.splice(index, 20), delay });
  };

  const handleStop = () => {
    onMsgChange({ type: 'stopSendChat' })
  };


  return (
    <Space direction="vertical">
      <TextArea autoSize={{minRows: 2, maxRows: 15}} placeholder="输入要车的书" maxLength={10000} value={text} onChange={e => setText(e.target.value)} />
      <InputNumber addonAfter="秒" placeholder="输入发送间隔时间（秒）" value={delay} onChange={value => setDelay(Number(value))} />
      <Space direction="horizontal">
        <Button onClick={handleStart}>确认</Button>
        <Button onClick={handleStop}>停止</Button>
      </Space>
    </Space>
  );
}

export default TextSplit;