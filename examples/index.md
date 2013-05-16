# 基本用法

- order: 1

---

````iframe:200
<input type="button" id="btn" value="form" />

<script>
seajs.use(['$','dialog'], function($, Dialog) {

  new Dialog({
    trigger: '#btn',
    content: '<p>请<span style="color:red;">访问</span>：<a href="http://www.douban.com" target="_blank">douban</a></p>',
    model: {
      cancelTpl: false
    },
    onConfirm: function() {
      this.hide();
    }
  });
})
</script>
````

## 直接调用静态方法

````iframe:200
<input type="button" id="alert" value="alert" />
<input type="button" id="confirm" value="confirm" />
<input type="button" id="show" value="show" />

<script>
seajs.use(['$','dialog'], function($, Dialog) {

  $('#alert').click(function() {
    Dialog.alert('静态方法Dialog.alert', function(){
      alert('点击了确定按钮');
    });
  });

  $('#confirm').click(function() {
    Dialog.confirm('静态方法Dialog.confirm', '自定义标题', function() {
      alert('点击了确定按钮');
    });
  });

  $('#show').click(function() {
    Dialog.show('只是显示一些信息，右上角关闭');
  });

})
</script>
````

## 自定义alert

````iframe:200
<input type="button" id="alert" value="alert" />

<script>
seajs.use(['$','dialog'], function($, Dialog) {

  $('#alert').click(function() {
    Dialog.alert('静态方法Dialog.alert', function(){
      alert('点击了确定按钮');
    }, {
      closeTpl: true,    //加上了右上角关闭按钮
      hasMask: false,    // 没有遮罩层
      width: 200,        // 宽度设置为 200 px
      model: {
        title: '我是自定义标题'
      },
      beforeHide: function() {
        alert('关闭了');
      },
    });
  });

})
</script>
````

## 更改按钮文字

````iframe:200
<input type="button" id="confirm" value="confirm" />

<script>
seajs.use(['$','dialog'], function($, Dialog) {

  $('#confirm').click(function() {
    Dialog.confirm('静态方法Dialog.confirm', '', function() {
      alert('点击了保存按钮');
    }, {
      model: {
        confirmTpl: '保存'
      }
    });
  });

})
</script>
````
