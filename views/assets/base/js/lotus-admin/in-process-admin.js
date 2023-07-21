$(document).ready(function(){
    if(!sessionStorage.getItem("FLOW_STATUS") || sessionStorage.getItem("FLOW_STATUS") == null || sessionStorage.getItem("FLOW_STATUS") == '') {
        findDictCodeByDictTypeCode('FLOW_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    if($.cookie('searchProcessBizType') != null && $.cookie('searchProcessBizType') != ''){
        $('#bizType').val($.cookie('searchProcessBizType')).trigger('change');
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
        $('#bizType').val('').trigger('change');
        $.cookie('searchProcessBizType', '');
    })
    
    $('#search').click(function(){
        $.cookie('searchProcessBizType', $('#bizType').val());
        findAllProcessByKVCondition(1,items);
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findAllProcessByKVCondition(p,c){
    $('#process').html('');
    var map = {}, url;
    
    url = $.api.baseCommYZJ+"/api/process/inst/form/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc";
    var conditionGroups = [], params = [], conditionGroup, param;
    conditionGroups.push({
        "conditionOperator": "AND",
        "params": [{
                "columnName": "processInstStatus",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "!=",
                "value": "FINISH"
            }
        ]
    },{
        "conditionOperator": "AND",
        "params": [{
                "columnName": "processInstStatus",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "!=",
                "value": "DISAGREE"
            }
        ]
    },{
        "conditionOperator": "AND",
        "params": [{
                "columnName": "processInstStatus",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "!=",
                "value": "ABANDON"
            }
        ]
    },{
        "conditionOperator": "AND",
        "params": [{
                "columnName": "processInstStatus",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "!=",
                "value": "DELETE"
            }
        ]
    },{
        "conditionOperator": "AND",
        "params": [{
                "columnName": "processInstStatus",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "!=",
                "value": "CLOSED"
            }
        ]
    });

    if($.cookie('searchProcessBizType') != null && $.cookie('searchProcessBizType') != ''){
        param = {
            "columnName": "bizType",
            "columnPatten": "",
            "conditionOperator": "",
            "operator": "=",
            "value": $.cookie('searchProcessBizType')
        }
        params.push(param);
        conditionGroup = {
            "conditionOperator": "AND",
            "params": params
        }
        conditionGroups.push(conditionGroup);
    }
    
    map = {
        "conditionGroups": conditionGroups,
        "params": []
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
                        
                        var url,activityName,approveName,created='',updated='';
                        
                        activityName = v.creatorOrgName+'-'+v.processStepRecordList[v.processStepRecordList.length-1].activityName;
                        approveName = v.processStepRecordList[v.processStepRecordList.length-1].approveName || '';
                        url = '<a href="/lotus-admin/process-detail?id='+v.bizId+'">租赁合同申请('+v.creatorOrgName+')['+v.mallCode+']</a>';
                        created = v.created;
                        updated = v.updated;
                        
                        $('#process').append('<tr data-index="'+i+'">\n\
                        <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;">'+url+'</td>\n\
                        <td>'+renderFlowStatus(v.processInstStatus)+'</td>\n\
                        <td>/招商/合同'+renderFormType(v.bizType)+'/</td>\n\
                        <td>'+(v.creatorName || 'admin')+'</td>\n\
                        <td>'+activityName+'</td>\n\
                        <td>'+approveName+'</td>\n\
                        <td>'+created+'</td>\n\
                        <td>'+updated+'</td>\n\
                        <td></td></tr>');
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