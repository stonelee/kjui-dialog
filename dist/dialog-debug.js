/*jshint expr:true*/
define("kjui/dialog/1.1.0/dialog-debug", [ "$-debug", "arale/widget/1.0.3/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug", "arale/overlay/1.0.1/mask-debug", "arale/overlay/1.0.1/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.1/iframe-shim-debug", "arale/dialog/1.0.2/dialog-debug", "arale/widget/1.0.3/templatable-debug", "gallery/handlebars/1.0.0/handlebars-debug", "./dialog-debug.tpl" ], function(require, exports, module) {
    var $ = require("$-debug"), Widget = require("arale/widget/1.0.3/widget-debug"), mask = require("arale/overlay/1.0.1/mask-debug"), AraleDialog = require("arale/dialog/1.0.2/dialog-debug");
    //补丁
    var DialogPatch = AraleDialog.extend({
        parseElement: function() {
            AraleDialog.superclass.parseElement.call(this);
            this.contentElement = this.$("[data-role=content]");
            this.$("[data-role=close]").hide();
        },
        events: {
            "click [data-role=confirm]": function(e) {
                e.preventDefault();
                this.trigger("confirm");
            },
            "click [data-role=cancel]": function(e) {
                e.preventDefault();
                this.hide();
            }
        },
        _onChangeMessage: function(val) {
            this.$("[data-role=message]").html(val);
        },
        _onChangeTitle: function(val) {
            this.$("[data-role=title]").html(val);
        },
        _onChangeConfirmTpl: function(val) {
            this.$("[data-role=confirm]").html(val);
        },
        _onChangeCancelTpl: function(val) {
            this.$("[data-role=cancel]").html(val);
        }
    });
    var EVENT_NS = ".dialog-events-";
    mask.set("opacity", .5).set("backgroundColor", "rgb(204, 204, 204)");
    var Dialog = DialogPatch.extend({
        attrs: {
            template: require("./dialog-debug.tpl"),
            content: "",
            closeTpl: true,
            width: 300,
            zIndex: 100
        },
        model: {
            title: "标题",
            icon: false,
            message: "内容",
            confirmTpl: "确定",
            cancelTpl: "取消"
        },
        parseElement: function() {
            this.model.hasFoot = this.model.confirmTpl || this.model.cancelTpl;
            Dialog.superclass.parseElement.call(this);
        },
        events: {
            "mousedown [data-role=head]": "_dragStart",
            "mouseup [data-role=head]": "_dragEnd"
        },
        _dragStart: function(e) {
            //鼠标左键
            if (e.which == 1) {
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
            this.$("[data-role=head]").css("cursor", "move");
            var self = this;
            $(document).on("mousemove" + EVENT_NS + this.cid, function() {
                self._drag.apply(self, arguments);
            });
        },
        destroy: function() {
            $(document).off("mousemove" + EVENT_NS + this.cid);
            return Dialog.superclass.destroy.call(this);
        }
    });
    Dialog.alert = function(message, callback, options) {
        var defaults = {
            closeTpl: "",
            model: {
                title: false,
                icon: "info",
                message: message,
                cancelTpl: false
            },
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new Dialog($.extend(true, defaults, options)).show().after("hide", function() {
            this.destroy();
        });
    };
    Dialog.confirm = function(message, callback, options) {
        var defaults = {
            closeTpl: "",
            model: {
                title: false,
                icon: "question",
                message: message
            },
            onConfirm: function() {
                callback && callback();
                this.hide();
            }
        };
        new Dialog($.extend(true, defaults, options)).show().after("hide", function() {
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
        new Dialog($.extend(true, defaults, options)).show().before("hide", function() {
            callback && callback();
        }).after("hide", function() {
            this.destroy();
        });
    };
    Dialog.form = function(selector, title, callback, options) {
        if (!isString(title)) {
            options = callback;
            callback = title;
            title = false;
        }
        var defaults = {
            content: $(selector).html(),
            model: {
                title: title,
                confirmTpl: "保存"
            },
            afterShow: function() {
                //自动渲染所有组件
                Widget.autoRenderAll();
            },
            onConfirm: function() {
                var self = this;
                var validatorTarget = this.$("[data-widget=validator]");
                if (validatorTarget) {
                    Widget.query(validatorTarget).execute(function(err) {
                        if (!err) {
                            callback && callback();
                            self.hide();
                        }
                    });
                } else {
                    callback && callback();
                    self.hide();
                }
            }
        };
        new Dialog($.extend(true, defaults, options)).show().after("hide", function() {
            this.destroy();
        });
    };
    function isString(val) {
        return toString.call(val) === "[object String]";
    }
    module.exports = Dialog;
});

define("kjui/dialog/1.1.0/dialog-debug.tpl", [], '<div class="dialog">\n  <i class="icon-tool-close" title="关闭" data-role="close"></i>\n\n  {{#if title}}\n  <div class="dialog-hd" data-role="head">\n    <span data-role="title">{{{title}}}</span>\n  </div>\n  {{/if}}\n\n  <div data-role="content">\n    <div class="dialog-bd">\n        {{#if icon}}\n        <i class="icon-{{icon}}"></i>\n        {{/if}}\n\n        <span data-role="message">{{{message}}}</span>\n    </div>\n  </div>\n\n  {{#if hasFoot}}\n  <div class="dialog-ft">\n\n    {{#if confirmTpl}}\n      <button class="btn" data-role="confirm">{{{confirmTpl}}}</button>\n    {{/if}}\n\n    {{#if cancelTpl}}\n      <button class="btn" data-role="cancel">{{{cancelTpl}}}</button>\n    {{/if}}\n\n  </div>\n  {{/if}}\n\n</div>\n');
