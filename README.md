# previewImage
Preview image
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
7. 如果是图片组可查看上一张/下一张图片

##### 方法使用
在click的回调里执行
 ```$selector.PreviewImg({
  src: 'src', // 必选参数
  imageArr: [] // 可选参数,如果有展示上一张/下一张，图片的src放到数组里
})
```
例：

```
// 图片元素点击执行
$(function () {
  /**
   * .preview-obj img： 是要点击的图片对象
   * imageArr： 图片组的src
  */
  $('body').delegate('.preview-obj img', 'click', function () {
    var imageArr = [];
    if ($(this).parents('.preview-obj').find('img').length > 1) {
      $(this).parents('.preview-obj').find('img').each(function (i, v) {
        imageArr.push($(v).attr('src'))
      });
    }
    $(this).PreviewImg({
      src: $(this).attr('src'), // 所有者链接
      imageArr: imageArr
    });
  });
});
```
预览：http://localhost:1024
