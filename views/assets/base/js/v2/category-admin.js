$(document).ready(function(){
    var storeCode = 'OLMALL180917000003';
    if(getURLParameter('storeCode') && getURLParameter('storeCode') != 'undefined') {
        storeCode = getURLParameter('storeCode');
    }
    
    if(!sessionStorage.getItem("shopList") || sessionStorage.getItem("shopList") == null || sessionStorage.getItem("shopList") == '') {
        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCode?storeCode="+storeCode,
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
    
    $.each($.parseJSON(sessionStorage.getItem("shopList")), function(j,w){
        if(getURLParameter('id') == w.remarkSecond){
            $('.categories p.weui-cell_active').html(w.businessFormatChs);
            var categoriesCode = w.categoryCode.split(',');
            var categoriesName = w.categoryName.split(',');
            for(var i=0;i<categoriesCode.length;i++){
                $('.categories').append('<label class="weui-cell weui-cell_active weui-check__label" for="'+categoriesCode[i]+'">\n\
<div class="weui-cell__hd"><input type="checkbox" class="weui-check" name="category" id="'+categoriesCode[i]+'" />\n\
<i class="weui-icon-checked"></i></div>\n\
<div class="weui-cell__bd"><p>'+categoriesName[i]+'</p></div>\n\
</label>');        
            }
        }
    })
    
    $(".categories").find(":checkbox").each(function(){
        $(this).on('click',function(){
            if($(this).is(':checked')){
                $.cookie('categorySelected',$(this).attr('id')+'::'+$(this).parent().parent().find('p').text()+'::'+storeCode+'::'+getURLParameter('id'));
                console.log($.cookie('categorySelected'));
                
                $(this).attr('checked',true).parent().parent().siblings().find(":checkbox").attr('checked',false);
            }else{
                $(this).attr('checked',false).parent().parent().siblings().find(":checkbox").attr('checked',false);
            }
        });
    });
    
    $("#confirm_category").on('click', function (){
         window.location.href = '/v2/shop?id='+getURLParameter('id')+'&type=leasing&storeCode='+getURLParameter('storeCode');
    })
});