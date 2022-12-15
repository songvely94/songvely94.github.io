/*
window.addEventListener("load", function () {
    $("html").animate({scrollTop: 0}, 10);
});
*/

$(function () {
    // 휠 이벤트 page scrolling 에서 사용할 요소 미리 참조
    var $window = $(window);
    var $html = $("html, body");
    var windowWidth = $window.width();
    var pageIndex = Math.round($window.scrollTop() / $window.height());
    var lastPageIndex = $(".page").length - 1;
    
    // 휠 이벤트 section1 에서 사용할 요소 미리 참조
    var $innerCircle = $("#inner-c");

    // 휠 이벤트 section2 에서 사용할 요소 미리 참조
    var $songRightCont = $(".songRight-cont");

    var contIndex = 0;
    var lastContIndex = $songRightCont.length-1;
    
    // 휠 이벤트 navigation 에서 사용할 요소 미리 참조
    var $nav = $("#nav > ul > li >  a");
    var $navIcon = $(".menu-icon");

    var $intro = $("#intro");
    var $jimin = $("#jimin");
    var $portBose = $("#port-bose");
    var $portArmy = $("#port-army");
    var $epilogue = $("#epilogue");

    // 스크롤 이벤트 section2 스크롤 시 사용할 요소 미리 참조
    var $rightCont1 = $("#right-cont1");
    var $cont2wrap = $("#cont2-wrap")
    
    
    // 스크롤 이벤트 section3 스크롤 시 사용할 요소 미리 참조
    // 클릭 이벤트 section3 before 이미지 클릭 시 사용할 요소 미리 참조
    var $beforeBose = $("#beforeBose");
    var $afterBose = $("#afterBose");
    var $boseFont = $("#cont4-wrap > .inner-wrap > .bose-font");
    var $boseMock = $("#bose-mockup");
    
    var $beforeArmy = $("#beforeArmy");
    var $afterArmy = $("#afterArmy");
    var $armyFont = $("#cont6-wrap > .inner-wrap > .army-font");
    var $armyMock = $("#army-mockup");

    var $dropFont = $(".dropFont");
    
    var $mockup = $(".mockup");

    // 클릭 이벤트 section1 행성 클릭 시 사용할 요소 미리 참조
    var $planet = $("#planet");
    var $roket = $("#roket");
    var $shootingStar = $(".shootingstar");

    // 클릭 이벤트 section4 font 클릭 시 사용할 요소 미리 참조
    var $beforeFont = $("#big-font");
    var $afterFont = $("#after-font");
    var $beforeClick = $("#beforeClick");
    var $afterClick = $("#afterClick");

    // svg 효과에 사용할 요소 미리 참조
    var $fillSvg = $(".fill_svg");
    var fillinterval = 1000;
    var svginterval;
    
    /*
    $(".third_column > span").each(function () {
        var number = Number.parseInt($(this).text());
        svginterval = Math.round((fillinterval * number) / 70);

        console.log("number = " + number);
        console.log("svginterval = " + svginterval);
    })
    */ 

    // 움직임이 있을 시 멈춘다.
    var clear;

    // indicator
    var $indicator = $("#indicator");

    // video
    var $video = $("#video");
    var $introVideo = $("#intro-video");

    // console.log("pageIndex = " + pageIndex);
    $html.animate({ scrollTop: pageIndex * $window.height() }, 10);
    navScrolling();
    navPoint();
    



    // ********** 휠 이벤트 **********
    // ---- page scrolling ---------------------------------------------------
    // 1. 휠 이벤트 사용
    // 1.1 페이지 스크롤링 ( 함수 )

    // ---- section 1 --------------------------------------------------------
    // 1. 휠 이벤트 사용
    // 1.1. 휠 다운하면 scale이 커지고 내부 문자가 사라짐.
    // 1.2. 휠 업하면 scale이 작아지고 내부 문자 새로 생김.

    // ---- section 2 --------------------------------------------------------
    // 2. 휠 이벤트를 사용
    // 2.1 section2 위치 스크롤이 도달하면 song-right 페이지가 스크롤 된다.
    // 3. song-right 마지막 프로그램 색이 칠해지기

    // ---- navigation -------------------------------------------------------
    // 1. 스크롤 이벤트가 발생하면 (페이지 스크롤링 콜백함수)
    // 1.1 하얀 pageIndex에서 네비게이션 색이 어두운 색으로 400ms에 걸쳐서 변화
    // 2. 스크롤이 이벤트가 발생하고 (페이지 스크롤링 콜백함수)
    // 2.1 원하는 pageIndex에 도달하면 폰트와 아이콘 색 변화
    
    window.addEventListener("wheel", function (event) {
            event.preventDefault();
    }, { passive: false });
    
    window.addEventListener("wheel", function (event) {
        // 스크롤이 진행 중인 도중에 발생한 이벤트는 무시할 수 있다.
        // cont2_wrap에 addClass 시 발생한 이벤트 무시.
        if($html.is(":animated") || clear ) return;
        
        // ---- page scrolling ---------------------------------------------------
        if (event.deltaY > 0) {
            pageDown();

        } else if (event.deltaY < 0) {
            pageUp();
        };
      
    });
        
        
    // ********** 스크롤 이벤트 **********
    // ---- section 2 --------------------------------------------------------
    // 1. section2 위치에 스크롤 이벤트가 발생하면 (페이지 스크롤링 콜백함수)
    // 1.1 song-right는 우에서 좌로 페이지 나오고
    // 1.2 좌측 이미지 wrap이 아래에서 위로 올라오고
    // 1.3 시간차를 두고 song-right 글자가 페이드 인
    // 1.4 section2 위치를 벗어나면 안보이게한다.
    
    // ---- section 3 --------------------------------------------------------
    // 1. 스크롤링 후 section3-content2 글자가 바로 떨어지는 효과 (콜백함수)
    // 1.1. section3-content2 글자가 바로 떨어진 후 목업이 나타난다.
    
    $window.on("scroll", function (event) {
        // ---- section 1 --------------------------------------------------------
        if(pageIndex == 1) {
            circleScaleUp();
        };

        if(pageIndex == 0) {
            circleScaleDown();
        };

        // ---- section 2 --------------------------------------------------------
        section2 ();
        
        // ---- section 3 --------------------------------------------------------
        if (pageIndex == 3) { addFont($boseFont, $boseMock); }
        else if ( pageIndex == 5 ) { addFont($armyFont, $armyMock); }
        else { removeFont(); };  
        
        if (pageIndex == 2) {
            beforeImg ($beforeBose, $beforeArmy);
        } else if (pageIndex == 4){
            beforeImg ($beforeArmy, $beforeBose);
        } else {
            $(".before-effect").removeClass("bounce");
        }
        
        // ---- section 4 --------------------------------------------------------
        if(pageIndex != 5) {
            $beforeClick.show();
            $afterClick.hide();
            $introVideo.hide(function () {
                $video.hide();
            });
        };
    });
    
    // ********** keypress 이벤트 **********
    $(document).on("keydown", function (event) {
        // 1. up arrow 키를 눌렀을 때 ( keyCode = 38 )
        if (event.keyCode == "38") {
            // 1.1 위로 이동해라. deltaY 값이 음수
            // console.log("keydown = " + event.keyCode);
            pageUp();
            
        // 2. down arrow 키를 눌렀을 때 ( keyCode = 40 )
        } else if (event.keyCode == "40") {
            // 2.1 아래로 이동해라. deltaY 값이 양수
            // console.log("keyup = " + event.keyCode);
            pageDown();
        };

    })
    
    // ********** 클릭 이벤트 **********
    // ---- navigation -------------------------------------------------------
    // 1. intro를 클릭하면 pageIndex == 0;
    // 1.2. songjimin 클릭하면 pageIndex == 1;
    // 1.3. bose 클릭하면 pageIndex == 2;
    // 1.4. lawnchair 클릭하면 pageIndex == 4;
    // 1.5. army 클릭하면 pageIndex == 6;
    // 1.6. epilouge 클릭하면 pageIndex == 8;

    $nav.each(function (navindex) {
        $(this).on("click", function () {
            if(navindex <= 2) {
                navclick (navindex);
            } else if (navindex == 3) {
                navclick (navindex + 1);
            } else if (navindex == 4) {
                navclick (navindex + 2);
            };
        });
    });

    

    // ---- section 1 --------------------------------------------------------
    // 1. #planet 클릭 이벤트 발생하면 
    // 1.1 별이 떨어지는 애니메이션 추가
    // 1.2 별이 떨어진 후 로케트가 날아가는 에니메이션 추가
    // 1.3 inner scale 커지는 애니메이션 추가(휠 이벤트에 맞춰서)
    // 1.4 페이지 스크롤링 (함수 사용)
    $planet.on("click", function () {
        if ( $html.scrollTop() == $window.height() * 0 ) {
            clickStar( $shootingStar, "starmove" );
    
            window.setTimeout(function () {
                clickStar( $roket, "flying" );

                // 로켓이 날아간 뒤 페이지 스크롤링, section2 화면 보이기
                window.setTimeout(function () {
                    circleScaleUp();
                    pageIndex = 1;
                    pageScrolling(1);
                    section2();

                    // 스크롤 후 시간이 지나면 별에 주어진 클래스 제거, 화면에서 보이게 하기
                    window.setTimeout(function () {
                        leaveStar( $shootingStar, "starmove" );
                        leaveStar( $roket, "flying" );
                    }, 400);
                }, 1500);
            }, 1000);
        };
    });

    // ---- section 3 --------------------------------------------------------
    // 2. before 사진 클릭 이벤트 발생하면
    // 2.1 after 사진이 보여지고
    // 2.2 자동 페이지 스크롤링 ( 함수 사용 )
    $beforeBose.on("click", function () {
        beforeClick ( $beforeBose, $afterBose, 3, $boseFont, $boseMock );
        pageIndex++;
    });
    
    $beforeArmy.on("click", function () {
        beforeClick ( $beforeArmy, $afterArmy, 5, $armyFont, $armyMock );
        pageIndex++;
    });

    // ---- section 4 --------------------------------------------------------
    // 1. 퍼블리셔 송지민 클릭 이벤트 발생하면
    // 1.1 에필로그 페이지 보이기
    // 2 에필로그 페이지 클릭 이벤트 발생하면
    // 2.1 퍼블리셔 송지민 페이지 보이기.
    $beforeFont.on("click", function () {
        $beforeClick.fadeOut();
        $afterClick.fadeIn();
    });
    
    $afterFont.on("click", function () {
        $beforeClick.fadeIn();
        $afterClick.fadeOut();
    });

    // section2 파도치는 글자
    window.setInterval(function () {
        $("#up-title > p > span").each(function (index) {
            $(this).delay(index * 100).animate({top: "-5px"}, 200).animate({top: 0}, 200);
        });
    }, 3000);

    // 소개 동영상 클릭 시 소개 동영상 재생
    $("#resume").children(":last").on("click", function (event) {
        event.preventDefault();

        $video.fadeIn(function () {
            $introVideo.fadeIn();
        });
    });

    $video.on("click", function () {
        $introVideo.fadeOut(function () {
            $video.fadeOut();
        });
    })

    
    if ( windowWidth <= 1199 ) {
        var touchStart = 0;
        var isTouch = false;

        $window.on("touchstart", function (e) {
            touchStart = e.originalEvent.touches[0].pageY;
            isTouch = true;

            console.log("start = " + pageIndex)
        })
        $window.on("touchend", function (e) {
            isTouch = false;
            if( e.originalEvent.changedTouches[0].pageY - touchStart < 0) {
                pageDown();
                console.log("down = yes")
            } else if( e.originalEvent.changedTouches[0].pageY - touchStart > 0) {
                pageUp();
                console.log("up = yes")
            }
            console.log("end = " + pageIndex)
            return;
        })
    }


    // ---- function --------------------------------------------------------
    // pageUp
    function pageUp() {
        if(pageIndex == 1) {
            if(contIndex <= 0) {
                pageIndex--;
                pageScrolling(pageIndex);
            };
            
            contIndex--;

            rightContMove();

        } else {
            if(pageIndex <= 0) return;
            pageIndex--;
            pageScrolling (pageIndex);
        };
    };

    // pageDown
    function pageDown() {
        if (pageIndex == 1) {
            if(contIndex >= lastContIndex) {
                pageIndex++;
                pageScrolling(pageIndex);
            };
            
            contIndex++;

            rightContMove();

        } else {
            if(pageIndex >= lastPageIndex) return;
            pageIndex++;
            pageScrolling (pageIndex);
        };
    };

    // rightContMove
    function rightContMove() {
        if (contIndex >=0 && contIndex <= 4) {
            $indicator.children().removeClass("indi-on").eq(contIndex).addClass("indi-on");
        } else {
            $indicator.children().removeClass("indi-on").eq(0).addClass("indi-on");
        }

        if (contIndex >= 0 && contIndex <= 3 ) {
            $songRightCont.filter(".rightCont-show").removeClass("rightCont-show");
            $songRightCont.eq(contIndex).addClass("rightCont-show");

            $fillSvg.removeAttr("style");

        } else if (contIndex == 4) {
            $songRightCont.filter(".rightCont-show").removeClass("rightCont-show");
            $songRightCont.eq(contIndex).addClass("rightCont-show");

            $("#right-cont5 > ul > li > span").each(function () {
                var number = Number.parseInt($(this).text());
                svginterval = Math.round((fillinterval * number) / 70);

                $(this).parent().children(":first").children().children(".svg90").delay(200).animate({
                    strokeDashoffset: "50"
                }, svginterval);

                $(this).parent().children(":first").children().children(".svg80").delay(200).animate({
                    strokeDashoffset: "100"
                }, svginterval);

                $(this).parent().children(":first").children().children(".svg70").delay(200).animate({
                    strokeDashoffset: "150"
                }, svginterval);
            });

            
        } else {
            $songRightCont.filter(".rightCont-show").removeClass("rightCont-show");

            $fillSvg.removeAttr("style");
        };
    };

    // pageScrolling에 사용되는 스크롤 애니메이트 함수
    function pageScrolling ($index) {  

        $html.animate({scrollTop: $window.height() * $index}, function () {
            // ---- navigation -------------------------------------------------------
            // 1. 하얀 pageIndex에서 네비게이션 색이 어두운 색으로 400ms에 걸쳐서 변화
            navScrolling();
            // 2  원하는 pageIndex에 도달하면 폰트와 아이콘 색 변화
            navPoint();

            contIndex = 0;
        });
    };

    // navigation 하얀 pageIndex에서 네비게이션 색이 어두운 색으로 400ms에 걸쳐서 변화 함수
    // if ( pageIndex == 1 || pageIndex == 3 || pageIndex == 5 || pageIndex == 7 || pageIndex == 8 )
    // if ( $window.scrollTop() == $window.height() * 1 || $window.scrollTop() == $window.height() * 3 || $window.scrollTop() == $window.height() * 5 || $window.scrollTop() == $window.height() * 7 || $window.scrollTop() == $window.height() * 8 )
    // if ( $html.scrollTop() == $window.height() * 1 || $html.scrollTop() == $window.height() * 3 || $html.scrollTop() == $window.height() * 5 || $html.scrollTop() == $window.height() * 7 || $html.scrollTop() == $window.height() * 8 )
    function navScrolling () {
        if ( pageIndex == 1 || pageIndex == 3 || pageIndex == 5 || pageIndex == 6 ) {
            $nav.addClass("navdark");
            $navIcon.addClass("icondark");
        } else {
            $nav.removeClass("navdark");
            $navIcon.removeClass("icondark");
        };
    };


    // navigation 원하는 pageIndex에 도달하면 폰트와 아이콘 색 변화 함수
    function navPoint () {
        if ( pageIndex == 6 ) {
            removeNav ( $epilogue );
        } else if ( pageIndex >= 4 ) {
            removeNav ( $portArmy );
        } else if ( pageIndex >= 2 ) {
            removeNav ( $portBose );
        } else if ( pageIndex == 1 ) {
            removeNav ( $jimin );
        } else {
            removeNav ( $intro );
        };

        function removeNav ( $item ) {
            $nav.removeClass("nav-on").children().removeClass("icon-on");
            $item.addClass("nav-on").children().addClass("icon-on");
        };

    };

    // section1 inner_circle 스케일 up 효과 함수 - xxxx
    function circleScaleUp () {
        $innerCircle.css({
            "transform": "scale(10)",
            "transition-duration": "1s"
        }).children().css({
            "visibility": "hidden",
            "opacity": "0",
            "transition-duration": "400ms"
        });
    };
    
    // section1 inner_circle 스케일 down 효과 함수 - xxx
    function circleScaleDown () {
        $innerCircle.css({
            "transform": "scale(1)",
            "transform": "translate(-50%, -50%)",
            "transition-duration": "1s",
        }).children().css({
            "visibility": "visible",
            "opacity": "1",
            "transition-duration": "400ms",
            "transition-delay": "600ms"
        });
    };

    // section2 페이지 스크롤링 후 나오는 효과 함수
    function section2 () {
        if (pageIndex == 1) {
            // 400ms 뒤에 section2 - right 하양 배경 들어오는 애니메이션 추가
            window.setTimeout(function () {
                $cont2wrap.addClass("cont2-show");

                $rightCont1.addClass("cont-delay").addClass("rightCont-show");
                window.setTimeout(function () {
                    $rightCont1.removeClass("cont-delay");
                }, 1000);

                // 비동기 시 사용
                clear = true;

                window.setTimeout(function () { clear = false; }, 1400);

            }, 400);

        } else if (pageIndex != 1) {
            window.setTimeout(function () {
                $cont2wrap.removeClass("cont2-show");
                $rightCont1.removeClass("rightCont-show");
            }, 400);
        };
    };

    // section3 before 이미지 뛰는 효과
    function beforeImg ($before1, $before2) {
        $before1.addClass("bounce");
        $before2.removeClass("bounce");
    }

    // cont4, 6, 8 글씨가 떨어지는 효과 함수
    function addFont ($font, $mock) {
        window.setTimeout(function () {
            // 800ms초 후 fontmove 추가해라
            $font.addClass("drop");

            // 움직임이 끝나면 목업이 나타나라.
            window.setTimeout(function () {
                $mock.addClass("mockupmove");
            }, 400);
        }, 300);
    };

    // cont4, 6, 8 글씨가 떨어지는 효과 후 제거 함수 - xxx
    function removeFont () {
        window.setTimeout(function () {
            $dropFont.removeClass("drop");
            $mockup.removeClass("mockupmove");
        }, 200);
    };

    // cont3, 5, 7 이미지 클릭시 발생하는 효과 함수
    function beforeClick ( $before, $after, $index, $font, $mock) {
        $before.addClass("imghide");
        $after.addClass("imgshow");
        
        // 움직임이 끝나면
        window.setTimeout(function () {
            // 1. 페이지 스크롤링
            pageScrolling($index);
            // 2. 글자와 목업 효과
            addFont($font, $mock);
            
            // 움직임이 끝나면
            window.setTimeout(function () {
                // 3. 주었던 클래스 제거
                $before.removeClass("imghide");
                $after.removeClass("imgshow");
            }, 500);
        }, 1000);
    };

    // #planet 클릭 이벤트 발생하면 별이 떨어지는 효과 함수
    function clickStar ($clickstar, clickclass) {
        $clickstar.children().addClass( clickclass );

        window.setTimeout(function () {
            $clickstar.children().css("display", "none");
        }, 1000);
    };

    function leaveStar ( $leavestar, leaveclass ) {
        $leavestar.children().removeClass(leaveclass).css("display", "block");
    };

    // navigation 클릭 이벤트 발생하면 스크롤링 되는 효과 함수
    function navclick (navindex) {
        pageScrolling(navindex);
        pageIndex = navindex;
    };

});