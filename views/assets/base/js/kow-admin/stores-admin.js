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
            window.history.pushState("object or string", "Title", "/kow-admin/"+refineCreateUrl() );
        },1000);
    }
    
    // 初始化
    updateDictDropDownByDictTypeCode('UNIT_TYPE','unitType',$.api.unitType[0],$.api.unitType[1]); // 铺位类型
    updateSelectMallDropDown(20) // 所属项目
    
    if($.cookie('searchStoreState') != '' && $.cookie('searchStoreState') != 'null' && $.cookie('searchStoreState') != null){
        $('#state').val($.cookie('searchStoreState')).trigger('change');
    }
    
    if($.cookie('searchMallCode') != null && $.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != ''){
        $('#mallCode').val($.cookie('searchMallCode'));
    }
    
    if($.cookie('searchUnitType') != null){
        $('#unitType').val($.cookie('searchUnitType')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllStoresByKVCondition(getURLParameter('page'),items);
    } else {
        findAllStoresByKVCondition(1,items);
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
            $('.page-size').text('20');
            break;
    }
    
    $('#clear').click(function(){
        $('#state, #mallCode, #unitType').val('').trigger('change');
        
        $.cookie('searchStoreState', null);
        $.cookie('searchMallCode', null);
        $.cookie('searchUnitType', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchStoreState',$('#state').val());
        $.cookie('searchMallCode', $('#mallCode').val());
        $.cookie('searchUnitType', $('#unitType').val());
        findAllStoresByKVCondition(1,items);
    })
});

function findAllStoresByKVCondition(p,c){
    $('#stores').html('');
    var params = [{
            "columnName": "unitType",
            "columnPatten": "",
            "operator": "AND",
            "value": 'kow'
        },{
            "columnName": "userCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('uid')
        }
    ];
    
    if($.cookie('searchStoreState') != null && $.cookie('searchStoreState') != '' && $.cookie('searchStoreState') != 'null'){
        var param = {
            "columnName": "state",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchStoreState')
        }
        params.push(param);
    }
    
            
    if($.cookie('searchMallCode') != null && $.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != ''){
        var param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchMallCode')
        }
        params.push(param);
    }
        
     var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByKVConditionForMin?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    $.each(response.data.content, function(i,v){
                        var state, shopStatus;
                        
                        switch (v.state) {
                            case 1:
                                state = '使用中';
                                break;
                            case 0:
                                state = '已删除';
                                break;
                            default:
                                state = '使用中';
                                break;
                        }
                      
                        switch (v.shopStatus) {
                            case 1:
                                shopStatus = '空闲';
                                break;
                            case 0:
                                shopStatus = '租用';
                                break;
                            default:
                                shopStatus = '空闲';
                                break;
                        }
                        
                        var approve = v.approveFirst;
                        if(v.approveSecond != null){
                            approve = approve + '、' +v.approveSecond
                        }
                       
                        if(v.approveThird != null){
                           approve = approve + '、' +v.approveThird
                        }
                        
                        $('#stores').append('<tr data-index="'+i+'">\n\
                        <td><a href="/kow-admin/store-detail?id='+v.code+'">'+v.unitName+'['+v.unitCode+']</a></td>\n\
                        <td>'+state+'</td>\n\
                        <td>'+shopStatus+'</td>\n\
                        <td>'+v.mallName+'</td>\n\
                        <td>'+v.floorName+'</td>\n\
                        <td>'+v.startDate+'~'+v.endDate+'</td>\n\
                        <td>'+v.unitArea+'</td>\n\
                        <td>'+v.mallType+'</td>\n\
                        <td>'+approve+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#stores').html('<tr><td colspan="9" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

function updateSelectMallDropDown(data_count) {
    $('#mallCode').select2({
        placeholder: '未选择',
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
                return $.api.baseLotus+"/api/mall/lotus/findAllByFreeCondition?page="+(params.page || 0)+"&size="+data_count+"&sort=id,asc";
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
                    key: params.term || 'kow',
                    operator: "OR",
                    params: [
                      "mallName", "mallType"
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
                                id: item.code,
                                text: item.mallName + '[' + item.mallLotusBase.cityDistrict + ']'            
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
