$(function(){
	CMT.init();
});

var CMT = {
	send: function(id){
		var post = {};
		var f = $('#frm-comment-'+id);
		var formArray = f.serializeArray();
		for(var i = 0, n = formArray.length; i < n; ++i) {
			post[formArray[i].name] = formArray[i].value;
		}
		$.ajax({
			type: 'POST',
			url: root + 'comment/add/'+post_id,
			dataType: 'json',
			data: {
				lang: lang,
				post: post,
				mod: module,
				curUrl: window.location.href,
			},
			beforeSend: function(){
				var div = '<div class="cmt-loading alert alert-warning"></div>';
				f.append(div);
				f.find('.cmt-loading').html('Äang xá»­ lĂ½ ...');
			},
			success: function(response) {
				f.find('.cmt-loading').fadeOut(function(){
					f.append(response);
					f.find('.form-control').val('');
					f.find('.cmt-success').fadeOut(5000, function(){
						$(this).remove();
					});
				});
			}
		});
		return false;
	},
	reply: function(id){
		$.ajax({
			type: 'post',
			url: root+'comment/reply/'+id,
			dataType: 'json',
			beforeSend: function(){
				var box = $('#box-comment');
				box.find('.comment-hide').hide();
				$('.comment-form-sub').remove();
			},
			success: function(response) {
				var box = $('#comment-'+id);
				box.find('.commentBody').append(response);
				box.find('textarea').focusEnd();
				console.log(response);
			}
		});
	},
	like: function(id){
		var box = $('#comment-'+id);
		$.ajax({
			type: 'POST',
			url: root + 'comment/like/'+id,
			dataType: 'json',
			success: function(response) {
				var el = box.find('.commentLike>span');
				el.text(response);
				el.attr('onclick', 'CMT.unLike('+id+')');
			}
		});
	},
	unLike: function(id){
		var box = $('#comment-'+id);
		$.ajax({
			type: 'POST',
			url: root + 'comment/unlike/'+id,
			dataType: 'json',
			success: function(response) {
				var el = box.find('.commentLike>span');
				el.text(response);
				el.attr('onclick', 'CMT.like('+id+')');
			}
		});
	},
	satisfied: function(id){
		CMT.closeSatis(id);
		var box = $('#comment-'+id);
		$.ajax({
			type: 'POST',
			url: root + 'comment/satisfied/'+id,
			dataType: 'json',
			beforeSend: function(){
				box.find('.commentSatisfied>span').addClass('clicked');
			},
			success: function(response) {
				box.find('.commentInfo .mwrs').remove();
				box.find('.commentInfo').append('<li class="mwrs"></li>');
				box.find('.commentInfo .mwrs').text(response);
				box.find('.commentInfo .mwrs').fadeOut(5000, function(){
					$(this).remove();
					box.find('.clicked').removeClass('clicked');
				});
			}
		});
	},
	unSatisfied: function(id){
		var box = $('#comment-'+id);
		$.ajax({
			type: 'POST',
			url: root + 'comment/unsatisfied/'+id,
			dataType: 'json',
			beforeSend: function(){
				CMT.clear(id);
				box.find('.commentUnSatisfied>span').addClass('clicked');
			},
			success: function(response) {
				box.find('.commentInfo .wrapsatis').remove();
				box.find('.commentUnSatisfied').append(response);
				box.find('.commentUnSatisfied>span').addClass('clicked');
			}
		});
	},
	feedback: function(f, id){
		var box = $('#comment-'+id);
		var content = f.ustCt.value;
		var name = f.ustName.value;
		var phone = f.ustPhone.value;
		$.ajax({
			type: 'POST',
			url: root + 'comment/feedback/'+id,
			dataType: 'json',
			data: {
				lang : lang,
				name : name,
				phone : phone,
				content : content,
			},
			beforeSend: function(){
				CMT.clear(id);
			},
			success: function(response){
				CMT.closeSatis(id);
				box.find('.commentInfo .mwrs').remove();
				box.find('.commentInfo').append('<li class="mwrs"></li>');
				box.find('.commentInfo .mwrs').text(response);
				box.find('.commentInfo .mwrs').fadeOut(5000, function(){
					$(this).remove();
				});
			}
		});
		return false;
	},
	vote: function (num, cmt_id){
		var cmt = cmt_id ? $('#comment-'+cmt_id) : $('.form-comment');
		for (i=1;i<=5;i++)
		{
			objname = 'vote_'+i;
			var cls = (i<=num) ? 'active fa fa-star' : 'fa fa-star-o';
			cmt.find('.'+objname).attr('class', objname);
			cmt.find('.'+objname).addClass(cls);
		}
		cmt.find('input[name=hvote]').val(num);
	},
	scrollTop: function(id, time, offset){
		time = time ? time : 400;
		offset = offset ? offset : 10;
		var box = id ? '#comment-'+id : '#list-comment';
		$('html, body').animate({scrollTop: $(box).offset().top-offset}, time);
	},
	showName: function(id){
		var box = id ? '#frm-comment-'+id : '.comment-form';
		if(!id)
		{
			$('.comment-form-sub').remove();
		}
		$(box).find('.comment-hide').stop().slideDown();
	},
	closeSatis: function(id){
		var box = $('#comment-'+id);
		box.find('.wrapsatis').remove();
		box.find('.clicked').removeClass('clicked');
	},
	clear: function(id){
		var box = $('#comment-'+id);
		box.find('.wrapsatis').remove();
		box.find('.comment-form-sub').remove();
		box.find('.clicked').removeClass('clicked');
	},
	list: function(){
		$.ajax({
			type: 'POST',
			url: root + 'comment',
			dataType: 'json',
			data: {
				mod: module,
				lang: lang,
				post_id: post_id,
			},
			success: function(response) {
				$(elCMT).html(response);
				CMT.hash();
			}
		});
	},
	result: function(p=1){
		var box = $(elCMT);
		var s = box.find('input[name=s]').val();
		var ajaxurl = root + 'comment';
		$.ajax({
			type: 'POST',
			url: ajaxurl,
			dataType: 'json',
			data: {
				s: s,
				p: p,
				mod: module,
				lang: lang,
				post_id: post_id,
				is_vote: (typeof is_vote != 'undefined' && is_vote==1) ? 1 : 0,
			},
			success: function(response) {
				$(elCMT).html(response);
				var hash = window.location.hash;
				var id = parseInt(hash.substr(9));
				if(id || p>1) { CMT.scrollTop(id) };
			}
		});
	},
	init: function(){
		if(typeof(elCMT)!='undefined' && elCMT!==null) {
			CMT.result();
		}
	}
} // End CMT

$.fn.focusEnd = function() {
	return this.each(function() {
		$(this).focus()
		if (this.setSelectionRange) {
			var len = $(this).val().length * 2;
			this.setSelectionRange(len, len);
			} else {
			$(this).val($(this).val());
		}
		this.scrollTop = 999999;
	});
}; // END CMT