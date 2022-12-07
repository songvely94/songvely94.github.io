$(function () {
    // ----- scroll event ----------------------------------------------------
    // 1. 뷰포트의 화면 하단부분이 .history-txt와 .history-img의 절반을 지나면
    // 1.1. .history-txt는 좌우에서 텍스트가 들어오고 opacity가 0에서 1로 변하고
    // 1.2. .history-img는 opacity가 0에서 1로 변하여라
    var $window = $(window);
    var windowWidth = $window.width();
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

    // ----- load event ----------------------------------------------------
    var amarImgPosi = $("#amarG-img").offset().left;
    var amarSpanPosi = $("#amarSpan").offset().left;
    var amarTxtPosi = amarImgPosi - amarSpanPosi;

    if ( windowWidth >= 1200 ) {
        $("#amarG-txt").css({left: amarTxtPosi});
        
        if( amarTxtPosi < 0 || amarSpanPosi < 100 ) {
            $("#amarG-txt").css({left: 0}).children("h1").css({
                fontSize: "5rem",
                lineHeight: "6rem",
                textShadow: "1px 1px 1px rgba(245, 243, 244, 0.7)"
            }).children("span").css({
                color: "#191919",
                textShadow: "1px 1px 1px rgba(245, 243, 244, 0.7)"
            });
        }
    } else if ( windowWidth <= 1199 ) {
        var headerHeight = $("#header").outerHeight();

        $("#amarG").css({paddingTop: headerHeight});
    }
    

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
    var $bosePower = $("#bosePower");

    $prevBtn.on("click", prevBtn);

    $nextBtn.on("click", nextBtn);

    if ( windowWidth <= 767 ) {
        var touchStart = 0;
        var touch = false;

        var subTimer = window.setInterval(nextBtn, 6000);

        $bosePower.on("touchstart", function (e) {
            window.clearInterval( subTimer );

            touchStart = e.originalEvent.touches[0].pageX;
            touch = true;
            console.log("touch")
        })

        $bosePower.on("touchmove", function (e) {
            if ( touch == true ) {
                $bosePowerList.css("margin-left", (e.originalEvent.touches[0].pageX - touchStart) + "px");
            }
        })

        $bosePower.on("touchend", function (e) {
            touch = false;

            if ( e.originalEvent.changedTouches[0].pageX - touchStart < -10) {
                nextBtn();
            } else if( e.originalEvent.changedTouches[0].pageX - touchStart > 10) {
                prevBtn();
            }

            subTimer = window.setInterval(nextBtn, 6000);
        })
    }

    // ----- function --------------------------------------------------------
    function prevBtn () {
        $bosePowerList.prepend( $bosePowerList.children(":last") )
            .css("margin-left", "-100%").animate({marginLeft: "0"});
    }

    function nextBtn () {
        $bosePowerList.animate({marginLeft: "-100%"}, function () {
            $(this).removeAttr("style").children(":first").appendTo($(this));
        });
    }


    $window.on("resize", function () {
        windowWidth = $window.width();

        amarImgPosi = $("#amarG-img").offset().left;
        amarSpanPosi = $("#amarSpan").offset().left;
        amarTxtPosi = amarImgPosi - amarSpanPosi;

        if ( windowWidth >= 1200 ) {
            $("#amarG-txt").css({left: amarTxtPosi});
            
            if( amarTxtPosi < 0 || amarSpanPosi < 100 ) {
                $("#amarG-txt").css({left: 0}).children("h1").css({
                    fontSize: "5rem",
                    lineHeight: "6rem",
                    textShadow: "1px 1px 1px rgba(245, 243, 244, 0.7)"
                }).children("span").css({
                    color: "#191919",
                    textShadow: "1px 1px 1px rgba(245, 243, 244, 0.7)"
                });
            }
        }
    });
});