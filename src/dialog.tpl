<div class="dialog">
  <i class="icon-tool-close" title="关闭" data-role="close"></i>

  {{#if title}}
  <div class="form-hd" data-role="head">
    <span data-role="title">{{{title}}}</span>
  </div>
  {{/if}}

  <div data-role="content" class="form-bd">
    {{#if icon}}
    <i class="icon-{{icon}}"></i>
    {{/if}}

    <span data-role="message">{{{message}}}</span>
  </div>

  {{#if hasFoot}}
  <div class="form-ft">

    {{#if confirmTpl}}
      <button class="btn" data-role="confirm">{{{confirmTpl}}}</button>
    {{/if}}

    {{#if cancelTpl}}
      <button class="btn" data-role="cancel">{{{cancelTpl}}}</button>
    {{/if}}

  </div>
  {{/if}}

</div>
