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
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineUrl() );
        },1000);
    }

    var auth = 0;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.moduleCode == 'IT_ADMIN' || v.moduleCode == 'LOTUS_FINANCIAL'){
            auth = 1;
            return false;
        }
    })

    if(auth == 0){
        alertMsg('9999','没有访问授权，请联系系统管理员。');
        return false;
    }
    
    if($.cookie('feeItemTermType') && $.cookie('feeItemTermType') != ''){
        $('#termType').val($.cookie('feeItemTermType')).trigger('change');   
    }
    
    if($.cookie('feeItemTransactionType') != ''){
        $('#transactionType').val($.cookie('transactionType')).trigger('change');
    }
    
    if($.cookie('feeItemIsTaxFlag') != ''){
        $('#isTaxFlag').val($.cookie('isTaxFlag')).trigger('change');
    }
    
    findConfigs();
    
    $('#termType, #transactionType, #isTaxFlag').show();
    
    $('#clear').click(function(){
        $.cookie('feeItemTermType','');
        $.cookie('feeItemTransactionType', '');
        $.cookie('feeItemIsTaxFlag', '');
        
        $('#termType, #transactionType, #isTaxFlag').val('').trigger('change');
    })
    
    $('#search').click(function(){
        $.cookie('feeItemTermType', $('#termType').val());
        $.cookie('feeItemTransactionType', $('#transactionType').val());
        $.cookie('feeItemIsTaxFlag', $('#isTaxFlag').val());
        findConfigs();
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findConfigs() {       
    $.ajax({
        url: $.api.baseSap+"/api/gl/config/findAll",
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
                
                $('#item').html('');
                if(response.data != null && response.data.length > 0){
                    sessionStorage.setItem("feeItem", JSON.stringify(response.data) );
                    var feeItems = [],transactionType = '',isTaxFlag = '';
                    if($.cookie('feeItemTermType') && $.cookie('feeItemTermType') != ''){
                        feeItems = $.cookie('feeItemTermType').split(',');
                        $.each(feeItems, function(i,v){
                            feeItems.push(v)
                        })
                    }
                    
                    if($.cookie('feeItemTransactionType') && $.cookie('feeItemTransactionType') != ''){
                        transactionType = $.cookie('feeItemTransactionType');
                    }
                    
                    if($.cookie('feeItemIsTaxFlag') && $.cookie('feeItemIsTaxFlag') != ''){
                        isTaxFlag = $.cookie('feeItemIsTaxFlag');
                    }
                        
                    $.each(response.data, function(i,v) {
                        if((feeItems.length <= 0 || isInArray(feeItems, v.itemCode) == 1) && (transactionType == '' || v.transactionType == transactionType) && (isTaxFlag == '' || v.isTaxFlag == isTaxFlag)){
                            var tbg = '#fff';
                            if(i%2==0){
                                tbg = '#f9f9f9';
                            }

                            var checked = '';
                            if(v.isTaxFlag == 1){
                                checked = ' checked=""';
                            }

                            $('#item').append('<tr>\n\
                                <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><a href=\'javascript:void(0);\' onclick=\'javascript: getFeeItemDetail("'+v.id+'")\'>'+v.itemName+'['+v.itemCode+']</a></td>\n\
                                <td>'+v.debitItemName+'['+v.debitItemCode+']</td>\n\
                                <td>'+v.creditItemName+'['+v.creditItemCode+']</td>\n\
                                <td>'+(v.creditTaxItemName != null ? v.creditTaxItemName+'['+v.creditTaxItemCode+']' : '--')+'</td>\n\
                                <td>'+(v.transactionType || '--')+'</td>\n\
                                <td><input class="configIsTaxFlag" type="checkbox"'+checked+' disabled></td>\n\
                                <td>'+v.created+'['+(v.creatorOpenId != null ? renderUserName(v.creatorOpenId) : 'admin')+']</td>\n\
                                <td>'+v.updated+'['+(v.updateOpenId != null ? renderUserName(v.updateOpenId) : 'admin')+']</td>\n\
                            </tr>');
                        }
                    })
                } else {
                    $('#item').html('<tr><td colspan="8" style="text-align: center;">没有找到任何记录！</td></tr>');
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

function getFeeItemDetail(id){
    $('.mandatory-error').remove();
    $('#investment-fee-item-create').modal('toggle');
    var feeItem = $.parseJSON(sessionStorage.getItem("feeItem"));
    $("input[id*='modal']").val('');
    $('#modalIsTaxFlag').prop('checked', false);
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
        
    $.each(feeItem, function(i,v){
        if(v.id == id){
            $('#itemUpdated').text('最近更新：  '+v.updated+'['+(v.updateOpenId != null ? renderUserName(v.updateOpenId) : 'admin')+']');
            $('#modalItemCode').val(v.itemCode);
            $('#modalItemName').val(v.itemName);
            $('#modalDebitItemCode').val(v.debitItemCode);
            $('#modalDebitItemName').val(v.debitItemName);
            $('#modalCreditItemCode').val(v.creditItemCode);
            $('#modalCreditItemName').val(v.creditItemName);
            $('#modalCreditTaxItemCode').val(v.creditTaxItemCode);
            $('#modalCreditTaxItemName').val(v.creditTaxItemName);
            $('#modalTransactionType').val(v.transactionType);
            if(v.isTaxFlag == 1) {
                $('#modalIsTaxFlag').prop('checked', true);
            }
            
            $('#saveItem').click(function(){
                saveCheck(JSON.stringify(v));
            })
            
            return false;
        }
    })
}

function isInArray(arr,val){
    var str = ","+arr.join(",")+",";
    var res;
    if(str.indexOf(","+val+",") != "-1") {
        res = 1;
    } else {
        res = 2;
  }
  return res;
}

function saveCheck(v) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    $("input.mandatory").each(function(j,e){
        if($(this).val() == '') {
            flag = 0;
            $(this).parent().append(error);
        }
    })
    
    if(flag == 1 && $('.mandatory-error').length == 0){
       editFeeItem(v);
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function editFeeItem(v) {
    var msg = '确定要修改该科目吗？';
    
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var map = JSON.parse(v);
        map.creditItemCode = $('#modalCreditItemCode').val();
        map.creditItemName = $('#modalCreditItemName').val();
        map.creditTaxItemCode = $('#modalCreditTaxItemCode').val();
        map.creditTaxItemName = $('#modalCreditTaxItemName').val();
        map.debitItemCode = $('#modalDebitItemCode').val();
        map.debitItemName = $('#modalgDebitItemName').val();
        if($('#modalIsTaxFlag').prop('checked') == true){
            map.isTaxFlag = 1;
        } else {
            map.isTaxFlag = 0;
        }
        map.itemCode = $('#modalgItemCode').val();
        map.itemName = $('#modalItemName').val();
        map.transactionType = $('#modalTransactionType').val();
        map.updateOpenId = openId;
        
        if(map.itemCode != '' && map.itemName != '' && map.debitItemCode != '' && map.debitItemName != '' && map.creditItemCode != '' && map.creditItemName != ''){
            $.ajax({
                url: $.api.baseSap+"/api/gl/config/saveOrUpdate",
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

                        caching();
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }
    })
}

function caching() {
    var url = $.api.baseSap+"/api/gl/config/refresh";
    $.ajax({
        url: url,
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
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                window.location.href = '/lotus-admin/fee-item?&s=succeed';
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });    
}