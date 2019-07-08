$(function() {
    $("[id^=hotspot]")
    .click(
        function () {
            var hsDiv = "#hotspot-content-" + $(this).attr("data-pid");            
            if ($(hsDiv).css("display") == "none")
            {
                $(hsDiv).show();
            }
            else
            {
                $(hsDiv).hide();
            }
        }
    )
});