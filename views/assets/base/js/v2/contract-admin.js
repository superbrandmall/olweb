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
            $('#authDialogForm button').attr('disabled','disabled');
            $('#authDialog').hide();
            showLoading();
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
                    $.info.name = response.data[0].name;
                    $.info.uscc = response.data[0].uscc;
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
          "outTradeNo": "",
          "tenantName": $.info.name,
          "tenantOrg": $.info.uscc
        },
        "org": {
          "agentAccountId": "",
          "contactsMobile": $('#authPhone').val(),
          "licenseNumber": $.info.copy.uscc,
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
                $.cookie('oid',$.order.id);
                $.cookie('flowid',response.data.data.signFlowId);
                hideLoading();
                saveMsgLog('订单合同用印中','您的订单【陆家嘴正大广场】'+$.order.type+$.order.shopName+'正在用印中，请前往我的订单管理页面查看。',$.order.trade, '我的消息',$.order.unit,'/v2/stamping');
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
                    $.order.type = '商铺单元';
                    $.order.shopName = '【'+response.data.contractInfos[0].unitDesc+'】';
                } else if(response.data.remarkSecond == 'advertising') {
                    $.order.type = '广告位';
                    $.each(response.data.contractInfos, function(i,v){
                        $.order.shopName = $.order.shopName + '【' + v.unitDesc + '】 ';
                    });
                } else if(response.data.remarkSecond == 'events') {
                    $.order.type = '场地单元';
                    $.order.shopName = '【'+response.data.contractInfos[0].unitDesc+'】';
                }
                 
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