$(function () {
    var $window = $(window);
    var windowWidth = $window.width();
    var windowHeight = $window.height();

    var $header = $("#header");
    var $main = $("#main");
    var $cont1Wrap = $("#cont1-wrap");
    var $cont2Wrap = $("#cont2-wrap");
    var $cont3Wrap = $("#cont3-wrap");
    // -----------------------------------------------------------------------
    var $for = $("#forthe");
    var $love = $("#loveofmusic");

    var $cont1Img = $(".cont1-img");
    var $moveTxt = $("#moveTxt");
    var $speaker = $("#speaker-m");
    var $scaleBose = $("#scaleBose");

    var $proImgWrap = $(".pro-img-wrap");

    // ----- roding ----------------------------------------------------------
    // 1. #cont2-wrap의 margin-top 값을 윈도우 너비 + 뷰포트의 높이 만큼 준다.
    $cont1Wrap.css({ marginTop: windowWidth + windowHeight });

    var moveStart = $moveTxt.offset().top + $moveTxt.outerHeight() - windowHeight;
    var moveEnd = $moveTxt.offset().top;
    var moveGap = moveEnd - moveStart;
    var pervScrollTop = 0;
    var MprevScrollTop = 0;
    
    var cont1Top = $cont1Wrap.offset().top;
    var runmanTop = $("#runman").offset().top;
    
    var speakerTop = $speaker.offset().top;
    var speakerBottom = speakerTop + $speaker.outerHeight();
    var skateTop = $("#skate-w").offset().top;

    // ----- roding ----------------------------------------------------------
    // 2. .pro-img-wrap의 첫번째 자식으로 <span> 요소를 4개 넣어준다.
    $("<span></span><span></span><span></span><span></span>").prependTo($proImgWrap);

    // ----- scroll event ----------------------------------------------------
    $window.on("scroll", function () {
        var scrollTop = $window.scrollTop();
        var bottomWindow = scrollTop + windowHeight;
        // 1. $forthe, $loveofmusic 글자가 스크롤에 맞춰서 좌우로 들어온다.
        // 1.1. $forthe, $loveofmusic 이 담긴 영역전체를 fixed.
        // 1.2. window의 너비 만큼 $forthe, $loveofmusic 글자가 스크롤에 맞춰서 좌우로 들어온다.
        // 1.3.1. window의 너비 만큼 내려오면 담긴 영역을 
        // 1.3.2. position: absolute로 바꿔주고, top: 윈도우의 너비 값, height: 100%로 지정
        if ( scrollTop > windowWidth ) {
            $main.css({
                position: "absolute",
                top: windowWidth,
                height: "100%"
            })
        } else if ( scrollTop < windowWidth ){
            $main.removeAttr("style");

            var percent = 100 - ( scrollTop / windowWidth * 100 );
            
            $for.css({ right: -(percent) + 5 + "%" });
            $love.css({ left: -(percent) + 5 + "%" });
        };

        $cont1Img.each(function () {
            $(this).css({"opacity": "1"});
            var bottomImg = $(this).offset().top + $(this).outerHeight()/2;
            
            if( bottomWindow > bottomImg ) {
                $(this).css({"opacity": "1"});
            } else if ( bottomWindow < bottomImg ) {
                $(this).removeAttr("style");
            };
        });
    
        // 2. 뷰포트의 화면의 상단이 #cont1-wrap의 offset().top에 도달했을 때
        // 2.1. 메뉴바가 바뀐다.
        if ( scrollTop >= cont1Top - $header.height()/2 && scrollTop <= $cont3Wrap.offset().top) {
            $header.css({ background: "transparent" }).children(":first").hide().next().show();
        } else {
            $header.removeAttr("style").children().removeAttr("style");
        };
    
        // 3. #cont1-wrap의 offset.top 값에 도달하면 이미지들 움직임.
        // 3.1. #cont1-wrap의 offset.top 값이 화면 윗부분에 도달하고,
        //      moveEnd 값이 화면 아랫부분에 도달하면 
        // 3.2. #charl-1, #charl-2, #yellowman 이미지가 스크롤에 맞춰서 움직인다.
        if ( scrollTop >= cont1Top && bottomWindow <= moveEnd ) {
            var imgStartTop = scrollTop - cont1Top;
            var topVal = (imgStartTop / (moveEnd-cont1Top) * 100);
            var transVal = Math.floor(imgStartTop / (moveEnd-cont1Top) * 10);
            var transValL = Math.floor(imgStartTop / (moveEnd-cont1Top) * 20);

            $cont1Img.eq(0).css({transform: "translateY(" + topVal + "%)"})
                .children("img").css({ transform: "translate(-50%," + (-49 + -(transVal)) + "% scale(1))"});
            $cont1Img.eq(1).css({transform: "translateY(" + topVal + "%)"})
                .children("img").css({ transform: "translate(-50%," + (-47 + -(transValL)) + "% scale(0.55))" });
            $cont1Img.eq(2).css({transform: "translateY(" + -(topVal) + "%)"})
                .children("img").css({ transform: "translate(-50%," + (-53 + transValL) + "% scale(0.7))" });

        };
    
        // 4. #moveTxt 글자 움직이기
        // 4.1. #moveTxt 글자가 뷰포트 화면 밑부분에서 보이기 시작하고,
        //      #moveTxt 글자의 offset().top 값이 뷰포트 화면 윗부분에 도달하는 사이동안
        // 4.2.1. 글자가 좌우로 이동하고,
        // 4.2.2. skew값과 scale 값이 들어간다.
        // 4.2.3. 이벤트가 끝나고 일정한 시간이 지나면 style 제거.
        if ( scrollTop >= moveStart && scrollTop <= moveEnd ) {
            var startTop = scrollTop - moveStart;
            var leftVal = 100 - (startTop / moveGap * 200);
            var classAdd = scrollTop > pervScrollTop ? "moveLeft" : "moveRight";

            $moveTxt.css({ left: leftVal + "%" }).addClass(classAdd);

            window.setTimeout(function () {
                $moveTxt.removeAttr("class");
            }, 400);
        };
        pervScrollTop = scrollTop;

        // 5. moveStart 갑에 도달하면 이미지들 움직임.
        // 5.1. moveStart 값이 화면 윗부분에 도달하고,
        //      #speaker-m의 offset.top 값이 화면 아랫부분에 도달하면
        // 5.2. #restwoman, #rugby-m, #basket-m, #skate-w 이미지가 스크롤에 맞춰서 움직인다.
        if ( scrollTop >= moveEnd && bottomWindow <= speakerTop ) {
            var imgStartTop2 = scrollTop - moveEnd;
            var topVal2 = (imgStartTop2 / (speakerTop - moveEnd) * 100);
            var transVal2 = Math.floor(imgStartTop2 / (speakerTop - moveEnd) * 5);
            var transVal2L = Math.floor(imgStartTop2 / (speakerTop - moveEnd) * 20);
            var degVal =(imgStartTop2 / (speakerTop - moveEnd) * 2);
            var degValFix = degVal.toFixed(1)

            $scaleBose.css({opacity: degValFix, transform: "scale(" + degValFix + ")"})

            $cont1Img.eq(3).css({transform: "translateY(" + topVal2 + "%)"})
                .children("img").css({ transform: "translate(-50%," + (-49 + -(transVal2)) + "% scale(0.2))"});
            $cont1Img.eq(4).css({transform: "translateY(" + -(topVal2) + "%)"})
                .children("img").css({ transform: "translate(-50%," + (-53 + transVal2L) + "% scale(1))"});
            $cont1Img.eq(5).css({transform: "translateY(" + topVal2 + "%)"})
                .children("img").css({ transform: "translate(-50%," + (-47 + -(transVal2L)) + "% scale(1))"});
        };
        if ( scrollTop >= runmanTop && bottomWindow <= speakerTop ) {
            var skateStartTop = scrollTop - runmanTop;
            var skateTopVal = (skateStartTop / (speakerTop - runmanTop) * 100);
            var skateTransVal = Math.floor(skateStartTop / (speakerTop - runmanTop) * 20);

            $cont1Img.eq(6).css({transform: "translateY(" + skateTopVal + "%)"})
                .children("img").css({ transform: "translate(-50%," + (-48 + -(skateTransVal)) + "%) scale(1)"});
        };

        // 6. speakr-m의 하단 부분이 윈도우 하단 부분에 도달할 때 speark-m의 scale 커지기
        // 6.1. $speaker 의 하단 부분이 윈도우 하단 부분에 도달하고,
        //      $speaker 의 offset.top 값이 위도우 상단부분에 도달하면
        // 6.2. $speaker 의 scale이 1.2로 커진다.
        if ( scrollTop >= skateTop && scrollTop <= speakerBottom ) {
            var speakerStartTop = scrollTop - skateTop;
            var speakerTransVal = (speakerStartTop / (speakerBottom - skateTop) * 3);
            var speakerFix = speakerTransVal.toFixed(1);

            if ( speakerFix >= 1.0 && speakerFix <= 1.4 ) {
                $speaker.children("img").css({transform: "translate(-50%, -50%) scale(" + speakerFix + ")"})
            }
        };

    
        // 6. #cont2-wrap의 offset().top 값이 뷰포트 화면 상단에 도달하면
        // 6.1. $cont2-txt에 fadeinTxt 클래스 추가
        if ( scrollTop >= speakerBottom ) {
            $cont2Wrap.children().addClass("fadeinTxt");
        } else {
            $cont2Wrap.children().removeClass("fadeinTxt");
        };

        // ----- 반응형 ------------------------------------------------------------------
        if ( windowWidth <= 1199 ) {
            var MmoveStart = $moveTxt.offset().top + $moveTxt.outerHeight() - windowHeight;
            var MmoveEnd = $moveTxt.offset().top;
            var MmoveGap = MmoveEnd - MmoveStart;

            var MspeakerTop = $speaker.offset().top;
            var MrunmanTop = $("#runman").offset().top;
            
            // 2. 뷰포트의 화면의 상단이 #cont1-wrap의 offset().top에 도달했을 때 메뉴바 변경
            if ( scrollTop >= cont1Top - $header.height()/2 && scrollTop <= $cont3Wrap.offset().top) {
                $("#colorLogo").children(":last").hide().siblings().show();
                $("#ham-menu").css("background-image", "url(" + "images/menu-ham-w.png" + ")")
            } else {
                $("#colorLogo").children().removeAttr("style");
                $("#ham-menu").removeAttr("style");
            };
            
            // 3. #cont1-wrap의 offset.top 값에 도달하면 이미지들 움직임.
            if ( scrollTop >= cont1Top && bottomWindow <= MmoveEnd ) {
                var imgStartTop = scrollTop - cont1Top;
                var topVal = (imgStartTop / (MmoveEnd-cont1Top) * 100);
                var transVal = Math.floor(imgStartTop / (MmoveEnd-cont1Top) * 10);
                var transValL = Math.floor(imgStartTop / (MmoveEnd-cont1Top) * 20);
    
                $cont1Img.eq(0).css({transform: "translateY(" + topVal + "%)"});
                $cont1Img.eq(1).css({transform: "translateY(" + topVal + "%)"});
                $cont1Img.eq(2).css({transform: "translateY(" + -(topVal) + "%)"});
    
            };
            
            // 4. #moveTxt 글자 움직이기
            if ( scrollTop >= MmoveStart && scrollTop <= MmoveEnd ) {
                var startTop = scrollTop - MmoveStart;
                var leftVal = 100 - (startTop / MmoveGap * 300);
                var classAdd = scrollTop > MprevScrollTop ? "moveLeft" : "moveRight";
                
                $moveTxt.css({ left: leftVal + "%" }).addClass(classAdd);
                
                window.setTimeout(function () {
                    $moveTxt.removeAttr("class");
                }, 400);

                console.log("classAdd = " + classAdd);
            };
            MprevScrollTop = scrollTop;
            
            // 5. moveStart 갑에 도달하면 이미지들 움직임.
            if ( scrollTop >= MmoveEnd && bottomWindow <= MspeakerTop ) {
                var imgStartTop2 = scrollTop - MmoveEnd;
                var topVal2 = (imgStartTop2 / (MspeakerTop - MmoveEnd) * 100);
                var transVal2 = Math.floor(imgStartTop2 / (MspeakerTop - MmoveEnd) * 5);
                var transVal2L = Math.floor(imgStartTop2 / (MspeakerTop - MmoveEnd) * 20);
                
                $cont1Img.eq(3).css({transform: "translateY(" + topVal2 + "%)"});
                $cont1Img.eq(4).css({transform: "translateY(" + -(topVal2) + "%)"});
                $cont1Img.eq(5).css({transform: "translateY(" + topVal2 + "%)"});
            };
            if ( scrollTop >= MrunmanTop && bottomWindow <= MspeakerTop ) {
                var skateStartTop = scrollTop - MrunmanTop;
                var skateTopVal = (skateStartTop / (MspeakerTop - MrunmanTop) * 100);
                
                $cont1Img.eq(6).css({transform: "translateY(" + skateTopVal + "%)"})
                    .children("img").css({ transform: "translate(0) scale(1)"});
            };
            
            $speaker.children("img").css({transform: "translate(0) scale(1)"})

        }

    });

    // ----- click event -----------------------------------------------------
    // 1. #best-prev-btn 클릭 시
    // 1.1. #best-list-wrap을 33.333% 만큼 좌에서 우로 이동.
    // 2. #best-next-btn 클릭 시
    // 2.1. #best-list-wrap을 33.333% 만큼 우에서 좌로 이동.
    var interval = 6000;
    var $bestList = $("#best-list-wrap");
    var $bestItems = $("#best-items");

    var $bestPrevBtn = $("#best-prev-btn");
    var $bestNextBtn = $("#best-next-btn");

    /*
    var timerId = window.setInterval (rightSlide, interval);

    $bestList.hover (
        function () { mouseEnter() },
        function () { mouseLeave() }
    );

    $bestPrevBtn.on("click", function (e) {
        e.preventDefault();
        leftSlide();
    }).hover (
        function () { mouseEnter() },
        function () { mouseLeave() }
    );
    $bestNextBtn.on("click", function (e) {
        e.preventDefault();
        rightSlide();
    }).hover (
        function () { mouseEnter() },
        function () { mouseLeave() }
    );
    */

    // 1. .color-btn 클릭 시
    // 1.1. .color-on이 사라지고 클릭한 .color-btn에 클래스 추가
    // 1.2. .color-btn의 data-target에 맞는 img 보여주기
    $(".color-btn-wrap").each(function () {
        $(this).children().on("click", function (e) {
            e.preventDefault();
            if( $(this).is(".color-on") ) return;
    
            $(this).addClass("color-on").siblings().removeClass("color-on");

            var data = $(this).attr("data-target");
            $(".best-product-img > img").filter(data).show().siblings().hide();
        });
    });

    // ----- 반응형 ------------------------------------------------------------------
    if ( windowWidth >= 1200 ) {
        var timerId = window.setInterval (rightSlide, interval);

        $bestList.hover (
            function () { mouseEnter() },
            function () { mouseLeave() }
        );

        $bestPrevBtn.on("click", function (e) {
            e.preventDefault();
            leftSlide();
        }).hover (
            function () { mouseEnter() },
            function () { mouseLeave() }
        );
        $bestNextBtn.on("click", function (e) {
            e.preventDefault();
            rightSlide();
        }).hover (
            function () { mouseEnter() },
            function () { mouseLeave() }
        );

    } else if ( windowWidth >= 768 && windowWidth <= 1199) {
        var TtouchStart = 0;
        var Ttouch = false;
        
        var TtimerId = window.setInterval (rightSlide, interval);

        $bestList.on("touchstart", function (e) {
            window.clearInterval( TtimerId );

            TtouchStart = e.originalEvent.touches[0].pageX;
            Ttouch = true;
        })

        $bestList.on("touchmove", function (e) {
            if(Ttouch == true) {
                $bestItems.css("margin-left", (e.originalEvent.touches[0].pageX - TtouchStart) + "px");
            }
        })

        $bestList.on("touchend", function (e) {
            Ttouch = false;
            if( e.originalEvent.changedTouches[0].pageX - TtouchStart < -10) {
                // $bestItems.css("margin-left", "-90%");
                rightSlide();
            } else if( e.originalEvent.changedTouches[0].pageX - TtouchStart > 10) {
                leftSlide();
            }
        })

    } else if ( windowWidth <= 767 ) {
        var MtouchStart = 0;
        var Mtouch = false;

        // var $indi = $("<div><div></div></div>").addClass("indi").appendTo($cont3Wrap);

        var MtiemrId = window.setInterval (MobileRight, interval);

        $bestList.on("touchstart", function (e) {
            window.clearInterval( MtiemrId );

            MtouchStart = e.originalEvent.touches[0].pageX;
            Mtouch = true;
        })

        $bestList.on("touchmove", function (e) {
            if(Mtouch == true) {
                // $bestItems.css("transform", "translateX(" + (e.originalEvent.touches[0].pageX - mouseStart) + "px)")
                
                $bestItems.css("margin-left", (e.originalEvent.touches[0].pageX - MtouchStart) + "px");
            }
        })

        $bestList.on("touchend", function (e) {
            Mtouch = false;
            if( e.originalEvent.changedTouches[0].pageX - MtouchStart < -10) {
                // $bestItems.css("margin-left", "-90%");
                MobileRight();
            } else if( e.originalEvent.changedTouches[0].pageX - MtouchStart > 10) {
                MobileLeft();
            }
        })

    }


    // ----- function --------------------------------------------------------
    // 이미지 슬라이드에서 사용하는 함수
    function leftSlide () {
        $bestItems.prepend( $bestItems.children(":last") )
            .css("margin-left", "-33.333%").animate({"margin-left": "0"});
    }

    function rightSlide () {
        $bestItems.animate({
            "margin-left": "-33.333%"
        }, function () {
            $(this).removeAttr("style").children(":first").appendTo($(this));
        });
    }

    function MobileLeft () {
        $bestItems.prepend( $bestItems.children(":last") )
            .css("margin-left", "-90%").animate({"margin-left": "0"});
    }
    function MobileRight () {
        $bestItems.animate({
            "margin-left": "-90%"
        }, function () {
            $(this).removeAttr("style").children(":first").appendTo($(this));
        });
    }

    function mouseEnter () { window.clearInterval( timerId ); };
    function mouseLeave () { timerId = window.setInterval (rightSlide, interval); };


    $window.on("resize", function () {
        windowWidth = $window.width();
        windowHeight = $window.height();
    });
});