$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "create-user-fail":
                $('.callout-danger').text('编辑用户失败，请重新操作').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "create-user-role-fail":
                $('.callout-danger').text('分配用户角色失败，请重新操作').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "bind-user-contract-fail":
                $('.callout-danger').text('分配用户品牌失败，请重新操作').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "create-user-exist":
                $('.callout-warning').text('该用户已存在，请与系统管理员联系授权').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.code == 'CROLE211008000001' && v.moduleName == '门店对接人') {
            $('#department option').each(function(i,elem){
                if($(elem).val() != v.moduleCode){
                    $(this).remove();
                }
            })
        }
    })
    
    if($('#department').val() != ''){
        findAllContracts($('#department').val());
        $('#contract').parent().parent().show();
    }
    
    $('#department').change(function() {
        if($(this).val() != ''){
            findAllContracts($(this).val());
            $('#contract').parent().parent().show();
        } else {
             $('#contract').parent().parent().hide();
        }
    })

    $("#create-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            mobile: {
                required: true,
                minlength: 11
            },
            department: {
                required: true
            },
            type: {
                required: true
            },
            contract: {
                required: true
            }
        },
        messages: {
            name: {
                required: "请输入姓名",
                minlength: "请输入真实姓名"
            },
            email: {
                required: "请输入邮箱",
                email: "请输入真实邮箱"
            },
            mobile: {
                required: "请输入手机号码",
                minlength: "请输入真实手机号码"
            },
            department: {
                required: "请选择门店"
            },
            type: {
                required: "请选择用户分类"
            },
            contract: {
                required: "请给用户绑定合同"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            addUser();
        }
    });
})

function addUser() {
    var email = $('#email').val();
    var mobile = $('#mobile').val();
    var name = $('#name').val();
    var type = $('type').val();

    if(email != '' && mobile!= '' && name != ''){
        var map = {
            "email": email,
            "emailVerified": 0,
            "mobile": mobile,
            "mobileVerified": 0,
            "password": "12345",
            "settings": {
                "idCard": "",
                "idCardBack": "",
                "idCardFront": "",
                "idCardType": 0,
                "idCardVerified": 0,
                "international": 0,
                "lang": 0,
                "name": name
            },
            "userModules": [{
                "authorizationLevel": "1",
                "moduleCode": "LOTUS_SALE",
                "moduleName": "莲花销售员",
                "name": "莲花销售员",
                "roleCode": "CROLE210706000001" //莲花销售员
                }
            ],
            "userType": type
        };

        $.ajax({
            url: $.api.baseNew+"/common-authorization/api/user/save",
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

                    addUserRole(response.data.code);
                } else {
                    console.log(response.customerMessage);
                    //window.location.href = 'create-user?s=create-user-fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                //window.location.href = 'create-user?s=create-user-fail';
            }
        });
    }
}

function addUserRole(uc) {
    if(uc != '' && uc != null){
        var map = [{
            "roleCode": "CROLE210706000001", //莲花销售员
            "userCode": uc
        }];

        $.ajax({
            url: $.api.baseNew+"/common-authorization/api/userrole/save",
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
                    
                    saveUserContract(uc);
                } else {
                    console.log(response.customerMessage);
                    window.location.href = 'create-user?s=create-user-role-fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'create-user?s=create-user-role-fail';
            }
        });
    }
}

function findAllContracts(mc) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/user/contract/lotus/findAllByMallCode?mallCode="+mc+"&size=100",
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
                
                sessionStorage.setItem("contracts_"+mc, JSON.stringify(response.data.content));
                
                $('#contract').html('');
                $('#contract').append('<option value="">未选择</option>');
                $.each(response.data.content, function(i,v) {
                    if(v.contractStatus == '已签约'){
                        $('#contract').append('<option value="'+v.contractCode+'">'+v.contractName+'('+v.vshopLotus.unitName+')</option>');
                    }
                })
            } else {
                console.log(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    
}

function saveUserContract(uc) {
    var department = $('#department').val();
    var cc = $('#contract').val();
    
    if(uc != '' && uc != null){
        var map = {
            "contractCode": cc,
            "mallCode": department,
            "state": 1,
            "type": "1", //销售上报
            "userCode": uc
        };

        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/user/contract/lotus/saveOrUpdate",
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
                    
                    window.location.href = 'users?s=succeed';
                } else {
                    console.log(response.customerMessage);
                    window.location.href = 'users?s=bind-user-contract-fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'users?s=bind-user-contract-fail';
            }
        });
    }
}