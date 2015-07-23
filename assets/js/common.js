/**
 * Created by Heaven on 15/7/19.
 */

$(document).on("pageinit", "#setting", function () {
    window.console.info("on pageinit setting");
    $("div#douban-input-group").hide();
    $("input#douban-email").on("input", function () {
        $("div#douban-input-group").show(500);
    });
    $("input#douban-pwd").on("input", function () {
        $("div#douban-input-group").show(500);
    });
    $("input#douban-reset").click(function () {
        $("div#douban-input-group").hide(500);
    });
    $("a#save-douban").click(function () {
        $("div#douban-input-group").hide(500);
    });

    $("div#clock-input-group").hide();
    $("input#repeat-time").change(function () {
        $("div#clock-input-group").show(500);
    });
    $("input#p-for-new").change(function () {
        $("div#clock-input-group").show(500);
    });
    $("input#clock-reset").click(function () {
        $("div#clock-input-group").hide(500);
    });
    $("a#save-setting").click(function () {
        $("div#clock-input-group").hide(500);
    });

    $("a#save-douban").attr("onclick", "saveDouban()");
    $("a#save-setting").attr("onclick", "saveSetting()")

    window.config.getSetting("drawSettingView");
});

$(document).on("pageinit", "#detail", function () {
    window.console.info("on pageinit detail");

    // 仅当选择自定义时出现星期复选框
    $("li#week-checkbox").hide();
    $("input[name=type]").click(function () {
        var id = $("input[name=type]:checked").attr("id");
        if (id == "radio-week") {
            $("li#week-checkbox").show(100);
        } else {
            $("li#week-checkbox").hide(100);
        }
    });

    var clock_id = getUrlParam('clock-id');
    if (clock_id != null) {
        $("a#detail-save").attr("onclick", "saveDetail(" + clock_id + ")");
        window.clock.getClockDetail(clock_id, "drawClockDetail");
    } else {
        var current = new Date();
        $("input#time").val(current.getHours() + ":" + current.getMinutes());
        $("a#detail-save").attr("onclick", "saveDetail(0)");
        $("input#radio-once").attr("checked", true).checkboxradio("refresh");
        $("#detail").trigger("create");
    }


});

$(document).on("pageinit", "#clock", function () {
    window.console.info("on pageinit clock");
    window.clock.getAllClockEntry("drawClockView");
});

$(document).on("pageinit", "#alarm", function () {
    $("#btn-unlike").attr("onclick", "unlikeCurrent()");
    $("#btn-like").attr("onclick", "markCurrent()");
    $("#btn-skip").attr("onclick", "skipCurrent()");
    $("#btn-close").attr("onclick", "closeAlarm()");
});