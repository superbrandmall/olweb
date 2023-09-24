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
    
    $('.date-picker').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm',
        'todayHighlight': true,
        'startView': 'months',
        'maxViewMode': 'years',
        'minViewMode': 'months',
        'autoclose': true
    })
    
    findConfigs();
    findPeriods();
    $('.fixed-table-body').on('scroll', scrollHandle);
})

function findConfigs() {
    $.ajax({
        url: $.api.baseSap+"/api/gl/config/findAll",
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
                
                if(response.data != null && response.data.length > 0){
                    sessionStorage.setItem("glConfig", JSON.stringify(response.data) );
                    $.each(response.data, function(i,v) {
                        updateRowConfigList(JSON.stringify(v));
                    })  
                }
            }
        }
    })
}

function addRowConfigList() {
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    
    var table = document.getElementById('configs');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    newrow.setAttribute("id", "config_new-"+count.toLocaleString());
    var tbg = '#fff';
    if(count%2==1){
        tbg = '#f9f9f9';
    }   
    column1.innerText = count.toLocaleString();
    column1.setAttribute("style","background: "+tbg+"; z-index: 1; border-right: solid 2px #ddd;");
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configItemCode");
    input.setAttribute("type","text");
    column2.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configItemName");
    input.setAttribute("type","text");
    column3.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configDebitItemCode");
    input.setAttribute("type","text");
    column4.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configDebitItemName");
    input.setAttribute("type","text");
    column5.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configCreditItemCode");
    input.setAttribute("type","text");
    column6.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configCreditItemName");
    input.setAttribute("type","text");
    column7.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control configCreditTaxItemCode");
    input.setAttribute("type","text");
    column8.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control configCreditTaxItemName");
    input.setAttribute("type","text");
    column9.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control configTransactionType");
    input.setAttribute("type","text");
    column10.appendChild(input);
    
    var checkbox = document.createElement("input");
    checkbox.setAttribute("class","configIsTaxFlag");
    checkbox.setAttribute("type", "checkbox");
    column11.appendChild(checkbox);
    
    var save = document.createElement("a");
    save.innerHTML = "保存";
    save.setAttribute("href", "javascript: void(0)"); 
    save.setAttribute("onClick", "saveRow(this)");
    save.setAttribute("class","btn btn-primary btn-xs");
    column12.appendChild(save);

    tbody.appendChild(newrow);
}

