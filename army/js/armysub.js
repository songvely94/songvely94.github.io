$(function () {
    var $header = $("#header");
    var $headerHeight = $header.height();

    $("#content-wrap").css({marginTop: $headerHeight});

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
        $hoverOn.removeClass("hover_on");
    });

    // ----- submit event ----------------------------------------------------
    // 1. #userId에 focus();
    // 1.1. #userId에 글자수가 0이면 알림창을 띄워라
    // 1.2. #userBirth 글자수가 6글자 이하면 알림창을 띄워라
    var $body = $("body");
    var $userId = $("#userId");
    var $userBirth = $("#userBirth");
    var $modal = $("<div></div>").addClass("modal").appendTo($body);

    $userId.focus();

    $("#lookupform").on("submit", function (e) {
        if($userId.val().length <= 1 ) {
            // 유효성검사
            e.preventDefault();

            $modal.html("<span>성명</span>란을 확인해주세요!").css("top", "20%");
            $userId.focus();

            window.setTimeout(function () {
                $modal.removeAttr("style");
            }, 3000);
        } else if ($userId.val().length <= 5) {
            // 유효성검사
            e.preventDefault();

            $modal.html("<span>생년월일</span>란을 확인해주세요!").css("top", "20%");
            $userBirth.focus();

            window.setTimeout(function () {
                $modal.removeAttr("style");
            }, 3000);
        }
    });

});