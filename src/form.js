/*jshint expr:true*/
define(function(require, exports, module) {
  var $ = require('$'),
    Dialog = require('./dialog'),
    Widget = require('widget');

  var Form = Dialog.extend({
    attrs: {
      template: require('./form.tpl')
    },

    model: {
      title: '表单',
      confirmTpl: '保存'
    },

    parseElement: function() {
      Form.superclass.parseElement.call(this);
    },

    events: {
      'click [data-role=confirm]': '_confirm'
    },

    show: function() {
      Form.superclass.show.call(this);
      Widget.autoRenderAll();
    },

    _confirm: function(e) {
      var self = this;
      Widget.query('#form').execute(function(err) {
        if (!err) {
          self.trigger('confirm');
        }
      });
    }
  });

  module.exports = Form;

});
