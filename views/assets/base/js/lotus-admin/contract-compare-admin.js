$.compare = {
    contractA: '',
    contractB: '',
    fixedRentA: '',
    fixedRentB: '',
    propertyMgmtA: '',
    propertyMgmtB: '',
    promotionA: '',
    promotionB: '',
    depositA: '',
    depositB: ''
}

$(document).ready(function(){
    findContractByContractNo(getURLParameter('versionA'));
    findContractByContractNo(getURLParameter('versionB'));
    
    findContractFixedRentByContractNo(getURLParameter('versionA'));
    findContractFixedRentByContractNo(getURLParameter('versionB'));
    
    findRentCalculationMode('RENT_CALCULATION_MODE');

    findContractPropertyMgmtByContractNo(getURLParameter('versionA'));
    findContractPropertyMgmtByContractNo(getURLParameter('versionB'));
    
    findContractPromotionByContractNo(getURLParameter('versionA'));
    findContractPromotionByContractNo(getURLParameter('versionB'));
    
    findContractDepositByContractNo(getURLParameter('versionA'));
    findContractDepositByContractNo(getURLParameter('versionB'));
})

function findContractByContractNo(v) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+v,
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
                    if(data.bizId != null){
                        findContractCoFilesByBizId(data.bizId);
                        $('#fileList2').append('<tr>\n\
                        <td>意见书</td>\n\
                        <td></td>\n\
                        <td><a href="/id/'+response.data.bizId.toLowerCase()+'/lotus-approval-opinion" target="_blank">招商租赁审批意见书</a></td>\n\
                        <td></td>\n\
                        </tr>');
                    }
                    if(v == getURLParameter('versionA')){
                        $.compare.contractA = JSON.stringify(response.data);
                        
                        $('#contractNo').text(data.contractNo).attr('title',data.contractNo);

                        $('#versionA').html('<a href="/lotus-admin/contract-summary?id='+data.contractNo+'&contractVersion='+data.contractVersion+'" target="_blank">V'+data.contractVersion+'</a>').attr('title','V'+data.contractVersion);
                        $('#updatorA').text(data.updateName).attr('title',data.updateName);
                        $('#updateTimeA').text(data.updated).attr('title',data.updated);

                        findMainSigningBody(data.mallCode);
                        $('#tenantName').text(data.tenantName).attr('title',data.tenantName);
                        $('#contractNo').text(data.contractNo).attr('title',data.contractNo);
                        $('#mallName').text(data.mallName).attr('title',data.mallName);
                        $('#floorName').text(data.floorName).attr('title',data.floorName);
                        $('#startDate').text(data.startDate).attr('title',data.startDate);
                        $('#endDate').text(data.endDate).attr('title',data.endDate);
                        $('#unitCode').text(data.unitCode).attr('title',data.unitCode);
                        $('#brandName').text(data.brandName).attr('title',data.brandName);
                        $('#deliveryDate').text(data.deliveryDate).attr('title',data.deliveryDate);
                        updateDictByDictTypeCode('PAYMENT_MODE','paymentMode',data.paymentMode);
                        $('#area').html(data.area+'m<sup>2</sup>').attr('title',data.area+'m²');
                        $('#bizTypeName').text(data.bizTypeName).attr('title',data.bizTypeName);
                        $('#duration').text(data.duration +'个月').attr('title',data.duration +'个月');
                        $('#bizDate').text(data.bizDate).attr('title',data.bizDate);
                        findContractCommissionByContractNo(data.rentCalculationMode);
                    } else if(v == getURLParameter('versionB')) {
                        $.compare.contractB = JSON.stringify(response.data);
                        
                        $('#versionB').html('<a href="/lotus-admin/contract-summary?id='+data.contractNo+'&contractVersion='+data.contractVersion+'" target="_blank">V'+data.contractVersion+'</a>').attr('title','V'+data.contractVersion);
                        $('#updatorB').text(data.updateName).attr('title',data.updateName);
                        $('#updateTimeB').text(data.updated).attr('title',data.updated);
                        
                        var diffs = findObjOperate($.parseJSON($.compare.contractA), $.parseJSON($.compare.contractB));
                        $.each(diffs, function(key,value){
                            if($('#'+key).length > 0){        
                                $('#'+key).append('<div class="compared">('+value.split(':::')[1]+')</div>').parent().addClass('c'+value.split(':::')[0]);
                            }
                        })
                    }
                }
            }
        }
    })
}

function findContractCoFilesByBizId(id){
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+id,
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
                    if(response.data.length > 0) {
                        $.each(response.data, function(i,v){
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
                    }
                }
            }                             
        }
    });
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

