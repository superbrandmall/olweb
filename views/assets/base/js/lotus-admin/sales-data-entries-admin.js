$(document).ready(function(){
    if($.cookie('searchCode') != ''){
        $('#code').val($.cookie('searchCode'));
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findSaleRecordByDate(getURLParameter('page'),items);
    } else {
        findSaleRecordByDate(1,items);
    }
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true
    });
    
    updateSalesContractDropDown(10);

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
            $('.page-size').text('20');
            break;
    }
    
    $('#clear').click(function(){
        $('#code').val('');
        $.cookie('searchCode', '');
    })
    
    $('#search').click(function(){
        $.cookie('searchCode', $('#code').val());
        findSaleRecordByDate(1,items);
    })
});

function updateSalesContractDropDown(data_count) {    
    $('#contract').select2({
        placeholder: '输入合同编号',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: function (params) {
                return $.api.baseLotus+"/api/contract/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=contractNo,asc";
            },
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json",
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {
                var map = {
                    key: params.term,
                    operator: "OR",
                    params: [
                      "mallCode","tenantName","contractNo"
                    ],
                    sorts: []
                }
                return JSON.stringify(map);
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.contractNo,
                                text: (item.contractName || '') + '[' + item.contractNo + '] | '+ item.startDate + '～' + item.endDate + ' | ' + item.contractType + ' | ' + item.unitName           
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function findSaleRecordByDate(p,c) {
    $.ajax({
        url: $.api.baseLotus+"/api/sales/lotus/findSaleRecodeByDate?contractNo=LTCONTRACT20211026000122&startDate=2021-01-01&endDate=2021-12-31&page="+(p-1)+"&size="+c+"&sort=id,desc",
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

                $('#entries').html('');
                if(response.data.content.length > 0){
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    $.each(response.data.content, function(i,v) {
                        var state;
                        switch (v.state) {
                            case '1':
                                state = "使用中";
                                break;
                            case '0':
                                state = "已删除";
                                break;
                            default:
                                state = "使用中";
                                break;
                        }
                        
                        $('#entries').append('<tr>\n\
                            <td>'+v.code+'</td>\n\
                            <td>'+state+'</td>\n\
                            <td></td>\n\
                            <td>'+v.contractNo+'</td>\n\
                            <td></td>\n\
                            <td></td>\n\
                            <td>'+v.salesDate+'</td>\n\
                            <td>'+numberWithCommas(v.saleNum)+'</td>\n\
                            <td>'+accounting.formatNumber(v.amount)+'</td>\n\
                            <td></td>\n\
                            <td>'+(v.remark || '')+'</td>\n\
                        </tr>');
                    })
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#entries').append('<tr><td colspan="11" style="text-align: center;">没有查到相关记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}