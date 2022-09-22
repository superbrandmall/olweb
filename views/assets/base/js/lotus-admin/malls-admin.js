$(document).ready(function(){
    if($.cookie('searchMallState') != null){
        $('#state').val($.cookie('searchMallState')).trigger('change');
    }
    
    if($.cookie('searchMallName') != ''){
        $('#mallName').val($.cookie('searchMallName'));
    }
    
    if($.cookie('searchMallType') != null){
        $('#mallType').val($.cookie('searchMallType')).trigger('change');
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
        $('#state, #mallType').val('').trigger('change');
        
        $.cookie('searchMallState',null);
        $.cookie('searchMallName', '');
        $.cookie('searchMallType', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchMallState',$('#state').val());
        $.cookie('searchMallName', $('#mallName').val());
        $.cookie('searchMallType', $('#mallType').val());
        findAllMallsByKVCondition(1,items);
    })
});

function findAllMallsByKVCondition(p,c){
    $('#malls').html('');
    var params = [{
            "columnName": "code",
            "columnPatten": "",
            "conditionOperator": "",
            "operator": "!=",
            "value": 'SC999'
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

    if($.cookie('searchMallType') != null && $.cookie('searchMallType') != '' && $.cookie('searchMallType') != 'null'){
        param = {
            "columnName": "mallType",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchMallType')
        }
        
    } else {
        param = {
            "columnName": "mallType",
            "columnPatten": "",
            "operator": "AND",
            "value": "lotus"
        }
    }
    
    params.push(param);
        
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
                        $('#malls').append('<tr data-index="'+i+'">\n\
                        <td><a href="/lotus-admin/default?id='+v.code+'">'+v.code+'</a></td>\n\
                        <td>'+v.mallName+'</td>\n\
                        <td>'+v.mallLotusBase.address+'</td>\n\
                        <td>'+v.mallLotusBase.name+'</td>\n\
                        <td>'+v.mallLotusBase.uscc+'</td>\n\
                        <td>'+v.mallLotusBase.regAddress+'</td>\n\
                        <td>'+v.mallLotusBase.bankName+'</td>\n\
                        <td>'+v.mallLotusBase.bankAccount+'</td>\n\
                        <td>'+(v.mallLotusBase.phoneNum || '')+'</td>\n\
                        <td>'+v.mallLotusBase.cityDistrict+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#malls').html('<tr><td colspan="10" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}