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
    
    if($.cookie('searchMallState') != null){
        $('#state').val($.cookie('searchMallState')).trigger('change');
    }
    
    if($.cookie('searchMallName') != ''){
        $('#mallName').val($.cookie('searchMallName'));
    }
    
    if($.cookie('searchCityDistrict') != null){
        $('#cityDistrict').val($.cookie('searchCityDistrict')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllMallsByKVCondition(getURLParameter('page'),items);
    } else {
        findAllMallsByKVCondition(1,items);
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
        $('#mallName').val('');
        $('#state, #cityDistrict').val('').trigger('change');
        
        $.cookie('searchMallState',null);
        $.cookie('searchMallName', '');
        $.cookie('searchCityDistrict', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchMallState',$('#state').val());
        $.cookie('searchMallName', $('#mallName').val());
        $.cookie('searchCityDistrict', $('#cityDistrict').val());
        findAllMallsByKVCondition(1,items);
    })
});

function findAllMallsByKVCondition(p,c){
    $('#malls').html('');
    var params = [{
            "columnName": "mallType",
            "columnPatten": "",
            "operator": "AND",
            "value": 'kow'
        }
    ];
    var param = {};
    
    if($.cookie('searchMallState') != null && $.cookie('searchMallState') != '' && $.cookie('searchMallState') != 'null'){
        param = {
            "columnName": "state",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchMallState')
        }
    } else {
            param = {
            "columnName": "state",
            "columnPatten": "",
            "operator": "AND",
            "value": 1
        }
    }
    
    params.push(param);
            
    if($.cookie('searchMallName') != null && $.cookie('searchMallName') != ''){
        param = {
            "columnName": "mallName",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchMallName')
        }
        params.push(param);
    }

    if($.cookie('searchCityDistrict') != null && $.cookie('searchCityDistrict') != '' && $.cookie('searchCityDistrict') != 'null'){
        param = {
            "columnName": "cityDistrict",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchCityDistrict')
        }
        params.push(param);
    }
        
     var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/mall/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                        var mallArea = 0;
                        var weekdayCustomerNo = 0;
                        var weekendCustomerNo = 0;
                        $.each(v.mallLotusExtensionList, function(j,w){
                            switch (w.keyType) {
                                case "mallArea":
                                    mallArea = w.keyValue;
                                    break;
                                case "weekdayCustomerNo":
                                    weekdayCustomerNo = w.keyValue;
                                    break;
                                case "weekendCustomerNo":
                                    weekendCustomerNo = w.keyValue;
                                    break;
                                default:
                                    break;
                            }
                        })
                        
                        
                        $('#malls').append('<tr data-index="'+i+'">\n\
                        <td><a href="/kow-admin/mall-detail?id='+v.code+'">'+v.code+'</a></td>\n\
                        <td>'+v.mallName+'</td>\n\
                        <td>'+v.mallLotusBase.name+'</td>\n\
                        <td>'+v.mallLotusBase.cityDistrict+'</td>\n\
                        <td>周中: '+accounting.formatNumber(weekdayCustomerNo)+' | 周末: '+accounting.formatNumber(weekendCustomerNo)+'</td>\n\
                        <td>'+accounting.formatNumber(mallArea)+'m<sup>2</sup></td>\n\
                        <td>'+v.location+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#malls').html('<tr><td colspan="7" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}