$(function () {
    // 고정된 $header의 높이만큼 content1의 marginTop에 값 지정
    var $header = $("#header");
    var $headerHeight = $header.height();

    $("#content1").css({marginTop: $headerHeight});

    // ----- scroll event ----------------------------------------------------
    // 1. 페이지 스크롤 시
    // 1.1. 페이지 스크롤 탑(= 특정 위치의 높이 offset(),top) 위치에 도달하면
    // 1.2. 아이템들이 페이드 인 효과 및 살짝 위로 올라오는 효과
    var $window = $(window);
    var $page = $(".page");

    $window.on("scroll", function () {
        
        $page.each(function () {
            var bottomWindow = $window.scrollTop() + $window.height();
            var bottomObject = $(this).offset().top + $(this).outerHeight()/2;

            if ( bottomWindow > bottomObject ) {
                $(this).css( "opacity", "1" );
            } else if (bottomWindow < bottomObject ) {
                $(this).removeAttr("style");
            };
            // 스크롤 위치 벗어나면 안보이게 하기.

            /*
            if ( bottomWindow > $("#content3").offset().top + $("#content3").outerHeight()/2) {
                $tabList.filter(".list-on").children(":eq(0)").animate({
                    opacity: "1",
                    marginTop: "0"
                }, 200, callback);
            };
            */
        });
    });
    

    // ----- click event -----------------------------------------------------
    // 1. #mainmenu 클릭 시
    // 1.1 기본이벤트 제거하고
    // 1.2. #subwrap이 메뉴 슬라이드 다운하고
    // 1.3. #mainmenu 인덱스에 맞춰 .sublist가 보여진다.
    // 2. #nav를 벗어나면 매뉴 슬라이드 업해라
    var $mainmenu = $("#mainmenu > li");
    var $subwrap = $("#subwrap");
    var $hoverOn = $("<span></span>").appendTo($mainmenu.children());
    
    $mainmenu.each(function (index) {
        $(this).on("click", function (e) {
            e.preventDefault();
            
            $subwrap.children().children().css("display", "none");
            $subwrap.children().children().eq(index).css("display", "block");
            $subwrap.slideDown();
            
            $hoverOn.removeClass("hover_on");
            $hoverOn.eq(index).addClass("hover_on");
        });
    });
    
    $("#nav").mouseleave(function () {
        $subwrap.slideUp();
        $hoverOn.removeClass("hover_on")
    });
    
    
    // ----- click event -----------------------------------------------------
    // 0. 이미지 슬라이드 -> 기본으로 이미지 슬라이드 되고 있음.
    // 1. #cont1-left-btn 버튼 클릭 시
    // 1.1. 이미지가 우에서 좌로 이동
    // 2. #cont1-right-btn 버튼 클릭 시
    // 2.1. 이미지가 우에서 좌로 이동
    var slideinterval = 6000;
    var $slideBox = $("#slide-box");
    var $sliding = $slideBox.children("ul");
    
    var timerId = window.setInterval(imgRightSlide, slideinterval);
    
    $slideBox.hover (
        function () { window.clearInterval( timerId ); },
        function () { timerId = window.setInterval(imgRightSlide, slideinterval); }
    );
    
    $slideBox.children("button:first").on("click", function () {
        imgLeftSilde ();
    });
    
    $slideBox.children("button:last").on("click", function () {
        imgRightSlide ();
    });     
        
    // ----- click event -----------------------------------------------------
    // 1. #tab-btn > 공지사항 클릭 시
    // 1.1. #notic-cont가 보여지게 하고
    // 2. #tab-btn > 육군뉴스 클릭 시
    // 2.1. #tab-btn > 공지사항에 .menu-on 제거
    // 2.2. #tab-btn > 육군뉴스에 .menu-on 추가
    // 2.3. #news-cont가 보여지게 헤라
    
    var $tabBtn = $("#tab-btn > li");
    var $tabList = $(".tab-list");

    $tabList.filter(".list-on").children(":eq(0)").animate({
        opacity: "1",
        marginTop: "0"
    }, 200, callback);

    $tabBtn.on("click", function () {
        $(this).addClass("menu-on").siblings().removeClass("menu-on");
        $tabList.removeClass("list-on").children().removeAttr("style");

        var dataTarget = $(this).attr("data-target");
        $tabList.filter(dataTarget).addClass("list-on").children(":eq(0)").animate({
            opacity: "1",
            marginTop: "0"
        }, 200, callback);
    });
    
    // ----- click event -----------------------------------------------------
    // 1. #mag-leftbtn 클릭 시
    // 1.1. #mag-img가 우에서 좌로 이동
    // 2. #mag-rightbtn 클릭 시
    // 2.1. #mag-img가 좌에서 우로 이동
    var $magazine = $("#magazine");
    var $magImg = $("#mag-img");

    $magazine.children("button:first").on("click", function () {
        leftSlide ($magImg, -100);
    });

    $magazine.children("button:last").on("click", function () {
        rightSlide ($magImg, -100);
    });
    
    // ----- click event -----------------------------------------------------
    // 0. #banner-txt-slide 한칸씩 우에서 좌로 이동 -> 기본으로 텍스트 슬라이드 되고 있음.
    // 1. #cont6-leftbtn 클릭 시
    // 1.1. #banner-txt-slide가 우에서 좌로 한칸 이동
    // 2. #cont6-rightbtn 클릭 시
    // 2.1. #banner-txt-slide가 좌에서 우로 한칸 이동
    // 3. #cont6-pausebtn 클릭 시
    // 3.1. 타이머 제거
    var $bannerIcon = $("#txtbanner-icon")
    var $bannerSlide = $("#banner-txt-slide");

    var bannertimerId = window.setInterval(function () {
        rightSlide($bannerSlide, -25);
    }, slideinterval);

    $bannerSlide.hover(
        function () {
            window.clearInterval( bannertimerId );
        },
        function () {
            bannertimerId = window.setInterval(function () {
                rightSlide($bannerSlide, -25);
            }, slideinterval);
        }
    );

    $bannerIcon.hover (
        function () {
            window.clearInterval( bannertimerId );
        },
        function () {
            bannertimerId = window.setInterval(function () {
                rightSlide($bannerSlide, -25);
            }, slideinterval);
        }
    );

    $bannerIcon.children(":first").on("click", function () {
        leftSlide($bannerSlide, -25);
    });
    
    $bannerIcon.children(":eq(1)").on("click", function () {
        window.clearInterval( bannertimerId );
    });

    $bannerIcon.children(":last").on("click", function () {
        rightSlide($bannerSlide, -25);
    });

    // ----- hover event -----------------------------------------------------  
    // 1. #notic-cont > h6, p 마우스 호버 시
    // 1.1. h6 color 변경
    // 1.2. p text-decoration: under-line 추가
    // 2. #news-cont > p, img 마우스 호버 시
    // 2.1. p color 변경
    // 2.2. img scale(1.1)
    var $noticHoverH6 = $("#notic-cont > li > h6");
    var $noticHoverP = $("#notic-cont > li > p");
    var $newsHoverP = $("#news-cont > li > p");
    var $newsHoverDiv = $("#news-cont > li > div");
    // var $newsHover = $("#news-cont > li");

    $noticHoverH6.hover (
        function () {
            $(this).children().css("color", "#024d71");
            $(this).siblings("p").children().css("text-decoration", "underline");
        },
        function () {
            $(this).children().removeAttr("style");
            $(this).siblings("p").children().removeAttr("style");
        }
    );
        
    $noticHoverP.hover (
        function () {
            $(this).siblings("h6").children().css("color", "#024d71");
            $(this).children().css("text-decoration", "underline");
        },
        function () {            
            $(this).siblings("h6").children().removeAttr("style");
            $(this).children().removeAttr("style");
        }
    );

    $newsHoverP.hover (
        function () {
            $(this).children().css("color", "#024d71");

            // 1. $newsHover 2번째 자식 클릭 시
            // 1.1. $newsHover.eq(1)의 div > a > img에 transform 지정
            // 2. $newsHover 2번째 자식이 아닌 자식들을 클릭하면
            // 2.1. $newsHover > div > a > img에 transform 지정
            // console.log("newsHover.index() = " + $(this).parent().index());
            
            if($(this).parent().index() == 1) {
                $(this).siblings("div").children().children().css({
                    "transform": "scale(1.1) translateY(-115px)"
                });
            } else {
                $(this).siblings("div").children().children().css("transform", "scale(1.1)");
            };  
        },
        function () {
            $(this).children().removeAttr("style");
            $(this).siblings("div").children().children().removeAttr("style");  
        }
    );

    $newsHoverDiv.hover (
        function () {
            $(this).siblings("p").children().css("color", "#024d71");
            
            if($(this).parent().index() == 1) {
                $(this).children().children().css({
                    "transform": "scale(1.1) translateY(-115px)"
                });
            } else {
                $(this).children().children().css("transform", "scale(1.1)");
            };
        },
        function () {
            $(this).siblings("p").children().removeAttr("style");
            $(this).children().children().removeAttr("style");
        }
    );
    
    // ----- hover event -----------------------------------------------------  
    // 1. #recent-list > div, p 마우스 호버 시
    // 1.1. #recent-list > div > img scale(1.1)
    // 1.2. #recent-list > p color 변경
    var $recentHoverDiv = $("#recent-list > li > div");
    var $recentHoverP = $("#recent-list > li > p");

    $recentHoverP.hover (
        function () {
            $(this).children().css("color", "#024d71");
            
            if($(this).parent().index() == 0) {
                $(this).siblings("div").children().children().css({
                    "transform": "scale(1.1) translateY(-5%)"
                });
            } else {
                $(this).siblings("div").children().children().css("transform", "scale(1.1)");
            };  
        },
        function () {
            $(this).children().removeAttr("style");
            $(this).siblings("div").children().children().removeAttr("style");  
        }
    );

    $recentHoverDiv.hover (
        function () {
            $(this).siblings("p").children().css("color", "#024d71");
            
            if($(this).parent().index() == 0) {
                $(this).children().children().css({
                    "transform": "scale(1.1) translateY(-5%)"
                });
            } else {
                $(this).children().children().css("transform", "scale(1.1)");
            };
        },
        function () {
            $(this).siblings("p").children().removeAttr("style");
            $(this).children().children().removeAttr("style");
        }
    );

    // ----- function --------------------------------------------------------
    // 이미지 슬라이드에서 사용하는 함수
    function imgLeftSilde () {
        $sliding.prepend( $sliding.children(":last") )
        .css("margin-left", "-100%").animate({"margin-left": "0"})
    }

    function imgRightSlide () {
        $sliding.animate({
            "margin-left": "-100%"
        }, function () {
            $(this).removeAttr("style").children(":first").appendTo($(this));
        });
    };

    // notic-cont, news-cont tab-menu에서 사용하는 함수
    function callback () {
        $(this).next().animate({
            opacity: "1",
            marginTop: "0"
        }, 200, function () {
            $(this).next().animate({
                opacity: "1",
                marginTop: "0"
            }, 200);
        });
    }

    // magazine, banner-txt에서 사용하는 함수
    function leftSlide (leftslidename, slidenumber) {
        leftslidename.prepend( leftslidename.children(":last") )
        .css("margin-left", slidenumber + "%").animate({"margin-left": "0"})
    }

    function rightSlide (rightslidename, slidenumber) {
        rightslidename.animate({
            "margin-left": slidenumber + "%"
        }, function () {
            $(this).removeAttr("style").children(":first").appendTo($(this));
        });
    };

    // resize
    $window.on("resize", function () {
        $headerHeight = $header.height();
        bottomWindow = $window.scrollTop() + $window.height();
    });
});