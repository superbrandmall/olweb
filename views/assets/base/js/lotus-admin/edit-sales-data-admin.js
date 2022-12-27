$.sales = {
    approveFlag: 0,
    yearMonth: '',
    contractNo: ''
}    

$(document).ready(function(){
    findInfoByContractNo(getURLParameter('id'));
});

function findInfoByContractNo(id) {
    if(id && id != ''){
        $.sales.yearMonth = id.substring(0,6);
        $.sales.contractNo = id.substring(6);
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByContractNo?contractNo="+$.sales.contractNo,
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
                
                if(response.data.length > 0){
                    var item = response.data[0];
                    $('#department').text(item.mallName);
                    $('#selectContract').text(item.tenantName + '[' + item.contractNo + '] | ' + (item.contractName || '') + ' | ' + item.unitName + ' | ' + item.startDate + '～' + item.endDate);
                    $('#yearMonth').text($.sales.yearMonth);
                    
                    findMonthlySales($.sales.contractNo,'A01',$.sales.yearMonth);
                }
            }
        }
    })
}

function findMonthlySales(cn,cg,ym) {
    $('#salesEntries').html();
    
    $.ajax({
        url: $.api.baseLotus+"/api/sales/lotus/findAllByContractNoAndCategoryAndYyyymm?contractNo="+cn+"&category="+cg+"&yyyymm="+ym,
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
                
                if(response.data.length > 0){
                    $.sales.approveFlag = response.data[0].approveFlag;
                    if($.sales.approveFlag == 1){
                        $('#submitForm').hide();
                        $('#status').text('已审核');
                    } else {
                        $('#status').removeClass('badge-success').addClass('badge-danger').text('未审核');
                    }
                    
                    
                    $.each(response.data, function(i,v) {
                        $('#salesEntries').append('<tr id="entry_'+(i+1)+'" data-id="'+v.id+'">\n\
                            <td>'+(i+1)+'</td>\n\
                            <td><input class="form-control" type="text" value="'+v.salesDate+'" readonly></td>\n\
                            <td><input class="form-control" type="text" value="默认商品[A01]" readonly></td>\n\
                            <td><input class="form-control" type="number" min="0" value="'+v.saleNum+'"></td>\n\
                            <td>\n\
                                <div class="input-group">\n\
                                    <input class="form-control money" value="'+accounting.formatNumber(v.amount)+'" type="text">\n\
                                    <span class="input-group-addon">元</span>\n\
                                </div>\n\
                            </td>\n\
                            <td><input class="form-control" type="text" value="'+(v.remark || '')+'" maxlength="200"></td>\n\
                        </tr>');
                    })
                    
                    updateTotalNum('s');
                    updateTotalNum('a');
                    
                    $('input.money').on('focus',function(){
                        $(this).val(accounting.unformat($(this).val()));
                        $(this).css({
                            'backgroundColor': '#fff',
                            'boxShadow': 'inset 6px 6px 2px -6px #000'
                        });
                        $(this).select();
                    });

                    $('input.money').on('blur',function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                        $(this).css({
                            'backgroundColor': 'transparent',
                            'boxShadow': 'none'
                        });
                    });

                    $('#salesEntries tr').find('td:eq(3)').find('input').each(function(i,e){
                        $(this).on('keyup change', function () {
                            let val = $(this).val();
                            //输入大于0的数字时候自动清空前面的0
                            if (val[0] == 0) {
                                val = val.substr(1) || 0;
                            }
                            $(this).val(val);

                            updateTotalNum('s');
                        });
                    })

                    $('#salesEntries tr').find('td:eq(4)').find('input').each(function(i,e){
                        $(this).on('keyup', function () {
                            updateTotalNum('a');
                        });
                    })

                    $("#submitForm").click(function(e){
                        e.preventDefault();
                        if($.sales.approveFlag != '1') {
                            saveSales();
                        }
                    })
                }
            }
        }
    })
}

function updateTotalNum(key){
    switch (key) {
        case "s":
            var saleNum = 0;
            $('#salesEntries tr').find('td:eq(3)').find('input').each(function () {
                var v = parseInt($(this).val());
                if (!isNaN(v)) {
                    saleNum += v;
                }
            })
            $('#totalSaleNum').text(numberWithCommas(saleNum));
            break;
        case "a":
            var amount = 0;
            $('#salesEntries tr').find('td:eq(4)').find('input').each(function () {
                var v = parseFloat(numberWithoutCommas($(this).val()));
                if (!isNaN(v)) {
                    amount += v;
                }
            })
            $('#totalAmount').text(accounting.formatNumber(amount));
            break;
        default:
            break;
    } 
}

function saveSales() {
    var msg = '确定要将此内容提交保存吗？';
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var openId = 'admin';
        var userCode = '';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                userCode = v.userCode;
                return false;
            }
        })

        var salesList = [];
        var sales = {};
       
        for(var i = 1; i<=$('#salesEntries tr').length; i++){
            sales = {
                "amount": numberWithoutCommas($('#entry_'+i).find('td:eq(4)').find('input').val()),
                "approveFlag": 0,
                "category": "A01",
                "id": $('#entry_'+i).attr('data-id'),
                "remark": $('#entry_'+i).find('td:eq(5)').find('input').val() || '',
                "saleNum": $('#entry_'+i).find('td:eq(3)').find('input').val(),
                "salesDate": $('#entry_'+i).find('td:eq(1)').find('input').val(),
                "updateOpenId": openId,
                "userCode": userCode,
                "yyyymm": $.sales.yearMonth
            }
            salesList.push(sales);
        }

        var map = {
            "approveFlag": 0,
            "category": "A01",
            "contractNo": $.sales.contractNo,
            "salesList": salesList,
            "updateOpenId": openId,
            "yyyymm": $.sales.yearMonth
        }

        $.ajax({
            url: $.api.baseLotus+"/api/sales/lotus/saveOrUpdates",
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

                    window.location.href = '/lotus-admin/sales-data-entries?s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    })
}