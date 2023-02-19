$(document).ready(function(){
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("#create-form").validate({
        rules: {
            tenantCode: {
                minlength: 4
            },
            name: {
                required: true,
                minlength: 2
            },
            type: {
                required: true
            },
            uscc: {
                required: true,
                rangelength: [18,18],
                numChar: true
            },
            regAddress: {
                required: true,
                minlength: 4
            }
        },
        messages: {
            tenantCode: {
                minlength: "商户编码长度不够"
            },
            name: {
                required: "请输入商户名称",
                minlength: "请输入完整商户名称"
            },
            type: {
                required: "请选择类型"
            },
            uscc: {
                required: "请输入统一社会信用代码/身份证号码",
                rangelength: "请输入正确统一社会信用代码/身份证号码",
                numChar: "请输入正确统一社会信用代码/身份证号码"
            },
            regAddress: {
                required: "请输入注册地址",
                minlength: "请输入正确注册地址"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            checkTenantName($('#name').val());
        }
    });
})

function checkTenantName(name) {
    var params = [{
        "columnName": "name",
        "columnPatten": "",
        "operator": "AND",
        "value": name
    },{
        "columnName": "tenantCode",
        "columnPatten": "",
        "operator": "AND",
        "value": $('#tenantCode').val()
    },{
        "columnName": "uscc",
        "columnPatten": "",
        "operator": "AND",
        "value": $('#uscc').val()
    }]

    var map = {
        "params": params
    }
        
    $.ajax({
        url: $.api.baseLotus+"/api/tenant/lotus/findAllByKVCondition?page=1&size=100&sort=id,asc",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0) {
                    alertMsg('9999','该商户已经存在！');
                } else {
                    addTenant();
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}

function addTenant() {
    Ewin.confirm({ message: "确定要提交保存该商户信息吗？" }).on(function (e) {
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
        
        var tenantCode = $('#tenantCode').val();
        var name = $('#name').val();
        var type = $('#type').val();
        var capital;
        if($('#capital').val() != ''){
            capital = numberWithoutCommas($('#capital').val());
        } else {
            capital = null;
        }
        var businessScope = $('#businessScope').val() || null;
        var uscc = $('#uscc').val() || null;
        var shareHolder = $('#shareHolder').val() || null;
        var remarkFirst = $('#remarkFirst').val() || null;
        var bankAccount = $('#bankAccount').val() || null;
        var bankName = $('#bankName').val() || null;
        var deliveryAddress = $('#deliveryAddress').val() || null;
        var mail = $('#mail').val() || null;
        var phoneNum = $('#phoneNum').val() || null;
        var regAddress = $('#regAddress').val() || null;
        
        var contactList = [];
        var index;
        $("#contactList").find("tr").each(function(i,e){
            var contact = {};
            index = i * 1 + 1;
            contact.name = $('#contactListName_'+index).val();
            contact.cardId = $('#contactListCardId_'+index).val();
            contact.title = $('#contactListTitle_'+index).val();
            contact.bdFlag = $('#contactListBdFlag_'+index).val();
            contact.mobileNo = $('#contactListMobileNo_'+index).val();
            contact.phoneNum = $('#contactListPhoneNum_'+index).val();
            contact.mail = $('#contactListMail_'+index).val();
            contact.address = $('#contactListAddress_'+index).val();
            if($('#contactListEsignFlag_'+index).prop('checked') == true){
                contact.esignFlag = 1;
            } else {
                contact.esignFlag = 0;
            }
            if($('#contactListFinanceFlag_'+index).prop('checked') == true){
                contact.financeFlag = 1;
            } else {
                contact.financeFlag = 0;
            }
            if($('#contactListLegalFlag_'+index).prop('checked') == true){
                contact.legalFlag = 1;
            } else {
                contact.legalFlag = 0;
            }
            contactList.push(contact);
        })

        if(name!= '' && type != '' && uscc != '' && regAddress != ''){
            var map = {
                "tenantCode": tenantCode,
                "creatorOpenId": openId,
                "updateOpenId": openId,
                "businessScope": businessScope,
                "type": type,
                "capital": capital,
                "name": name,
                "status": 1,
                "uscc": uscc,
                "tianyanchaId": null,
                "authState": null,
                "shareHolder": shareHolder,
                "remarkFirst": remarkFirst,
                "address": remarkFirst,
                "bankAccount": bankAccount,
                "bankName": bankName,
                "deliveryAddress": deliveryAddress,
                "mail": mail,
                "phoneNum": phoneNum,
                "regAddress": regAddress,
                "contactList": contactList
            };

            $.ajax({
                url: $.api.baseLotus+"/api/tenant/lotus/saveOrUpdate",
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

                        window.location.href = '/lotus-admin/tenants?s=succeed';
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