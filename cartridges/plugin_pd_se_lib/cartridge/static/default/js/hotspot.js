$(function() {
    $('#hotspot')
    .click(
        function () {
            //alert('Click event is fired');
            if ($('#hotspot_content').css("display") == "none")
            {
                $('#hotspot_content').show();
            }
            else
            {
                $('#hotspot_content').hide();
            }
        }
    )
});