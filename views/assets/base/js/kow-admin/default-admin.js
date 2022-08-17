var toDoMalls = [];
var doingMalls = [];

$(document).ready(function(){
    if($.cookie('searchHomeStartDate') != null && $.cookie('searchHomeStartDate') != ''){
        $('#startDate').datepicker('update', $.cookie('searchHomeStartDate'));
    } else {
        $('#startDate').datepicker('update', d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + '01');
    }
    
    if($.cookie('searchHomeEndDate') != null && $.cookie('searchHomeEndDate') != ''){
        $('#endDate').datepicker('update', $.cookie('searchHomeEndDate'));
    } else {
        var ldm = getLastDayOfMonth(d.getFullYear(),month);
        $('#endDate').datepicker('update', d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + ldm);
    }
    
    $('#clear').click(function(){
        $('#startDate, #endDate').val('');
        $.cookie('searchHomeStartDate', '');
        $.cookie('searchHomeEndDate', '');
    })
    
    $('#search').click(function(){
        $.cookie('searchHomeStartDate', $('#startDate').val());
        $.cookie('searchHomeEndDate', $('#endDate').val());
        findDoingRequestsByKVCondition(1,100);
        findToDoRequestsByKVCondition(1,100);
    })
});

window.onload = function(){
    $('#search').trigger('click');
}

function findDoingRequestsByKVCondition(p,c){
    var params = [];
    var param = {};
    
    param = {
        "columnName": "contractName",
        "columnPatten": "",
        "operator": "AND",
        "value": 'KOW'
    }
    params.push(param);
    
    param = {
        "columnName": "startDate",
        "columnPatten": "",
        "conditionOperator": "",
        "operator": ">=",
        "value": $.cookie('searchHomeStartDate')
    }
    params.push(param);
    
    param = {
        "columnName": "endDate",
        "columnPatten": "",
        "conditionOperator": "",
        "operator": "<",
        "value": $.cookie('searchHomeEndDate')
    }
    params.push(param);
        
    var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
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

                doingMalls = [];
                if(response.data.content.length > 0) {
                    $.each(response.data.content, function(i,v){
                        doingMalls.push(v.mallName);
                    });
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

function findToDoRequestsByKVCondition(p,c){
    var params = [];
    var param = {};
    
    param = {
        "columnName": "contractName",
        "columnPatten": "",
        "operator": "AND",
        "value": 'KOW'
    }
    params.push(param);
    
    param = {
        "columnName": "startDate",
        "columnPatten": "",
        "conditionOperator": "",
        "operator": ">=",
        "value": $.cookie('searchHomeEndDate')
    }
    params.push(param);
        
    var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                
                toDoMalls = [];
                if(response.data.content.length > 0) {
                    $.each(response.data.content, function(i,v){
                        toDoMalls.push(v.mallName);
                    });
                }
                
                findAllMalls(1,100);   
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}


function findAllMalls(p,c){
    var params = [{
            "columnName": "mallType",
            "columnPatten": "",
            "operator": "AND",
            "value": 'kow'
        }
    ];
        
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
                
                var citys = [];
                
                if(response.data.content.length > 0) {
                    var index1 = 0;
                    $.each(response.data.content, function(i,v) {
                        $.each(doingMalls, function(j,w) {
                            if(v.mallName == w){
                                var city = {
                                    name: v.mallName,
                                    addr: v.location,
                                    status: '正在进行'
                                }
                                index1++;
                                citys.push(city);
                            }
                        })
                    })
                    $('#doing').text(index1);
                    
                    var index2 = 0;
                    $.each(response.data.content, function(i,v) {
                        $.each(toDoMalls, function(j,w) {
                            if(v.mallName == w){
                                var city = {
                                    name: v.mallName,
                                    addr: v.location,
                                    status: '即将上线'
                                }
                                index2++;
                                citys.push(city);
                            }
                        })
                    })
                    $('#toDo').text(index2);
                    
                    $('#citys').html(JSON.stringify(citys));
                    frames["map"].popupFlag();
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}