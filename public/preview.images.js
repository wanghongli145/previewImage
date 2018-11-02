; (function ($) {
  var PreviewImage = function (options) {
    this.settings = $.extend({
      isNew: true,
      isEnlargeNew: true,
      rotate: 90,
      topDistance: 0,
      src: '/images/icon2.png'
    }, options || {});
    this.init();
  };
  PreviewImage.prototype = {
    init: function () {
      this.settings.isNew = true;
      this.draw();
      this.settings.topDistance = $(window).scrollTop();
      $('body').css({
        'position': 'fixed'
      });
      $('.m-image-wrap img').attr('src', this.settings.src);
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
      this.dragImage($('.m-image-preview img')[0]);
      $('.m-image-preview img').on('mousewheel', function (e) {
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
        if (delta > 0) {
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
        '<img src="/images/coinbg.png">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="m-operat">' +
        '<span class="m-enlarge"></span>' +
        '<span class="m-narrow"></span>' +
        '<span class="m-rotate"></span>' +
        '<span class="m-download"></span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
      $(document.body).append(html);
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
    }
  };
  $.fn.PreviewImg = function (options) {
    new PreviewImage({ src: $(this).attr('src') });
  }
})(jQuery);

// 图片元素点击执行
$(function () {
  $('.my-image').click(function () {
    $(this).PreviewImg();
  })
});
