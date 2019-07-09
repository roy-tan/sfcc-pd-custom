$(function () {
    $("[id^=hotspot]").click(
        function () {
            var hsDiv = "#hotspot-content-" + $(this).attr("data-pid");
            if ($(hsDiv).css("display") == "none") {
                $(hsDiv).show();
            }
            else {
                $(hsDiv).hide();
            }
        }
    )
    $("[id=product-detail]").click(
        function() {            
            $(this).attr('class', 'product-detail');
        }
    )

    var waitForEl = function(selector, callback) {
        if (jQuery(selector).length) {
          callback();
        } else {
          setTimeout(function() {
            waitForEl(selector, callback);
          }, 100);
        }
    };

    waitForEl(".add-to-cart-messages", function() {
        $(".product-detail").removeClass("product-detail");
    });
});

