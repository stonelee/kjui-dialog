/*jshint expr:true*/
define("kjui/dialog/1.0.0/dialog-debug", ["$-debug", "arale/overlay/0.9.12/mask-debug", "arale/overlay/0.9.12/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/dialog/1.0.1/dialog-debug", "arale/overlay/1.0.1/overlay-debug", "arale/iframe-shim/1.0.1/iframe-shim-debug", "arale/widget/1.0.3/widget-debug", "arale/overlay/1.0.1/mask-debug", "arale/widget/1.0.3/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug"], function(require, exports, module) {
  var $ = require('$-debug'),
    mask = require('arale/overlay/0.9.12/mask-debug'),
    AraleDialog = require('arale/dialog/1.0.1/dialog-debug');

  //补丁
  var DialogPatch = AraleDialog.extend({
    parseElement: function() {
      AraleDialog.superclass.parseElement.call(this);
      this.contentElement = this.$('[data-role=content]');
      this.$('[data-role=close]').hide();
    },

    events: {
      'click [data-role=confirm]': function(e) {
        e.preventDefault();
        this.trigger('confirm');
      },
      'click [data-role=cancel]': function(e) {
        e.preventDefault();
        this.hide();
      }
    },

    _onChangeMessage: function(val) {
      this.$('[data-role=message]').html(val);
    },

    _onChangeTitle: function(val) {
      this.$('[data-role=title]').html(val);
    },

    _onChangeConfirmTpl: function(val) {
      this.$('[data-role=confirm]').html(val);
    },

    _onChangeCancelTpl: function(val) {
      this.$('[data-role=cancel]').html(val);
    }
  });

  var EVENT_NS = '.dialog-events-';

  mask.set('opacity', 0.5).set('backgroundColor', 'rgb(204, 204, 204)');

  var Dialog = DialogPatch.extend({
    attrs: {
      template: '<div class="dialog"> <i class="icon-tool-close" title="关闭" data-role="close"></i>{{#if title}} <div class="form-hd" data-role="head"> <span data-role="title">{{{title}}}</span> </div> {{/if}}<div data-role="content" class="form-bd"> {{#if icon}} <i class="icon-{{icon}}"></i> {{/if}}<span data-role="message">{{{message}}}</span> </div>{{#if hasFoot}} <div class="form-ft">{{#if confirmTpl}} <button class="btn" data-role="confirm">{{{confirmTpl}}}</button> {{/if}}{{#if cancelTpl}} <button class="btn" data-role="cancel">{{{cancelTpl}}}</button> {{/if}}</div> {{/if}}</div>',
      content: '',
      closeTpl: true,
      width: 300
    },

    model: {
      title: '标题',
      icon: false,
      message: '内容',
      confirmTpl: '确定',
      cancelTpl: '取消'
    },

    parseElement: function() {
      this.model.hasFoot = this.model.confirmTpl || this.model.cancelTpl;
      Dialog.superclass.parseElement.call(this);
    },

    events: {
      'mousedown [data-role=head]': '_dragStart',
      'mouseup [data-role=head]': '_dragEnd'
    },

    _dragStart: function(e) {
      //鼠标左键
      if (e.which == 1) {
        console.log('start');
        //避免鼠标变为text-selection
        e.preventDefault();

        this._onDrag = true;
        this._mouseX = e.pageX;
        this._mouseY = e.pageY;
      }
    },
    _drag: function(e) {
      if (this._onDrag) {
        var deltaX = e.pageX - this._mouseX;
        var deltaY = e.pageY - this._mouseY;

        var p = this.element.offset();
        var newLeft = p.left + deltaX;
        var newTop = p.top + deltaY;
        this.element.offset({
          left: newLeft,
          top: newTop
        });
        this._mouseX = e.pageX;
        this._mouseY = e.pageY;
      }
    },
    _dragEnd: function(e) {
      this._onDrag = false;
    },

    setup: function() {
      Dialog.superclass.setup.call(this);

      this.$('[data-role=head]').css('cursor', 'move');

      var self = this;
      $(document).on('mousemove' + EVENT_NS + this.cid, function() {
        self._drag.apply(self, arguments);
      });
    },
    destroy: function() {
      $(document).off('mousemove' + EVENT_NS + this.cid);
      return Dialog.superclass.destroy.call(this);
    }

  });


  Dialog.alert = function(message, callback, options) {
    var defaults = {
      closeTpl: '',
      model: {
        title: false,
        icon: 'info',
        message: message,
        cancelTpl: false
      },
      onConfirm: function() {
        callback && callback();
        this.hide();
      }
    };

    new Dialog($.extend(true, defaults, options)).show().after('hide', function() {
      this.destroy();
    });
  };

  Dialog.confirm = function(message, title, callback, options) {
    var defaults = {
      closeTpl: '',
      model: {
        title: title,
        icon: 'question',
        message: message
      },
      onConfirm: function() {
        callback && callback();
        this.hide();
      }
    };

    new Dialog($.extend(true, defaults, options)).show().after('hide', function() {
      this.destroy();
    });
  };

  Dialog.show = function(message, callback, options) {
    var defaults = {
      model: {
        title: false,
        message: message,
        confirmTpl: false,
        cancelTpl: false
      },
      onConfirm: function() {
        callback && callback();
        this.hide();
      }
    };

    new Dialog($.extend(true, defaults, options)).show().before('hide', function() {
      callback && callback();
    }).after('hide', function() {
      this.destroy();
    });
  };
  //TODO:form
  module.exports = Dialog;

});
