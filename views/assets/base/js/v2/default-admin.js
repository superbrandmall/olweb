$(document).ready(function(){
    if(isAndroid() == true) {
        showIndexPix();
    } else {
        document.addEventListener('WeixinJSBridgeReady', function() {
            $('#pix_sbm').hide();
            $('#video_sbm').show();
            
            document.getElementById('video_sbm').play();
        },false);
    }
})

function showIndexPix(){
    var urlRoot = '/upload/video/sbm-0/sbm';
    var indexRange = [0, 150];
    var maxLength = indexRange[1] - indexRange[0] + 1;
    // loading
    var eleContainer = document.getElementById('pix_sbm');
    
    $('#video_sbm').hide();
    $('#pix_sbm').show();
    // 存储预加载的DOM对象和长度信息
    var store = {
        length: 0
    };
    // 图片序列预加载
    for ( var start = indexRange[0]; start <= indexRange[1]; start++) {
        (function (index) {
            var img = new Image();
            img.onload = function () {
                store.length++;
                // 存储预加载的图片对象
                store[index] = this;
                play();
            };
            img.onerror = function () {
                store.length++;
                play();
            };
            img.src = urlRoot + formatIndex(index) + '.jpg';
        })(start);
    }

    var play = function () {
        var percent = Math.round(100 * store.length / maxLength);
        // 全部加载完毕，无论成功还是失败
        if (percent == 100) {
            var index = indexRange[0];
            eleContainer.innerHTML = '';
            // 依次append图片对象
            var step = function () {
                if (store[index - 1]) {
                    store[index - 1].remove();
                }
                eleContainer.appendChild(store[index]);
                // 序列增加
                index++;
                // 如果超过最大限制
                if (index <= indexRange[1]) {
                    // 15fps, 1000ms/15=67 每帧约0.067秒
                    //setTimeout(step, 67);
                    setTimeout(step, 42);
                } else {
                    // 本段播放结束回调
                    play();
                }
            };
            // 等100%动画结束后执行播放
            setTimeout(step, 100);
        }
    };
}