function findContractFixedRentByContractNo(v) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/fixed/rent/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+v,
        type: "GET",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    if(v == getURLParameter('versionA')){
                        $.compare.fixedRentA = JSON.stringify(response.data);
                        
                        $.each(response.data, function(i,v) {
                            $('#fixedRent').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td><div id="fixedRent_'+i+'_startDate" style="float: left;">'+v.startDate+'</div> <div style="float: left;">～</div> <div id="fixedRent_'+i+'_endDate" style="float: left;">'+v.endDate+'</div></td>\n\
    <td id="fixedRent_'+i+'_taxRentAmount">'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
    <td id="fixedRent_'+i+'_taxAmount">'+accounting.formatNumber(v.taxAmount)+'</td>\n\
    <td id="fixedRent_'+i+'_amount">'+accounting.formatNumber(v.amount)+'</td>\n\
    <td id="fixedRent_'+i+'_rentAmount">'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    } else if(v == getURLParameter('versionB')){
                        $.compare.fixedRentB = JSON.stringify(response.data);
                        
                        $.each($.parseJSON($.compare.fixedRentA), function(i,v) {
                            var diffs = findObjOperate($.parseJSON($.compare.fixedRentA)[i], $.parseJSON($.compare.fixedRentB)[i]);
                            $.each(diffs, function(key,value){
                                if($('#fixedRent_'+i+'_'+key).length > 0){        
                                    $('#fixedRent_'+i+'_'+key).append('<div class="compared">('+value.split(':::')[1]+')</div>').parent().addClass('c'+value.split(':::')[0]);
                                }
                            })
                        })
                    }
                } else {
                    $('#investmentContractAccounttermFixed').hide();
                }
            }
        }
    })
}

function findContractCommissionByContractNo(rentCalcMode) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/deduct/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+getURLParameter('versionA'),
        type: "GET",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#commission').append('<tr>\n\
<td>'+v.itemName+'['+v.itemCode+']</td>\n\
<td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
<td>'+accounting.formatNumber(v.taxDeduct * 100)+'%</td>\n\
<td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
<td>'+rentCalcMode+'</td></tr>')
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
            }
        }
    })
}

function findContractPropertyMgmtByContractNo(v) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/property/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+v,
        type: "GET",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    if(v == getURLParameter('versionA')){
                        $.compare.propertyMgmtA = JSON.stringify(response.data);
                        
                        $.each(response.data, function(i,v) {
                            $('#propertyMgmt').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td><div id="propertyMgmt_'+i+'_startDate" style="float: left;">'+v.startDate+'</div> <div style="float: left;">～</div> <div id="propertyMgmt_'+i+'_endDate" style="float: left;">'+v.endDate+'</div></td>\n\
    <td id="propertyMgmt_'+i+'_taxRentAmount">'+accounting.formatNumber(v.taxRentAmount)+'</td>\n\
    <td id="propertyMgmt_'+i+'_taxAmount">'+accounting.formatNumber(v.taxAmount)+'</td>\n\
    <td id="propertyMgmt_'+i+'_amount">'+accounting.formatNumber(v.amount)+'</td>\n\
    <td id="propertyMgmt_'+i+'_rentAmount">'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                        })
                    } else if(v == getURLParameter('versionB')){
                        $.compare.propertyMgmtB = JSON.stringify(response.data);
                        
                        $.each($.parseJSON($.compare.propertyMgmtA), function(i,v) {
                            var diffs = findObjOperate($.parseJSON($.compare.propertyMgmtA)[i], $.parseJSON($.compare.propertyMgmtB)[i]);
                            $.each(diffs, function(key,value){
                                if($('#propertyMgmt_'+i+'_'+key).length > 0){        
                                    $('#propertyMgmt_'+i+'_'+key).append('<div class="compared">('+value.split(':::')[1]+')</div>').parent().addClass('c'+value.split(':::')[0]);
                                }
                            })
                        })
                    }
                } else {
                    $('#investmentContractAccounttermPropertyMgmt').hide();
                }
            }
        }
    })
}

function findContractPromotionByContractNo(v) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/promotion/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+v,
        type: "GET",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    if(v == getURLParameter('versionA')){
                        $.compare.promotionA = JSON.stringify(response.data);
                        
                        $.each(response.data, function(i,v) {
                            $('#promotion').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td><div id="promotion_'+i+'_startDate" style="float: left;">'+v.startDate+'</div> <div style="float: left;">～</div> <div id="promotion_'+i+'_endDate" style="float: left;">'+v.endDate+'</div></td>\n\
    <td id="promotion_'+i+'_amount">'+accounting.formatNumber(v.amount)+'</td>\n\
    <td id="promotion_'+i+'_taxAmount">'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                        })
                    } else if(v == getURLParameter('versionB')){
                        $.compare.promotionB = JSON.stringify(response.data);
                        
                        $.each($.parseJSON($.compare.promotionA), function(i,v) {
                            var diffs = findObjOperate($.parseJSON($.compare.promotionA)[i], $.parseJSON($.compare.promotionB)[i]);
                            $.each(diffs, function(key,value){
                                if($('#promotion_'+i+'_'+key).length > 0){        
                                    $('#promotion_'+i+'_'+key).append('<div class="compared">('+value.split(':::')[1]+')</div>').parent().addClass('c'+value.split(':::')[0]);
                                }
                            })
                        })
                    }
                } else {
                    $('#investmentContractAccounttermPromotion').hide();
                }
            }
        }
    })
}

