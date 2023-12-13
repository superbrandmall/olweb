$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                successMsg('00','操作成功！');
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
    
    if($.cookie('glConfigMallVal') != null && $.cookie('glConfigMallVal') != 'null'){
        var newOption = new Option($.cookie('glConfigMallTxt'), $.cookie('glConfigMallVal'), true, true);
        $('#department').append(newOption).trigger('change');
    } else {
        $('#department').val('').trigger('change');
    }
    
    if($.cookie('glType') != null && $.cookie('glType') != 'null'){
        $('#glType').val($.cookie('glType')).trigger('change');
    }
    
    if(!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        findAllUsers();
    }
    
    findConfigsByKVCondition();
    
    $('.date-picker').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
        
    $('#clear').click(function(){
        $.cookie('glConfigMallTxt', null);
        $.cookie('glConfigMallVal', null);
        $.cookie('glType', null);
        
        $('#department, #glType').val('').trigger('change');
    })
    
    $('#search').click(function(){
        $.cookie('glConfigMallVal', $('#department').val());
        $.cookie('glConfigMallTxt', $('#department').find('option:selected').text());
        $.cookie('glType', $('#glType').val());
        
        findConfigsByKVCondition();
    })
    
    $('.fixed-table-body').on('scroll', scrollHandle);
});

function findConfigsByKVCondition() {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    if($.cookie('glConfigMallVal') != null && $.cookie('glConfigMallVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": ($.cookie('glConfigMallVal') != null ? $.cookie('glConfigMallVal') : $('#department').val())
        }
        params.push(param);
    }
    
    if($.cookie('glType') != null && $.cookie('glType') != 'null' && $.cookie('glType') != ''){
        param = {
            "columnName": "glTypeCode",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": $.cookie('glType')
        }
        params.push(param);
    }
    
    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
    
    $.ajax({
       url: $.api.baseSap+"/api/gl/account/period/findAllByKVCondition?page=0&size=100&sort=mallCode,asc",
        type: "POST",
        data: JSON.stringify(map),
        async: true,
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
                
                $('#gl').html('');
                if(response.data.content.length > 0){
                    sessionStorage.setItem("accountPeriod", JSON.stringify(response.data.content) );
                    $.each(response.data.content, function(i,v){
                        var tbg = '#fff';
                        if(i%2==0){
                            tbg = '#f9f9f9';
                        }
                            
                        var mallName = '';
                        if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
                            var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
                            $.each(malls, function(j,w){
                                if(w.code == v.mallCode){
                                    mallName = w.mallName;
                                    return false;
                                }
                            })
                        }
                        
                        $('#gl').append('<tr>\n\
                            <td style="background: '+tbg+'; z-index: 1; border-right: solid 2px #ddd;"><a href=\'javascript:void(0);\' onclick=\'javascript: getGlConfigDetail("'+v.id+'")\'>查看详情</a></td>\n\
                            <td>'+mallName+'['+v.mallCode+']</td>\n\
                            <td>'+v.companyName+'['+v.companyCode+']</td>\n\
                            <td>'+v.glTypeName+'['+v.glTypeCode+']</td>\n\
                            <td>'+v.periodYear+'-'+(v.periodMonth < 10 ? '0'+v.periodMonth : v.periodMonth)+'</td>\n\
                            <td>'+v.created+'['+(v.creatorOpenId != 'admin' ? renderUserName(v.creatorOpenId) : 'admin')+']</td>\n\
                            <td>'+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']</td>\n\
                        </tr>');
                    })
                } else {
                    $('#gl').html('<tr><td colspan="7" style="text-align: center;">没有找到任何记录！</td></tr>');
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

function getGlConfigDetail(id){
    $('.mandatory-error').remove();
    $('#investment-gl-config-create').modal('toggle');
    var glConfig = $.parseJSON(sessionStorage.getItem("accountPeriod"));
    $("span[id^='glConfig']").text('');
    $("#glConfigPeriod").val('');
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
        
    $.each(glConfig, function(i,v){
        if(v.id == id){
            var mallName = '';
            if(sessionStorage.getItem("lotus_malls") && sessionStorage.getItem("lotus_malls") != null && sessionStorage.getItem("lotus_malls") != '') {
                var malls = $.parseJSON(sessionStorage.getItem("lotus_malls"));
                $.each(malls, function(j,w){
                    if(w.code == v.mallCode){
                        mallName = w.mallName;
                        return false;
                    }
                })
            }
            $('#configUpdated').text('最近更新：  '+v.updated+'['+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+']');
            $('#glConfigMall').text(mallName+'['+v.mallCode+']');
            $('#glConfigCompanyName').text(v.companyName);
            $('#glConfigCompanyCode').text(v.companyCode);
            $('#glConfigGlType').text(v.glTypeName+'['+v.glTypeCode+']');
            $('#glConfigPeriod').val(v.periodYear+'-'+(v.periodMonth < 10 ? '0'+v.periodMonth : v.periodMonth)).datepicker({
                'language': 'zh-CN',
                'format': 'yyyy-mm',
                'todayHighlight': true,
                'startView': 'months',
                'maxViewMode': 'years',
                'minViewMode': 'months',
                'autoclose': true
            })
            
            $('#saveConfig').click(function(){
                saveCheck(JSON.stringify(v));
            })
            
            return false;
        }
    })
}

function saveCheck(v) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#glConfigPeriod').val() == '') {
        flag = 0;
        $(this).parent().append(error);
    }
   
    
    if(flag == 1 && $('.mandatory-error').length == 0){
        editGlConfig(v);
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function editGlConfig(v) {
    var msg = '确定要设置该账期吗？';
    
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var map = JSON.parse(v);
        map.period = $('#glConfigPeriod').val().split('-')[0]+$('#glConfigPeriod').val().split('-')[1];
        map.periodYear = $('#glConfigPeriod').val().split('-')[0];
        map.periodMonth = $('#glConfigPeriod').val().split('-')[1].substring(0,1) == '0' ? $('#glConfigPeriod').val().split('-')[1].substring(1,2) : $('#glConfigPeriod').val().split('-')[1];
        map.updateOpenId = openId;
        
        if(map.period != null  && map.periodYear != null && map.periodMonth != null){
            $.ajax({
                url: $.api.baseSap+"/api/gl/account/period/saveOrUpdate",
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
                        
                        if(response.data.resultCode != 'ERROR') {
                            caching();
                        } else {
                            alertMsg(response.data.resultCode,response.data.resultMsg);
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
    })
}

function caching() {
    var url = $.api.baseSap+"/api/gl/account/period/refresh";
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
                
                window.location.href = '/lotus-admin/gl-config?&s=succeed';
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });    
}