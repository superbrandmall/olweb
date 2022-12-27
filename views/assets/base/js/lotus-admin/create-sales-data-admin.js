$.dates = 0;

$(document).ready(function(){
    $('#department option').each(function(j, elem){
        $.each(JSON.parse($.cookie('userModules')), function(i, v) {
            if(v.roleCode == 'CROLE211008000001' && v.moduleName == '门店对接人') {
                if($(elem).val() == v.moduleCode){
                    $('#department option:eq('+j+')').addClass('no-remove');
                }
            } else if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL') {
                $('#department option:eq('+j+')').addClass('no-remove');
            }
        })
    })
    
    updateSelectContractDropDown(50);
    
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
    
    $('#yearMonth').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    }).on('changeMonth', function(e) {
        var date_ = e.date;
        var year_str = date_.getFullYear();
        var month_str = date_.getMonth()+1;
        if(month_str < 10){
            month_str = '0'+month_str;
        }
        $.dates = getMonthLength(year_str,month_str,0)
        
        $('#salesEntries tr').find('td:eq(1)').find('input').val('');
        $('#salesEntries tr').find('td:eq(2)').find('input').val('');
        
        $('#totalSaleNum, #totalAmount').text('');
        
        for(var i = 1; i<=$.dates; i++){
            var d = i;
            if(d<10){
                d='0'+d;
            }
            $('#entry_'+i).find('td:eq(1)').find('input').val(year_str+'-'+month_str+'-'+d);
            $('#entry_'+i).find('td:eq(2)').find('input').val('默认商品[A01]');
        }
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
    
    $("#create-form").validate({
        rules: {
            department: {
                required: true
            },
            selectContract: {
                required: true
            },
            yearMonth: {
                required: true
            }
        },
        messages: {
            department: {
                required: "请选择项目"
            },
            selectContract: {
                required: "请选择合同"
            },
            yearMonth: {
                required: "请选择销售年月"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveSales();
        }
    });
});

function getMonthLength(year,month,day) {
    return new Date(year, month, day).getDate();
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
        for(var i = 1; i<=$.dates; i++){
            sales = {
                "amount": numberWithoutCommas($('#entry_'+i).find('td:eq(4)').find('input').val()),
                "approveFlag": 0,
                "category": "A01",
                "creatorOpenId": openId,
                "remark": $('#entry_'+i).find('td:eq(5)').find('input').val() || '',
                "saleNum": $('#entry_'+i).find('td:eq(3)').find('input').val(),
                "salesDate": $('#entry_'+i).find('td:eq(1)').find('input').val(),
                "updateOpenId": openId,
                "userCode": userCode,
                "yyyymm": $('#yearMonth').val().split('-')[0]+$('#yearMonth').val().split('-')[1]
            }
            salesList.push(sales);
        }

        var map = {
            "approveFlag": 0,
            "category": "A01",
            "contractNo": $('#selectContract').val(),
            "salesList": salesList,
            "updateOpenId": openId,
            "yyyymm": $('#yearMonth').val().split('-')[0]+$('#yearMonth').val().split('-')[1]
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