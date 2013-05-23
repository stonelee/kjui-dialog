# 表单

- order: 2

---

## 弹出表单

````iframe:200
<input type="button" id="btn" value="form" />

<script type="text/template" id="form-template">
  <div id="form" class="form-bd" data-widget="validator">
    <div class="form-item">
      <label for="text" class="form-label"><span class="form-required">*</span>text:</label>
      <input id="text" name="text" class="input" type="text" required>
      <div class="form-explain">请输入文字</div>
    </div>
  </div>
</script>

<script>
seajs.use(['$', 'form'], function($, Form) {
  new Form({
    trigger: '#btn',
    model: {
      url: 'test/',
      message: $('#form-template').html()
    },
    onConfirm: function(){
      alert('submit:' + $('#text').val());
    }
  });

})
</script>
````

