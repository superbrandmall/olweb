$(document).ready(function(){
    GetBidInfo();    
});

function GetBidInfo(){
    var map = {
        bid : {
            code: getURLParameter('id')
        }
    };
    $.ajax({
        url: $.api.base+"/bid/findByCode",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var bid = response.data.bid;
                
                var processState;
                switch(bid.processState){
                    case 1:
                        processState = "已保存";
                        break;
                    case 2:
                        processState = "预览合同生成";
                        break;
                    case 3:
                        processState = "预览合同生成失败";
                        break;
                    case 4:
                        processState = "等待提交至海鼎";
                        break;
                    case 5:
                        processState = "提交成功";
                        break;
                    case 6:
                        processState = "提交失败";
                        break;
                    case 7:
                        processState = "暂不提交至海鼎";
                        break;
                    case 9:
                        processState = "审批结束";
                        break;
                    default:
                        processState = "已保存";
                        break;
                }
                        
                var isApprove;
                switch(bid.isApprove){
                    case 0:
                        isApprove = "未审核";
                        break;
                    case 1:
                        isApprove = "已审核";
                        break;
                    default:
                        isApprove = "未审核";
                        break;
                }

                var isEffect;
                switch(bid.isEffect){
                    case 0:
                        isEffect = "未生效";
                        break;
                    case 1:
                        isEffect = "已生效";
                        break;
                    default:
                        isEffect = "未生效";
                        break;
                }
                
                $('#code').val(bid.code || '-');
                $('#mall_name').val(bid.mallName || '-');
                $('#unit').val(bid.unit || '-');
                $('#merchant_name').val(bid.merchantName || '-');
                $('#brand_name').val(bid.brandName);
                $('#is_approve').val(isApprove);
                $('#is_effect').val(isEffect);
                $('#bill_no').val(bid.billNumber || '-');
                $('#building_name').val(bid.buildingName || '-');
                $('#business_hours').val(bid.businessHours || '-');
                $('#business_suggest').html(bid.businessSuggest || '-');
                $('#cashier_mode').val(bid.cashierMode || '-');
                $('#compare_frequency').val(bid.compareFrequency || '-');
                $('#contract_length').val(bid.contractLength || '-');
                $('#end_date').val(bid.endDate.split(' ')[0] || '-');
                $('#gurantee').val(bid.gurantee || '-');
                $('#free_days').val(bid.freeDays || '-');
                $('#floor_name').val(bid.floorName || '-');
                $('#expire_date').val(bid.expireDate.split(' ')[0] || '-');
                $('#is_standard').val(bid.isStandard || '-');
                $('#lease_type').val(bid.leaseType);
                $('#legal_suggest').html(bid.legalSuggest || '-');
                $('#maintenance_after_decoration').val(bid.maintenanceAfterDecoration || '-');
                $('#promotion').val(bid.promotion || '-');
                $('#process_state').val(processState);
                $('#opening').val(bid.opening.split(' ')[0] || '-');
                $('#maintenance_during_decoration').val(bid.maintenanceDuringDecoration || '-');
                $('#promotion_budget').val(bid.promotionBudget || '-');
                $('#promotion_kind').val(bid.promotionKind);
                $('#public_deposit').val(bid.publicDeposit || '-');
                $('#rent_method').val(bid.rentMethod || '-');
                $('#start_date').val(bid.startDate.split(' ')[0] || '-');
                $('#target').val(bid.target);
                
                $('#pdf').attr('href',response.data.contract.pdf || '#');
                $('#pdf_temp').attr('href',response.data.contract.pdfTemp || '#');
                $('#deposit_bill_pdf').attr('href',response.data.contract.depositBillPdf || '#');
                
                if(response.data.details && response.data.details != '') {
                    $.each(response.data.details, function(i,v){
                        $('#bid_details tbody').append('<tr><td>'+v.startDate.split(' ')[0]+'</td><td>'+v.endDate.split(' ')[0]+'</td><td>'+v.deadRent+'元</td><td>'+v.floatingRentalRate+'%</td></tr>');
                    });
                } else {
                    $('#bid_details tbody').append('<tr><td colspan="4">暂无出价明细!</td></tr>');
                }
            } 
        }
    });
}