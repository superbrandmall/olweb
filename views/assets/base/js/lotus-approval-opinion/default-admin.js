$.curProcess = 0;

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
            window.history.pushState("object or string", "Title", refineUpdateUrl() );
        },10000);
    }
    
    if(!sessionStorage.getItem("FLOW_STEPS") || sessionStorage.getItem("FLOW_STEPS") == null || sessionStorage.getItem("FLOW_STEPS") == '') {
        findDictCodeByDictTypeCode('FLOW_STEPS');
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
                    
                    var formType = '';
                    if(data.formType != null){
                        formType = renderFormType(data.formType);
                    }
                    $('#formType').html('【<strong>' + formType + '</strong>】');
                    
                    var contractTemplate = '长期';
                    if(data.contractTemplate == 2){
                        contractTemplate = '短期';
                    }
                    $('#contractTemplate').text(contractTemplate + '租赁合同');
                    
                    findMainSigningBody(data.mallCode);
                    if(data.formStatus != 1 && $.cookie('userModules') != '' && $.cookie('userModules') != null){
                        findProcessInstByBizId();
                    }
                    
                    $('#updated').text(data.updated.split(' ')[0]);
                    $('#remark').val(data.remark);
                    $('#selectTenant').text(data.tenantName);
                    $('#mallName').text(data.mallName);                    
                    $('#unitName').text(data.unitName);
                    $('#freeDays').text(data.freeDays || 0);
                    $('#growthRate').text(Math.round(data.growthRate * 100) + '%' || '0%');
                    $('#brandName').text(data.brandName);
                    $('#area').html(data.area+'m<sup>2</sup>');
                    $('#bizTypeName').text(data.bizTypeName);
                    $('#duration').text(data.startDate + '-' + data.endDate);
                    
                    var fixedRentListIndex = 0;
                    var propertyFeeListIndex = 0;
                    var promotionFeeListIndex = 0;
                    if(data.formType == 'termination'){
                        if(data.fixedRentList.length > 0){
                            fixedRentListIndex = data.fixedRentList.length - 1;
                        }
                        
                        if(data.propertyFeeList.length > 0){
                            propertyFeeListIndex = data.propertyFeeList.length - 1;
                        }
                        
                        if(data.promotionFeeList.length > 0){
                            promotionFeeListIndex = data.promotionFeeList.length - 1;
                        }
                        
                        $('#growthRate').text('/');
                    }
                    var rentalFloorEffect, rentalFloorTaxEffect;
                    var totalAmount = 0;
                    var totalTaxAmount = 0;
                    if(data.fixedRentList.length > 0){
                        $('#fixedRentTaxAmount').html(accounting.formatNumber(data.fixedRentList[fixedRentListIndex].taxAmount));
                        $('#fixedRentAmount').html(accounting.formatNumber(data.fixedRentList[fixedRentListIndex].amount));
                        rentalFloorEffect = data.fixedRentList[fixedRentListIndex].rentAmount;
                        rentalFloorTaxEffect = data.fixedRentList[fixedRentListIndex].taxRentAmount;
                        $('#rentalFloorEffect').text(accounting.formatNumber(rentalFloorEffect));
                        $('#rentalFloorTaxEffect').text(accounting.formatNumber(rentalFloorTaxEffect));
                        totalAmount += data.fixedRentList[fixedRentListIndex].amount;
                        totalTaxAmount += data.fixedRentList[fixedRentListIndex].taxAmount;
                    }
                    
                    //日租金坪效含税（元/m²/天）= 月租金含税 * 12 / 365 / 面积;
                    //日租金坪效（元/m²/天）= 日租金坪效含税 / 1.09
                    
                    if(data.propertyFeeList.length > 0){
                        $('#propertyMgmtTaxAmount').html(accounting.formatNumber(data.propertyFeeList[propertyFeeListIndex].taxAmount));
                        $('#propertyMgmtAmount').html(accounting.formatNumber(data.propertyFeeList[propertyFeeListIndex].amount));
                        totalAmount += data.propertyFeeList[propertyFeeListIndex].amount;
                        totalTaxAmount += data.propertyFeeList[propertyFeeListIndex].taxAmount;
                    }
                    
                    if(data.promotionFeeList.length > 0){
                        totalAmount += data.promotionFeeList[promotionFeeListIndex].amount;
                        totalTaxAmount += data.promotionFeeList[promotionFeeListIndex].taxAmount;
                    }
                    
                    var depositFee = 0;
                    if(data.depositList.length > 0){
                        for(var i=0; i < data.depositList.length; i++){
                            depositFee += data.depositList[i].amount;
                        }
                    }
                    $('#depositFee').text(accounting.formatNumber(depositFee));
                    $('#totalTaxAmount').html(accounting.formatNumber(totalTaxAmount));
                    $('#totalAmount').html(accounting.formatNumber(totalAmount));
                    
                    var oldContractInfo = data.oldContractInfo;
                    if(data.formType == 'new'){
                        $('#newFixed, #newDeduct, #newProperty, #newPromotionFee, #newDeposit, #newRemark').show();
                        
                        if(data.fixedRentList.length > 0){
                            $.each(data.fixedRentList, function(i,v) {
                                $('#fixedRent').append('<tr>\n\
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
        <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
        <td>'+accounting.formatNumber(v.taxDeduct * 100)+'%</td>\n\
        <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
        <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
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
                        
                        $('#newMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                        $('#newFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                        $('#newModality').html('<span class="txt">'+data.bizTypeName+'</span>【业态】');
                        $('#newBrand').html('<span class="txt">'+data.brandName+'</span>【品牌】');
                        $('#newArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');
                        $('#newDuration').text(data.duration);
                        var saleRentalRatio = '';
                        if(data.fixedRentList.length > 0){
                            $('#newFixedRent').html('新签首年固定租金<span class="txt">'+data.fixedRentList[0].taxRentAmount+'</span>元/天/平米，');
                            saleRentalRatio = Math.round(data.fixedRentList[0].taxAmount / (data.salesList.length > 0 ? data.salesList[0].amount : 1) * 100) * 100 / 100;
                        }
                        if(data.deductList.length > 0){
                            $('#newCommission').html('首年扣率<span class="txt">'+Math.round(data.deductList[0].taxDeduct * 100)+'</span>%，');
                        }
                        if(data.propertyFeeList.length > 0){
                            $('#newPropertyMgmt').html('首年物管费<span class="txt">'+data.propertyFeeList[0].taxRentAmount+'</span>元/月/平米，');
                        }
                        if(data.promotionFeeList.length > 0){
                            $('#newPromotion').html('推广费<span class="txt">'+data.promotionFeeList[0].taxAmount+'</span>元/月，');
                        }
                        $('#newTargetSales').html('首年目标营业额<span class="txt">'+(data.targetSales || '/')+'</span>元/月，首年预估销售额<span class="txt">'+(data.salesList.length > 0 ? data.salesList[0].amount : '/')+'</span>元/月，租售比<span class="txt">'+(saleRentalRatio != 'Infinity' ? saleRentalRatio : '/')+'</span>%，');
                        if(data.awardDate != null && data.awardDate != ''){
                            $('#newAwardDate').html('<span class="txt">预计'+data.awardDate.split('-')[0]+'年'+data.awardDate.split('-')[1]+'月'+data.awardDate.split('-')[2]+'日</span>签约，');
                        }
                        if(data.deliveryDate != null && data.deliveryDate != ''){
                            $('#newDeliveryDate').html('<span class="txt">'+data.deliveryDate.split('-')[0]+'年'+data.deliveryDate.split('-')[1]+'月'+data.deliveryDate.split('-')[2]+'日</span>交楼，');
                        }
                        if(data.bizDate != null && data.bizDate != ''){
                            $('#newBizDate').html('<span class="txt">'+data.bizDate.split('-')[0]+'年'+data.bizDate.split('-')[1]+'月'+data.bizDate.split('-')[2]+'日</span>开业。');
                        }
                    } else if($.inArray(data.formType, ['renew','modify','termination']) != -1){                        
                        $('#changeFixed, #changeDeduct, #changeProperty, #changePromotion, #changeDeposit').show();
                        if(data.formType == 'renew'){
                            $('#renewRemark').show();
                            
                            if(oldContractInfo.fixedRentList.length > 0){
                                $.each(oldContractInfo.fixedRentList, function(i,v) {
                                    $('#fixedRentBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                })

                                if(data.fixedRentList.length > 0){
                                    $.each(data.fixedRentList, function(i,v) {
                                        $('#fixedRentAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermFixed').hide();
                            }

                            if(oldContractInfo.deductList.length > 0){
                                $.each(oldContractInfo.deductList, function(i,v) {
                                    $('#commissionBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
            <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
                                })

                                if(data.deductList.length > 0){
                                    $.each(data.deductList, function(i,v) {
                                        $('#commissionAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
                <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermCommission').hide();
                            }

                            if(oldContractInfo.propertyFeeList.length > 0){
                                $.each(oldContractInfo.propertyFeeList, function(i,v) {
                                    $('#propertyMgmtBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                })

                                if(data.propertyFeeList.length > 0){
                                    $.each(data.propertyFeeList, function(i,v) {
                                        $('#propertyMgmtAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermPropertyMgmt').hide();
                            }

                            if(oldContractInfo.promotionFeeList.length > 0){
                                $.each(oldContractInfo.promotionFeeList, function(i,v) {
                                    $('#promotionBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                                })

                                if(data.promotionFeeList.length > 0){
                                    $.each(data.promotionFeeList, function(i,v) {
                                        $('#promotionAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermPromotion').hide();
                            }

                            if(oldContractInfo.depositList.length > 0){
                                $.each(oldContractInfo.depositList, function(i,v) {
                                    $('#depositBefore').append('<tr>\n\
            <td>'+v.itemName+'['+v.itemCode+']</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+(v.paymentDate || '-')+'</td></tr>')
                                })

                                if(data.depositList.length > 0){
                                    $.each(data.depositList, function(i,v) {
                                        $('#depositAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.itemName+'['+v.itemCode+']</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+(v.paymentDate || '-')+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractDepositterm').hide();
                            }

                            $('#renewMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                            $('#renewFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                            $('#renewModality').html('<span class="txt">'+data.bizTypeName+'</span>【业态】');
                            $('#renewBrand').html('<span class="txt">'+data.brandName+'</span>【品牌】');
                            $('#renewArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');

                            if(oldContractInfo.endDate == data.endDate){
                                $('#renewDuration').text(0);
                            } else {
                                $('#renewDuration').text(data.duration);
                            }

                            $('#renewRenewBrandHoldFlag').text('');
                            $('#renewRenewBrandHoldReason').text('');
                            if(data.renewBrandHoldFlag == 1){
                                $('#renewRenewBrandHoldFlag').text('是需要保留的品牌。');
                            } else if(data.renewBrandHoldFlag == 0){
                                $('#renewRenewBrandHoldFlag').html('<span class="txt">不是需要保留的品牌，</span>');
                                $('#renewRenewBrandHoldReason').html('<span class="txt">'+data.renewBrandHoldReason+'</span>【暂时保留的原因】。');
                            }
                            var saleRentalRatio = '';
                            if(data.fixedRentList.length > 0){
                                $('#renewFixedRent').html('固定租金<span class="txt">'+data.fixedRentList[0].taxRentAmount+'</span>元/天/平米，');
                                if(data.renewRentSameFlag == 1){
                                    $('#renewGrowthRate').text('平续，');
                                } else {
                                    $('#renewGrowthRate').html('增长<span class="txt">'+Math.round(data.growthRate * 100)+'</span>%，');
                                }
                                saleRentalRatio = (data.renewAvgSales > 0 ? Math.round(data.fixedRentList[0].taxAmount / data.renewAvgSales * 100) * 100 / 100 : '/');
                            }
                            if(data.deductList.length > 0){
                                $('#renewCommission').html('扣率<span class="txt">'+Math.round(data.deductList[0].taxDeduct * 100)+'</span>%，');
                            }
                            if(data.propertyFeeList.length > 0){
                                $('#renewPropertyMgmt').html('物管费<span class="txt">'+data.propertyFeeList[0].taxRentAmount+'</span>元/月/平米，');
                            }
                            if(data.promotionFeeList.length > 0){
                                $('#renewPromotion').html('推广费<span class="txt">'+data.promotionFeeList[0].taxAmount+'</span>元/月，');
                            }
                            $('#renewRenewAvgSales').html('近12个月平均销售额<span class="txt">'+(data.renewAvgSales || '/')+'</span>元，租售比<span class="txt">'+(saleRentalRatio != 'Infinity' ? saleRentalRatio : '/')+'</span>%。');
                        } else if(data.formType == 'modify') {
                            $('#modifyRemark').show();
                            
                            if(oldContractInfo.fixedRentList.length > 0){
                                $.each(oldContractInfo.fixedRentList, function(i,v) {
                                    $('#fixedRentBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>');
                                })

                                if(data.fixedRentList.length > 0){
                                    $.each(data.fixedRentList, function(i,v) {
                                        $('#fixedRentAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermFixed').hide();
                            }
                            
                            if(oldContractInfo.deductList.length > 0){
                                $.each(oldContractInfo.deductList, function(i,v) {
                                    $('#commissionBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
            <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
                                })

                                if(data.deductList.length > 0){
                                    $.each(data.deductList, function(i,v) {
                                        $('#commissionAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
                <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermCommission').hide();
                            }
                            
                            if(oldContractInfo.propertyFeeList.length > 0){
                                $.each(oldContractInfo.propertyFeeList, function(i,v) {
                                    $('#propertyMgmtBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                })

                                if(data.propertyFeeList.length > 0){
                                    $.each(data.propertyFeeList, function(i,v) {
                                        $('#propertyMgmtAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermPropertyMgmt').hide();
                            }

                            if(oldContractInfo.promotionFeeList.length > 0){
                                $.each(oldContractInfo.promotionFeeList, function(i,v) {
                                    $('#promotionBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                                })

                                if(data.promotionFeeList.length > 0){
                                    $.each(data.promotionFeeList, function(i,v) {
                                        $('#promotionAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractAccounttermPromotion').hide();
                            }
                            
                            if(oldContractInfo.depositList.length > 0){
                                $.each(oldContractInfo.depositList, function(i,v) {
                                    $('#depositBefore').append('<tr>\n\
            <td>'+v.itemName+'['+v.itemCode+']</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+(v.paymentDate || '-')+'</td></tr>')
                                })

                                if(data.depositList.length > 0){
                                    $.each(data.depositList, function(i,v) {
                                        $('#depositAfter').append('<tr style="color: #E43C24;">\n\
                <td>'+v.itemName+'['+v.itemCode+']</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+(v.paymentDate || '-')+'</td></tr>')
                                    })
                                }
                            } else {
                                $('#investmentContractDepositterm').hide();
                            }
                            
                            $('#modifyMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                            $('#modifyFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                            $('#modifyModality').html('<span class="txt">'+data.bizTypeName+'</span>【业态】');
                            $('#modifyBrand').html('<span class="txt">'+data.brandName+'</span>【品牌】');
                            $('#modifyArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');
                            $('#modifyDuration').html('<span class="txt">'+data.duration+'</span>【合同租期】个月，');
                            var modifyType = '';
                            switch (data.modifyType) {
                                case "TENANT_CHANGE":
                                    modifyType = '租户主体发生变更。从租户【'+oldContractInfo.tenantName+'】变更为【'+data.tenantName+'】';
                                    break;
                                case "BRAND_CHANGE":
                                    modifyType = '品牌主体发生变更。从品牌【'+oldContractInfo.brandName+'】变更为【'+data.brandName+'】';
                                    break;
                                case "TIME_CHANGE":
                                    modifyType = '合同租期发生变更';
                                    break;
                                case "CLAUSE_CHANGE":
                                    modifyType = '合同商务条件发生变更';
                                    break;
                                default:
                                    break;
                            }
                            $('#modifyModifyType').html('<span class="txt">'+modifyType+'</span>【变更类型】。');
                            var saleRentalRatio = '';
                            if(data.fixedRentList.length > 0){
                                saleRentalRatio = Math.round(data.fixedRentList[0].taxAmount / (data.salesList.length > 0 ? data.salesList[0].amount : 1) * 100) * 100 / 100;
                            }
                            $('#modifyTargetSales').html('目标营业额<span class="txt">'+(data.targetSales || '/')+'</span>元/月，预估销售额<span class="txt">'+(data.salesList.length > 0 ? data.salesList[0].amount : '/')+'</span>元/月，租售比<span class="txt">'+(saleRentalRatio != 'Infinity' ? saleRentalRatio : '/')+'</span>%，');
                            if(data.awardDate != null && data.awardDate != ''){
                                $('#modifyAwardDate').html('<span class="txt">'+data.awardDate.split('-')[0]+'年'+data.awardDate.split('-')[1]+'月'+data.awardDate.split('-')[2]+'日</span>签约。');
                            }
                        } else if(data.formType == 'termination') {
                            $('#terminateRemark').show();
                            
                            if(oldContractInfo.fixedRentList.length > 0){
                                $.each(oldContractInfo.fixedRentList, function(i,v) {
                                    $('#fixedRentBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                })

                                $.each(data.fixedRentList, function(i,v) {
                                    var ed = v.endDate;
                                    if(v.endDate == data.cancelDate){
                                        ed = '<span style="color: #E43C24;">'+ed+'</span>';
                                    }
                                    $('#fixedRentAfter').append('<tr>\n\
                <td>'+v.startDate+' ～ '+ed+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>') 
                                })
                            } else {
                                $('#investmentContractAccounttermFixed').hide();
                            }

                            if(oldContractInfo.deductList.length > 0){
                                $.each(oldContractInfo.deductList, function(i,v) {
                                    $('#commissionBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
            <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
                                })

                                $.each(data.deductList, function(i,v) {
                                    var ed = v.endDate;
                                    if(v.endDate == data.cancelDate){
                                        ed = '<span style="color: #E43C24;">'+ed+'</span>';
                                    }
                                    $('#commissionAfter').append('<tr>\n\
            <td>'+v.itemName+'['+v.itemCode+']</td>\n\
            <td>'+v.startDate+' ～ '+ed+'</td>\n\
            <td>'+accounting.formatNumber(v.deduct * 100)+'%</td>\n\
            <td>'+findRentCalculationMode('RENT_CALCULATION_MODE', data.rentCalculationMode)+'</td></tr>')
                                })
                            } else {
                                $('#investmentContractAccounttermCommission').hide();
                            }

                            if(oldContractInfo.propertyFeeList.length > 0){
                                $.each(oldContractInfo.propertyFeeList, function(i,v) {
                                    $('#propertyMgmtBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                })

                                $.each(data.propertyFeeList, function(i,v) {
                                    var ed = v.endDate;
                                    if(v.endDate == data.cancelDate){
                                        ed = '<span style="color: #E43C24;">'+ed+'</span>';
                                    }
                                    $('#propertyMgmtAfter').append('<tr>\n\
                <td>'+v.startDate+' ～ '+ed+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.rentAmount)+'</td></tr>')
                                })
                            } else {
                                $('#investmentContractAccounttermPropertyMgmt').hide();
                            }

                            if(oldContractInfo.promotionFeeList.length > 0){
                                $.each(oldContractInfo.promotionFeeList, function(i,v) {
                                    $('#promotionBefore').append('<tr>\n\
            <td>'+v.startDate+' ～ '+v.endDate+'</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                                })

                                $.each(data.promotionFeeList, function(i,v) {
                                    var ed = v.endDate;
                                    if(v.endDate == data.cancelDate){
                                        ed = '<span style="color: #E43C24;">'+ed+'</span>';
                                    }
                                    $('#promotionAfter').append('<tr>\n\
                <td>'+v.startDate+' ～ '+ed+'</td>\n\
                <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                <td>'+accounting.formatNumber(v.taxAmount)+'</td></tr>')
                                })
                            } else {
                                $('#investmentContractAccounttermPromotion').hide();
                            }

                            if(data.depositList.length > 0){
                                $.each(data.depositList, function(i,v) {
                                    $('#depositBefore, #depositAfter').append('<tr>\n\
            <td>'+v.itemName+'['+v.itemCode+']</td>\n\
            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
            <td>'+(v.paymentDate || '-')+'</td></tr>')
                                })
                            } else {
                                $('#investmentContractDepositterm').hide();
                            }

                            $('#terminateMall').html('<span class="txt">'+data.mallName+'</span>【项目名称】');
                            $('#terminateFloor').html('<span class="txt">'+data.floorName+'</span>【楼层】');
                            $('#terminateModality').html('<span class="txt">'+data.bizTypeName+'</span>【业态】');
                            $('#terminateBrand').html('<span class="txt">'+data.brandName+'</span>【品牌】');
                            $('#terminateArea').html('<span class="txt">'+data.area+'</span>【铺位面积】平米，');
                            if(data.cancelDate != null && data.cancelDate != ''){
                                $('#terminateCancelDate').html('<span class="txt">'+data.cancelDate.split('-')[0]+'年'+data.cancelDate.split('-')[1]+'月'+data.cancelDate.split('-')[2]+'日</span>');
                            }
                            if(data.cancelType == 'A'){
                                $('#terminateCancelType').html('<span class="txt">到期终止。</span>');
                            } else if(data.cancelType == 'B' || data.cancelType == 'C'){
                                $('#terminateCancelType').html('<span class="txt">提前终止。</span>');
                            }
                            if(data.newBrandName != null && data.newBrandName != ''){
                                $('#terminateNewBrandName').html('后续洽谈品牌<span class="txt">'+data.newBrandName+'</span>【品牌名】，');
                            }
                            if(data.newDrDate != null && data.newDrDate != ''){
                                $('#terminateNewDrDate').html('<span class="txt">预计'+data.newDrDate.split('-')[0]+'年'+data.newDrDate.split('-')[1]+'月'+data.newDrDate.split('-')[2]+'日</span>上会，');
                            }
                            if(data.newDeliveryDate != null && data.newDeliveryDate != ''){
                                $('#terminateNewDeliveryDate').html('<span class="txt">'+data.newDeliveryDate.split('-')[0]+'年'+data.newDeliveryDate.split('-')[1]+'月'+data.newDeliveryDate.split('-')[2]+'日</span>交楼，');
                            }
                            if(data.newBizDate != null && data.newBizDate != ''){
                                $('#terminateNewBizDate').html('<span class="txt">'+data.newBizDate.split('-')[0]+'年'+data.newBizDate.split('-')[1]+'月'+data.newBizDate.split('-')[2]+'日</span>开业。');
                            }
                        }
                    }
                    
                    if(data.oldContractTerm != null) {
                        $('#oldUnitName').text(data.oldContractTerm.unitName);
                        $('#oldFreeDays').text(data.oldContractTerm.freeDays || 0);
                        $('#oldGrowthRate').text(Math.round(data.oldContractTerm.growthRate * 100) + '%' || '0%');
                        $('#oldBrandName').text(data.oldContractTerm.brandName);
                        $('#oldArea').html(data.oldContractTerm.area+'m<sup>2</sup>');
                        $('#oldBizTypeName').text(data.oldContractTerm.bizScope);
                        if(data.oldContractTerm.startDate != null && data.oldContractTerm.endDate != null){
                            $('#oldDuration').text(data.oldContractTerm.startDate + '-' + data.oldContractTerm.endDate);
                        }
                        $('#oldFixedRentTaxAmount').text(accounting.formatNumber(data.oldContractTerm.taxAmount));
                        $('#oldFixedRentAmount').text(accounting.formatNumber(data.oldContractTerm.amount));
                        $('#oldRentalFloorEffect').text(accounting.formatNumber(data.oldContractTerm.rentAmount));
                        $('#oldRentalFloorTaxEffect').text(accounting.formatNumber(data.oldContractTerm.taxRentAmount));
                        $('#oldCostEffect').text(accounting.formatNumber(data.oldContractTerm.budgetRentAmount));
                        $('#oldPropertyMgmtTaxAmount').text(accounting.formatNumber(data.oldContractTerm.taxPropertyFee));
                        $('#oldPropertyMgmtAmount').text(accounting.formatNumber(data.oldContractTerm.propertyFee));
                        $('#oldDepositFee').text(accounting.formatNumber(data.oldContractTerm.deposit));
                        $('#oldTotalAmount').text(accounting.formatNumber(data.oldContractTerm.totalRent));
                        $('#oldTotalTaxAmount').text(accounting.formatNumber(data.oldContractTerm.taxTotalRent));
                    } else if(data.oldContractInfo != null) {
                        $('#oldUnitName').html(data.oldContractInfo.unitName+' <span class="label label-info">系</span>');
                        $('#oldFreeDays').html(data.oldContractInfo.freeDays != null ? data.oldContractInfo.freeDays+' <span class="label label-info">系</span>' : 0);
                        if(data.formType == 'termination'){
                            $('#oldGrowthRate').text('/');
                        } else {
                            $('#oldGrowthRate').html(data.oldContractInfo.growthRate * 100 + '%'+' <span class="label label-info">系</span>' || '0%');
                        }
                        $('#oldBrandName').html(data.oldContractInfo.brandName+' <span class="label label-info">系</span>');
                        $('#oldArea').html(data.oldContractInfo.area+'m<sup>2</sup>'+' <span class="label label-info">系</span>');
                        $('#oldBizTypeName').html(data.oldContractInfo.bizTypeName+' <span class="label label-info">系</span>');
                        $('#oldDuration').html(data.oldContractInfo.startDate + '-' + data.oldContractInfo.endDate+' <span class="label label-info">系</span>');

                        var oldRentalFloorEffect, oldRentalFloorTaxEffect;
                        var oldTotalAmount = 0;
                        var oldTotalTaxAmount = 0;
                        
                        if(data.oldContractInfo.fixedRentList.length > 0){
                            var ln = data.oldContractInfo.fixedRentList.length - 1;
                            if(data.formType == 'termination'){
                                ln = fixedRentListIndex;
                            }
                            $('#oldFixedRentTaxAmount').html(accounting.formatNumber(data.oldContractInfo.fixedRentList[ln].taxAmount)+' <span class="label label-info">系</span>');
                            $('#oldFixedRentAmount').html(accounting.formatNumber(data.oldContractInfo.fixedRentList[ln].amount)+' <span class="label label-info">系</span>');
                            oldRentalFloorEffect = data.oldContractInfo.fixedRentList[ln].rentAmount;
                            oldRentalFloorTaxEffect = data.oldContractInfo.fixedRentList[ln].taxRentAmount;
                            $('#oldRentalFloorEffect').html(oldRentalFloorEffect+' <span class="label label-info">系</span>');
                            $('#oldRentalFloorTaxEffect').html(oldRentalFloorTaxEffect+' <span class="label label-info">系</span>');
                            oldTotalAmount += data.oldContractInfo.fixedRentList[ln].amount;
                            oldTotalTaxAmount += data.oldContractInfo.fixedRentList[ln].taxAmount;
                        }
                        
                        $('#oldCostEffect').text('/');

                        if(data.oldContractInfo.propertyFeeList.length > 0){
                            var ln = data.oldContractInfo.propertyFeeList.length - 1;
                            if(data.formType == 'termination'){
                                ln = propertyFeeListIndex;
                            }
                            $('#oldPropertyMgmtTaxAmount').html(accounting.formatNumber(data.oldContractInfo.propertyFeeList[ln].taxAmount)+' <span class="label label-info">系</span>');
                            $('#oldPropertyMgmtAmount').html(accounting.formatNumber(data.oldContractInfo.propertyFeeList[ln].amount)+' <span class="label label-info">系</span>');
                            oldTotalAmount += data.oldContractInfo.propertyFeeList[ln].amount;
                            oldTotalTaxAmount += data.oldContractInfo.propertyFeeList[ln].taxAmount;
                        }

                        if(data.oldContractInfo.promotionFeeList.length > 0){
                            var ln = data.oldContractInfo.promotionFeeList.length - 1;
                            if(data.formType == 'termination'){
                                ln = promotionFeeListIndex;
                            }
                            oldTotalAmount += data.oldContractInfo.promotionFeeList[ln].amount;
                            oldTotalTaxAmount += data.oldContractInfo.promotionFeeList[ln].taxAmount;
                        }

                        var oldDepositFee = 0;
                        if(data.oldContractInfo.depositList.length > 0){
                            for(var i=0; i < data.oldContractInfo.depositList.length; i++){
                                oldDepositFee += data.oldContractInfo.depositList[i].amount;
                            }
                        }
                        $('#oldDepositFee').html(accounting.formatNumber(oldDepositFee)+' <span class="label label-info">系</span>');

                        $('#oldTotalAmount').html(accounting.formatNumber(oldTotalAmount)+' <span class="label label-info">系</span>');
                        $('#oldTotalTaxAmount').html(accounting.formatNumber(oldTotalTaxAmount)+' <span class="label label-info">系</span>');
                    }
                
                    if(data.coFileList.length > 0){
                        $.each(data.coFileList, function(i,v) {
                            if(v.bizType != null){
                                var bizType = 'CONTRACT';
                                if(v.bizType != bizType){
                                    bizType = v.bizType.split('_')[1];
                                }
                                
                                if($.inArray(bizType, ['BL','IC','TM','BA','OF']) != -1){
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
                                            $('#fileList').append('<tr>\n\
                                        <td>'+type+'</td>\n\
                                        <td><a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">'+v.fileName+'</a></td>\n\
                                        <td>'+fileSize+'</td>\n\
                                        </tr>');

                                    }
                                }
                            }
                        })
                    }
                    
                    if(data.processApproveList.length > 0) {
                        $('#submitter').addClass('active').find('.approveName').text(data.approvalName);
                        $.each(data.processApproveList, function(i,v) {
                            switch (v.activityName) {
                                case "财务负责人":
                                    $('#finance_check').addClass('active').find('.approveName').text(v.approveName);
                                    break;
                                case "业态负责人":
                                    $('#biz_head').addClass('active').find('.approveName').text(v.approveName);
                                    break;
                                case "法务负责人":
                                    $('#legal_check').addClass('active').find('.approveName').text(v.approveName);
                                    break;
                                case "财务预审":
                                    $('#finance_pre_check').addClass('active').find('.approveName').text(v.approveName);
                                    break;
                                case "法务预审":
                                    $('#legal_pre_check').addClass('active').find('.approveName').text(v.approveName);
                                    break;
                                case "Lotus招商负责人":
                                    $('#Lotus_leasing_head').addClass('active').find('.approveName').text(v.approveName);
                                    break;
                                case "商业首席执行官":
                                    $('#hq_leasing_head').addClass('active').find('.approveName').text(v.approveName);
                                    break;
                                default:
                                    break;
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

function updateDictByDictTypeCode(dictTypeCode, id, val) {
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
                    $.each(response.data.dictDataList, function(i,v) {
                        if(v.dictCode == val){
                            $('#'+id).text(v.dictName).attr('title',v.dictName);
                            return false;
                        }
                    })
                }
            }                             
        }
    })
}

function findRentCalculationMode(dictTypeCode, val) {
    var dictName = '';
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
                    $.each(response.data.dictDataList, function(i,v) {
                        if(v.dictCode == val){
                            dictName = v.dictName;
                            return false;
                        }
                    })
                }
            }
        }
    })
    return dictName;
}

function findProcessInstByBizId(){
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/findAllByBizId?bizId="+getURLBizId(),
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
                        var index = 0;
                        
                        var openId = 'admin';
                        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                            if(v.roleCode == 'CROLE220301000001'){
                                openId = v.moduleName;
                                return false;
                            }
                        })
                        $.each(response.data.processStepRecordList, function(i,v) {
                            if(i != 0 && v.activityType != 'END'){
                                index++;
                                $('#approvalProcess').append('<tr><td>'+index+'</td>\n\
                                <td>'+v.activityName+'</td>\n\
                                <td>'+v.approveName+'</td>\n\
                                <td>'+renderFlowStatus(v.status)+'</td>\n\
                                <td>'+(v.opinion || '')+'</td>\n\
                                <td>'+(v.handleTime || '')+'</td></tr>');
                                
                                if(v.handler == openId && v.status == 'DOING'){
                                    $.curProcess = 1;
                                }
                            }
                        })
                        $('#investmentContractApprovalProcess').show();
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                            
        }
    }); 
}

function renderFlowStatus(s) {
    var step = '';
    if(sessionStorage.getItem("FLOW_STEPS") && sessionStorage.getItem("FLOW_STEPS") != null && sessionStorage.getItem("FLOW_STEPS") != '') {
        var step = $.parseJSON(sessionStorage.getItem("FLOW_STEPS"));
        $.each(step, function(i,v){
            if(v.dictCode == s){
                step = v.dictName;
            }
        })
    }
    return step;
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
                
                if(response.data != null){
                    if(response.data.success == true){
                        window.location.href = "/id/"+getURLBizId().toLowerCase()+"/lotus-approval-opinion?s=succeed";
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
            window.location.href = 'create-dict-type?s=create-dict-type-fail';
        }
    });
}