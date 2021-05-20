var module_42949854795 = function() {
    var __hs_messages = {};
    i18n_getmessage = function() {
        return hs_i18n_getMessage(__hs_messages, hsVars.language, arguments)
    }, i18n_getlanguage = function() {
        return hsVars.language
    }, $(".footer-bottom-arrow img").click((function() {
        $(this).toggleClass("active"), $(".evolus-footer-left").toggleClass("less-padding"), $(".read-more-text").toggle("slow")
    }))
}();