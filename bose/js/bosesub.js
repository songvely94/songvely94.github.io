$(function () {
    // ----- scroll event ----------------------------------------------------
    // 1. 뷰포트의 화면 하단부분이 .history-txt와 .history-img의 절반을 지나면
    // 1.1. .history-txt는 좌우에서 텍스트가 들어오고 opacity가 0에서 1로 변하고
    // 1.2. .history-img는 opacity가 0에서 1로 변하여라
    var $window = $(window);
    var $hisTxt = $(".history-txt");
    var $histImg = $(".history-img");

    $window.on("scroll", function () {
        var bottomWindow = $window.scrollTop() + $window.height();

        $hisTxt.each(function () {
            var bottomTxt = $(this).offset().top + $(this).outerHeight();

            if ( bottomWindow > bottomTxt ) {
                $(this).css({
                    opacity: "1",
                    transform: "translateX(0)"
                });
            } else if ( bottomWindow < bottomTxt ) {
                $(this).removeAttr("style");
            };
        });

        $histImg.each(function () {
            var bottomImg = $(this).offset().top + $(this).outerHeight();

            if ( bottomWindow > bottomImg ) {
                $(this).css({ opacity: "1" });
            } else if ( bottomWindow < bottomImg ) {
                $(this).removeAttr("style");
            };
        });
    });

    // ----- road event ----------------------------------------------------
    var amarImgPosi = $("#amarG-img").offset().left;
    var amarSpanPosi = $("#amarSpan").offset().left;
    var amarTxtPosi = amarImgPosi - amarSpanPosi;
    console.log("ImgPosi = " + amarImgPosi);
    console.log("SpanPosi = " + amarSpanPosi);
    console.log("TxtPosi = " + amarTxtPosi);

    $("#amarG-txt").css({left: amarTxtPosi});

    // console.log("height = " + $("#since1964").innerHeight());
    // console.log("outerheight = " + $("#since1964").outerHeight(true));
    // ----- click event -----------------------------------------------------
    // 1. bosePower-leftBtn을 클릭하면
    // 1.1. bosePower-item의 마지막 자식요소가 맨 앞으로 이동하고
    // 1.2. bosePower-item이 margin-left가 -100%된 후 margin-left를 0으로 만든다.
    // 1.3. bosePower-rightBtn을 클릭하면
    // 1.4. bosePower-item의 margin-left가 -100%되고,
    var $prevBtn = $("#bosePower-leftBtn");
    var $nextBtn = $("#bosePower-rightBtn");
    var $bosePowerList = $("#bosePower-list");

    $prevBtn.on("click", function () {
        $bosePowerList.prepend( $bosePowerList.children(":last") )
            .css("margin-left", "-100%").animate({marginLeft: "0"});
    });

    $nextBtn.on("click", function () {
        $bosePowerList.animate({marginLeft: "-100%"}, function () {
            $(this).removeAttr("style").children(":first").appendTo($(this));
        });
    });

    $window.on("resize", function () {
        amarImgPosi = $("#amarG-img").offset().left;
        amarSpanPosi = $("#amarSpan").offset().left;
    });
});