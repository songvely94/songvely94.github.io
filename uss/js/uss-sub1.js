$(function () {
    var $downTxt = $("#downTxt > ul > li");

    $downTxt.on("click", function (e) {
        e.preventDefault();

        $downTxt.removeClass("underLine");
        $(this).addClass("underLine");
    })
})