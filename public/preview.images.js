; (function ($) {
  var PreviewImage = function (options) {
    this.settings = $.extend({
      isNew: true,
      isEnlargeNew: true,
      rotate: 90,
      topDistance: 0,
      currentIndex: 0,
      imageArr: [],
      next: false, // 下一张图片的按钮
      prev: false, // 上一张图片的按钮
      src: '/images/icon2.png'
    }, options || {});
    this.init();
  };
  PreviewImage.prototype = {
    init: function () {
      this.settings.isNew = true;
      this.draw();
      if (this.settings.imageArr.length > 1) {
        this.imageArr = this.settings.imageArr;
        // 0 -- imageArr.length -1
        this.currentIndex = this.imageArr.indexOf(this.settings.src);
        if (this.currentIndex > 0) {
          this.prev = true;
          if (this.currentIndex < this.imageArr.length - 1) {
            this.next = true;
          } else if (this.currentIndex === this.imageArr.length - 1) {
            this.next = false;
          } else {
            this.next = false;
          }
        } else if (this.currentIndex === 0) {
          this.next = true;
          this.prev = false;
        } else {
          this.prev = false;
        }
      } else {
        this.next = false;
        this.prev = false;
      }
      this.showButton();
      this.topDistance = $(window).scrollTop();
      $('body').css({ 'position': 'fixed' });
      if (this.settings.src) {
        $('.m-image-wrap img').attr('src', this.settings.src).css({ 'max-width': '98%' });
      } else {
        $('.m-image-wrap img').attr('src', this.src);
      }
      if (this.settings.rotate) { this.rotate = parseInt(this.settings.rotate) }
      var self = this;
      $('.m-enlarge').click(function () {
        self.enlarge();
      });
      $('.m-narrow').click(function () {
        self.narrow();
      });
      $('.m-rotate').click(function () {
        self.rotateImg();
      });
      $('.m-download').click(function () {
        self.downloadIamge($($('.m-image-wrap img')).attr('src'));
      });
      $('.m-image-preview .m-close').click(function () {
        self.close();
      });
      $('.m-preview-next-btn').click(function () {
        self.showNextImage();
      });
      $('.m-preview-prev-btn').click(function () {
        self.showPrevImage();
      });
      this.dragImage($('.m-image-preview img')[0]);
      $('.m-image-preview img').on('mousewheel', function (event) {
        if (event.originalEvent.deltaY < 0) {
          self.enlarge();
        } else {
          self.narrow();
        }
      });
    },
    dragImage: function (obj) {
      if (!obj) {
        return false;
      }
      obj.onmousedown = function (ev) {
        var ev = ev || event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;
        document.onmousemove = function (ev) {
          var ev = ev || event;
          obj.style.left = ev.clientX - disX + 'px';
          obj.style.top = ev.clientY - disY + 'px';
          obj.style.position = 'absolute';
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        }
        return false;
      }
    },
    draw: function () {
      var isIE = (this.myBrowser() === 'IE' || this.myBrowser() === 'Edge') ? true : false;
      var hasDownloadHtml = isIE ? '' : '<span class="m-download"></span>';
      var rigthHtml = '<div class="m-preview-next-btn"></div>';
      var lefthHtml = '<div class="m-preview-prev-btn"></div>';
      var html = '<div class="m-image-preview">' +
        '<div class="m-image-table">' +
        '<div class="m-image-table-cell">' +
        '<div class="m-image-content">' +
        '<div class="clearfix">' +
        ' <div class="m-close"></div>' +
        '</div>' +
        '<div class="g-table">' +
        '<div class="m-image-detail">' +
        '<div class="m-image-wrap">' +
        '<img src="">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="m-operat">' +
        '<span class="m-enlarge"></span>' +
        '<span class="m-narrow"></span>' +
        '<span class="m-rotate"></span>' +
        hasDownloadHtml +
        '</div>' + rigthHtml + lefthHtml +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
      $('body').append(html);
    },
    close: function () {
      $('.m-image-preview').remove();
      $('body').css({ 'position': 'static' });
      $('html').animate({ 'scrollTop': this.settings.topDistance }, 0);
      // 关闭弹窗后对数据进行初始化
      this.settings.isNew = true;
      this.settings.isEnlargeNew = true;
      this.settings.rotate = 90;
      this.settings.topDistance = 0;
    },
    enlarge: function () {
      var oWidth = $('.m-image-detail img').width();
      if (this.settings.isNew) {
        oWidth = $('.m-image-content').width();
      }
      this.settings.isNew = false;
      oWidth += 100;
      $('.m-image-detail img').css({
        'width': oWidth + 'px',
        'max-width': 'initial'
      });
    },
    narrow: function () {
      var narrowWidth = $('.m-image-detail img').width();
      this.settings.isNew = false;
      narrowWidth -= 100;
      $('.m-image-detail img').css({
        'width': narrowWidth + 'px',
        'max-width': 'initial'
      });
    },
    rotateImg: function () {
      if (this.settings.rotate == 360) { this.settings.rotate = 0; }
      $('.m-image-detail img').attr('class', 'add-transform-' + this.settings.rotate);
      if ($('.m-image-detail img').height() > 600) {
        $('.m-image-detail img').css({
          'position': 'absolute',
          'top': '-300px'
        });
      }
      this.settings.rotate += 90;
    },
    downloadIamge: function (src) {
      var srcArr = src.split('.');
      var xhr = new XMLHttpRequest();
      xhr.open('get', src, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status == 200) {
          var blob = this.response;
          var a = document.createElement('a');
          var srcArr = src.split('.');
          var srcLast = srcArr[srcArr.length - 1];
          a.download = Date.parse(new Date()) + '.' + srcLast;
          a.href = window.URL.createObjectURL(blob);
          a.click();
        }
      }
      xhr.send();
    },
    showButton: function () {
      if (this.next) {
        $('.m-preview-next-btn').show();
      } else {
        $('.m-preview-next-btn').hide();
      }
      if (this.prev) {
        $('.m-preview-prev-btn').show();
      } else {
        $('.m-preview-prev-btn').hide();
      }
    },
    myBrowser: function () {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf('Opera') > -1;
      if (isOpera) {
        return 'Opera'
      }; //判断是否Opera浏览器
      if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        return 'IE';
      }; //判断是否IE浏览器
      if (userAgent.indexOf('Trident') > -1) {
        return 'Edge';
      } //判断是否Edge浏览器
    },
    showNextImage: function () {
      this.currentIndex++;
      if (this.currentIndex < this.imageArr.length - 1) {
        this.next = true;
        this.prev = true;
        $('.m-image-wrap img').attr('src', this.imageArr[this.currentIndex]);
      } else if (this.currentIndex == this.imageArr.length - 1) {
        $('.m-image-wrap img').attr('src', this.imageArr[this.currentIndex]);
        this.next = false;
        this.prev = true;
      } else {
        this.next = false;
        this.prev = false;
      }
      this.showButton();
    },
    showPrevImage: function () {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.prev = false;
      } else if (this.currentIndex === 0) {
        $('.m-image-wrap img').attr('src', this.imageArr[this.currentIndex]);
        this.prev = false;
        if (this.currentIndex < this.imageArr.length - 1) {
          this.next = true;
        }
      } else {
        $('.m-image-wrap img').attr('src', this.imageArr[this.currentIndex]);
        this.next = true;
        this.prev = true;
      }
      this.showButton();
    }
  };
  $.fn.PreviewImg = function (options) {
    new PreviewImage(options);
  }
})(jQuery);

// 图片元素点击执行
$(function () {
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
