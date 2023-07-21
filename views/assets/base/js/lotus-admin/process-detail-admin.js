$(document).ready(function(){
    if(!sessionStorage.getItem("FLOW_STATUS") || sessionStorage.getItem("FLOW_STATUS") == null || sessionStorage.getItem("FLOW_STATUS") == '') {
        findDictCodeByDictTypeCode('FLOW_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    findProcessByBizId();
})

function findProcessByBizId() {
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/findAllByBizId?bizId="+getURLParameter('id'),
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
                    
                    $('#status').text(renderFlowStatus(data.processInstStatus));
                    $('#formType').text(renderFormType(data.bizType));
                    
                    $('#processName').text('租赁合同申请['+data.bizId+']').attr('title','租赁合同申请['+data.bizId+']');
                    $('#processInstStatus').text(renderFlowStatus(data.processInstStatus));
                    $('#creatorName').text((data.creatorName || 'admin'));
                    $('#created').text(data.created);
                    $('#updated').text((data.updated || ''));
                    $('#bizType').text('/招商/合同'+renderFormType(data.bizType));
                    
                    $('#approvalProcess').html('');
                    if(data.processStepRecordList != '' && data.processStepRecordList != null && data.processStepRecordList.length > 0){
                        var index = 0;
                        $.each(data.processStepRecordList, function(i,v) {
                            switch (v.activityName) {
                                case "提交人":
                                    $('.step-progress li:eq(0)').addClass('active');
                                    break;
                                case "Lotus招商负责人":
                                    $('.step-progress li:eq(1)').addClass('active');
                                    break;
                                case "财法预审负责人":
                                    $('.step-progress li:eq(2)').addClass('active');
                                    break;
                                case "财法负责人":
                                    $('.step-progress li:eq(3)').addClass('active');
                                    break;
                                case "业态负责人":
                                    $('.step-progress li:eq(4)').addClass('active');
                                    break;
                                case "总部招商负责人":
                                    $('.step-progress li:eq(5)').addClass('active');
                                    break;
                                default:
                                    break;
                            }
                            
                            if((i != 0 && v.status != null && v.status != 'WITHDRAW') || v.activityType == 'END'){
                                index++;
                                $('#approvalProcess').append('<tr><td>'+index+'</td>\n\
                                <td>'+v.activityName+'</td>\n\
                                <td>'+(v.approveName || '')+'</td>\n\
                                <td>'+(v.status != null ? renderFlowSteps(v.status) : '')+'</td>\n\
                                <td>'+(v.opinion || '')+'</td>\n\
                                <td>'+(v.createTime || '')+'</td>\n\
                                <td>'+(v.handleTime || '')+'</td></tr>');
                            }
                        })
                    }
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function flowInstUpdate() {
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/flowInstUpdate?bizId="+getURLParameter('id'),
        type: "GET",
        async: false,
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
                
                $('#myModalLabel').text('正在连接云之家, 请稍后...');
                $('#submitStateModal').modal('show');
                var obj = $('#submitState');
                setTimeFlowInst(obj);
            }                             
        }
    })
}

var countdownFlowInst=10;

function setTimeFlowInst(obj) {
    if (countdownFlowInst == 0) { 
        $('#myModalLabel,#submitState').text('');
        $('#submitStateModal').modal('hide');
        findProcessInstByBizId(); 
        countdownFlowInst = 10; 
        return;
    } else { 
        obj.html(countdownFlowInst + "秒");
        countdownFlowInst--; 
    } 
setTimeout(function() { 
    setTimeFlowInst(obj); }
    ,1000); 
}