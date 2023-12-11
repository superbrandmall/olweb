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
        
    findAllMallsByKVCondition(1,100);
    
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
        findAllMallsByKVCondition(1,100);
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
        },{
            "columnName": "mallType",
            "columnPatten": "",
            "conditionOperator": "",
            "operator": "!=",
            "value": 'kow'
        }
    ];
    var param = {};
    
    if($.cookie('searchMallState') != null && $.cookie('searchMallState') != '' && $.cookie('searchMallState') != 'null'){
        param = {
            "columnName": "remarkFirst",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('searchMallState')
        }
        params.push(param);
    }
            
    if($.cookie('searchMallName') != null && $.cookie('searchMallName') != ''){
        param = {
            "columnName": "mallName",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('searchMallName')
        }
        params.push(param);
    }

    if($.cookie('searchMallType') != null && $.cookie('searchMallType') != '' && $.cookie('searchMallType') != 'null'){
        param = {
            "columnName": "location",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "LIKE",
            "value": $.cookie('searchMallType')
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
                        var img = 'lotus-admin/noImage';
                        if(v.img != null){
                            img = 'mall/'+v.img;
                        }
                        
                        $('#malls').append('<div class="col-xs-12 col-sm-4 col-md-3" style="text-align: center; margin-bottom: 15px;">\n\
                            <img src="/views/assets/base/img/content/'+img+'.jpg" class="img-responsive" style="margin: 0 auto;">\n\
                            <a href="/lotus-admin/default?id='+v.code+'" target="_blank">'+v.mallName+'['+v.code+']</a>\n\
                        </div>');
                    });
                } else {
                    $('#malls').html('<p style="text-align: center;">没有找到任何记录！</p>');
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
    });
}