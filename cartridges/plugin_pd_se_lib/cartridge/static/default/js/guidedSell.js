$(document).ready( function() {
	if (('html.veiled').length > 0) {
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
						DoMyAjaxCall();
						
						$('[class*=gsQuestion]').each (function() {
							$(this).change( function () {
								DoMyAjaxCall();
							});
						});
						function DoMyAjaxCall() {
							searchQuery = '';
							varquestion = $('div[id*=question]').each( function () {
								var questionName = $(this).find('input[name*=prefn]').attr('name');
								var questionVal = $(this).find('input[name*=prefn]').val();
								var answerName = $(this).find('input[name*=prefv]').attr('name');
								var answerVal = $(this).find('input[name*=prefv]:checked').val();
								searchQuery = searchQuery + questionName + '=' + questionVal + '&' + answerName + '=' + answerVal + '&';
							});
							//question.find()
							var postUrl = "/on/demandware.store/Sites-RefArchGlobal-Site/en_GB/Search-ShowAjax?" + searchQuery;
							$.get(postUrl)
							.done(function( data ) {
								var n = parseInt($(data).find('.result-count').text());

								if (n > 0) {
									var content = $( data ).find( ".tab-content.col-12" );
									$( ".search-results .guidedSellResults" ).empty().append( content );
									$('.refinement-bar').remove();
									$('.search-results').show();
								} else {
									$( ".search-results .guidedSellResults" ).empty().append( "<h3>There were no results found!</h3>" );
								}
							});
						}
					});
				}
			});
		}

		$('.experience-guidedsell_assets-gsAnswer').each (function() {
			var oneLabel = $(this).find('.guidedSellMethod');
			oneLabel.click(function() {
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
			});
			var questionParent = $(this).parent().parent();
			oneLabel.appendTo(questionParent);
			$(this).remove();
		});
		$('.experience-gsAnswers').remove();
	}
});