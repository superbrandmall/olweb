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
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineUpdateUrl() );
        },1000);
    }
    
    if(!sessionStorage.getItem("FLOW_STEPS") || sessionStorage.getItem("FLOW_STEPS") == null || sessionStorage.getItem("FLOW_STEPS") == '') {
        findDictCodeByDictTypeCode('FLOW_STEPS');
    }
    
    if(!sessionStorage.getItem("FLOW_STATUS") || sessionStorage.getItem("FLOW_STATUS") == null || sessionStorage.getItem("FLOW_STATUS") == '') {
        findDictCodeByDictTypeCode('FLOW_STATUS');
    }
    
    findRequestByBizId();
    findRentCalculationMode('RENT_CALCULATION_MODE');
})

function findRequestByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByBizId?bizId="+getURLParameter('id'),
        type: "GET",
        async: false,
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null && response.data.formType == 'new'){
                    var data = response.data;
                    $('#requestName').text(data.bizId).attr('title',data.bizId);
                    findMainSigningBody(data.mallCode);
                    updateDictByDictTypeCode('FORM_STATUS','formStatus',(data.formStatus != null ? data.formStatus : 1));
                    if(data.formStatus != 1){
                        findProcessInstByBizId();
                    }
                    
                    $('#essayMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                    $('#essayFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                    $('#essayModality').html('<span class="txt">'+(data.bizTypeName || '/')+'</span>【业态】');
                    $('#essayBrand').html('<span class="txt">'+(data.brandName || '/')+'</span>【品牌】');
                    $('#essayArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');
                    if(data.duration >= 12){
                        if(data.duration % 12 != 0){
                            $('#essayDuration').html('新签<span class="txt">'+parseInt(data.duration / 12)+'</span>年<span class="txt">'+data.duration % 12+'</span>个月,');
                        } else {
                            $('#essayDuration').html('新签<span class="txt">'+parseInt(data.duration / 12)+'</span>年,');
                        }
                    } else if(data.duration < 12){
                        $('#essayDuration').html('新签<span class="txt">'+data.duration+'</span>个月,');
                    }
                    if(data.fixedRentList.length > 0){
                        $('#essayFixedRent').html('新签首年固定租金<span class="txt">'+data.fixedRentList[0].taxRentAmount+'</span>元/天/平米，');
                    }
                    if(data.deductList.length > 0){
                        $('#essayCommission').html('首年扣率<span class="txt">'+parseFloat(data.deductList[0].taxDeduct * 100)+'</span>%，');
                    }
                    if(data.propertyFeeList.length > 0){
                        $('#essayPropertyMgmt').html('首年物管费<span class="txt">'+data.propertyFeeList[0].taxRentAmount+'</span>元/月/平米，');
                    }
                    if(data.promotionFeeList.length > 0){
                        $('#essayPromotion').html('推广费<span class="txt">'+data.promotionFeeList[0].taxAmount+'</span>元/月，');
                    }
                    $('#essayTargetSales').html('首年目标营业额<span class="txt">'+(data.targetSales || '/')+'</span>元/月，首年预估销售额<span class="txt">'+(data.salesList.length > 0 ? data.salesList[0].amount : '/')+'</span>元/月，租售比<span class="txt">'+(parseFloat(data.rentSalesRate * 100).toFixed(2) || '/')+'</span>%，');
                    if(data.awardDate != null && data.awardDate != ''){
                        $('#essayAwardDate').html('<span class="txt">预计'+data.awardDate.split('-')[0]+'年'+data.awardDate.split('-')[1]+'月'+data.awardDate.split('-')[2]+'日</span>签约，');
                    }
                    if(data.deliveryDate != null && data.deliveryDate != ''){
                        $('#essayDeliveryDate').html('<span class="txt">'+data.deliveryDate.split('-')[0]+'年'+data.deliveryDate.split('-')[1]+'月'+data.deliveryDate.split('-')[2]+'日</span>交楼，');
                    }
                    if(data.bizDate != null && data.bizDate != ''){
                        $('#essayBizDate').html('<span class="txt">'+data.bizDate.split('-')[0]+'年'+data.bizDate.split('-')[1]+'月'+data.bizDate.split('-')[2]+'日</span>开业。');
                    }
                    
                    $('#essayBudgetRentAmount').html('首年预算租金<span class="txt">'+(data.budgetDayRent || '/')+'</span>元/天/平米，');
                    $('#essayBudgetRentAmountRateOfReach').html('首年单价达成率<span class="txt">'+(parseFloat(data.budgetCompleteRate * 100).toFixed(2) || '/')+'</span>%。');
                    $('#essayBudgetBizDate').html('预算中<span class="txt">'+(data.budgetStartDate != null ? data.budgetStartDate.split('-')[0]+'年'+data.budgetStartDate.split('-')[1]+'月'+data.budgetStartDate.split('-')[2]+'日' : '/')+'</span>开业，');
                    $('#essayBudgetYearAmountRateOfReach').html('全年预算达成率<span class="txt">'+(parseFloat(data.budgetYearCompleteRate * 100).toFixed(2) || '/')+'</span>%，');
                    $('#essayBudgetDifference').html('差异<span class="txt">'+(data.budgetDiffAmount || '/')+'</span>元。');
                    $('#remark').val(data.remark);
                    
                    $('#selectTenant').text(data.tenantName).attr('title',data.tenantName);
                    $('#bizId').text(data.bizId).attr('title',data.bizId);
                    $('#mallName').text(data.mallName).attr('title',data.mallName);
                    $('#floorName').text(data.floorName).attr('title',data.floorName);
                    $('#requestName2').text(data.contractName).attr('title',data.contractName);
                    $('#startEndDate').text(data.startDate+'至'+data.endDate).attr('title',data.startDate+'至'+data.endDate);
                    $('#unitCode').text(data.unitCode).attr('title',data.unitCode);
                    $('#brandName').text(data.brandName).attr('title',data.brandName);
                    $('#deliveryDate').text(data.deliveryDate).attr('title',data.deliveryDate);
                    updateDictByDictTypeCode('PAYMENT_MODE','paymentMode',data.paymentMode);
                    $('#area').html(data.area+'m<sup>2</sup>').attr('title',data.area+'m²');
                    $('#bizTypeName').text((data.bizTypeName != 'null' && data.bizTypeName != null) ? data.bizTypeName : '/').attr('title',(data.bizTypeName != 'null' && data.bizTypeName != null) ? data.bizTypeName : '/');
                    $('#duration').text(data.duration +'个月').attr('title',data.duration +'个月');
                    $('#bizDate').text(data.bizDate).attr('title',data.bizDate);
                    
                    if(data.coFileList.length > 0){
                        $.each(data.coFileList, function(i,v) {
                            if(v.bizType != null){
                                var bizType = 'CONTRACT';
                                if(v.bizType != bizType){
                                    bizType = v.bizType.split('_')[1];
                                }
                                var type;
                                switch (bizType) {
                                    case "BL":
                                        type = '营业执照';
                                        break;
                                    case "IC":
                                        type = '法人代表身份证件';
                                        break;
                                    case "TM":
                                        type = '商标注册证';
                                        break;
                                    case "BA":
                                        type = '品牌授权书';
                                        break;
                                    case "OF":
                                        type = '其它文件';
                                        break;
                                    case "screenshot":
                                        type = '单据快照';
                                        break;
                                    case "CONTRACT":
                                        type = '系统生成合同';
                                        break;
                                    case "INIT":
                                        type = '未盖章合同';
                                        break;
                                    case "TENANT":
                                        type = '商户盖章合同';
                                        break;
                                    case "SIGN":
                                        type = '双方盖章合同';
                                        break;
                                    default:
                                        break;
                                }
                                
                                var fileSize;
                                if(v.fileSize >= 1024 && v.fileSize < 1048576){
                                    fileSize = Math.round(v.fileSize / 1024 * 100) / 100 + 'Kb';
                                } else if(v.fileSize >= 1048576){
                                    fileSize = Math.round(v.fileSize / 1048576 * 100) / 100 + 'Mb';
                                } else {
                                    v.fileSize == null ? fileSize = '' : fileSize = v.fileSize + 'b';
                                }
                                
                                if(v.success == 'SUCCESS' || v.success == 'true'){
                                    if($.inArray(bizType, ['CONTRACT','INIT','TENANT','SIGN']) != -1){
                                        $('#fileList2').prepend('<tr>\n\
                                    <td>'+type+'</td>\n\
                                    <td>'+v.created+'</td>\n\
                                    <td><a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">'+v.fileName+'</a></td>\n\
                                    <td>'+fileSize+'</td>\n\
                                    </tr>');
                                    } else if(bizType != 'screenshot') {
                                        $('#fileList').append('<tr>\n\
                                    <td>'+type+'</td>\n\
                                    <td>'+v.created+'</td>\n\
                                    <td><a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">'+v.fileName+'</a></td>\n\
                                    <td>'+fileSize+'</td>\n\
                                    </tr>');
                                    }
                                }
                            }
                        })
                    } else {
                        $('#investmentContractCertificates').hide();
                    }
                    
                    $('#fileList2').append('<tr>\n\
                    <td>招商租赁审批意见书</td>\n\
                    <td></td>\n\
                    <td><a href="/id/'+data.bizId.toLowerCase()+'/lotus-approval-opinion" target="_blank">http://'+window.location.host+'/id/'+data.bizId.toLowerCase()+'</a></td>\n\
                    <td></td>\n\
                    </tr>');
                    
                    if(data.fixedRentList.length > 0){
                        $.each(data.fixedRentList, function(i,v) {
                            $('#fixedRent').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermFixed').hide();
                    }
                    
                    if(data.deductList.length > 0){
                        $.each(data.deductList, function(i,v) {
                            $('#commission').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.taxDeduct * 100)+'%</td>\n\
    <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
    <td>'+data.rentCalculationMode+'</td></tr>')
                        })

                        if(sessionStorage.getItem("RENT_CALCULATION_MODE") && sessionStorage.getItem("RENT_CALCULATION_MODE") != null && sessionStorage.getItem("RENT_CALCULATION_MODE") != '') {
                            var mode = $.parseJSON(sessionStorage.getItem("RENT_CALCULATION_MODE"));
                            $.each(mode, function(i,v){
                                $("#commission tr td:nth-child(5)").each(function() {
                                    if(v.dictCode == $(this).text()){
                                        $(this).text(v.dictName);
                                        return;
                                    }
                                })
                            })
                       }
                    } else {
                        $('#investmentContractAccounttermCommission').hide();
                    }
                    
                    if(data.propertyFeeList.length > 0){
                        $.each(data.propertyFeeList, function(i,v) {
                            $('#propertyMgmt').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.taxAmount)+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermPropertyMgmt').hide();
                    }
                    
                    if(data.promotionFeeList.length > 0){
                        $.each(data.promotionFeeList, function(i,v) {
                            $('#promotion').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractAccounttermPromotion').hide();
                    }
                    
                    if(data.depositList.length > 0){
                        $.each(data.depositList, function(i,v) {
                            $('#deposit').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td>'+accounting.formatNumber(v.amount)+'</td>\n\
    <td>'+(v.paymentDate || '-')+'</td></tr>')
                        })
                    } else {
                        $('#investmentContractDepositterm').hide();
                    }
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        complete: function () {
            setTimeout(function () {
                $('td').each(function(i,e){
                    $(this).attr('title',$(this).text());
                })
            },800);
        }
    })
}

function findMainSigningBody(code){
    $.ajax({
        url: $.api.baseLotus+"/api/mall/lotus/findOneByCode?code="+code,
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
                
                if(response.data != '' && response.data != null){
                    $('#mainSigningBody').text(response.data.mallLotusBase.name).attr('title',response.data.mallLotusBase.name);
                }
            }                             
        }
    }); 
}

function findRentCalculationMode(dictTypeCode) {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
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
                
                if(response.data.dictDataList.length > 0){
                    sessionStorage.setItem("RENT_CALCULATION_MODE",JSON.stringify(response.data.dictDataList));
                }
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