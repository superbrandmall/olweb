$.order = {
    id: "",
    shopName: "",
    trade: "",
    unit: "",
    type: "",
    contractNo: "",
    orgCode: ""
};

$(document).ready(function(){
    if(getURLParameter('type') && getURLParameter('type') != ''){
        getOrderByTradeNO();
        getPDF();
    }
    
    $('#download_file').click(function(){
        showDialog2();
    })
});

function showContract(id){
    $("#contract_pdf").show();
}

function showEngineering(id){
    $("#engineering_pdf").show();
}

function sendFiles() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/mail/sendFile?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade'),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            hideLoading();
            if(response.code === 'C0') {
                /*$(function(){
                    var $toast = $('#js_toast');
                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                        window.history.back(-1);
                    }, 2000);
                });*/
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    }); 
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
                $.order.id = response.data.id;
                $.order.trade = response.data.contractInfos[0].outTradeNo;
                $.order.unit = response.data.contractInfos[0].unitCode;
                $.order.contractNo = response.data.contractNo;
                $.order.orgCode = response.data.orgCode;
                if(response.data.remarkSecond == 'leasing') {
                    $.order.type = '商铺位置';
                    $.order.shopName = '【'+response.data.contractInfos[0].unitDesc+'】';
                } else if(response.data.remarkSecond == 'advertising') {
                    $.order.type = '广告位置';
                    $.each(response.data.contractInfos, function(i,v){
                        $.order.shopName = $.order.shopName + '【' + v.unitDesc + '】 ';
                    });
                } else if(response.data.remarkSecond == 'events') {
                    $.order.type = '场地位置';
                    $.order.shopName = '【'+response.data.contractInfos[0].unitDesc+'】';
                }
                
                $('#download_links').append('<a class="weui-cell weui-cell_access" href="javascript: showEngineering();">\n\
            <div class="weui-cell__bd">\n\
                <p>查看工程条件</p>\n\
            </div>\n\
            <div class="weui-cell__ft"></div>\n\
        </a>');

                $('#engineeringContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file=/upload/docs/standards/'+response.data.remarkFirst+'.pdf');
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

function showDialog2(){
    var contractDialog = $('#contractDialog');
    contractDialog.fadeIn(200);
    
    $("#contractDialogForm").validate({
        onkeyup: false,
        rules: {
            contractEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            contractEmail: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>请填写收件人邮箱',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>邮箱格式不对，请正确填写'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            hideDialog2();
            showLoading();
            sendMail($('#contractEmail').val());
        }
    })
}

function hideDialog2(){
    var contractDialog = $('#contractDialog');
    contractDialog.hide();
}

function sendMail(email) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/mail/sendContractMail?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade')+"&email="+email,
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
                 hideLoading();
                $(function(){
                    var $toast = $('#js_toast_1');
                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                    }, 2000);
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    }); 
}