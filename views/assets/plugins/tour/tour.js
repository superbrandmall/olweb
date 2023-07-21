(function ($) {
    $.guidance = function (json, fn) {
        //json.obj  设置跟随对象		必选参数
        //json.title 设置提示消息		必选参数
        //json.url  设置下一步链接		可选参数
        //json.style 定义样式		可选参数  默认有背景
        json.url = json.url || "javascript:;";
        json.style = json.style || {};
        json.title = json.title || '可设置的提示信息哦,可以更换的背景图片哦';
//        json.style.bgImg = json.style.bgImg || "url(/views/assets/base/img/content/lotus-admin/questionmark.png)";
        json.style.bgImg = json.style.bgImg;
        json.style.point1 = json.style.point1 || 'url(/views/assets/base/img/content/lotus-admin/pointer.png)';
        json.style.point2 = json.style.point2 || 'url(/views/assets/base/img/content/lotus-admin/pointer2.png)';
        var index = 0;
        if (json.obj.length > 0) {
            window.closeAll = function () {
                $('#box div').hide();
                $('#maskBg').remove();
                window.closeAll = null;
            }
//            var $viewG = $('<div id="maskBg">\
//                <div id="mask"></div>\
//                <div id="maskTitle">\
//                    <div id="pointer"></div>\
//                    <div id="mianWarn">\
//                        <p id="warnData"></p>\
//                        <a href="javascript:;" id="nextStep">下一步</a>\
//                        <a href="javascript:;" id="outPointer" onclick = "closeAll()">退出</a>\
//                        <a href="javascript:;" id="closeMaskWarn" onclick = "closeAll ()">×</a>\
//                    </div>\
//                </div>\
//            </div>');
            var $viewG = $('<div id="maskBg">\
                <div id="mask"></div>\
                <div id="maskTitle">\
                    <div id="mianWarn">\
                        <h1 id="warnData"></h1>\\n\
                        <a href="javascript:;" id="previousStep">上一页</a>\
                        <a href="javascript:;" id="nextStep">下一页</a>\
                        <a href="javascript:;" id="outPointer" onclick="closeAll()">退出</a>\
                    </div>\
                </div>\
            </div>');
            var viewW = $(document.body).width();
            var viewH = $(document.body).height();
            $viewG.css({
                'height': viewH + 'px',
                'width': viewW + 'px'
            });
            if ($('#maskBg').length <= 0) {
                $(document.body).append($viewG);
                $('#warnData').css('background-image', json.style.bgImg);

            }
            function mainWarn(posObj) {
                $('#box div').hide();
                posObj.fadeIn();
                var iW = posObj.innerWidth();
                var iH = posObj.innerHeight();
                var iL = posObj.offset().left;
                var iT = posObj.offset().top;
                $('#mask').css({
                    'width': iW + 'px',
                    'height': iH + 'px',
                    //'border-width': iT + 'px' + ' ' + (viewW - iL - iW) + 'px' + ' ' + (viewH - iH - iT) + 'px' + ' ' + iL + 'px'
                    'border-width': iT + 'px' + ' ' + (100) + 'vw' + ' ' + (150) + 'vh' + ' ' + iL + 'px'
                });
                if (iL < 400) {
                    $('#maskTitle').css({
//                        'left': iL + iW - 30 + 'px',
                        'left': '0',
                        'right': '0',
                        'top': iT + iH + 10 + 'px'
                    });
                    $('#pointer').css('background-image', json.style.point1);
                } else if ((viewW - iL - iW) < 400) {
                    $('#maskTitle').css({
//                        'left': iL - 400 + 'px',
                        'left': '0',
                        'right': '0',
                        'top': iT + iH + 10 + 'px'
                    });
                    $('#pointer').css('background-image', json.style.point2);
                } else {
                    $('#maskTitle').css({
//                        'left': iL + iW - 30 + 'px',
                        'left': '0',
                        'right': '0',
                        'top': iT + iH + 10 + 'px'
                    });
                    $('#pointer').css('background-image', json.style.point1);
                }

            }
            if ($.isArray(json.obj)) {
                mainWarn(json.obj[index]);
                $('#warnData').text(json.title[index]);
                $('#nextStep').bind('click', function () {
                    index++;
                    if (index == json.obj.length) {
                        closeAll();
                        return;
                    }
                    mainWarn(json.obj[index]);
                    $('#warnData').text(json.title[index]);
                });
                $('#previousStep').bind('click', function () {
                    index--;
                    if (index < 0) {
                        closeAll();
                        return;
                    }
                    mainWarn(json.obj[index]);
                    $('#warnData').text(json.title[index]);
                });
            } else {
                mainWarn(json.obj);
                $('#warnData').text(json.title);
                if (fn) {
                    $('#previousStep, #nextStep').bind('click', fn);
                } else {
                    $('#previousStep, #nextStep').bind('click', function () {
                        closeAll();
                    });
                }

            }
        }
    }
})(jQuery);