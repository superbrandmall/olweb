$.order = {
    id: "",
    shopName: "",
    trade: "",
    unit: "",
    type: "",
    contractNo: "",
    orgCode: ""
};

$.info = {
    copy: "",
    name: "",
    uscc: ""
};

$.file = {
    key: "",
    name: ""
};
    
$(document).ready(function(){
    if(getURLParameter('type') && getURLParameter('type') != ''){
        getOrderByTradeNO();
        getUserContract();
        getPDF();
    }
    
    $('#download_file').click(function(){
        showDialog2();
    })
    
    $('#confirm_contract').on('click', function(){
        filesCheck();
    });
         
    $("#authDialogForm").validate({
        rules: {
            authName: {
                required: true
            },
            authPhone: {
                required: true,
                digits: true
            },
            authIdentity: {
                required: true
            },
            authEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            authName: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            authPhone: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                digits: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
            },
            authIdentity: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            authEmail: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $('#authDialogForm button').attr('disabled','disabled');
            $('#authDialog').hide();
            showLoading();
            $('#confirm_contract').text('更新文件');
            saveUserCompany();
        }
    });
});

function showContract(id){
    $("#contract_pdf").show();
}

function showEngineering(id){
    $("#engineering_pdf").show();
}

function showDialog(){
    findUserCompanyByMobileNo();
    $('#iosDialog2').remove();
    var authDialog = $('#authDialog');
    authDialog.fadeIn(200);
}

function hideDialog(){
    var authDialog = $('#authDialog');
    authDialog.fadeOut(200);
}

function findUserCompanyByMobileNo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != null && response.data != ''){
                    $.info.copy = JSON.stringify(response.data);
                    $.info.name = response.data.name;
                    $.info.uscc = response.data.uscc;
                    $('#authName').val(response.data.authName);
                    $('#authPhone').val(response.data.authPhone);
                    $('#authIdentity').val(response.data.authIdentity);
                    $('#authEmail').val(response.data.authEmail);
                }
            }
        }
    })
}

