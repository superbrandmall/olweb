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
                
                if(getURLParameter('type') == 'leasing'){  
                    $('#download_links').append('<a class="weui-cell weui-cell_access" href="javascript: showEngineering();">\n\
                <div class="weui-cell__bd">\n\
                    <p>查看工程条件</p>\n\
                </div>\n\
                <div class="weui-cell__ft"></div>\n\
            </a>');
                    
                    $('#engineeringContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file=/upload/docs/standards/'+response.data.remarkFirst+'.pdf');
                }
                    

                $('#update_files').click(function(){
                    filesCheck();
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

function filesCheck() {
    var flag = 1;
    
    if($('#uploaderFiles__business_license li').length <= 0) { //营业执照
        flag = 0;
        $('#uploaderFiles__business_license').parent().parent().find('.weui-uploader__title').css('color','#f00');
        $('#uploaderFiles__business_license').parent().find('.weui-uploader__input-box').css('background','#fcc');
    } else {
        $('#uploaderFiles__business_license').parent().parent().find('.weui-uploader__title').css('color','#000');
        $('#uploaderFiles__business_license').parent().find('.weui-uploader__input-box').css('background','#ededed');    
    }
    
    if($('#uploaderFiles__id_card li').length <= 0) { //法人代表身份证件
        flag = 0;
        $('#uploaderFiles__id_card').parent().parent().find('.weui-uploader__title').css('color','#f00');
        $('#uploaderFiles__id_card').parent().find('.weui-uploader__input-box').css('background','#fcc');
    } else {
        $('#uploaderFiles__id_card').parent().parent().find('.weui-uploader__title').css('color','#000');
        $('#uploaderFiles__id_card').parent().find('.weui-uploader__input-box').css('background','#ededed');
    }
    
    if($('#uploaderFiles__trademark li').length <= 0) { //商标注册证
        flag = 0;
        $('#uploaderFiles__trademark').parent().parent().find('.weui-uploader__title').css('color','#f00');
        $('#uploaderFiles__trademark').parent().find('.weui-uploader__input-box').css('background','#fcc');
    } else {
        $('#uploaderFiles__trademark').parent().parent().find('.weui-uploader__title').css('color','#000');
        $('#uploaderFiles__trademark').parent().find('.weui-uploader__input-box').css('background','#ededed');
    }
    
    if($('#uploaderFiles__brand_authorization li').length <= 0) { //品牌授权书
        flag = 0;
        $('#uploaderFiles__brand_authorization').parent().parent().find('.weui-uploader__title').css('color','#f00');
        $('#uploaderFiles__brand_authorization').parent().find('.weui-uploader__input-box').css('background','#fcc');
    } else {
        $('#uploaderFiles__brand_authorization').parent().parent().find('.weui-uploader__title').css('color','#000');
        $('#uploaderFiles__brand_authorization').parent().find('.weui-uploader__input-box').css('background','#ededed');
    }
    
    if($('#uploaderFiles__esign_authorization li').length <= 0) { //电子签章人授权书
        flag = 0;
        $('#uploaderFiles__esign_authorization').parent().parent().find('.weui-uploader__title').css('color','#f00');
        $('#uploaderFiles__esign_authorization').parent().find('.weui-uploader__input-box').css('background','#fcc');
    } else {
        $('#uploaderFiles__esign_authorization').parent().parent().find('.weui-uploader__title').css('color','#000');
        $('#uploaderFiles__esign_authorization').parent().find('.weui-uploader__input-box').css('background','#ededed');
    }
    
    if($.order.type == '场地位置' && $('#uploaderFiles__event_program li').length <= 0) { //活动方案
        flag = 0;
        $('#uploaderFiles__event_program').parent().parent().find('.weui-uploader__title').css('color','#f00');
        $('#uploaderFiles__event_program').parent().find('.weui-uploader__input-box').css('background','#fcc');
    } else {
        $('#uploaderFiles__event_program').parent().parent().find('.weui-uploader__title').css('color','#000');
        $('#uploaderFiles__event_program').parent().find('.weui-uploader__input-box').css('background','#ededed');
    }
    
    if($.order.type == '广告位置' && $('#uploaderFiles__ad_design_sketch li').length <= 0) { //广告效果图
        flag = 0;
        $('#uploaderFiles__ad_design_sketch').parent().parent().find('.weui-uploader__title').css('color','#f00');
        $('#uploaderFiles__ad_design_sketch').parent().find('.weui-uploader__input-box').css('background','#fcc');
    } else {
        $('#uploaderFiles__ad_design_sketch').parent().parent().find('.weui-uploader__title').css('color','#000');
        $('#uploaderFiles__ad_design_sketch').parent().find('.weui-uploader__input-box').css('background','#ededed');
    }
        
    if(flag == 1){
        sendFiles();
    }
}