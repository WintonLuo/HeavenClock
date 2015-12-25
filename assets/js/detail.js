var DATA_CONFIGS = [
    {
        src: '#clock-detail-template',
        dst: '#clock-detail',
        data: ClockCtrl.getClockEntry(JSON.stringify({
            cid: getUrlParam('cid')
        }))
    }
];

var LISTENER_CONFIGS = {
    'input[name=repeat]': {
        change: function (e) {
            var curRepeat = $(e.target).val();
            if (curRepeat == 'FOR_WEEK') {
                $('#input-week-group').show(100);
            } else {
                $('#input-week-group').hide(100);
            }
        }
    },
    '#ctrl-modify-confirm': function (e) {
        var data = {
            cid: $('div#clock-cid').attr('data-cid'),
            time: $('input[name=time]').val(),
            repeat: $('input[name=repeat]:checked').val(),
            week: '',
            desc: $('input[name=desc]').val()
        };

        if (data.repeat == 'FOR_WEEK') {
            var week = [];
            $('input[name=week]:checked').each(function () {
                week.push($(this).val());
            });
            data.week = week.join(',');
        }
        ClockCtrl.setClockEntry(JSON.stringify(data));
        window.location = 'clocks.html';
    },
    '#ctrl-delete-clock': function (e) {
        var cid = $('div#clock-cid').attr('data-cid');
        ClockCtrl.deleteClockEntry(JSON.stringify({
            cid: cid
        }));
        window.location = 'clocks.html';
    }
};

$(document).ready(function () {
    var publisher = Publisher(
        DATA_CONFIGS,
        LISTENER_CONFIGS
    );
    publisher.init();

    $('#input-week-group').hide();
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}


Handlebars.registerHelper("eq", function (v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});