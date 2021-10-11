var index=0;
var unitCodes = [];
var vr;

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
    
    getShopsInfo();
});

function getShopsInfo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCode?storeCode=OLMALL180917000003",
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
                sessionStorage.setItem("shopList", JSON.stringify(response.data) );
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function renderShopList(s,category){
    var desc = '';
    var shopNo;
    var shop = $.parseJSON(s);
    
    var count = 0;
    $.each(shop, function(j,w){
        if(w.state == 1 && w.businessFormatChs.indexOf(category) >= 0){
            count++;
            desc = w.descript || '';
            shopNo = w.shopNo || '';
            GetMapRecommand(w.shopCode);
        }
    })
    
    if(count == 0) {
        $('#empty_stores').html('<p style="padding: 0 30px 50px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 抱歉，暂无对应该业态的铺位推荐，你可以选择其他业态看看。</p>');
    }
    
    $("#recommend_empty_stores").show();
    
    
    function GetMapRecommand(c){
        $('#empty_stores').append('<div style="position: relative; text-align: center;">\n\
<img src="/views/assets/base/img/content/backgrounds/leasing/'+c+'_map.png" width="320px">\n\
<p style="text-align: center; color: #fff; padding: 0 30px 50px;"><strong>'+shopNo+'</strong>\
<br>'+desc+'</p>\n\</div');
    }
}

function GetFloorPlan(fn,lk,mc) {
    var fc,FN;
    switch (fn) {
        case '9F':
            fc = '9';
            FN = '九楼';
            break;
        case '8F':
            fc = '8';
            FN = '八楼';
            break;
        case '7F':
            fc = '7';
            FN = '七楼';
            break;    
        case '6F':
            fc = '6';
            FN = '六楼';
            break;
        case '5F':
            fc = '5';
            FN = '五楼';
            break;
        case '4F':
            fc = '4';
            FN = '四楼';
            break;
        case '3F':
            fc = '3';
            FN = '三楼';
            break;
        case '2F':
            fc = '2';
            FN = '二楼';
            break;
        case '1F':
            fc = '1';
            FN = '一楼';
            break;
        case 'B1F':
            fc = '0';
            FN = '负一楼';
            break;
        default:
            fc = '1';
            FN = '一楼';
            break;
    }
    
    $('#map').attr('src','/views/assets/base/img/content/floor-plan/'+lk+'/'+fc+'F.png');
    $('#floor_plan_viewer').fadeIn(200);
}

function recommendStores(category){
    renderShopList(sessionStorage.getItem("shopList"),category);
}

function showFloorVR(floor){
    var vr;
    switch (floor) {
        case '6F':
            vr = 'https://720yun.com/t/davkt9d7zfh?scene_id=71055917';
            break;
        case '2F':
            vr = 'https://720yun.com/t/davkt9d7zfh?scene_id=71055570';
            break;
        default:
            vr = 'https://720yun.com/t/davkt9d7zfh?scene_id=71054380';
            break;
    }
    
    $("#vr_viewer iframe").attr('src',vr);
    $("#vr_viewer").show();
}

function showFloorVideo(floor){
    $("#video_viewer video").attr('src','/upload/video/ljz-'+floor+'.mp4');
    $("#video_viewer video").get(0).play();
    $("#video_viewer").show();
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