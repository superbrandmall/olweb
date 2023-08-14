$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                successMsg('00','保存成功！');
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    if(!sessionStorage.getItem("FLOW_STATUS") || sessionStorage.getItem("FLOW_STATUS") == null || sessionStorage.getItem("FLOW_STATUS") == '') {
        findDictCodeByDictTypeCode('FLOW_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    if(!sessionStorage.getItem("SIGN_APPROVE_TYPE") || sessionStorage.getItem("SIGN_APPROVE_TYPE") == null || sessionStorage.getItem("SIGN_APPROVE_TYPE") == '') {
        findDictCodeByDictTypeCode('SIGN_APPROVE_TYPE');
    }
    
    if($.cookie('searchProcessScope') != null && $.cookie('searchProcessScope') != ''){
        $('#scope').val($.cookie('searchProcessScope')).trigger('change');
    }
    
    if($.cookie('searchProcessBizType') != null && $.cookie('searchProcessBizType') != ''){
        $('#bizType').val($.cookie('searchProcessBizType')).trigger('change');
    }
    
    if($.cookie('searchProcessState') != null && $.cookie('searchProcessState') != ''){
        $('#processInstStatus').val($.cookie('searchProcessState')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllProcessByKVCondition(getURLParameter('page'),items);
    } else {
        findAllProcessByKVCondition(1,items);
    }

    switch (getURLParameter('items')) {
        case '10':
            $('.page-size').text('10');
            break;
        case '20':
            $('.page-size').text('20');
            break;
        case '30':
            $('.page-size').text('30');
            break;
        case '50':
            $('.page-size').text('50');
            break;
        default:
            $('.page-size').text('20');
            break;
    }
    
    $('#clear').click(function(){
        $('#scope, #bizType, #processInstStatus').val('').trigger('change');
        
        $.cookie('searchProcessScope','');
        $.cookie('searchProcessBizType', '');
        $.cookie('searchProcessState', '');
    })
    
    $('#search').click(function(){
        $.cookie('searchProcessScope',$('#scope').val());
        $.cookie('searchProcessBizType', $('#bizType').val());
        $.cookie('searchProcessState', $('#processInstStatus').val());
        findAllProcessByKVCondition(1,items);
    })
    
    findAllToDoSignRequestsByKVCondition();
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findAllProcessByKVCondition(p,c){
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
    $('#process').html('');
    var map = {}, url;
    
    if(($.cookie('searchProcessScope') != null && $.cookie('searchProcessScope') != '') || ($.cookie('searchProcessBizType') != null && $.cookie('searchProcessBizType') != '') || ($.cookie('searchProcessState') != null && $.cookie('searchProcessState') != '')){
        url = $.api.baseCommYZJ+"/api/v/process/inst/record/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc";
        var value, conditionGroups = [], params = [], conditionGroup, param;

        if($.cookie('searchProcessScope') != null && $.cookie('searchProcessScope') != '' && $.cookie('searchProcessScope') != 'creatorOpenId'){            
            if($.cookie('searchProcessScope') == 'DOING'){
                value = "DOING";
            } else {
                value = 'DONE';
                conditionGroups.push({
                    "conditionOperator": "AND",
                    "params": [{
                            "columnName": "activityName",
                            "columnPatten": "",
                            "conditionOperator": "AND",
                            "operator": "!=",
                            "value": "开始审批"
                        }
                    ]
                },{
                    "conditionOperator": "AND",
                    "params": [{
                            "columnName": "activityName",
                            "columnPatten": "",
                            "conditionOperator": "AND",
                            "operator": "!=",
                            "value": "提交人"
                        }
                    ]
                });
            }
            
            param = {
                "columnName": "handler",
                "columnPatten": "",
                "conditionOperator": "",
                "operator": "=",
                "value": openId
            }
            params.push(param);
            
            param = {
                "columnName": "stepStatus",
                "columnPatten": "",
                "conditionOperator": "",
                "operator": "=",
                "value": value
            };
            params.push(param);
        } else {
            url = $.api.baseCommYZJ+"/api/process/inst/form/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc";
            params = [{
                "columnName": "creatorOpenId",
                "columnPatten": "",
                "conditionOperator": "",
                "operator": "=",
                "value": openId
            },{
                "columnName": "appId",
                "columnPatten": "",
                "conditionOperator": "",
                "operator": "in",
                "value": "500740097;500881373"
            }];
        }
        
        if($.cookie('searchProcessBizType') != null && $.cookie('searchProcessBizType') != ''){
            param = {
                "columnName": "bizType",
                "columnPatten": "",
                "conditionOperator": "",
                "operator": "=",
                "value": $.cookie('searchProcessBizType')
            }
            params.push(param);
        }
        
        if($.cookie('searchProcessState') != null && $.cookie('searchProcessState') != ''){
            param = {
                "columnName": "processInstStatus",
                "columnPatten": "",
                "conditionOperator": "",
                "operator": "=",
                "value": $.cookie('searchProcessState')
            }
            params.push(param);
        }
        
        conditionGroup = {
            "conditionOperator": "AND",
            "params": params
        }
        conditionGroups.push(conditionGroup);
        
        map = {
            "conditionGroups": conditionGroups,
            "params": []
        }
    } else {
        url = $.api.baseCommYZJ+"/api/process/inst/form/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc";
        map = {
            "conditionGroups": [],
            "params": [
                {
                    "columnName": "creatorOpenId",
                    "columnPatten": "",
                    "conditionOperator": "",
                    "operator": "=",
                    "value": openId
                },
                {
                    "columnName": "appId",
                    "columnPatten": "",
                    "conditionOperator": "",
                    "operator": "in",
                    "value": "500740097;500881373"
                }
            ]
        }
    }
    
    $.ajax({
        url: url,
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0) { 
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    $.each(response.data.content, function(i,v){       
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                        
                        var url,activityName,approveName,created='',updated='',endTime='';
                        var bizType = '', urlTitle = '';
                        if($.isNumeric(v.bizType) == false){    
                            bizType = '租赁合同'+renderFormType(v.bizType);
                            urlTitle = '租赁合同申请';
                        } else {
                            if(v.bizType == 5){
                                bizType = '卜蜂莲花'+renderApproveType(v.bizType);
                                urlTitle = '卜蜂莲花用印申请';
                            } else {
                                bizType = '卜蜂莲花'+renderApproveType(v.bizType);
                                urlTitle = '卜蜂莲花签呈';
                            }
                        }
                        if(($.cookie('searchProcessScope') != null && $.cookie('searchProcessScope') != '') || ($.cookie('searchProcessBizType') != null && $.cookie('searchProcessBizType') != '') || ($.cookie('searchProcessState') != null && $.cookie('searchProcessState') != '')){
                            activityName = v.mallName+'-'+v.activityName;
                            approveName = v.approveName || '';
                            url = '<a href="/lotus-admin/process-detail?id='+v.bizId+'">'+urlTitle+'('+v.mallName+')['+v.mallCode+']</a>';
                            created = v.stepCreateTime;
                            
                            if($.cookie('searchProcessScope') == null || $.cookie('searchProcessScope') == '' || $.cookie('searchProcessScope') == 'creatorOpenId'){
                                activityName = v.creatorOrgName+'-'+(v.processStepRecordList.length > 0 ? v.processStepRecordList[v.processStepRecordList.length-1].activityName : "/");
                                approveName = (v.processStepRecordList.length > 0 ? (v.processStepRecordList[v.processStepRecordList.length-1].approveName || '/') : "/");
                                url = '<a href="/lotus-admin/process-detail?id='+v.bizId+'">'+urlTitle+'('+v.creatorOrgName+')['+v.mallCode+']</a>';
                                created = v.created;
                                updated = v.updated;
                                if($.inArray(v.processInstStatus, ['FINISH','DISAGREE','ABANDON','DELETE','CLOSED']) != -1) {
                                    endTime = updated;
                                }
                            } else if($.cookie('searchProcessScope') == 'DONE'){
                                updated = v.handleTime || '';
                                if($.inArray(v.stepStatus, ['FINISH','DISAGREE','ABANDON','DELETE','CLOSED']) != -1) {
                                    endTime = updated;
                                }
                            }
                        } else {
                            activityName = v.creatorOrgName+'-'+(v.processStepRecordList.length > 0 ? v.processStepRecordList[v.processStepRecordList.length-1].activityName : "/");
                            approveName = (v.processStepRecordList.length > 0 ? (v.processStepRecordList[v.processStepRecordList.length-1].approveName || '/') : "/");
                            url = '<a href="/lotus-admin/process-detail?id='+v.bizId+'">'+urlTitle+'('+v.creatorOrgName+')['+v.mallCode+']</a>';
                            created = v.created;
                            updated = v.updated;
                            if($.inArray(v.processInstStatus, ['FINISH','DISAGREE','ABANDON','DELETE','CLOSED']) != -1) {
                                endTime = updated;
                            }
                        }
                        
                        $('#process').append('<tr data-index="'+i+'">\n\
                        <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;">'+url+'</td>\n\
                        <td>'+renderFlowStatus(v.processInstStatus)+'</td>\n\
                        <td>/招商/'+bizType+'/</td>\n\
                        <td>'+(v.creatorName || 'admin')+'</td>\n\
                        <td>'+activityName+'</td>\n\
                        <td>'+approveName+'</td>\n\
                        <td>'+created+'</td>\n\
                        <td>'+updated+'</td>\n\
                        <td>'+endTime+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#process').html('<tr><td colspan="9" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

function findAllToDoSignRequestsByKVCondition(){
    $('#todo').html('');
    var params = [];
    var param = {};
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
    param = {
        "columnName": "creatorOpenId",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": openId
    }
    params.push(param);
    
    param = {
        "columnName": "formStatus",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": '1'
    }
    params.push(param);
    
    var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/sign/approve/form/findAllByKVCondition?page=0&size=100&sort=id,desc",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0) {
                    $("#draftCount").text("("+response.data.content.length+")");
                    $.each(response.data.content, function(i,v){
                        $('#todo').append('\
                            <tr data-index="'+i+'">\n\
                            <td><a href="/lotus-admin/process-request?id='+v.bizId+'">'+v.bizId+'</a></td>\n\
                            <td>'+(renderApproveType(v.applyTypeCode) || '')+'</td>\n\
                            <td>'+v.applyReason+'</td>\n\
                            <td>'+v.mallName+'['+v.mallCode+']</td>\n\
                            <td>'+v.urgencyDegree+'</td>\n\
                        </tr>');
                        
                    });
                } else {
                    $('#todo').html('<tr><td colspan="5" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}