function updateRowConfigList(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    newrow.setAttribute("id", "config_"+value.id);
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    
    var table = document.getElementById('configs');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    var tbg = '#fff';
    if(count%2==1){
        tbg = '#f9f9f9';
    }   
    column1.innerText = count.toLocaleString();
    column1.setAttribute("style","background: "+tbg+"; z-index: 1; border-right: solid 2px #ddd;");
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configItemCode");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.itemCode || ''));
    column2.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configItemName");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.itemName || ''));
    column3.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configDebitItemCode");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.debitItemCode || ''));
    column4.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configDebitItemName");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.debitItemName || ''));
    column5.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configCreditItemCode");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.creditItemCode || ''));
    column6.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control mandatory configCreditItemName");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.creditItemName || ''));
    column7.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control configCreditTaxItemCode");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.creditTaxItemCode || ''));
    column8.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control configCreditTaxItemName");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.creditTaxItemName || ''));
    column9.appendChild(input);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control configTransactionType");
    input.setAttribute("type","text");
    input.setAttribute("value",(value.transactionType || ''));
    column10.appendChild(input);
    
    var checkbox = document.createElement("input");
    checkbox.setAttribute("class","configIsTaxFlag");
    checkbox.setAttribute("type", "checkbox");
    if(value.isTaxFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column11.appendChild(checkbox);
    
    var save = document.createElement("a");
    save.innerHTML = "保存";
    save.setAttribute("href", "javascript: void(0)"); 
    save.setAttribute("onClick", "saveRow(this)");
    save.setAttribute("class","btn btn-primary btn-xs");
    column12.appendChild(save);

    tbody.appendChild(newrow);
}

function saveRow(button) {
    var row = button.parentNode.parentNode;
    var rowId = row.getAttribute("id");
    
    mandatoryCheck(rowId.split('_')[1]);
}

function mandatoryCheck(id) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    $('#config_'+id).find('td').each(function(){
        if($(this).find('.mandatory').val() == ''){
            flag = 0;
            $(this).append(error);
        }
    })
    
    if(flag == 1){
        if(id.substr(0,1) == 'n'){
            createConfig(id.split('-')[1]);
        } else {
            updateConfig(id);
        }
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function createConfig(id) {
    var msg = '确定要保存这条配置信息吗？';
    
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var isTaxFlag = 0;
        if($('#config_new-'+id).find('.configIsTaxFlag').prop('checked') == true){
            isTaxFlag = 1;
        }
        
        var map = {
            "creatorOpenId": openId,
            "creditItemCode": $('#config_new-'+id).find('.configCreditItemCode').val(),
            "creditItemName": $('#config_new-'+id).find('.configCreditItemName').val(),
            "creditTaxItemCode": $('#config_new-'+id).find('.configCreditTaxItemCode').val(),
            "creditTaxItemName": $('#config_new-'+id).find('.configCreditTaxItemName').val(),
            "debitItemCode": $('#config_new-'+id).find('.configDebitItemCode').val(),
            "debitItemName": $('#config_new-'+id).find('.configDebitItemName').val(),
            "isTaxFlag": isTaxFlag,
            "itemCode": $('#config_new-'+id).find('.configItemCode').val(),
            "itemName": $('#config_new-'+id).find('.configItemName').val(),
            "transactionType": $('#config_new-'+id).find('.configTransactionType').val(),
            "updateOpenId": openId
        }
        
        if(map.itemCode != '' && map.itemName!= '' && map.debitItemCode != '' && map.debitItemName != '' && map.creditItemCode != '' && map.creditItemName != ''){
            $.ajax({
                url: $.api.baseSap+"/api/gl/config/saveOrUpdate",
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

                        caching('c');
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

function updateConfig(id) {
    var msg = '确定要保存这条配置信息吗？';
    
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var configToUpdate = {};
        $.each($.parseJSON(sessionStorage.getItem("glConfig")), function(i,v){
            if(v.id == id){
                configToUpdate = v;
            }
        })
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })

        configToUpdate.creditItemCode = $('#config_'+id).find('.configCreditItemCode').val();
        configToUpdate.creditItemName = $('#config_'+id).find('.configCreditItemName').val();
        configToUpdate.creditTaxItemCode = $('#config_'+id).find('.configCreditTaxItemCode').val();
        configToUpdate.creditTaxItemName = $('#config_'+id).find('.configCreditTaxItemName').val();
        configToUpdate.debitItemCode = $('#config_'+id).find('.configDebitItemCode').val();
        configToUpdate.debitItemName = $('#config_'+id).find('.configDebitItemName').val();
        configToUpdate.id = id;
        if($('#config_'+id).find('.configIsTaxFlag').prop('checked') == true){
            configToUpdate.isTaxFlag = 1;
        } else {
            configToUpdate.isTaxFlag = 0;
        }
        configToUpdate.itemCode = $('#config_'+id).find('.configItemCode').val();
        configToUpdate.itemName = $('#config_'+id).find('.configItemName').val();
        configToUpdate.transactionType = $('#config_'+id).find('.configTransactionType').val();
        configToUpdate.updateOpenId = openId;
        
        if(configToUpdate.itemCode != '' && configToUpdate.itemName != '' && configToUpdate.debitItemCode != '' && configToUpdate.debitItemName != '' && configToUpdate.creditItemCode != '' && configToUpdate.creditItemName != ''){
            $.ajax({
                url: $.api.baseSap+"/api/gl/config/saveOrUpdate",
                type: "POST",
                data: JSON.stringify(configToUpdate),
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

                        caching('u');
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

function caching(type) {
    var url = $.api.baseSap+"/api/gl/config/refresh";
    if(type == 'a'){
        url = $.api.baseSap+"/api/gl/account/period/refresh";
    }
    
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
                
                if(type == 'c'){
                    window.location.href = '/lotus-admin/gl-config?&s=succeed';
                } else {
                    successMsg('00','保存成功！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });    
}

function findPeriods() {
    var map = {
        "conditionGroups": [],
        "params": []
    }
    
    $.ajax({
        url: $.api.baseSap+"/api/gl/account/period/findAllByKVCondition",
        type: "POST",
        data: JSON.stringify(map),
        async: true,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                $('#periods').html('');
                if(response.data.content.length > 0){
                    sessionStorage.setItem("accountPeriod", JSON.stringify(response.data.content) );
                    $.each(response.data.content, function(i,v){
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
                        
                        $('#periods').append('<tr id="period_'+v.id+'">\n\
                            <td>'+(i*1+1)+'</td>\n\
                            <td>'+mallName+'['+v.mallCode+']</td>\n\
                            <td>'+v.companyName+'['+v.companyCode+']</td>\n\
                            <td>'+v.glTypeName+'['+v.glTypeCode+']</td>\n\
                            <td>\n\
                                <div class="input-group">\n\
                                <input class="form-control date-picker" type="text" value="'+v.periodYear+'-'+(v.periodMonth < 10 ? '0'+v.periodMonth : v.periodMonth)+'" data-plugin="yearMonth" readonly style="border: 1px solid #ccc; background: #fff; border-right: none; width: 100%;" />\n\
                                <span class="input-group-addon" style="border: 1px solid #ccc; border-left: none; padding-right: 6px; background: #fff;"><i class="fa fa-calendar"></i></span>\n\
                                </div>\n\
                            </td>\n\
                            <td><a href="javascript: void(0)" onclick="savePeriod(this)" class="btn btn-primary btn-xs">保存</a></td>\n\
                        </tr>');
                    })
                    
                    $('#periods .date-picker').datepicker({
                        'language': 'zh-CN',
                        'format': 'yyyy-mm',
                        'todayHighlight': true,
                        'startView': 'months',
                        'maxViewMode': 'years',
                        'minViewMode': 'months',
                        'autoclose': true
                    })
                } else {
                    $('#periods').html('<tr><td colspan="6" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function savePeriod(button) {
    var msg = '确定要保存这条账期信息吗？';
    
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var row = button.parentNode.parentNode;
        var rowId = row.getAttribute("id").split('_')[1];
        
        var periodToUpdate = {};
        $.each($.parseJSON(sessionStorage.getItem("accountPeriod")), function(i,v){
            if(v.id == rowId){
                periodToUpdate = v;
            }
        })
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })

        periodToUpdate.id = rowId;
        periodToUpdate.period = $('#period_'+rowId).find('.date-picker').val().split('-')[0]+$('#period_'+rowId).find('.date-picker').val().split('-')[1];
        periodToUpdate.periodYear = $('#period_'+rowId).find('.date-picker').val().split('-')[0];
        periodToUpdate.periodMonth = $('#period_'+rowId).find('.date-picker').val().split('-')[1].substring(0,1) == '0' ? $('#period_'+rowId).find('.date-picker').val().split('-')[1].substring(1,1) : $('#period_'+rowId).find('.date-picker').val().split('-')[1];
        periodToUpdate.updateOpenId = openId;
        
        if(periodToUpdate.period != '' && periodToUpdate.periodMonth != '' && periodToUpdate.periodYear != ''){
            $.ajax({
                url: $.api.baseSap+"/api/gl/account/period/saveOrUpdate",
                type: "POST",
                data: JSON.stringify(periodToUpdate),
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

                        caching('a');
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