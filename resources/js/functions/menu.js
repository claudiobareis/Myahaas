document.addEventListener("touchstart", function () {
}, false);

$(function () {
    $('#wsnavtoggle').click(function () {
        $('.pusher').toggleClass('wsoffcanvasopener');
    });
    $('.overlapblackbg').click(function () {
        $('.pusher').toggleClass('wsoffcanvasopener');
    });
    $('.wsmenu-list > li').has('.wsmenu-submenu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
    $('.wsmenu-list > li').has('.wsshoptabing').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
    $('.wsmenu-list > li').has('.megamenu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
    $('.wsmenu-click, .wsmenu-list > li > a').click(function () {
        $(this).toggleClass('ws-activearrow').parent().siblings().children().toggleClass('ws-activearrow');
        $(".wsmenu-submenu, .megamenu").not($(this).siblings('.wsmenu-submenu, .megamenu')).slideUp(100);
        $(this).siblings('.wsmenu-submenu').slideToggle(100);
        $(this).siblings('.megamenu').slideToggle(100);
    });
    $('.wsmenu').swipeleft(function () {
        $('.pusher').toggleClass('wsoffcanvasopener');
    });

});