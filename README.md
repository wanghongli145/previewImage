# previewImage
Preview image

效果图： 
![效果图](https://github.com/wanghongli145/previewImage/raw/master/public/images/GIF.gif)
```
bower install

cnpm install (npm install)

node app.js
```

功能实现：
1. 点击图片弹窗显示该图片
2. 可拖动图片在弹窗内移动
3. 点击放大按钮或鼠标向上滚动放大图片
4. 点击缩小按钮或鼠标向下滚动缩小图片
5. 点击旋转按钮旋转图片
6. 点击下载按钮下载图片

##### 方法使用
在click的回调里执行 ```$selector.PreviewImg()```
例：
```
$(function () {
  $('.my-image').click(function () {
    $(this).PreviewImg();
  })
});

预览：http://localhost:1024
