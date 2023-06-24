import React, { useState } from 'react';
import { Space, Input, InputNumber, Button } from 'antd';
function Copy(props) {
  const { onMsgChange } = props;
  const [text, setText] = useState('');
  const [delay, setDelay] = useState(5);

  const handleStart = () => {
    onMsgChange({ type: 'sendChat', text, delay });
  };

  const handleStop = () => {
    onMsgChange({ type: 'stopSendChat' })
  };


  return (
    <Space direction="vertical">
      <Input placeholder="输入复读的文本" value={text} onChange={e => setText(e.target.value)} />
      <InputNumber min={5} addonAfter="秒(最少5秒)" placeholder="输入发送间隔时间（秒）" value={delay} onChange={value => setDelay(Number(value))} />
      <Space direction="horizontal">
        <Button onClick={handleStart}>确认</Button>
        <Button onClick={handleStop}>停止</Button>
      </Space>
    </Space>
  );
}

export default Copy;