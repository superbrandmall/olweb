$(document).ready(function(){
    findAllShopsByStoreCode();
});

function findAllShopsByStoreCode() {
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
                
                if(response.data.length > 0){
                    var layer = '';
                    var offline = '';
                    var unavailable = [0,4,5];
                    var moreInfo = '';
                    var onClick = '';
                    var businessFormatChs = [];
                    var vr = '';
                    $.each(response.data, function(i,v){
                        if(v.state === 9) {
                            return true;
                        }
                        setTimeout(function () {
                        if($.inArray(v.state, unavailable) >= 0){
                            layer = 'white_box';
                            offline = '<img src="/views/assets/base/img/content/backgrounds/offline.png" style="position: absolute; left: 0; right: 0; top: 15%; margin: 0 auto;" />';
                            moreInfo = '';
                            onClick = '';
                        } else {
                            moreInfo = '<li><a href="/v2/shop?id='+v.shopCode+'&type=leasing">查看详情</a></li>';
                            onClick = 'onclick="window.location=\'/v2/shop?id='+v.shopCode+'&type=leasing\'"';
                            layer = '';
                            offline = '';
                           
                        }
                        
                        vr = v.remarkFourth != null ? v.remarkFourth : v.remarkFirst;
                        
                        businessFormatChs = v.businessFormatChs.split('/');
                        
                        var businessFormat = '';
                        $.each(businessFormatChs, function(j,w){
                            businessFormat += '<span class="weui-mark-rb">'+w+'</span>&nbsp;';
                        })
                        
                        $('.weui-panel__bd').append('<div class="weui-media-box weui-media-box_appmsg" style="background: rgb(245, 245, 245); padding: 0; margin: 0 16px 16px;">\n\
            <div class="'+layer+'"><div class="weui-media-box__bd">\n\
                <div style="position: relative;">\n\
                    <iframe loading="lazy" src="'+vr+'" frameborder="no" width="100%" height="300" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></iframe>\n\
                    <ul class="leasing-areas">\n\
                        '+moreInfo+'\n\
                    </ul>\n\
                </div>\n\
                <div class="weui-cell_select" '+onClick+' style="position: relative; margin: 10px 0 0 15px;">\n\
                    <p style="font-size: 14px;">'+v.shopNo+'</p>\n\
                    <small class="weui-cell__bd" style="margin-right: 40px; display: block; font-size: 12px;">'+v.descript+'</small>\n\
                </div>\n\
                <div style="margin: 5px 15px 10px;">\n\
                    '+businessFormat+'\n\
                    <span class="weui-mark-rb">面积 '+v.area+'m<sup>2</sup></span>\n\
                </div>\n\
            </div>\n\
        </div>'+offline+'</div>');
                        }, i*500)
                    });
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
