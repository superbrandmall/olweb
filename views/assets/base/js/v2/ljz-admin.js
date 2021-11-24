var index=0;

$(document).ready(function(){
    if(isAndroid() == true) {
        showIndexPix(1,1354,2);
        showIndexPix(2,1031,2);
        showIndexPix(3,298,1);
    } else {
        document.addEventListener('WeixinJSBridgeReady', function() {
            $('#pix_1,#pix_2,#pix_3').hide();
            $('#video_1,#video_2,#video_3').parent().show();
            
            document.getElementById('video_1').play();
            document.getElementById('video_2').play();
            document.getElementById('video_3').play();
        },false);
    }
    
    $('.weui-dialog__btn').on('click', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });
    
    if(!sessionStorage.getItem("brandGuides") || sessionStorage.getItem("brandGuides") == null || sessionStorage.getItem("brandGuides") == '') {
        getBrandGuides();
    } else {
        showBrandGuides();
    }
    
    
});

function getBrandGuides() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brandGuide/findAllByOrgCode?orgCode=100001&size=1000&page=0&sort=floorCode,asc",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                sessionStorage.setItem("brandGuides", JSON.stringify(response.data.content) );
                showBrandGuides();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showBrandGuides(){
    $.each($.parseJSON(sessionStorage.getItem("brandGuides")), function(i,v){
        if($('#f'+v.floorCode).length > 0){
            if($('#f'+v.floorCode+'_l').html() == ''){
                $('#f'+v.floorCode+'_l').append('<div style="margin-bottom:5px;"><span class="col odd-col">'+v.unitName+'</span><span class="col">'+v.brandName+'</span></div>');
            } else {
                $('#f'+v.floorCode+'_s').append('<div style="margin-bottom:5px;"><span class="col odd-col">'+v.unitName+'</span><span class="col">'+v.brandName+'</span></div>');
            }
        }
        if($('#'+v.floorCode+'f').length > 0){
            if($('#'+v.floorCode+'f_l').html() == ''){
                $('#'+v.floorCode+'f_l').append('<div style="margin-bottom:5px;"><span class="col odd-col">'+v.unitName+'</span><span class="col">'+v.brandName+'</span></div>');
            } else {
                $('#'+v.floorCode+'f_s').append('<div style="margin-bottom:5px;"><span class="col odd-col">'+v.unitName+'</span><span class="col">'+v.brandName+'</span></div>');
            }
        }
    })
    
    $('.collapse').on('show.bs.collapse', function () {
        $(this).parent().parent().find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    });
    
    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).parent().parent().find('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    })
}

function showIndexPix(n,x,y){
    var urlRoot = '/upload/video/sbm-'+n+'/sbm-'+n;
    var indexRange = [0, x];
    var maxLength = indexRange[1] - indexRange[0] + 1;
    // loading
    var eleContainer = document.getElementById('pix_'+n);
    
    $('#video_'+n).parent().hide();
    $('#pix_'+n).show();
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
            if(y == 1){
                img.src = urlRoot + formatIndex(index) + '.jpg';
            } else {
                img.src = urlRoot + formatIndex2(index) + '.jpg';
            }
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