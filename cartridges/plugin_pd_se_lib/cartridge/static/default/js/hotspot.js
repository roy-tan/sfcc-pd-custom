$(function() {
    $('#hotspot')
    .click(
        function () {
            //alert('Click event is fired');
            if ($('#hotspot-content').css("display") == "none")
            {
                $('#hotspot-content').show();
            }
            else
            {
                $('#hotspot-content').hide();
            }
        }
    )
});