function findContractDepositByContractNo(v) {
    $.ajax({
        url: $.api.baseLotus+"/api/contract/deposit/findAllByContractNoAndContractVersion?contractNo="+getURLParameter('id')+"&contractVersion="+v,
        type: "GET",
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    if(v == getURLParameter('versionA')){
                        $.compare.depositA = JSON.stringify(response.data);
                        
                        $.each(response.data, function(i,v) {
                            $('#deposit').append('<tr>\n\
    <td>'+v.itemName+'['+v.itemCode+']</td>\n\
    <td id="deposit_'+i+'_amount">'+accounting.formatNumber(v.amount)+'</td>\n\
    <td id="deposit_'+i+'_paymentDate">'+(v.paymentDate || '-')+'</td></tr>')
                        })
                    } else if(v == getURLParameter('versionB')){
                        $.compare.depositB = JSON.stringify(response.data);
                        
                        $.each($.parseJSON($.compare.depositA), function(i,v) {
                            var diffs = findObjOperate($.parseJSON($.compare.depositA)[i], $.parseJSON($.compare.depositB)[i]);
                            $.each(diffs, function(key,value){
                                if($('#deposit_'+i+'_'+key).length > 0){        
                                    $('#deposit_'+i+'_'+key).append('<div class="compared">('+value.split(':::')[1]+')</div>').parent().addClass('c'+value.split(':::')[0]);
                                }
                            })
                        })
                    }
                } else {
                    $('#investmentContractDepositterm').hide();
                }
            }
        }
    })
}

/**
 * 判断对象是否为空
 * @param obj 对象
 * @returns {boolean} 为空返回true，不为空返回false
 */
function isEmptyObj(obj) {
    //如果对象的键数组的长度是0，表示为空对象
    return Object.keys(obj).length === 0;
}

/**
 * 找到两个相同结构的对象的差异内容，并返回包含所有差异的数组
 * 注意对象内的值只能是简单类型，复杂类型不考虑
 * @param obj1 原对象
 * @param obj2 可能修改过的对象
 * @returns {{}} 包含所有差异的数组
 */
function findObjOperate(obj1, obj2) {
    const resultObj = {};
    //遍历obj1的键数组，因为obj1和obj2结构相同，所以不考虑结构上的差异
    Object.keys(obj1).forEach(key => {
        if (obj1[key] !== obj2[key]) {
            //将变化过的属性挂载到返回对象中
            if(obj1[key] != null && obj2[key] != null){
                resultObj[key] = 'Updated:::'+obj2[key];
            } else {
                if(obj1[key] == null){
                    resultObj[key] = 'Added:::无';
                } else if(obj2[key] == null){
                    resultObj[key] = 'Ended:::无';
                } 
            }
        }
    });
    return resultObj;
}

/**
 * 找到两个对象数组的差异，并打印从list1到list2的所有变化
 * 注意约定id不能修改
 * @param list1 原数组
 * @param list2 可能修改过的数组
 */
function findOperate(list1, list2) {
    //用于记录id值和索引值之间差别的平衡值（以下简称平衡值）
    let step = 0;
    //遍历list2
    list2.forEach((obj2, index) => {
        //当前id和平衡过差值后的索引值（以下简称新索引值）还是不等
        if (obj2.id !== index + step) {
            //当前id和新索引值之间的差值就是被删除对象的个数
            for (let j = index + step; j < obj2.id; j++) {
                console.log('delete', list1[j]);
            }
            //更新平衡值
            step = obj2.id - index;
        }
        //根据新索引值在list1中找到对应的对象
        const obj1 = list1[index + step];
        if (obj1) {
            //比较obj1和obj2的差异
            const objOperateObj = findObjOperate(obj1, obj2);
            //如果返回的对象为空对象，表示没有差异
            if (!isEmptyObj(objOperateObj)) {
                console.log('modify', obj1.id,objOperateObj);
            }
        } else {
            //js没有下标越界，所以如果obj1是undefined，那么obj2就是新增出的对象
            console.log('add', obj2);
        }
    });
}