$(document).ready(function(){
    findContractHistoryByKVCondition(1,100);
    
    $("#contracts input[type='checkbox']").change(function(){
        var ckd = $("#contracts input[type='checkbox']:checked").length;
        if(ckd < 2){
            $('#compare').attr('disabled', 'disabled');
            $("#contracts input[type='checkbox']").not(':checked').removeAttr('disabled');
        } else if(ckd == 2){
            $('#compare').removeAttr('disabled');
            $("#contracts input[type='checkbox']").not(':checked').attr('disabled', 'disabled');
            
            var vers = [];
            $("#contracts input[type='checkbox']:checked").each(function() {
                vers.push($(this).val());
            })
            
            $('#compare').click(function(){
                window.open('/lotus-admin/contract-compare?id='+getURLParameter('id')+'&versionA='+vers[0]+'&versionB='+vers[1]);
            })
        } else {
            $('#compare').attr('disabled', 'disabled');
            $("#contracts input[type='checkbox']").not(':checked').attr('disabled', 'disabled');
        }
    })
    
});

function findContractHistoryByKVCondition(p,c){
    $('#contracts').html('');
    var params = [];
    var param = {};
    
    param = {
        "columnName": "contractName",
        "columnPatten": "",
        "conditionOperator": "",
        "operator": "!=",
        "value": 'KOW'
    }
    params.push(param);
    
    param = {
        "columnName": "contractNo",
        "columnPatten": "",
        "operator": "AND",
        "value": getURLParameter('id')
    }
    params.push(param);
        
    var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/user/contract/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                
                if(response.data.content.length > 0) {
                    var contractStatus, contractName, contractVersion;
                    $.each(response.data.content, function(i,v){
                        var modality = '';
                        if(v.brandLotus != null){
                            modality = v.brandLotus.modality3;
                            
                            if(v.brandLotus.modality4 != null){
                                modality += modality + '（' + v.brandLotus.modality4 + '）';
                            }
                        }
                        
                        if(v.contractVersion == getURLParameter('contractVersion')){
                            contractStatus = updateDictByDictTypeCode('CONTRACT_STATUS','contractStatus',v.contractStatus);
                            contractName = v.contractName;
                            contractVersion = v.contractVersion;
                        }
                        
                        $('#contracts').append('\
                            <tr data-index="'+i+'">\n\
                            <td><input type="checkbox" name="contract" id="contract_'+v.contractVersion+'" value="'+v.contractVersion+'" style="vertical-align: middle;"></td>\n\
                            <td><a href="/lotus-admin/contract-summary?id='+v.contractNo+'&contractVersion='+v.contractVersion+'">'+(v.bizId || v.code)+'</a></td>\n\
                            <td>'+v.contractVersion+'</td>\n\
                            <td>'+(v.vshopLotus != null ? renderUnitType(v.vshopLotus.unitType) : '')+'</td>\n\
                            <td>'+modality+'</td>\n\
                            <td>'+(v.tenantName+'['+v.tenantNo+']' || '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                            <td>'+v.contractNo+'</td>\n\
                            <td>'+(renderContractStatus(v.contractStatus) || '')+'</td>\n\
                            <td>'+(v.mallName+'['+v.mallCode+']' || '')+'</td>\n\
                            <td>'+(v.vshopLotus != null ? v.vshopLotus.unitName+'['+v.vshopLotus.unitCode+']' : '')+'</td>\n\
                            <td>'+(v.unitArea || '')+'㎡</td>\n\
                            <td>'+(v.vshopLotus != null ? v.vshopLotus.floorName : '')+'</td>\n\
                            <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                            <td>'+(renderRentCalculationMode(v.rentCalculationMode) || '')+'</td>\n\
                        </tr>');
                    });
                    
                    $('#contractName').text(contractName);
                    $('#contractVersion').text(contractVersion);
                } else {
                    $('#contracts').html('<tr><td colspan="15" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}