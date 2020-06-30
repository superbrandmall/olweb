$.order = {
    id: "",
    shopName: "",
    trade: "",
    unit: "",
    type: ""
};

$.info = {
    copy: ""
};;

var fileKey;

$(document).ready(function(){
    if(getURLParameter('type') && getURLParameter('type') != ''){
        getOrderByTradeNO();
        $('#pdfContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file=/views/html/v2/'+getURLParameter('type')+'.pdf');
    }
    
    
    $(function(){
        var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
<div class="weui-mask">\n\
</div><div class="weui-dialog">\n\
<div class="weui-dialog__bd">您好，用印链接稍后将通过E签宝平台发送短信到签章授权人的手机，请注意查收并及时盖章，谢谢！</div>\n\
<div class="weui-dialog__ft">\n\
<a href="javascript: showDialog();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
</div>\n\
</div> \n\
</div>';

        $('#confirm_contract').on('click', function(){
            if($('#iosDialog2').length > 0){
                $('#iosDialog2').remove();
            }
            $('body').append($iosDialog2);
            $('#iosDialog2').fadeIn(200);
        });
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
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
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
                
                if(response.data.length > 0){
                    $.info.copy = JSON.stringify(response.data[0]);
                    $('#authName').val(response.data[0].authName);
                    $('#authPhone').val(response.data[0].authPhone);
                    $('#authIdentity').val(response.data[0].authIdentity);
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
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/saveOrUpdate",
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
                if(xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                updateOrderToStamping();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function updateOrderToStamping(){
    showLoading();
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
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                //eSignUpload();
                
                saveMsgLog('订单合同用印中','您的订单【陆家嘴正大广场】'+$.order.type+$.order.shopName+'正在用印中，请前往我的订单管理页面查看。',$.order.trade, '我的消息',$.order.unit,'/v2/stamping');
                sendSMS('E签宝合同用印通知','尊敬的签章人，E签宝平台现收到待用印合同一份，请前往平台https://open.esign.cn?token=ajbliexgdhhagehlpqx签章，谢谢。');
                sendSMS('合同用印完毕通知','您的订单【陆家嘴正大广场】'+$.order.type+$.order.shopName+'现双方已用印完毕，请前往我的订单管理页面继续操作。');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

/*function eSignUpload() {
    var formData = new FormData();
    formData.append('vo.userCode',  $.cookie('uid'));
    formData.append('vo.containerName', 'eSign');
    formData.append('vo.prefix', $.cookie('uid')+'/eSign/contract');
    formData.append('files', '/upload/docs/20200616_contract_test.pdf');
    $.ajax({
        type: "POST",
        url: $.api.baseNew+"/api/esign/upload?mobileNo="+$.cookie('uid'),
        data: formData,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function(response, status, xhr) {
            hideLoading();
            if(response.code === 'C0') {
                fileKey = response.data.fileKey;
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}*/

function eSignFlow(){
    showLoading();
    var map = {
        "fileName":"E签宝测试.pdf",
        "account": {
          "licenseNumber": "310115198309020974",
          "licenseType": "IDCard",
          "uniqueId": "13818768168",
          "cardNo":"",
          "loginEmail": "",
          "contactsEmail":"",
          "contactsMobile": "13818768168",
          "loginMobile": "13818768168",
          "name": "马俊"
        },
        "fileResult":{
         "fileKey":"$0570e0be-d6a5-4a8b-9ab9-34cb27c4f019$372265696",
         "docId":"",
         "docFilekey":"$0570e0be-d6a5-4a8b-9ab9-34cb27c4f019$372265696"
        },
        "order": {
          "contractNo": "500001",
          "contractType": "R1",
          "id": 45,
          "mobileNo": "13818768168",
          "orgCode": "100001",
          "outTradeNo": "10000120200615159220138237600002",
          "tenantName": "上海帝泰发展有限公司",
          "tenantOrg": "91310000607304334G"
        },
        "org": {
          "contactsMobile": "13818768168",
          "licenseNumber": "91310000607304334G",
          "licenseType": "SOCNO",
          "legalLicenseType":"IDCard",
          "legalLicenseNumber":"310115198309020974",
          "organizeName": "上海帝泰发展有限公司",
          "organizeNo": "91310000607304334G"
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
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                saveMsgLog('订单合同用印中','您的订单【陆家嘴正大广场】'+$.order.type+$.order.shopName+'正在用印中，请前往我的订单管理页面查看。',$.order.trade, '我的消息',$.order.unit,'/v2/stamping');
                sendSMS('E签宝合同用印通知','尊敬的签章人，E签宝平台现收到待用印合同一份，请前往平台https://open.esign.cn?token=ajbliexgdhhagehlpqx签章，谢谢。');
                sendSMS('合同用印完毕通知','您的订单【陆家嘴正大广场】'+$.order.type+$.order.shopName+'现双方已用印完毕，请前往我的订单管理页面继续操作。');
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
                $.order.id = response.data[0].id;
                $.order.trade = response.data[0].contractInfos[0].outTradeNo;
                $.order.unit = response.data[0].contractInfos[0].unitCode;
                if(response.data[0].remarkSecond == 'leasing') {
                    $.order.type = '商铺单元';
                    $.order.shopName = '【'+response.data[0].contractInfos[0].unitDesc+'】';
                } else if(response.data[0].remarkSecond == 'advertising') {
                    $.order.type = '广告位';
                    $.each(response.data[0].contractInfos, function(i,v){
                        $.order.shopName = $.order.shopName + '【' + v.unitDesc + '】 ';
                    });
                } else if(response.data[0].remarkSecond == 'events') {
                    $.order.type = '场地单元';
                    $.order.shopName = '【'+response.data[0].contractInfos[0].unitDesc+'】';
                }
                 
                if(getURLParameter('type') == 'leasing'){  
                    $('#download_links').append('<a class="weui-cell weui-cell_access" href="javascript: showEngineering();">\n\
                <div class="weui-cell__bd">\n\
                    <p>查看工程条件</p>\n\
                </div>\n\
                <div class="weui-cell__ft"></div>\n\
            </a>');
                    
                    $('#engineeringContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file=/upload/docs/'+response.data[0].remarkFirst+'.pdf');
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