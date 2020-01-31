var $ = require("jquery");
require("jquery.transit");
sa = function() {
	maxZIndex = function() {
		return Array.from(document.querySelectorAll('body *'))
           .map(a => parseFloat(window.getComputedStyle(a).zIndex))
           .filter(a => !isNaN(a))
           .sort()
           .pop();
	};
  SimpleAlert = {
    bt_close_class: "",
    bt_confirm_class: ""
  };
  var bt_close, bt_confirm, center, close_btn_bind, close_modal, disableScroll, enableScroll, gen_message, gen_modal, gen_title, generate_random_id, h, index, keys, modal, open_modal, preventDefault, preventDefaultForScrollKeys, process_hash, resize_btns, shadow, show_shadow;
  index = maxZIndex();
  keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  };
  preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  };
  preventDefaultForScrollKeys = function(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  };
  disableScroll = function() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onwheel = preventDefault;
    window.onmousewheel = document.onmousewheel = preventDefault;
    window.ontouchmove = preventDefault;
    document.onkeydown = preventDefaultForScrollKeys;
  };
  enableScroll = function() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  };
  generate_random_id = function() {
    var rr;
    rr = (Math.random() + '').substring(2);
    while ($('#shadow_' + rr).length > 0) {
      rr = (Math.random() + '').substring(2);
    }
    return rr;
  };
  process_hash = function(params) {
    var hash, r;
    if (params[0].constructor === Object) {
      hash = params[0];
    } else {
      hash = {};
      switch (params.length) {
        case 1:
          hash['message'] = params[0];
          break;
        case 2:
          hash['title'] = params[0];
          hash['message'] = params[1];
      }
    }
    r = {};
    r['title'] = hash['title'] !== void 0 ? hash['title'] : false;
    r['message'] = hash['message'] !== void 0 ? hash['message'] : false;
    r['showConfirmBtn'] = hash['showConfirmBtn'] !== void 0 ? true : (hash['onConfirm'] !== void 0) || (hash['confirmClass'] !== void 0 || hash['confirmText'] !== void 0) ? true : false;
    r['showCloseBtn'] = hash['showCloseBtn'] !== void 0 ? true : false;
    r['confirmText'] = hash['confirmText'] !== void 0 ? hash['confirmText'] : 'Confirm';
    r['confirmClass'] = hash['confirmClass'] !== void 0 ? hash['confirmClass'] : SimpleAlert.bt_confirm_class;
    r['closeText'] = hash['closeText'] !== void 0 ? hash['closeText'] : 'Close';
    r['closeClass'] = hash['closeClass'] !== void 0 ? hash['closeClass'] : SimpleAlert.bt_close_class;
    r['onConfirm'] = hash['onConfirm'] !== void 0 ? hash['onConfirm'] : false;
    r['onClose'] = hash['onClose'] !== void 0 ? hash['onClose'] : false;
    r['message'] = hash['message'] !== void 0 ? hash['message'] : '';
    r['openTime'] = hash['time'] !== void 0 ? hash['time'] : hash['openTime'] !== void 0 ? hash['openTime'] : 250;
    r['closeTime'] = hash['time'] !== void 0 ? hash['time'] : hash['closeTime'] !== void 0 ? hash['closeTime'] : 250;
    r['effectShow'] = hash['effectShow'] !== void 0 ? hash['effectShow'] : hash['effect'] ? hash['effect'] : 'easeInOutBack';
    r['effectHide'] = hash['effectHide'] !== void 0 ? hash['effectHide'] : hash['effect'] ? hash['effect'] : 'easeInBack';
    r['closeOnClickShadow'] = hash['closeOnClickShadow'] !== void 0 ? hash['closeOnClickShadow'] : false;
    r['autoClose'] = hash['autoClose'] !== void 0 ? hash['autoClose'] : false;
    r['id'] = hash['id'] ? hash['id'] : generate_random_id();
    r['modal'] = '#modal_' + r['id'];
    r['shadow'] = '#shadow_' + r['id'];
    r['bt_close'] = '#bt_close_' + r['id'];
    r['div_bt_close'] = '#div_bt_close_' + r['id'];
    r['bt_confirm'] = '#bt_confirm_' + r['id'];
    r['div_bt_confirm'] = '#div_bt_confirm_' + r['id'];
    return r;
  };
  h = process_hash(arguments);
  center = function() {
    $(h['modal']).css('marginLeft', $(h['modal']).width() / 2 * -1 + 'px');
    $(h['modal']).css('marginTop', $(h['modal']).height() / 2 * -1 + 'px');
    $(h['modal']).css('top', '50%');
    return $(h['modal']).css('left', '50%');
  };
  show_shadow = function() {
    $(h['shadow']).css('zIndex', index + 1);
    $(h['shadow']).animate({
      opacity: '0.4'
    }, h['openTime'], function() {
      return disableScroll();
    });
    if (h['autoClose']) {
      return setTimeout((function() {
        if (h['autoClose']) {
          return close_modal();
        }
      }), h['autoClose'] * 1000);
    }
  };
  open_modal = function() {
    $(h['modal']).css('zIndex', index + 2);
    $(h['modal']).transition({
      scale: 0
    }, 0);
    $(h['modal']).transition({
      scale: 1
    }, h['openTime'], h['effectShow']);
    return $(h['modal']).find("input:first").focus();
  };
  close_btn_bind = function() {
    $(h['bt_close']).click(function() {
      return close_modal();
    });
    if (h['closeOnClickShadow']) {
      return $(h['shadow']).click(function() {
        return close_modal();
      });
    }
  };
  resize_btns = function() {
    var close, confirm, err, error;
    try {
      close = $(h['bt_close']).outerWidth();
      confirm = $(h['bt_confirm']).outerWidth();
      if (close > confirm) {
        return $(h['bt_confirm']).css('width', close);
      } else {
        return $(h['bt_close']).css('width', confirm);
      }
    } catch (error) {
      err = error;
    }
  };
  gen_modal = function() {
    return "<div id=\"" + (h['modal'].substring(1)) + "\" class=\"sa_modal\" ><div class=\"sa_modal_content\" >";
  };
  gen_message = function() {
    if (h['message']) {
      return "<div class=\"sa_modal_message\" >" + h['message'] + "</div>";
    } else {
      return '';
    }
  };
  gen_title = function() {
    if (h['title']) {
      return "<div class=\"sa_modal_title\">" + h['title'] + "</div>";
    } else {
      return '';
    }
  };
  shadow = function() {
    return "<div id=\"" + (h['shadow'].substring(1)) + "\" class=\"sa_shadow\"></div>";
  };
  close_modal = function(confirm) {
    if (confirm == null) {
      confirm = false;
    }
    h['autoClose'] = false;
    if (h['onClose'] && !confirm) {
      h['onClose']();
    }
    $(h['modal']).transition({
      scale: 0,
      opacity: 0
    }, h['closeTime'], h['effectHide'], function() {
      return $(this).remove();
    });
    $(h['shadow']).transition({
      opacity: 0
    }, h['closeTime'], function() {
      return $(this).remove();
    });
    return enableScroll();
  };
  bt_confirm = function() {
    if (h['showConfirmBtn']) {
      return ("<div id=\"" + (h['div_bt_confirm'].substring(1)) + "\" class=\"sa_modal_bt\">\n  <input type=\"button\" id=\"" + (h['bt_confirm'].substring(1)) + "\" ") + (h['confirmClass'] ? " class=\"" + h['confirmClass'] + "\" " : '') + ("value=\"" + h['confirmText'] + "\"></input>\n\n</div>");
    } else {
      return '';
    }
  };
  bt_close = function() {
    return ("<div id=\"" + (h['div_bt_close'].substring(1)) + "\" class=\"sa_modal_bt\">\n  <input type=\"button\" id=\"" + (h['bt_close'].substring(1)) + "\" ") + (h['closeClass'] ? " class=\"" + h['closeClass'] + "\" " : '') + ("value=\"" + h['closeText'] + "\"></input>\n</div>");
  };
  modal = gen_modal();
  modal += gen_title();
  modal += gen_message();
  modal += '<div class="sa_list_bt" >';
  modal += bt_confirm();
  modal += bt_close();
  modal += '</div>';
  modal += '</div></div>';
  $('body').append(shadow());
  $('body').append(modal);
  disableScroll();
  resize_btns();
  show_shadow();
  open_modal();
  close_btn_bind();
  if (h['showConfirmBtn']) {
    $(h['bt_confirm']).click(function() {
      close_modal(true);
      if (h['onConfirm']) {
        return h['onConfirm']();
      }
    });
  } else {
    $(h['div_bt_close']).css('width', '100%');
  }
  center();
  return $(window).resize(function() {
    return center();
  });
  return null;
}
module.export = sa;