$.order = {
    id: "",
    shopName: "",
    trade: "",
    unit: "",
    type: ""
};

$.info = {
    copy: ""
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
                
                eSignFlow();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function eSignFlow(){
    showLoading();
    var map = {
        "fileName": $.file.name,
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
         "fileKey": $.file.key,
         "docFilekey": $.file.key,
         "docId":""
        },
        "order": {
          "contractNo": "500008",
          "contractType": "R1",
          "id": $.order.id,
          "mobileNo": "13818768168",
          "orgCode": "100001",
          "outTradeNo": "",
          "tenantName": "esigntest上海天诚智汇创业投资有限公司",
          "tenantOrg": "91310117MA1J16URXD"
        },
        "org": {
          "agentAccountId": "",
          "contactsMobile": "13818768168",
          "licenseNumber": "91310117MA1J16URXD",
          "licenseType": "SOCNO",
          "legalLicenseType":"IDCard",
          "legalLicenseNumber":"310115198309020974",
          "organizeName": "esigntest上海天诚智汇创业投资有限公司",
          "organizeNo": "91310117MA1J16URXD"
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
                
                saveMsgLog('订单合同用印中','您的订单【陆家嘴正大广场】'+$.order.type+$.order.shopName+'正在用印中，请前往我的订单管理页面查看。',$.order.trade, '我的消息',$.order.unit,'/v2/stamping?oid='+$.order.id+'&flowid='+response.data.data.signFlowId);
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
                    
                    $('#engineeringContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file=/upload/docs/qa/'+response.data[0].remarkFirst+'.pdf');
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
                $.file.name = response.data[0].filename;
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
    /*$.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/download/file?mobileNo="+$.cookie('uid')+"&fileType=10&fileName="+getURLParameter('trade')+".pdf",
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
               
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });*/
    $('#pdfContainer').attr('src',"/views/assets/plugins/pdfjs/web/viewer.html?file="+$.api.baseNew+"/comm-wechatol/api/download/file?mobileNo="+$.cookie('uid')+"&fileType=10&fileName="+getURLParameter('trade')+".pdf");
}