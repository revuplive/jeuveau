$(".footer-bottom-arrow img").click((function() {
    $(this).toggleClass("active"), $(".evolus-footer-left").toggleClass("less-padding"), $(".read-more-text").toggle("slow")
}));


$((function() {
    $(".custom-menu-primary-new").addClass("js-enabled"), $(".custom-menu-primary-new .hs-menu-wrapper").before('<a class="mobile-trigger-new cta_border_button"><img src="https://info.evolus.com/hubfs/march2021/menu-icon.png"></a>'), $(".custom-menu-primary-new .flyouts .hs-item-has-children > a").after(' <a class="child-trigger-new"><span></span><i></i></a>'), $(".mobile-trigger-new").click((function() {
        return $(this).next(".custom-menu-primary-new .hs-menu-wrapper").slideToggle(250), $("body").toggleClass("mobile-open"), $(".child-trigger-new").removeClass("child-open"), $(".hs-menu-children-wrapper").slideUp(250), !1
    })), $(".child-trigger-new").click((function() {
        return $(this).parent().siblings(".hs-item-has-children").find(".child-trigger-new").removeClass("child-open"), $(this).parent().siblings(".hs-item-has-children").find(".hs-menu-children-wrapper").slideUp(250), $(this).next(".hs-menu-children-wrapper").slideToggle(250), $(this).next(".hs-menu-children-wrapper").children(".hs-item-has-children").find(".hs-menu-children-wrapper").slideUp(250), $(this).next(".hs-menu-children-wrapper").children(".hs-item-has-children").find(".child-trigger-new").removeClass("child-open"), $(this).toggleClass("child-open"), !1
    }))
}));