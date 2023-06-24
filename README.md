# B站直播弹幕定时发送chrome插件
## 背景
为了了解chrome插件开发流程，同时满足看直播娱乐要一直发弹幕互动的需求
## 功能介绍
chrome插件，通过捕获并分析B站发送弹幕请求，在登录B站后获取cookie来伪造发送弹幕请求，达到定时发送弹幕的效果。
主要功能有两个
+ 说书人：文本拆分开定时发送弹幕
+ 复读机：定时发送重复弹幕
## 技术方案
最开始开发时有3个方案
1. 在油猴tampermonkey插件的基础上做进一步开发
2. 开发chrome插件通过InjectJS直接将弹幕的输入界面和发送请求的代码嵌入到B站的页面中
3. 在chrome插件里构建输入界面，将定时器及发送请求的代码注入到页面中，然后通过插件与页面的通讯来实现
### 技术选择
由于方案1比较简单且已有相同的插件，而为了熟悉chrome插件的通讯机制最终采用了方案3。
输入界面采用了antd组件+reactHooks，暂时项目构建是在create-react-app基础上将chrome相关配置文件直接放进public文件夹中，这样项目打包出来后的build文件夹即可直接当作扩展插件的文件夹。

## TODO
+ 说书人文本拆分功能
+ chrome插件项目构建优化
