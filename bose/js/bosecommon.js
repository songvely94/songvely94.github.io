$(function () {
    // ----- click event -----------------------------------------------------
    // 1. $nav > ul > li 클릭 시
    // 1.1. 기본이벤트를 제거하고
    // 1.2. #subwrap이 슬라이드 다운하고
    // 1.3. $nav > ul > li 의 data-target에 맞춰 .sublist가 보여진다.
    // 2. #nav를 벗어나면 매뉴 슬라이드 업해라
    var $window = $(window);
    var windowWidth = $window.width();
    var $mainmenu = $("#nav > ul > li");
    var $subwrap = $("#subwrap");
    
    $mainmenu.on("click", function (e) {
        console.log("click")
        e.preventDefault();
        var $dataTarget = $(this).attr("data-target");
        
        $subwrap.children().children().css("display", "none");
        $($dataTarget).css("display", "block");
        $subwrap.slideDown();
    })
    
    $("#header").mouseleave(function () {
        $subwrap.slideUp();
    });
    
    // 1. #ham-menu 클릭 시
    // 1.1. 사이드메뉴가 우에서 좌로 나온다.
    // 1.2. 사이드메뉴 이탈 시
    // 1.3. 사이드메뉴가 좌에서 우로 들어간다.
    var $hamMenu = $("#ham-menu");
    var $sideWrap = $("#side-wrap");
    
    $hamMenu.on("click", function (e) {
        e.preventDefault();
        $sideWrap.css("right", "0");
    });
    
    $sideWrap.on("mouseleave", function () {
        $sideWrap.css("right", "-30%");
    });

    if ( windowWidth <= 1023 ) {
        $sideWrap.on("mouseleave", function () {
            $sideWrap.css("right", "-50%");
        })
    };
});