$.curProcess = 0;

$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                successMsg('00','审批成功！');
                break;
            case "fail":
                alertMsg('00','审批失败！');
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", refineUpdateUrl() );
        },10000);
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    findRequestByBizId();
    
    $('#opinion_agree, #opinion_return').click(function(){
        if($.cookie('userModules') == '' || $.cookie('userModules') == null){
            window.location.href = '/lotus-admin/login?approval='+getURLBizId();
        } else {
            var txt;
            switch ($(this).attr('id').split('_')[1]) {
                case "agree":
                    txt = '同意';
                    break;
                case "return":
                    txt = '撤回';
                    break;
                default:
                    break;
            }

            if($.curProcess == 1) {
                $('#txt').text(txt);
                $('#approval_form').modal('toggle');
            } else {
                alertMsg('999','非当前审批人，无法'+txt);
            }
        }
    })
    
    $('#submitApproval').click(function(){
        if($.cookie('userModules') == '' || $.cookie('userModules') == null){
            window.location.href = '/lotus-admin/login?approval='+getURLBizId();
        } else {
            approveFlowInput($('#txt').text());
        }
    })
})

function login() {
    window.location.href = '/lotus-admin/login?approval='+getURLBizId();
}

function findRequestByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByBizId?bizId="+getURLBizId(),
        type: "GET",
        async: true,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    var data = response.data;
                    var formType = '';
                    if(data.formType != null){
                        formType = renderFormType(data.formType);
                    }
                    $('#formType').html('【<strong>' + formType + '</strong>】');
                    $('#opinion_print').click(function(){
                        var comment = document.getElementById("printButton");
                        var ev = document.createEvent('MouseEvents');
                        ev.initEvent('click', false, true);
                        comment.dispatchEvent(ev);
                    })
                    document.title = 'leasing DR商务审批';
                    if(data.formStatus != 1 && $.cookie('userModules') != '' && $.cookie('userModules') != null){
                        findDrProcessInstByBizId();
                    }
                    
                    $('#lotus-approval-opinion a').click(function(){
                        window.location.href = "/id/"+getURLBizId().toLowerCase()+"/lotus-approval-opinion";
                    })
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findDrProcessInstByBizId(){
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/findAllByBizId?bizId="+getURLBizId(),
        type: "GET",
        async: true,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    if(response.data.processStepRecordList != '' && response.data.processStepRecordList != null && response.data.processStepRecordList.length > 0){
                        var openId = 'admin';
                        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                            if(v.roleCode == 'CROLE220301000001'){
                                openId = v.moduleName;
                                return false;
                            }
                        })
                        $.each(response.data.processStepRecordList, function(i,v) {
                            if((i != 0 && v.status != null && v.status != 'WITHDRAW') || v.activityType == 'END'){
                                if(v.handler == openId && v.status == 'DOING'){
                                    $.curProcess = 1;
                                }
                            }
                        })
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                            
        }
    }); 
}

function renderFormType(t) {
    var type = '';
    if(sessionStorage.getItem("FORM_TYPE") && sessionStorage.getItem("FORM_TYPE") != null && sessionStorage.getItem("FORM_TYPE") != '') {
        var type = $.parseJSON(sessionStorage.getItem("FORM_TYPE"));
        $.each(type, function(i,v){
            if(v.dictCode == t){
                type = v.dictName;
            }
        })
    }
    
    return type;
}

function approveFlowInput(txt) {
    var opinion;
    switch (txt) {
        case "同意":
            opinion = 'agree';
            break;
        case "撤回":
            opinion = 'return';
            break;
        default:
            break;
    }
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
    var map = {
        "activityName": "",
        "approveOpenId": openId,
        "approveType": opinion,
        "bizId": getURLBizId(),
        "moduleType": "lotus",
        "opinion": $('#opinion').val()
    };

    $.ajax({
        url: $.api.baseLotus+"/api/flow/approveFlow",
        type: "POST",
        data: JSON.stringify(map),
        async: true,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != null){
                    if(response.data.success == true){
                        window.location.href = "/id/"+getURLBizId().toLowerCase()+"/lotus-approval-opinion/dr?s=succeed";
                    } else {
                        $('#approval_form').modal('toggle');
                        alertMsg(response.code,response.data.error); 
                    }
                } else {
                    $('#approval_form').modal('toggle');
                    alertMsg(response.code,'您无需审批'); 
                }
            } else {
                $('#approval_form').modal('toggle');
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            window.location.href = "/id/"+getURLBizId().toLowerCase()+"/lotus-approval-opinion/dr?s=fail";
        }
    });
}