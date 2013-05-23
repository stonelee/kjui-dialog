# dialog

---

基于[dialog](http://aralejs.org/dialog/)，提供了应用于kjui的弹出窗口功能，并提供了alert，confirm，show，form四个静态方法

---


## 配置


### closeTpl `true|''`

默认为true，表示显示右上角关闭按钮，如果设为''则不显示

### classPrefix *string*

该配置项无效

### zIndex 'Number'

默认为100

其他配置请参照[dialog](http://aralejs.org/dialog/)。

## model

### title `String`

标题内容，为空则无标题栏。如果设置了标题，那么可以拖动窗口

### icon `question|info`

预设图标

### message `String`

显示内容，可为 html 字符串。

### confirmTpl `String|false`

“确定”按钮显示的文字，如果设为false则不显示

### cancelTpl `String|false`

“取消”按钮显示的文字，如果设为false则不显示


## 事件说明

### confirm

点击确定按钮时触发。

```js
Dialog.on('confirm', function() {
  // 比如提交表单
});
```

## 静态方法

### Dialog.alert(msg, callback, options?) `static`

弹出信息确认框。

### Dialog.confirm(msg, callback, options?) `static`

弹出信息确认取消框。

### Dialog.show(msg, callback, options?) `static`

弹出信息框，右上角有关闭 X 。

如弹出一个确认框：

```js
Dialog.confirm('是否要删除这个类目', '确认删除框', function() {
  console.log('点击了确认按钮');
});
```

还可以利用 options 参数进行一些个性化定制，options 和 Dialog 的配置项一致，并且优先级大于静态方法前面的参数。

```js
Dialog.confirm('是否要删除这个类目', function() {
  console.log('点击了确认按钮');
}, {
  beforeHide: function() {
    console.log('点击了确认按钮');
  },
  closeTpl: '',       // 关闭的按钮设置为空
  hasMask: false,     // 没有遮罩层
  width: 300          // 宽度设置为 300 px
});
```

### Dialog.form(selector, title?, callback, options?) `static`

弹出表单，内部通过`Widget.autoRenderAll()`自动渲染插入的表单组件

* `selector` 页面中的表单模板标识，如`#id`

```html
<script type="text/template" id="form-template">
  <div class="form-bd" data-widget="validator">
    <div class="form-item">
      <label for="text" class="form-label"><span class="form-required">*</span>text:</label>
      <input id="text" name="text" class="input" type="text" required>
      <div class="form-explain">请输入文字</div>
    </div>
  </div>
</script>
```

* `title` 如果设置，则显示可拖动的表头。
* `callback` 保存按钮的回调函数
