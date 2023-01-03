$(function () {
    var $window = $(window);
    var windowHeight = $window.height();
    var $footer = $("#footer");
    var $fixed = $(".fixed");

    var $plus = $("#plus");
    var $minus = $("#minus");
    var $count = $("input[name=count]");
    var $numVal = $count.attr("value");

    var $allCount = $("#allCount");
    var $allPrice = $("#allPrice");


    $window.on("scroll", function () {
        var scrollTop = $window.scrollTop();
        var windowBottom = scrollTop + windowHeight;

        if ( windowBottom >= $footer.offset().top ) {
            $fixed.css({position:"absolute", top: ($("#slideImg").offset().top + $("#slideImg").outerHeight())-windowHeight})
        } else {
            $fixed.removeAttr("style");
        }
    })

    $plus.on("click", function (e) {
        e.preventDefault();

        $numVal++;
        $count.attr("value", $numVal);
        
        comma();
    })
    
    $minus.on("click", function (e) {
        e.preventDefault();
        
        if ( $numVal <= 1 ) return;
        else $numVal--;

        $count.attr("value", $numVal);
        
        comma();
    })

    function comma() {
        var comma = 109000 * $numVal;

        comma = comma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        $allPrice.text(comma);
        $allCount.text($numVal);
    }
    
})