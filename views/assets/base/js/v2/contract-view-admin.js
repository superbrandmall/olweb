$(document).ready(function(){
    if(getURLParameter('type') && getURLParameter('type') != ''){
        getOrderByTradeNO();
        getPDF();
    }
});

function showContract(id){
    $("#contract_pdf").show();
}

function showEngineering(id){
    $("#engineering_pdf").show();
}

function getOrderByTradeNO() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade'),
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
            hideLoading();
            if(response.code === 'C0') {
                if(getURLParameter('type') == 'leasing'){  
                    $('#download_links').append('<a class="weui-cell weui-cell_access" href="javascript: showEngineering();">\n\
                <div class="weui-cell__bd">\n\
                    <p>查看工程条件</p>\n\
                </div>\n\
                <div class="weui-cell__ft"></div>\n\
            </a>');
                    
                    $('#engineeringContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file=/upload/docs/qa/'+response.data.remarkFirst+'.pdf');
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

function getPDF() {
    var file = $.api.baseNew+"/comm-wechatol/api/download/showPdf?fileName%3D"+getURLParameter('trade')+".pdf%26fileType%3D10%26mobileNo%3D"+$.cookie('uid');
    $('#pdfContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file='+file);
}