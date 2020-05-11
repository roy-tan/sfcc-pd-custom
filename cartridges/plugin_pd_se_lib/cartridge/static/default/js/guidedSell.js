$(document).ready( function() {

	$('.guidedSellCont').each(function() {
		if ($(this).attr('data-src') === 'checkbox'){
			//$(this).find('input[name*=prefv]').attr('type', 'checkbox');
		}
	});
	if (window.location === window.parent.location) {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		var language = urlParams.get('lang');
		var siteName = window.location.pathname.substring(3, window.location.pathname.substring(3).indexOf("/")+3);
		var categoryID = $('#guidedSell').attr('category');
		var searchCatParam = categoryID === "" ? "?" : "?cgid=" + categoryID ;

		DoMyAjaxCall(siteName, language, searchCatParam, false);

		if ($('[class*=gsQuestion]').length > 0) {
			var length = $('[class*=gsQuestion]').length
			var searchQuery;
			$('[class*=gsQuestion]').each (function(index) {
				indexplus = index + 1;
				inputQuestion = $(this).find('input[name*=prefn]').attr('name', 'prefn' + indexplus);
				inputAnswers = $(this).find('input[name*=prefv]').attr('name', 'prefv' + indexplus);

				inputParentId = $(this).find('.guidedSellBtnGroup').attr('id', 'question' + indexplus);
				
				if (length === indexplus) {
					$(this).change( function () {
						DoMyAjaxCall(siteName, language, searchCatParam, true);
						return;
						$('[class*=gsQuestion]').each (function() {
							$(this).change( function () {
								DoMyAjaxCall(siteName, language, searchCatParam, true);
							});
						});
						
					});
				} else {
					$('[class*=gsQuestion]').each (function() {
						$(this).change( function () {
							DoMyAjaxCall(siteName, language, searchCatParam, false);
						});
					});
				}
			});
		}

		$('.experience-guidedsell_assets-gsAnswer').each (function() {
			var oneLabel = $(this).find('.guidedSellMethod');
			var questionParent = $(this).parent().parent();
			oneLabel.click(function(evt) {
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
			});
			
			oneLabel.appendTo(questionParent);
			$(this).remove();
		});
		$('.experience-gsAnswers').remove();
	} else {
		//inside Page Designer
		$('.guidedSellWrap').each(function () {
			var trueOuterwidth = 0;
			$(this).find('.experience-guidedsell_assets-gsAnswer').each(function () {
				trueOuterwidth += $(this).outerWidth(true);
			});
			$(this).find('.experience-gsAnswers').css('width', trueOuterwidth + 'px');
			$(this).find('.experience-guidedsell_assets-gsAnswer').css('float', 'left');
		});
	}
});

function DoMyAjaxCall(siteName, language, searchCatParam, blnShowItems) {
	searchQuery = '';
	varquestion = $('div[id*=question]').each( function () {
		var questionName = $(this).find('input[name*=prefn]').attr('name');
		var questionVal = $(this).find('input[name*=prefn]').val();
		var answerName = $(this).find('input[name*=prefv]').attr('name');
		var answerVal = $(this).find('input[name*=prefv]:checked').val();
		searchQuery = searchQuery + questionName + '=' + questionVal + '&' + answerName + '=' + answerVal + '&';
	});
	//question.find()
	var postUrl = "/on/demandware.store/Sites-" + siteName + "-Site/"+ language +"/Search-ShowAjax" + searchCatParam + "&" + searchQuery;
	postUrl = postUrl.replace("undefined","").replace("|","%7c");
	$.get(postUrl)
	.done(function( data ) {
		var n = parseInt($(data).find('.result-count').text());

		if (n > 0 && blnShowItems) {
			var content = $( data ).find( ".tab-content.col-12" );
			$( ".search-results .guidedSellResults" ).empty().append( content );
			$('.refinement-bar').remove();
			$('.tab-content .tab-pane .col-sm-12.col-md-9').removeClass('col-md-9').addClass('col-md-12');
			$('.search-results').show();
			$(".total").text(n);
			$("#helper-tab").show();
		} else if (n > 0 && !blnShowItems) {
			$(".total").text(n);
			$("#helper-tab").show();
		} else {
			$( ".search-results .guidedSellResults" ).empty().append( "<h3>There were no results found!</h3>" );
		}
	});
}