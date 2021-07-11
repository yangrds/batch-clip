# batch-clip基于JavaScript的批量图片裁剪插件

**支持功能**：批量图片载入、文件（File）加载、远程资源加载（URL）、图片缩放、原图载入。

**钩子函数**：图片加载失败、程序中断、裁剪完毕。

**demo目录内为简单测试案例**

演示地址http://101.34.62.75:6005/

```
npm i batch-clip
```

```javascript
// 将图形裁剪控制台渲染至指定DOM节点，Files（文件列表）
const clip = new Clip({ el: '#file-clip',Files:[file,file]})
// 点击保存后的钩子
clip.submit = (files)=>{
  console.log(files)
}
// 当远程图片加载失败后（常见为跨域），触发次该方法
clip.LoadFailed = (url)=>{
  console.log(url)
}
// 当所有远程图片均加载失败，导致程序中断，触发该方法
clip.interrupt = ()=>{}
```

## Attributes

| 参数   | 说明                                        | 必填 | 类型[默认]                   |
| ------ | ------------------------------------------- | ---- | ---------------------------- |
| el     | 渲染至指定DOM节点                           | 是   | `string｜Document`           |
| Files  | 文件列表，兼容File对象和在线图片URL         | 是   | `Array<File>｜Array<string>` |
| isFile | 默认true，false为远程图片模式。             | 否   | `Boolean[true]`              |
| zoom   | 缩放模式，尺寸充满可视区域，false为原图模式 | 否   | `Boolean[false]`             |

## Hook function

| 名称       | 说明                 | 注入参数      |
| ---------- | -------------------- | ------------- |
| submit     | 注入裁剪完毕的文件列 | `Array<File>` |
| LoadFailed | 远程图像资源加载失败 | `string`      |
| interrupt  | 程序中断             | 无            |

