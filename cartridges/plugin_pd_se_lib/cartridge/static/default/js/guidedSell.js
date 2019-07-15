$(document).ready( function() {
	if ($('[class*=gsQuestion]').length > 0) {
		var length = $('[class*=gsQuestion]').length
		var searchQuery = '?';
		$('[class*=gsQuestion]').each (function(index) {
			indexplus = index + 1;
			inputQuestion = $(this).find('input[name*=prefn]').attr('name', 'prefn' + indexplus);
			inputAnswers = $(this).find('input[name*=prefv]').attr('name', 'prefv' + indexplus);
			if (length === indexplus) {
				$(this).change( function () {
					$('#guidedSell').submit();
				});
			}
		});
	}
});