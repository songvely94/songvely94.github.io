$(function () {
    // 1. #menu 클릭 시
    // 2. submenu가 나오고
    // 3. #menu > a::after 이 돌아간다.
    var $menu = $("#menu");
    var $subWrap = $("#sub-wrap");
    var $submenu = $("#submenu > ul > li > a");

    $menu.on("click", function (e) {
        // 기본이벤트 제거
        e.preventDefault();
        
        if ( $(this).children().is(".rotateon") ) {
            $(this).children().removeClass("rotateon");
        } else {
            $(this).children().addClass("rotateon");
        }

        if ( $subWrap.css("display") == "none" ) {
            $subWrap.fadeIn();
        } else {
            $subWrap.fadeOut();
        }
    })
    
    $submenu.each(function () {
        var dataName = $(this).attr("data-name");

        $(this).hover(
            function () {
                // $(dataName).addClass("menuon").siblings().removeClass("menuon");
                $(dataName).fadeIn(100).css("margin-right", "0").siblings().hide().css("margin-right", "")
            },
            function () {
                $menuImg.hide();
            }
        )
    })
})