function saveUserCompany() {
    var map = $.parseJSON($.info.copy);
    map.authName = $('#authName').val();
    map.authPhone = $('#authPhone').val();
    map.authIdentity = $('#authIdentity').val();
    map.authEmail = $('#authEmail').val();
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                eSignFlow();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function eSignFlow(){
    var map = {
        "fileName": $.file.name,
        "account": {
          "licenseNumber": $('#authIdentity').val(),
          "licenseType": "IDCard",
          "uniqueId": $('#authPhone').val(),
          "cardNo":"",
          "loginEmail": "",
          "contactsEmail":"",
          "contactsMobile": $('#authPhone').val(),
          "loginMobile": $('#authPhone').val(),
          "name": $('#authName').val()
        },
        "fileResult":{
         "fileKey": $.file.key,
         "docFilekey": $.file.key,
         "docId":""
        },
        "order": {
          "contractNo": $.order.contractNo,
          "contractType": "R1",
          "id": $.order.id,
          "mobileNo": $.cookie('uid'),
          "orgCode": $.order.orgCode,
          "outTradeNo": getURLParameter('trade'),
          "tenantName": $.info.name,
          "tenantOrg": $.info.uscc
        },
        "org": {
          "agentAccountId": "",
          "contactsMobile": $('#authPhone').val(),
          "licenseNumber": $.info.uscc,
          "licenseType": "SOCNO",
          "legalLicenseType":"IDCard",
          "legalLicenseNumber": $('#authIdentity').val(),
          "organizeName": $.info.name,
          "organizeNo": $.info.uscc
        }
    }
      
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/esign/flow",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                hideLoading();
                if(response.data.errCode == '10000000' || response.data.errCode == '0'){
                    $.cookie('oid',$.order.id);
                    $.cookie('flowid',response.data.data.signFlowId);

                    var mallName;
                    switch ($.order.orgCode) {
                        case '301001':
                            mallName = '河南洛阳正大广场';
                            break;
                        case '201001':
                            mallName = '上海宝山正大乐城';
                            break;
                        case '100001':
                            mallName = '上海陆家嘴正大广场';
                            break;
                        case '204001':
                            mallName = '上海徐汇正大乐城';
                            break;
                        default:
                            mallName = '上海陆家嘴正大广场';
                            break;
                    }
                    
                    updateOrderToStamping();
                    sendFiles();
                    
                    saveMsgLog('签章链接发送提醒','签章链接已经通过短信发送到您的手机，您可以用手机直接操作；如需要用电脑，请将链接复制到电脑中操作。',$.order.trade, '我的消息',$.order.unit,'');
                    saveMsgLog('订单合同用印中','您的订单【'+mallName+'】'+$.order.type+$.order.shopName+'正在用印中，请前往我的订单管理页面查看。',$.order.trade, '我的消息',$.order.unit,'/v2/stamping');
                } else {
                    var msg = response.data.msg;
                    if(response.data.errCode == '20050420' || response.data.errCode == '20050389' || response.data.errCode == '20050368' || response.data.errCode == '20050372' || response.data.errCode == '20050386'){
                        msg = "授权人信息错误";
                    }
                    
                    $('body').append('<div id="js_toast_error" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">'+msg+'</p></div></div>');
                    var $toast = $('#js_toast_error');

                    $('.page.cell').removeClass('slideIn');

                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                    }, 2000);
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

function updateOrderToStamping(){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+$.order.id+"&orderStates=合同用印中",
        type: "POST",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
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

function sendFiles() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/mail/sendFile?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade'),
        type: "GET",
        async: true,
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
                
                var mallCode, buildingCode;
                switch ($.order.orgCode) {
                    case '301001':
                        mallCode = 'OLMALL190117000001';
                        buildingCode = 'OLBUILDING190117000001';
                        break;
                    case '201001':
                        mallCode = 'OLMALL180917000002';
                        buildingCode = 'OLBUILDING180917000005';
                        break;
                    case '100001':
                        mallCode = 'OLMALL180917000003';
                        buildingCode = 'OLBUILDING180917000001';
                        break;
                    case '204001':
                        mallCode = 'OLMALL180917000001';
                        buildingCode = 'OLBUILDING180917000006';
                        break;
                    default:
                        mallCode = 'OLMALL180917000003';
                        buildingCode = 'OLBUILDING180917000001';
                        break;
                }
                
                $('#negotiate').click(function(){
                    window.location.href = '/v2/negotiation?code='+response.data.remarkFirst+'&unit='+response.data.contractInfos[0].unitCode+'&building='+buildingCode+'&mall='+mallCode+'&name=1&outTradeNo='+getURLParameter('trade');
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

function getUserContract() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/file/findAllByMobileNoAndFileTypeAndFileName?mobileNo="+$.cookie('uid')+"&fileType=10&fileName="+getURLParameter('trade')+".pdf",
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
            if(response.code === 'C0') {
                $.file.key = response.data[0].docFilekey;
                $.file.name = response.data[0].fileName;
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
    
    $(function(){
        var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
<div class="weui-mask">\n\
</div><div class="weui-dialog" style="background: #fff;">\n\
<div class="weui-dialog__bd" style="padding-bottom: 32px;">您好，E签宝平台稍后会以短信形式将签章链接发送到签章授权人的手机，请注意查收并及时盖章，谢谢！</div>\n\
<div class="weui-dialog__ft" style="line-height: 56px; min-height: 56px; font-size: 17px; -webkit-flex-direction: initial;">\n\
<a href="javascript: showDialog();" class="weui-dialog__btn weui-dialog__btn_primary" style="color: var(--weui-FG-HALF); font-size: 17px; border: 0 none; background: #fff;">知道了</a>\n\
</div>\n\
</div> \n\
</div>';

        if(flag == 1){
            if($('#iosDialog2').length > 0){
                $('#iosDialog2').remove();
            }
            $('body').append($iosDialog2);
            $('#iosDialog2').fadeIn(200);
        }
    });
}