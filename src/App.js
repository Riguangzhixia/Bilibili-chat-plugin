import React from 'react';
import { Space } from 'antd';
import Popup from './Popup';
function App() {
  return (
    <div className='chatSenderContainer' style={{ padding: '24px', "user-select": "none" }}>
      <Space direction="vertical">
        <Popup />
      </Space>
    </div>
  );
}

export default App;