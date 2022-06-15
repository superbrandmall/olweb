$(document).ready(function(){
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("#create-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            type: {
                required: true
            },
            businessScope: {
                minlength: 4
            },
            uscc: {
                rangelength: [18,18],
                numChar: true
            },
            remarkFirst: {
                required: true,
                minlength: 4
            },
            bankAccount: {
                required: true,
                minlength: 4
            },
            bankName: {
                required: true,
                minlength: 4
            },
            deliveryAddress: {
                required: true,
                minlength: 4
            },
            phoneNum: {
                required: true,
                minlength: 4
            },
            regAddress: {
                required: true,
                minlength: 4
            },
            mail: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "请输入商户名称",
                minlength: "请输入完整商户名称"
            },
            type: {
                required: "请选择类型"
            },
            businessScope: {
                minlength: "请输入经营范围"
            },
            uscc: {
                rangelength: "请输入正确统一社会信用代码 / 身份证号码",
                numChar: "请输入正确统一社会信用代码 / 身份证号码"
            },
            remarkFirst: {
                required: "请输入办公地址",
                minlength: "请输入正确办公地址"
            },
            bankAccount: {
                required: "请输入银行账号",
                minlength: "请输入正确银行账号"
            },
            bankName: {
                required: "请输入银行名称",
                minlength: "请输入正确银行名称"
            },
            deliveryAddress: {
                required: "请输入账单地址",
                minlength: "请输入正确账单地址"
            },
            phoneNum: {
                required: "请输入联系电话",
                minlength: "请输入正确联系电话"
            },
            regAddress: {
                required: "请输入注册地址",
                minlength: "请输入正确注册地址"
            },
            mail: {
                required: "请输入送达邮箱",
                email: "请输入正确送达邮箱"
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
    $.ajax({
        url: $.api.baseLotus+"/api/tenant/lotus/findAllByName?name="+name,
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    var duplicate = false;
                    $.each(response.data, function(i,x) {
                        if(x.name == name){
                            duplicate = true;
                        }
                    })
                    
                    if(duplicate == true) {
                        alertMsg('9999','该商户已经存在！');
                    } else {
                        addTenant();
                    }
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

        if(name!= '' && type != '' && regAddress != '' && deliveryAddress != '' && bankName != '' && bankAccount != '' && remarkFirst != '' && phoneNum != '' && mail != ''){
            var map = {
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