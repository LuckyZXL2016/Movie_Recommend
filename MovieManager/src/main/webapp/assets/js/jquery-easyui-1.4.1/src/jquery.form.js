/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
/**
 * form - jQuery EasyUI
 * 
 */
(function($){
	/**
	 * submit the form
	 */
	function ajaxSubmit(target, options){
		var opts = $.data(target, 'form').options;
		$.extend(opts, options||{});
		
		var param = $.extend({}, opts.queryParams);
		if (opts.onSubmit.call(target, param) == false){return;}
		$(target).find('.textbox-text:focus').blur();
		
		var frameId = 'easyui_frame_' + (new Date().getTime());
		var frame = $('<iframe id='+frameId+' name='+frameId+'></iframe>').appendTo('body')
		frame.attr('src', window.ActiveXObject ? 'javascript:false' : 'about:blank');
		frame.css({
			position:'absolute',
			top:-1000,
			left:-1000
		});
		frame.bind('load', cb);
		
		submit(param);
		
		function submit(param){
			var form = $(target);
			if (opts.url){
				form.attr('action', opts.url);
			}
			var t = form.attr('target'), a = form.attr('action');
			form.attr('target', frameId);
			var paramFields = $();
			try {
				for(var n in param){
					var field = $('<input type="hidden" name="' + n + '">').val(param[n]).appendTo(form);
					paramFields = paramFields.add(field);
				}
				checkState();
				form[0].submit();
			} finally {
				form.attr('action', a);
				t ? form.attr('target', t) : form.removeAttr('target');
				paramFields.remove();
			}
		}
		
		function checkState(){
			var f = $('#'+frameId);
			if (!f.length){return}
			try{
				var s = f.contents()[0].readyState;
				if (s && s.toLowerCase() == 'uninitialized'){
					setTimeout(checkState, 100);
				}
			} catch(e){
				cb();
			}
		}
		
		var checkCount = 10;
		function cb(){
			var f = $('#'+frameId);
			if (!f.length){return}
			f.unbind();
			var data = '';
			try{
				var body = f.contents().find('body');
				data = body.html();
				if (data == ''){
					if (--checkCount){
						setTimeout(cb, 100);
						return;
					}
				}
				var ta = body.find('>textarea');
				if (ta.length){
					data = ta.val();
				} else {
					var pre = body.find('>pre');
					if (pre.length){
						data = pre.html();
					}
				}
			} catch(e){
			}
			opts.success(data);
			setTimeout(function(){
				f.unbind();
				f.remove();
			}, 100);
		}
	}
	
	/**
	 * load form data
	 * if data is a URL string type load from remote site, 
	 * otherwise load from local data object. 
	 */
	function load(target, data){
		var opts = $.data(target, 'form').options;
		
		if (typeof data == 'string'){
			var param = {};
			if (opts.onBeforeLoad.call(target, param) == false) return;
			
			$.ajax({
				url: data,
				data: param,
				dataType: 'json',
				success: function(data){
					_load(data);
				},
				error: function(){
					opts.onLoadError.apply(target, arguments);
				}
			});
		} else {
			_load(data);
		}
		
		function _load(data){
			var form = $(target);
			for(var name in data){
				var val = data[name];
				var rr = _checkField(name, val);
				if (!rr.length){
					var count = _loadOther(name, val);
					if (!count){
						$('input[name="'+name+'"]', form).val(val);
						$('textarea[name="'+name+'"]', form).val(val);
						$('select[name="'+name+'"]', form).val(val);
					}
				}
				_loadCombo(name, val);
			}
			opts.onLoadSuccess.call(target, data);
			validate(target);
		}
		
		/**
		 * check the checkbox and radio fields
		 */
		function _checkField(name, val){
			var rr = $(target).find('input[name="'+name+'"][type=radio], input[name="'+name+'"][type=checkbox]');
			rr._propAttr('checked', false);
			rr.each(function(){
				var f = $(this);
				if (f.val() == String(val) || $.inArray(f.val(), $.isArray(val)?val:[val]) >= 0){
					f._propAttr('checked', true);
				}
			});
			return rr;
		}
		
		function _loadOther(name, val){
			var count = 0;
			var pp = ['textbox','numberbox','slider'];
			for(var i=0; i<pp.length; i++){
				var p = pp[i];
				var f = $(target).find('input['+p+'Name="'+name+'"]');
				if (f.length){
					f[p]('setValue', val);
					count += f.length;
				}
			}
			return count;
		}
		
		function _loadCombo(name, val){
			var form = $(target);
			var cc = ['combobox','combotree','combogrid','datetimebox','datebox','combo'];
			var c = form.find('[comboName="' + name + '"]');
			if (c.length){
				for(var i=0; i<cc.length; i++){
					var type = cc[i];
					if (c.hasClass(type+'-f')){
						if (c[type]('options').multiple){
							c[type]('setValues', val);
						} else {
							c[type]('setValue', val);
						}
						return;
					}
				}
			}
		}
	}
	
	/**
	 * clear the form fields
	 */
	function clear(target){
		$('input,select,textarea', target).each(function(){
			var t = this.type, tag = this.tagName.toLowerCase();
			if (t == 'text' || t == 'hidden' || t == 'password' || tag == 'textarea'){
				this.value = '';
			} else if (t == 'file'){
				var file = $(this);
				if (!file.hasClass('textbox-value')){
					var newfile = file.clone().val('');
					newfile.insertAfter(file);
					if (file.data('validatebox')){
						file.validatebox('destroy');
						newfile.validatebox();
					} else {
						file.remove();
					}
				}
			} else if (t == 'checkbox' || t == 'radio'){
				this.checked = false;
			} else if (tag == 'select'){
				this.selectedIndex = -1;
			}
			
		});
		
		var t = $(target);
		var plugins = ['textbox','combo','combobox','combotree','combogrid','slider'];
		for(var i=0; i<plugins.length; i++){
			var plugin = plugins[i];
			var r = t.find('.'+plugin+'-f');
			if (r.length && r[plugin]){
				r[plugin]('clear');
			}
		}
		validate(target);
	}
	
	function reset(target){
		target.reset();
		var t = $(target);
		
		var plugins = ['textbox','combo','combobox','combotree','combogrid','datebox','datetimebox','spinner','timespinner','numberbox','numberspinner','slider'];
		for(var i=0; i<plugins.length; i++){
			var plugin = plugins[i];
			var r = t.find('.'+plugin+'-f');
			if (r.length && r[plugin]){
				r[plugin]('reset');
			}
		}
		validate(target);
	}
	
	/**
	 * set the form to make it can submit with ajax.
	 */
	function setForm(target){
		var options = $.data(target, 'form').options;
		$(target).unbind('.form');
		if (options.ajax){
			$(target).bind('submit.form', function(){
				setTimeout(function(){
					ajaxSubmit(target, options);
				}, 0);
				return false;
			});
		}
		setValidation(target, options.novalidate);
	}
	
	function initForm(target, options){
		options = options || {};
		var state = $.data(target, 'form');
		if (state){
			$.extend(state.options, options);
		} else {
			$.data(target, 'form', {
				options: $.extend({}, $.fn.form.defaults, $.fn.form.parseOptions(target), options)
			});
		}
	}
	
	function validate(target){
		if ($.fn.validatebox){
			var t = $(target);
			t.find('.validatebox-text:not(:disabled)').validatebox('validate');
			var invalidbox = t.find('.validatebox-invalid');
			invalidbox.filter(':not(:disabled):first').focus();
			return invalidbox.length == 0;
		}
		return true;
	}
	
	function setValidation(target, novalidate){
		var opts = $.data(target, 'form').options;
		opts.novalidate = novalidate;
		$(target).find('.validatebox-text:not(:disabled)').validatebox(novalidate ? 'disableValidation' : 'enableValidation');
	}
	
	$.fn.form = function(options, param){
		if (typeof options == 'string'){
			this.each(function(){
				initForm(this);
			});
			return $.fn.form.methods[options](this, param);
		}
		
		return this.each(function(){
			initForm(this, options);
			setForm(this);
		});
	};
	
	$.fn.form.methods = {
		options: function(jq){
			return $.data(jq[0], 'form').options;
		},
		submit: function(jq, options){
			return jq.each(function(){
				ajaxSubmit(this, options);
			});
		},
		load: function(jq, data){
			return jq.each(function(){
				load(this, data);
			});
		},
		clear: function(jq){
			return jq.each(function(){
				clear(this);
			});
		},
		reset: function(jq){
			return jq.each(function(){
				reset(this);
			});
		},
		validate: function(jq){
			return validate(jq[0]);
		},
		disableValidation: function(jq){
			return jq.each(function(){
				setValidation(this, true);
			});
		},
		enableValidation: function(jq){
			return jq.each(function(){
				setValidation(this, false);
			});
		}
	};
	
	$.fn.form.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, [{ajax:'boolean'}]), {
			url: (t.attr('action') ? t.attr('action') : undefined)
		});
	};
	
	$.fn.form.defaults = {
		novalidate: false,
		ajax: true,
		url: null,
		queryParams: {},
		onSubmit: function(param){return $(this).form('validate');},
		success: function(data){},
		onBeforeLoad: function(param){},
		onLoadSuccess: function(data){},
		onLoadError: function(){}
	};
})(jQuery);
