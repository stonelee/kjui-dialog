# 表单

- order: 2

---

## 弹出表单

````iframe:200
<input type="button" id="btn" value="form" />

<script type="text/template" id="form">
  <div class="group">
    <label class="form-label" for="text">text:</label>
    <input id="text" type="text" placeholder="placeholder">
  </div>
  <div class="group">
    <label class="form-label" for="invalid"><span class="form-star">*</span>invalid:</label>
    <input id="invalid" type="password" class="form-invalid"><i class="icon-exclamation"></i>
  </div>
</script>

<script>
seajs.use(['$','dialog'], function($, Dialog) {

  new Dialog({
    trigger: '#btn',
    content: $('#form').html(),
    model: {
      title: '这是一个表单',
      confirmTpl: '保存'
    },
    onConfirm: function() {
      alert('submit:' + $('#text').val());
      this.hide();
    }
  });
})
</script>
````

