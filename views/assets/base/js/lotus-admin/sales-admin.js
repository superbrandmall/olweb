$(document).ready(function(){
    //开始时间：  
    $('#startDate').datepicker({  
        todayBtn : "linked",  
        autoclose : true,  
        todayHighlight : true,
        format: "yyyy-mm-dd",
        endDate : new Date()  
    }).on('changeDate',function(e){  
        var startTime = e.date;  
        $('#endDate').datepicker('setStartDate',startTime);  
    });
    
    //结束时间：  
    $('#endDate').datepicker({  
        todayBtn : "linked",  
        autoclose : true,  
        todayHighlight : true,
        format: "yyyy-mm-dd",
        endDate : new Date()  
    }).on('changeDate',function(e){  
        var endTime = e.date;  
        $('#startDate').datepicker('setEndDate',endTime);
    })
    
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.code == 'CROLE211008000001' && v.moduleName == '门店对接人') {
            $('#department option').each(function(i,elem){
                if($(elem).val() != v.moduleCode){
                    $(this).remove();
                }
            })
        }
    })
    
    if($('#department').val() != ''){
        findAllContracts($('#department').val());
        $('#contract').parent().parent().show();
    }
    
    $('#department').change(function() {
        if($(this).val() != ''){
            findAllContracts($(this).val());
            $('#contract').parent().parent().show();
        } else {
             $('#contract').parent().parent().hide();
        }
    })
    
    if($.cookie('sales_department') != null) {
        $('#department').val($.cookie('sales_department'));
    };
    
    if($.cookie('sales_contract') != null) {
        $('#contract').val($.cookie('sales_contract'));
    };
    
    if($.cookie('sales_startDate') != null) {
        $('#startDate').val($.cookie('sales_startDate'));
    };
    
    if($.cookie('sales_endDate') != null) {
        $('#endDate').val($.cookie('sales_endDate'));
    };
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    
    $("#condition_form").validate({
        rules: {
            department: {
                required: true,
            },
            contract: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            }
        },
        messages: {
            department: {
                required: "请选择门店"
            },
            contract: {
                required: "请选择品牌"
            },
            startDate: {
                required: "请选择开始时间"
            },
            endDate: {
                required: "请选择结束时间"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            findSaleRecordByDate(1,items);
        }
    });
    
    
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findSaleRecordByDate(getURLParameter('page'),items);
    } else {
        findSaleRecordByDate(1,items);
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
            $('.page-size').text('10');
            break;
    }
})

function findSaleRecordByDate(p,c) {
    $.cookie('sales_department', $('#department').val());
    $.cookie('sales_contract', $('#contract').val());
    $.cookie('sales_startDate', $('#startDate').val());
    $.cookie('sales_endDate', $('#endDate').val());
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/sales/lotus/findSaleRecodeByDate?contractNo="+$.cookie('sales_contract')+"&startDate="+$.cookie('sales_startDate')+"&endDate="+$.cookie('sales_endDate')+"&page="+(p-1)+"&size="+c+"&sort=id,desc",
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

                $('#salesL,#salesS,.pagination .pagination, .pagination-info').html('');
                if(response.data.content.length > 0){
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    $.each(response.data.content, function(i,v) {
                        var contract_name = '';
                        $.each($.parseJSON(sessionStorage.getItem("contracts_"+$.cookie('sales_department'))), function(j,w){
                            if(w.code == v.contractNo) {
                                contract_name = w.contractName;
                            }
                        })
                        
                        
                        
                        
                        $('#salesL').append('<tr><td>'+v.salesDate+'</td><td>'+contract_name+'</td><td>'+numberWithCommas(v.amount)+'元</td><td>'+numberWithCommas(v.saleNum)+'笔</td></tr>');
                        $('#salesS').append('\
<tr data-index="'+i+'">\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">日期</span><span class="value">'+v.salesDate+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">品牌</span><span class="value">'+contract_name+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">金额</span><span class="value">'+numberWithCommas(v.amount)+'元</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">笔数</span><span class="value">'+numberWithCommas(v.saleNum)+'笔</span></div></div>\n\
</td></tr>');
                    })
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#salesL').append('<tr><td colspan="3" style="text-align: center;">没有查到相关记录！</td></tr>');
                    $('#salesS').append('<tr><td style="text-align: center;">没有查到相关记录！</td></tr>');
                }
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function findAllContracts(mc) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/user/contract/lotus/findAllByMallCode?mallCode="+mc+"&size=100",
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
                
                sessionStorage.setItem("contracts_"+mc, JSON.stringify(response.data.content));
                
                $('#contract').html('');
                $('#contract').append('<option value="">未选择</option>');
                $.each(response.data.content, function(i,v) {
                    if(v.contractStatus == '已签约'){
                        $('#contract').append('<option value="'+v.contractCode+'">'+v.contractName+'('+v.vshopLotus.unitName+')</option>');
                    }
                })
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    
}